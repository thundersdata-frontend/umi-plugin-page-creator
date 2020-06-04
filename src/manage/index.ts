import { IApi } from 'umi';
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
      if (!payload.generateDetail) {
        code = generateShortFormCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          initialFetch: payload.initialFetch,
          submitFetch: payload.submitFetch,
        });
        generateFile(
          removeUnusedImport(code),
          {
            path: payload.path,
            menu: payload.menu,
          },
          api,
        );
      } else {
        const formCode = generateShortFormCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          initialFetch: payload.initialFetch,
          submitFetch: payload.submitFetch,
        });
        generateFile(removeUnusedImport(formCode), {
          path: payload.formPath,
          menu: payload.formMenu,
        }, api);

        const detailCode = generateShortDetailCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          initialFetch: payload.initialFetch,
        });
        generateFile(removeUnusedImport(detailCode), {
          path: payload.detailPath,
          menu: payload.detailMenu
        }, api);
      }
      return true;

    case 'org.umi-plugin-page-creator.shortFormModal':
      if (!payload.generateDetail) {
        code = generateShortFormModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          submitFetch: payload.submitFetch,
        });
        generateFile(removeUnusedImport(code), {
          path: payload.path,
        dirName: payload.dirName
        }, api);
      } else {
        const formCode = generateShortFormModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          submitFetch: payload.submitFetch,
        });
        generateFile(removeUnusedImport(formCode), {
          path: payload.formPath,
          dirName: payload.formDirName,
        }, api);

        const detailCode = generateShortDetailModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
        });
        generateFile(removeUnusedImport(detailCode), {
          path: payload.detailPath,
          dirName: payload.detailDirName,
        }, api);
      }
      return true;

    case 'org.umi-plugin-page-creator.longForm':
      if (!payload.generateDetail) {
        code = generateLongFormCode({
          cards: payload.cards,
          initialFetch: payload.initialFetch,
          submitFetch: payload.submitFetch,
        });
        generateFile(removeUnusedImport(code), {
          path: payload.path,
          menu: payload.menu,
        }, api);
      } else {
        const formCode = generateLongFormCode({
          cards: payload.cards,
          initialFetch: payload.initialFetch,
          submitFetch: payload.submitFetch,
        });
        generateFile(removeUnusedImport(formCode), {
          path: payload.formPath,
          menu: payload.formMenu,
        }, api);

        const detailCode = generateLongDetailCode({
          cards: payload.cards,
          initialFetch: payload.initialFetch,
        });
        generateFile(removeUnusedImport(detailCode), {
          path: payload.detailPath,
          menu: payload.detailMenu,
        }, api);
      }
      return true;

    case 'org.umi-plugin-page-creator.longFormModal':
      if (!payload.generateDetail) {
        code = generateLongFormModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          submitFetch: payload.submitFetch,
        });
        generateFile(removeUnusedImport(code), {
          path: payload.path,
          dirName: payload.dirName,
        }, api);
      } else {
        const formCode = generateLongFormModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          submitFetch: payload.submitFetch,
        });
        generateFile(removeUnusedImport(formCode), {
          path: payload.formPath,
          dirName: payload.formDirName,
        }, api);

        const detailCode = generateLongDetailModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
        });
        generateFile(removeUnusedImport(detailCode), {
          path: payload.detailPath,
          dirName: payload.detailDirName,
        }, api);
      }
      return true;

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
  if (removeUnusedImportCode) {
    generateFile(removeUnusedImportCode, payload, api);
  }
  return true;
}
/**
 * 生成文件
 * @param code
 * @param payload
 */
function generateFile(
  code: string,
  payload: { path: string; menu?: string; dirName?: string },
  api: IApi,
) {
  if (payload && payload.path && code) {
    const { path, dirName, menu } = payload;

    if (dirName) {
      generateComponent(path, dirName, code, api);
    } else {
      generatePage(path, menu!, code, api);
    }
  }
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
  }
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
  }
}
