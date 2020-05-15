/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 10:38:23
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-15 10:16:13
 */
// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from '@umijs/types';
import { join } from 'path';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { AjaxResponse } from '../ui/interfaces/common';
import prettier from 'prettier';
import { writeNewRoute } from './utils/writeNewRoute';
import {
  generateShortFormCode,
  generateLongFormCode,
  generateShortDetailCode,
  generateLongDetailCode,
  generateTableCode,
} from './generate';

export default function(api: IApi) {
  // @ts-ignore
  api.addUIPlugin(() => join(__dirname, '../dist/index.umd.js'));

  // @ts-ignore
  api.onUISocket(({ action, failure, success }) => {
    const { type, payload } = action;
    let code = '';
    switch (type) {
      case 'org.umi-plugin-page-creator.shortForm':
      default:
        code = generateShortFormCode(payload);
        break;
      case 'org.umi-plugin-page-creator.longForm':
        code = generateLongFormCode(payload);
        break;
      case 'org.umi-plugin-page-creator.shortDetail':
        code = generateShortDetailCode(payload);
        break;
      case 'org.umi-plugin-page-creator.longDetail':
        code = generateLongDetailCode(payload);
        break;
      case 'org.umi-plugin-page-creator.table':
        code = generateTableCode(payload);
        break;
    }
    const formattedCode = prettier.format(code, {
      singleQuote: true,
      trailingComma: 'es5',
      printWidth: 100,
      parser: 'typescript',
    });
    formattedCode && generateFile(formattedCode, payload, failure, success);
  });

  /**
   * 生成文件，然后更新路由，并重启服务
   * @param code
   * @param payload
   * @param failure
   * @param success
   */
  function generateFile(
    code: string,
    payload: { path: string },
    failure: (data: AjaxResponse<null>) => void,
    success: (data: AjaxResponse<null>) => void,
  ) {
    if (payload && payload.path && code) {
      const { path } = payload;

      const absPagesPath = api.paths.absPagesPath;
      if (!existsSync(absPagesPath + path)) {
        // 根据传入的路径，创建对应的文件夹以及index.tsx文件
        mkdirSync(absPagesPath + path);
        writeFileSync(absPagesPath + `${path}/index.tsx`, code, 'utf-8');

        // 更新路由
        writeNewRoute(
          {
            path,
            component: `.${path}`,
            exact: true,
          },
          api.paths.cwd + '/config/config.ts',
          api.paths.absSrcPath,
        );

        success({ success: true, message: '恭喜你，文件创建成功' });
      } else {
        failure({ success: false, message: '对不起，目录已存在' });
      }
    }
  }
}
