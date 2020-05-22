/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 10:38:23
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-22 17:21:04
 */
// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from '@umijs/types';
import { join } from 'path';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { AjaxResponse } from '../interfaces/common';
import prettier from 'prettier';
import { writeNewRoute } from './utils/writeNewRoute';
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
} from './generate';
import { ApiJSON } from '../interfaces/api';

export default function (api: IApi) {
  let mods = [];

  // @ts-ignore
  api.addUIPlugin(() => join(__dirname, '../dist/index.umd.js'));

  // @ts-ignore
  api.onUISocket(({ action, failure, success }) => {
    const { type, payload = {} } = action;
    const { fetchApiJson = false } = payload;
    if (!fetchApiJson) {
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
      const formattedCode = prettier.format(code, {
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 100,
        parser: 'typescript',
      });
      formattedCode && generateFile(formattedCode, payload, failure, success);
    } else {
      switch (type) {
        case 'org.umi-plugin-page-creator.apiGenerator':
        default:
          const { databases, mods: apiMods, baseClasses } = generateApiBaseOnApiLockJson();
          if (databases === null || apiMods === null) {
            failure({
              success: false,
              databases: null,
            });
          } else {
            mods = apiMods;
            success({
              success: true,
              databases,
              baseClasses,
              apiMods,
            });
          }
      }
    }
  });

  /**
   * 生成文件
   * @param code
   * @param payload
   * @param failure
   * @param success
   */
  function generateFile(
    code: string,
    payload: { path: string; route?: boolean; dirName?: string },
    failure: (data: AjaxResponse<null>) => void,
    success: (data: AjaxResponse<null>) => void,
  ) {
    if (payload && payload.path && code) {
      const { path, dirName } = payload;

      if (dirName) {
        generateComponent(path, dirName, code, failure, success);
      } else {
        generatePage(path, code, failure, success);
      }
    }
  }

  /**
   * 生成页面及路由
   * @param absPagesPath
   * @param path
   * @param code
   * @param failure
   * @param success
   */
  function generatePage(
    path: string,
    code: string,
    failure: (data: AjaxResponse<null>) => void,
    success: (data: AjaxResponse<null>) => void,
  ) {
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
      success({ success: true, message: '恭喜你，文件创建成功' });
    } else {
      failure({ success: false, message: '对不起，目录已存在' });
    }
  }

  /**
   * 生成页面下的组件。创建的组件应该自动在某个page的components文件夹下
   * 1. 先判断/path下的components文件夹是否存在，如果存在则直接追加，如果不存在则先创建
   * @param absPagesPath
   * @param path
   * @param dirName
   * @param code
   * @param failure
   * @param success
   */
  function generateComponent(
    path: string,
    dirName: string,
    code: string,
    failure: (data: AjaxResponse<null>) => void,
    success: (data: AjaxResponse<null>) => void,
  ) {
    const absPagesPath = api.paths.absPagesPath;
    if (!existsSync(absPagesPath + path + '/components')) {
      mkdirSync(absPagesPath + path + '/components', { recursive: true });
    }
    const prefixPath = absPagesPath + path + '/components/';
    if (!existsSync(prefixPath + dirName)) {
      mkdirSync(prefixPath + dirName, { recursive: true });
      writeFileSync(prefixPath + `${dirName}/index.tsx`, code, 'utf-8');

      success({ success: true, message: '恭喜你，文件创建成功' });
    } else {
      failure({ success: false, message: '对不起，目录已存在' });
    }
  }

  /**
   * 根据项目根目录下的services/api-lock.json，生成一个接口和声明的关联文件。
   * 在UI侧选择某个接口，
   */
  function generateApiBaseOnApiLockJson() {
    const jsonPath = api.paths.absSrcPath + '/services/api-lock.json';
    if (!existsSync(jsonPath)) {
      return {
        databases: null,
        mods: null,
        baseClasses: null,
      };
    }
    const apiJson: ApiJSON[] = require(jsonPath);

    const databases = apiJson.map(db => ({
      label: db.name,
      value: db.name,
      children: db.mods.map(mod => ({
        label: mod.description,
        value: mod.name,
        children: mod.interfaces.map(({ name, response, description, method, parameters }) => {
          // 提交表单数据时的DTO
          const paramsName = parameters.find(param => param.in === 'body')?.dataType.typeName;
          // 获取数据时的DTO
          let responseName;
          if (response.typeArgs.length > 0) {
            responseName = response.typeArgs.find(arg => arg.isDefsType)?.typeName;
          } else {
            if (response.isDefsType) {
              responseName = response.typeName;
            }
          }
          return {
            label: `${description}(${method})`,
            value: `${name}-${paramsName}-${responseName}`,
          }
        }),
      })),
    }));

    const mods = apiJson.reduce(
      (accu, curr) =>
        accu.concat(curr.mods.map(mod => ({
          name: mod.name,
          description: mod.description,
          dbId: curr.name,
        })) as []),
      [],
    );

    const baseClasses = apiJson.reduce(
      (accu, curr) =>
        accu.concat(curr.baseClasses.map(mod => ({
          name: mod.name,
          dbId: curr.name,
          description: mod.description || '',
          properties: mod.properties.map(prop => ({
            label: prop.description,
            value: prop.name,
            required: prop.required,
          })),
        })) as []),
      [],
    );

    return {
      databases,
      mods,
      baseClasses,
    };
  }
}
