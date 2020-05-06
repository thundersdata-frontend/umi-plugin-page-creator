/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 10:38:23
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-06 20:13:23
 */
// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from '@umijs/types';
import { join } from 'path';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { Store } from 'antd/lib/form/interface';
import { FormItemProps, AjaxResponse } from '../ui/interfaces/common';
import prettier from 'prettier';

interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
  path: string;
}

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
    }
    generateFile(code, payload, failure, success);
  });

  /**
   * 将前端传来的数据组装成一个大的字符串。
   * @param payload
   */
  function generateShortFormCode(payload: Payload): string {
    const code = `
      import React from 'react';
    `;
    return prettier.format(code, {
      singleQuote: true,
      trailingComma: 'es5',
      printWidth: 100,
      parser: 'typescript',
    });
  }

  /**
   * 将前端传来的数据组装成一个大的字符串，并输出成文件到指定的目录。
   * 文件生成好之后，需要同步更新路由，并重启服务
   * @param code
   * @param payload
   * @param failure
   * @param success
   */
  function generateFile(
    code: string,
    payload: Payload,
    failure: (data: AjaxResponse<null>) => void,
    success: (data: AjaxResponse<null>) => void,
  ) {
    if (payload && payload.formConfig && payload.formItems && payload.path) {
      const { formConfig, formItems, path } = payload;
      console.log(formConfig, formItems);

      const absPagesPath = api.paths.absPagesPath;
      if (!existsSync(absPagesPath + path)) {
        // 根据传入的路径，创建对应的文件夹以及index.tsx文件
        mkdirSync(absPagesPath + path);
        writeFileSync(absPagesPath + `${path}/index.tsx`, code, 'utf-8');

        // 更新路由

        success({ success: true, message: '恭喜你，文件创建成功' });
      } else {
        failure({ success: false, message: '对不起，目录已存在' });
      }
    }
  }
}
