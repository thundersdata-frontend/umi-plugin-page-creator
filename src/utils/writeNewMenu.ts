import { writeFileSync, existsSync, readFileSync } from 'fs';
import * as types from '@babel/types';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import prettier from 'prettier';

interface Resource {
  menu: string;
  path: string;
}

export function writeNewMenu(resource: Resource, mockPath: string) {
  const code = getNewMenuCode(resource, mockPath);
  writeFileSync(mockPath, code, 'utf-8');
}

/**
 * 生成权限资源的mock数据，方便系统构建菜单
 * @param resource
 * @param mockPath
 */
function getNewMenuCode(resource: Resource, mockPath: string) {
  const { menu, path } = resource;
  if (existsSync(mockPath)) {
    // 解析文件内容，构建ast
    const ast: types.File = parser.parse(readFileSync(mockPath, 'utf-8'), {
      sourceType: 'module',
      plugins: ['typescript'],
    });

    // 对ast的节点进行处理，在指定的位置插入新节点
    traverse(ast, {
      ObjectExpression({ node, parent }) {
        if (types.isArrayExpression(parent)) {
          return;
        }
        const { properties } = node;
        const property = properties.find(
          p => types.isObjectProperty(p) && types.isIdentifier(p.key) && p.key.name === 'data',
        );
        if (property) {
          // data: []
          const { elements = [] } = (property as types.ObjectProperty)
            .value as types.ArrayExpression;

          if (!menu.includes('/') && !path.substr(1).includes('/') && path.startsWith('/')) {
            // 只是一级目录
            const newNode = (parser.parse(
              `(${JSON.stringify({
                key: path,
                apiUrl: path,
                description: menu,
                children: [],
              })})`,
            ).program.body[0] as any).expression;
            elements.push(newNode);
          } else {
            // 有二级目录
            const menus = menu.split('/').filter(item => item);
            const _paths = path.split('/').filter(item => item);
            const paths = ['/' + _paths[0], !path.startsWith('/') ? '/' + path : path];

            /**
             * 这里的逻辑比较复杂，注释一下：
             * 1. 首先判断一级目录是否存在：
             *    a). 如果不存在，则直接保存整个对象
             *    b). 如果存在，进行第二步判断
             * 2. 二级目录是否存在：
             *    a). 如果不存在，在children最后插入
             */
            const submenu = {
              key: paths[0],
              apiUrl: paths[0],
              description: menus[0],
              children: [
                {
                  key: paths[1],
                  apiUrl: paths[1],
                  description: menus.length === 2 ? menus[1] : menus[0],
                  children: [],
                },
              ],
            };
            const menuItem = {
              key: paths[1],
              apiUrl: paths[1],
              description: menus.length === 2 ? menus[1] : menus[0],
              children: [],
            };

            /**
             * 遍历data的elements（也就是data下的对象(key/apiUrl/description/children)）,
             * elements里面有properties属性，是一个对象。这个对象就是element的键值对
             * 在这个键值对里面找到key.name === submenu.key
             * 如果找到了，说明一级目录存在，如果没有找到，说明以及目录不存在
             * 一级目录存在的情况下，再从这个element的键值对里面去找key.name === 'children'，它也是一个elements，再重复上面的步骤判断二级目录是否存在
             */
            let node = null;
            let childrenNode = null;
            for (const ele of elements) {
              const { properties } = ele as types.ObjectExpression;
              node = properties.find(
                p =>
                  ((p as types.ObjectProperty).value as types.StringLiteral).value === submenu.key,
              );
              if (node) {
                childrenNode = properties.find(
                  p => (p as types.ObjectProperty).key.name === 'children',
                );
              }
            }
            if (!node) {
              // 父菜单也不存在的话，直接把整个结构添加进去
              elements.push(
                (parser.parse(`(${JSON.stringify(submenu)})`).program.body[0] as any).expression,
              );
            } else if (childrenNode) {
              const { elements: childrenElements } = (childrenNode as types.ObjectProperty)
                .value as types.ArrayExpression;
              if (childrenElements.length === 0) {
                childrenElements.push(
                  (parser.parse(`(${JSON.stringify(menuItem)})`).program.body[0] as any).expression,
                );
              } else {
                // 判断要添加的菜单是否已经存在，已经存在的话就不添加
                let existed = false;
                for (const ele of childrenElements) {
                  const { properties } = ele as types.ObjectExpression;
                  node = properties.find(
                    p =>
                      ((p as types.ObjectProperty).value as types.StringLiteral).value ===
                      menuItem.key,
                  );
                  if (node) {
                    existed = true;
                    break;
                  }
                }
                !existed &&
                  childrenElements.unshift(
                    (parser.parse(`(${JSON.stringify(menuItem)})`).program.body[0] as any)
                      .expression,
                  );
              }
            }
          }
        }
      },
    });

    // 根据处理之后的ast生成最终的代码
    const code = generate(ast, {}).code;
    return prettier.format(code, {
      singleQuote: true,
      trailingComma: 'es5',
      printWidth: 100,
      parser: 'typescript',
    });
  }
  return '';
}
