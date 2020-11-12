import { IApi } from 'umi';
import { writeFileSync, mkdirSync, existsSync, appendFileSync, unlinkSync } from 'fs';
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
  generateFormActionMethodsCode,
  generateFormActionMethodsModalCode,
} from './templates';
import { removeUnusedImport } from '../utils/removeUnusedImport';
import { writeNewRoute } from '../utils/writeNewRoute';
import { writeNewMenu } from '../utils/writeNewMenu';
import { TableVerificationRuleList } from '../../interfaces/common';

export default function(payload: any, type: string, api: IApi) {
  let code = '';
  const pageName = getPageNameByPath(payload.path || payload.formPath);
  switch (type) {
    case 'org.umi-plugin-page-creator.shortForm':
    default:
      generateValidatorFile(api, pageName, []);
      if (!payload.generateDetail) {
        code = generateShortFormCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          initialFetch: payload.initialFetch,
          submitFetch: payload.submitFetch,
          menu: payload.menu,
          path: payload.path,
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
          path: payload.formPath,
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
      // 生成供table使用的中间组件
      pageName &&
        generateComponent(
          `/${pageName}`,
          'FormActionMethods',
          prettify(
            generateFormActionMethodsCode({
              pageName,
              initialFetch: payload.initialFetch,
              generateDetail: payload.generateDetail,
            }),
          ),
          api,
        );
      return true;

    case 'org.umi-plugin-page-creator.shortFormModal':
      generateValidatorFile(api, pageName, []);
      if (!payload.generateDetail) {
        code = generateShortFormModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          submitFetch: payload.submitFetch,
          fromTable: payload.fromTable,
          path: payload.path,
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
          path: payload.formPath,
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
      // 生成供table使用的中间组件
      pageName &&
        generateComponent(
          `/${pageName}`,
          'FormActionMethods',
          prettify(
            generateFormActionMethodsModalCode({
              initialFetch: payload.initialFetch,
              generateDetail: payload.generateDetail,
            }),
          ),
          api,
        );
      return true;

    case 'org.umi-plugin-page-creator.longForm':
      generateValidatorFile(api, pageName, []);
      if (!payload.generateDetail) {
        code = generateLongFormCode({
          cards: payload.cards,
          initialFetch: payload.initialFetch,
          submitFetch: payload.submitFetch,
          menu: payload.menu,
          path: payload.path,
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
          path: payload.path,
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
      // 生成供table使用的中间组件
      pageName &&
        generateComponent(
          `/${pageName}`,
          'FormActionMethods',
          prettify(
            generateFormActionMethodsCode({
              pageName,
              initialFetch: payload.initialFetch,
              generateDetail: payload.generateDetail,
            }),
          ),
          api,
        );
      return true;

    case 'org.umi-plugin-page-creator.longFormModal':
      generateValidatorFile(api, pageName, []);
      if (!payload.generateDetail) {
        code = generateLongFormModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          submitFetch: payload.submitFetch,
          fromTable: payload.fromTable,
          path: payload.path,
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
          path: payload.formPath,
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
      // 生成供table使用的中间组件
      pageName &&
        generateComponent(
          `/${pageName}`,
          'FormActionMethods',
          prettify(
            generateFormActionMethodsModalCode({
              initialFetch: payload.initialFetch,
              generateDetail: payload.generateDetail,
            }),
          ),
          api,
        );
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
      // 生成供table使用的中间组件，仅在不存在该文件时生成，主要通过表单配置生成，这里为了防止table页面引用报错
      pageName &&
        !existsSync(`${api.paths.absPagesPath}/${pageName}/components/FormActionMethods`) &&
        generateComponent(
          `/${pageName}`,
          'FormActionMethods',
          prettify(
            generateFormActionMethodsCode({
              pageName,
              initialFetch: payload.initialFetch,
              generateDetail: payload.generateDetail,
            }),
          ),
          api,
        );
      code = generateTableCode({ ...payload, pageName });
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
export function generateFile(
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
export function generatePage(path: string, code: string, api: IApi, menu = '', createMenu = true) {
  const absPagesPath = api.paths.absPagesPath;
  if (!existsSync(absPagesPath + path)) {
    // 根据传入的路径，创建对应的文件夹以及index.tsx文件
    mkdirSync(absPagesPath + path, { recursive: true });
    writeFileSync(absPagesPath + `${path}/index.tsx`, code, 'utf-8');

    const title = menu.includes('/') ? menu.split('/').pop() : menu;
    writeNewRoute(
      {
        path,
        component: `.${path}`,
        exact: true,
        title,
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
  } else {
    // 如果该页面文件已存在，重新写入
    const filePath = absPagesPath + `${path}/index.tsx`;
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
    writeFileSync(filePath, code, 'utf-8');
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
export function generateComponent(path: string, dirName: string, code: string, api: IApi) {
  const absPagesPath = api.paths.absPagesPath;
  if (!existsSync(absPagesPath + path + '/components')) {
    mkdirSync(absPagesPath + path + '/components', { recursive: true });
  }
  const prefixPath = absPagesPath + path + '/components/';
  if (!existsSync(prefixPath + dirName)) {
    mkdirSync(prefixPath + dirName, { recursive: true });
    writeFileSync(prefixPath + `${dirName}/index.tsx`, code, 'utf-8');
  } else {
    // 如果该组件文件已存在，重新写入
    const filePath = prefixPath + `${dirName}/index.tsx`;
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
    writeFileSync(filePath, code, 'utf-8');
  }
}

export function prettify(code: string) {
  if (code) {
    return prettier.format(code.replace(/console\.log\(\'emptyline\'\)\;/g, ''), {
      semi: true,
      singleQuote: true,
      trailingComma: 'all',
      printWidth: 120,
      tabWidth: 2,
      parser: 'typescript',
    });
  }
  return '';
}

/**
 * 生成表单验证文件
 * @param api
 * @param pageName
 * @param tableVerificationRuleList
 */
export function generateValidatorFile(
  api: IApi,
  pageName: string,
  tableVerificationRuleList: TableVerificationRuleList[],
) {
  if (!pageName) {
    return;
  }
  const pagePath = `${api.paths.absPagesPath}/${pageName}`;
  const generatePath = `${pagePath}/validators.ts`;
  const getMaxLengthValidator = (maxLength: number = 0) =>
    maxLength > 0
      ? `{
          validator: (_: unknown, value: string, callback: (message?: string) => void) => {
            if (value && value.length > ${maxLength}) {
              callback('超出最大长度限制');
            } else {
              callback();
            }
        },`
      : '';
  const getMinLengthValidator = (minLength: number = 0) =>
    minLength > 0
      ? `{
          validator: (_: unknown, value: string, callback: (message?: string) => void) => {
            if (value && value.length < ${minLength}) {
              callback('小于最小长度限制');
            } else {
              callback();
            }
        },`
      : '';
  const code = `
  import { Rule } from 'antd/es/form';

  /**
   * 表单配置的规则
   */
  export const VERIFICATION_RULE = {
    ${tableVerificationRuleList
      .map(
        ({
          fieldName,
          isRequired = false,
          requiredMaxLength,
          requiredMinLength,
          pattern,
        }) => `${fieldName}: {
          required: ${isRequired},${
          requiredMaxLength ? `requiredMaxLength: ${requiredMaxLength},` : ''
        }
      rules: [
        {
          required: ${isRequired},
        },${pattern ? `{ pattern: new RegExp(${pattern})},` : ''}${getMaxLengthValidator(
          requiredMaxLength,
        )}${getMinLengthValidator(requiredMinLength)}
      ],
    },`,
      )
      .join('\n')}
  }

  /**
   * 根据字段获取对应的校验内容
   */
  export const getVerificationRules = (fileName: string) =>
    (VERIFICATION_RULE[fileName] || {
      rules: [],
    }) as {
      required?: boolean;
      requiredMaxLength?: number;
      rules: Rule[];
    };
  `;
  // 如果该page文件还没生成，则先生成一个文件夹
  if (!existsSync(pagePath)) {
    mkdirSync(pagePath);
  }
  reWriteFile(generatePath, prettify(code));
}

/**
 * 重写file
 * @param path
 * @param content
 */
export function reWriteFile(path: string, content: string) {
  if (existsSync(path)) {
    writeFileSync(path, content, 'utf8');
  } else {
    appendFileSync(path, content, 'utf8');
  }
}

/**
 * 根据路径获取pageName
 * @param path
 */
export function getPageNameByPath(path: string = '') {
  const paths = path.split('/');
  return paths[0] || paths[1];
}
