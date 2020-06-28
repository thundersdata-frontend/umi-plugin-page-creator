import { IApi } from 'umi';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import prettier from 'prettier';
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
          menu: payload.menu,
        });
        const formattedCode = prettify(removeUnusedImport(code));
        generateFile(
          formattedCode,
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
          menu: payload.formMenu,
        });
        const formattedFormCode = prettify(removeUnusedImport(formCode));
        generateFile(
          formattedFormCode,
          {
            path: payload.formPath,
            menu: payload.formMenu,
          },
          api,
        );

        const detailCode = generateShortDetailCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          initialFetch: payload.initialFetch,
          menu: payload.detailMenu,
        });
        const formattedDetailCode = prettify(removeUnusedImport(detailCode));
        generateFile(
          formattedDetailCode,
          {
            path: payload.detailPath,
            menu: payload.detailMenu,
          },
          api,
          false,
        );
      }
      return true;

    case 'org.umi-plugin-page-creator.shortFormModal':
      if (!payload.generateDetail) {
        code = generateShortFormModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          submitFetch: payload.submitFetch,
          fromTable: payload.fromTable,
        });
        const formattedCode = prettify(removeUnusedImport(code));
        generateFile(
          formattedCode,
          {
            path: payload.path,
            dirName: payload.dirName,
          },
          api,
        );
      } else {
        const formCode = generateShortFormModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          submitFetch: payload.submitFetch,
          fromTable: payload.fromTable,
        });
        const formattedFormCode = prettify(removeUnusedImport(formCode));
        generateFile(
          formattedFormCode,
          {
            path: payload.formPath,
            dirName: payload.formDirName,
          },
          api,
        );

        const detailCode = generateShortDetailModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
        });
        const formattedDetailCode = prettify(removeUnusedImport(detailCode));
        generateFile(
          formattedDetailCode,
          {
            path: payload.detailPath,
            dirName: payload.detailDirName,
          },
          api,
        );
      }
      return true;

    case 'org.umi-plugin-page-creator.longForm':
      if (!payload.generateDetail) {
        code = generateLongFormCode({
          cards: payload.cards,
          initialFetch: payload.initialFetch,
          submitFetch: payload.submitFetch,
          menu: payload.menu,
        });
        const formattedCode = prettify(removeUnusedImport(code));
        generateFile(
          formattedCode,
          {
            path: payload.path,
            menu: payload.menu,
          },
          api,
        );
      } else {
        const formCode = generateLongFormCode({
          cards: payload.cards,
          initialFetch: payload.initialFetch,
          submitFetch: payload.submitFetch,
          menu: payload.formMenu,
        });
        const formattedFormCode = prettify(removeUnusedImport(formCode));
        generateFile(
          formattedFormCode,
          {
            path: payload.formPath,
            menu: payload.formMenu,
          },
          api,
        );

        const detailCode = generateLongDetailCode({
          cards: payload.cards,
          initialFetch: payload.initialFetch,
          menu: payload.detailMenu,
        });
        const formattedDetailCode = prettify(removeUnusedImport(detailCode));
        generateFile(
          formattedDetailCode,
          {
            path: payload.detailPath,
            menu: payload.detailMenu,
          },
          api,
          false,
        );
      }
      return true;

    case 'org.umi-plugin-page-creator.longFormModal':
      if (!payload.generateDetail) {
        code = generateLongFormModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          submitFetch: payload.submitFetch,
          fromTable: payload.fromTable,
        });
        const formattedCode = prettify(removeUnusedImport(code));
        generateFile(
          formattedCode,
          {
            path: payload.path,
            dirName: payload.dirName,
          },
          api,
        );
      } else {
        const formCode = generateLongFormModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          submitFetch: payload.submitFetch,
          fromTable: payload.fromTable,
        });
        const formattedFormCode = prettify(removeUnusedImport(formCode));
        generateFile(
          formattedFormCode,
          {
            path: payload.formPath,
            dirName: payload.formDirName,
          },
          api,
        );

        const detailCode = generateLongDetailModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
        });
        const formattedDetailCode = prettify(removeUnusedImport(detailCode))
        generateFile(
          formattedDetailCode,
          {
            path: payload.detailPath,
            dirName: payload.detailDirName,
          },
          api,
        );
      }
      return true;

    case 'org.umi-plugin-page-creator.shortDetail':
      code = generateShortDetailCode(payload);
      generateFile(code, payload, api, false);
      return true;
    case 'org.umi-plugin-page-creator.shortDetailModal':
      code = generateShortDetailModalCode(payload);
      break;
    case 'org.umi-plugin-page-creator.longDetail':
      code = generateLongDetailCode(payload);
      generateFile(code, payload, api, false);
      return true;
    case 'org.umi-plugin-page-creator.longDetailModal':
      code = generateLongDetailModalCode(payload);
      break;
    case 'org.umi-plugin-page-creator.table':
      code = generateTableCode(payload);
      break;
  }
  const prettifyCode = prettify(removeUnusedImport(code));
  generateFile(prettifyCode, payload, api);
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
  createMenu = true,
) {
  if (payload && payload.path && code) {
    const { path, dirName, menu } = payload;

    if (dirName) {
      generateComponent(path, dirName, code, api);
    } else {
      generatePage(path, code, api, menu, createMenu);
    }
  }
}

/**
 * 生成页面及路由
 * @param absPagesPath
 * @param path
 * @param code
 */
function generatePage(path: string, code: string, api: IApi, menu?: string, createMenu = true) {
  const absPagesPath = api.paths.absPagesPath;
  if (!existsSync(absPagesPath + path)) {
    // 根据传入的路径，创建对应的文件夹以及index.tsx文件
    mkdirSync(absPagesPath + path, { recursive: true });
    writeFileSync(absPagesPath + `${path}/index.tsx`, code, 'utf-8');

    writeNewRoute(
      {
        path,
        component: `.${path}`,
        exact: true,
      },
      api.paths.cwd + '/config/config.ts',
      api.paths.absSrcPath!,
    );

    if (createMenu && menu) {
      if (!existsSync(api.paths.cwd + '/mock')) {
        mkdirSync(api.paths.cwd + '/mock');
      }
      writeNewMenu({ path, menu }, api.paths.cwd + '/mock/route.ts');
    }
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

function prettify(code: string) {
  return prettier.format(code, {
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 120,
    tabWidth: 2,
    parser: 'typescript',
  });
}
