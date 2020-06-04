import { IApi } from 'umi';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import * as types from '@babel/types';
import * as parser from '@babel/parser';
import generate from '@babel/generator';

/**
 * 加载常量文件的内容
 * @param api
 */
export function getConstantConfig(api: IApi) {
  const constantFilePath = api.paths.absSrcPath + '/constant.ts';
  if (!existsSync(constantFilePath)) {
    writeFileSync(constantFilePath, '', 'utf-8');
    return '';
  } else {
    const ast: types.File = parser.parse(readFileSync(constantFilePath, 'utf-8'), {
      sourceType: 'module',
      plugins: ['typescript'],
    });
    return generate(ast, {}).code;
  }
}

/**
 * 保存修改之后的常量配置
 * @param api
 * @param code
 */
export function saveConstantConfig(api: IApi, code: string) {
  const constantFilePath = api.paths.absSrcPath + '/constant.ts';
  writeFileSync(constantFilePath, code, 'utf-8');

  execSync(`cd ${api.paths.cwd} && npm run eslint:fix --scripts-prepend-node-path`);
}
