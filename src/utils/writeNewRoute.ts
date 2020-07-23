import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import { winPath, createDebug } from '@umijs/utils';
import prettier from 'prettier';

const debug = createDebug('umi-build-dev:writeNewRoute');

type Route = {
  path: string;
  component: string;
  exact?: boolean;
  title?: string;
};

/**
 * 将路由写入路由文件
 * @param {*} newRoute 新的路由配置: { path, component, ... }
 * @param {*} configPath 配置路径
 * @param {*} absSrcPath 代码路径
 */
export function writeNewRoute(newRoute: Route, configPath: string, absSrcPath: string) {
  const { code, routesPath } = getNewRouteCode(configPath, newRoute, absSrcPath);
  writeFileSync(routesPath, code, 'utf-8');
}

/**
 * 获取目标
 * @param {*} configPath
 * @param {*} newRoute
 */
export function getNewRouteCode(configPath: string, newRoute: Route, absSrcPath: string) {
  debug(`find routes in configPath: ${configPath}`);
  const ast: any = parser.parse(readFileSync(configPath, 'utf-8'), {
    sourceType: 'module',
    plugins: ['typescript'],
  });
  let routesNode = null;
  const importModules = [];
  // 查询当前配置文件是否导出 routes 属性
  traverse(ast, {
    Program({ node }) {
      // find import
      const { body } = node;
      body.forEach(item => {
        if (t.isImportDeclaration(item)) {
          const { specifiers } = item;
          const defaultSpecifier = specifiers.find(
            s => t.isImportDefaultSpecifier(s) && t.isIdentifier(s.local),
          );
          if (defaultSpecifier && t.isStringLiteral(item.source)) {
            importModules.push({
              identifierName: defaultSpecifier.local.name,
              modulePath: item.source.value,
            });
          }
        }
      });
    },
    AssignmentExpression({ node }) {
      // for exports.routes
      const { left, operator, right } = node;
      if (
        operator === '=' &&
        t.isMemberExpression(left) &&
        t.isIdentifier(left.object) &&
        left.object.name === 'exports' &&
        t.isIdentifier(left.property) &&
        left.property.name === 'routes'
      ) {
        routesNode = right;
      }
    },
    ExportDefaultDeclaration({ node }) {
      // export default []
      const { declaration } = node;
      if (t.isArrayExpression(declaration)) {
        routesNode = declaration;
      }
    },
    ObjectExpression({ node, parent }) {
      // find routes on object, like { routes: [] }
      if (t.isArrayExpression(parent)) {
        // children routes
        return;
      }
      const { properties } = node;
      properties.forEach((p: any) => {
        const { key, value } = p;
        if (t.isObjectProperty(p) && t.isIdentifier(key) && key.name === 'routes') {
          routesNode = value;
        }
      });
    },
  });
  if (routesNode) {
    // routes 配置不在当前文件, 需要 load 对应的文件  export default { routes: pageRoutes } case 1
    if (!t.isArrayExpression(routesNode)) {
      const source = importModules.find(m => m.identifierName === routesNode.name);
      if (source) {
        const newConfigPath = getModulePath(configPath, source.modulePath, absSrcPath);
        return getNewRouteCode(newConfigPath, newRoute, absSrcPath);
      }
      throw new Error(`can not find import of ${routesNode.name}`);
    } else {
      // 配置在当前文件 // export default { routes: [] } case 2
      writeRouteNode(routesNode, newRoute);
    }
  } else {
    throw new Error('route array config not found.');
  }
  const code = generateCode(ast);
  debug(code, configPath);
  return { code, routesPath: configPath };
}

function getNewRouteNode(newRoute: any) {
  return (parser.parse(`(${JSON.stringify(newRoute)})`).program.body[0] as any).expression;
}

/**
 * 写入节点
 * @param {*} node 找到的节点
 * @param {*} newRoute 新的路由配置
 */
export function writeRouteNode(targetNode, newRoute: Route, currentPath = '/') {
  debug(`writeRouteNode currentPath newRoute.path: ${newRoute.path} currentPath: ${currentPath}`);
  const { elements } = targetNode;
  const paths: string[] = elements.map(ele => {
    if (!t.isObjectExpression(ele)) {
      return false;
    }
    const { properties } = ele;
    const redirect = properties.find((p: any) => p.key.name === 'redirect');
    if (redirect) {
      return false;
    }
    const pathProp: any = properties.find((p: any) => p.key.name === 'path');
    if (!pathProp) {
      return currentPath;
    }
    let fullPath: string = pathProp.value.value;
    if (fullPath.indexOf('/') !== 0) {
      fullPath = join(currentPath, fullPath);
    }
    return fullPath;
  });
  debug('paths', paths);
  const matchedIndex = paths.findIndex(p => p && newRoute.path.indexOf(winPath(p)) === 0);
  const newNode = getNewRouteNode(newRoute);
  if (matchedIndex === -1) {
    elements.unshift(newNode);
    // return container for test
    return targetNode;
  }
  // matched, insert to children routes
  const matchedEle = elements[matchedIndex];
  const routesProp = matchedEle.properties.find(p => p.key.name === 'routes');
  if (!routesProp) {
    // not find children routes, insert before the matched element
    elements.splice(matchedIndex, 0, newNode);
    return targetNode;
  }
  return writeRouteNode(routesProp.value, newRoute, paths[matchedIndex]);
}

/**
 * 生成代码
 * @param {*} ast
 */
function generateCode(ast) {
  const newCode = generate(ast, {}).code;
  return prettier.format(newCode, {
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
    parser: 'typescript',
  });
}

/**
 * 获取路由配置的真实路径
 * @param {*} modulePath
 */
function getModulePath(configPath: string, modulePath: string, absSrcPath: string) {
  // like @/route.config
  if (/^@\//.test(modulePath)) {
    modulePath = join(absSrcPath, modulePath.replace(/^@\//, ''));
  } else {
    modulePath = join(dirname(configPath), modulePath);
  }
  if (!/\.[j|t]s$/.test(modulePath)) {
    if (existsSync(`${modulePath}.js`)) {
      modulePath = `${modulePath}.js`;
    } else {
      modulePath = `${modulePath}.ts`;
    }
  }
  return modulePath;
}
