import { IApi } from 'umi';
import prettier from 'prettier';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import {
  generateShortFormCode,
  generateLongFormCode,
  generateShortDetailCode,
  generateLongDetailCode,
  generateTableCode,
  generateShortFormModalCode,
  generateLongFormModalCode,
  generateShortDetailModalCode,
  generateLongDetailModalCode,
} from './templates';
import { removeUnusedImport } from '../utils/removeUnusedImport';
import { writeNewRoute } from '../utils/writeNewRoute';
import { writeNewMenu } from '../utils/writeNewMenu';

export default function(payload: any, type: string, api: IApi) {
  let code = '';
  switch (type) {
    case 'org.umi-plugin-page-creator.shortForm':
    default:
      code = generateShortFormCode(payload);
      break;
    case 'org.umi-plugin-page-creator.shortFormModal':
      code = generateShortFormModalCode(payload);
      break;
    case 'org.umi-plugin-page-creator.longForm':
      code = generateLongFormCode(payload);
      break;
    case 'org.umi-plugin-page-creator.longFormModal':
      code = generateLongFormModalCode(payload);
      break;
    case 'org.umi-plugin-page-creator.shortDetail':
      code = generateShortDetailCode(payload);
      break;
    case 'org.umi-plugin-page-creator.shortDetailModal':
      code = generateShortDetailModalCode(payload);
      break;
    case 'org.umi-plugin-page-creator.longDetail':
      code = generateLongDetailCode(payload);
      break;
    case 'org.umi-plugin-page-creator.longDetailModal':
      code = generateLongDetailModalCode(payload);
      break;
    case 'org.umi-plugin-page-creator.table':
      code = generateTableCode(payload);
      break;
  }
  const removeUnusedImportCode = removeUnusedImport(code);
  const formattedCode = prettier.format(removeUnusedImportCode, {
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
    parser: 'typescript',
  });
  if (formattedCode) {
    return generateFile(formattedCode, payload, api);
  }
  return false;
}
/**
 * 生成文件
 * @param code
 * @param payload
 */
function generateFile(code: string, payload: { path: string; menu?: string; dirName?: string }, api: IApi) {
  if (payload && payload.path && code) {
    const { path, dirName, menu } = payload;

    if (dirName) {
      return generateComponent(path, dirName, code, api);
    }
    return generatePage(path, menu!, code, api);
  }
  return false;
}

/**
 * 生成页面及路由
 * @param absPagesPath
 * @param path
 * @param code
 */
function generatePage(path: string, menu: string, code: string, api: IApi) {
  const absPagesPath = api.paths.absPagesPath;
  if (!existsSync(absPagesPath + path)) {
    // 根据传入的路径，创建对应的文件夹以及index.tsx文件
    mkdirSync(absPagesPath + path, { recursive: true });
    writeFileSync(absPagesPath + `${path}/index.tsx`, code, 'utf-8');
    // 更新路由
    writeNewRoute(
      {
        path,
        component: `.${path}`,
        exact: true,
      },
      api.paths.cwd + '/config/config.ts',
      api.paths.absSrcPath!,
    );
    // 更新菜单
    if (!existsSync(api.paths.cwd + '/mock')) {
      mkdirSync(api.paths.cwd + '/mock');
    }
    writeNewMenu({ path, menu }, api.paths.cwd + '/mock/route.ts');
    return true;
  }
  return false;
}

/**
 * 生成页面下的组件。创建的组件应该自动在某个page的components文件夹下
 * 1. 先判断/path下的components文件夹是否存在，如果存在则直接追加，如果不存在则先创建
 * @param absPagesPath
 * @param path
 * @param dirName
 * @param code
 */
function generateComponent(path: string, dirName: string, code: string, api: IApi) {
  const absPagesPath = api.paths.absPagesPath;
  if (!existsSync(absPagesPath + path + '/components')) {
    mkdirSync(absPagesPath + path + '/components', { recursive: true });
  }
  const prefixPath = absPagesPath + path + '/components/';
  if (!existsSync(prefixPath + dirName)) {
    mkdirSync(prefixPath + dirName, { recursive: true });
    writeFileSync(prefixPath + `${dirName}/index.tsx`, code, 'utf-8');

    return true;
  }
  return false;
}
