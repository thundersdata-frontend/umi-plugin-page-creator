import { IApi } from 'umi';
import { existsSync, mkdirSync } from 'fs';
import { ScreenConfigPayload } from '../../interfaces/screen';
import generateScreen from './templates/generateScreen';
import generateLayout from './templates/generateLayout';
import generateRow from './templates/generateRow';
import generateCol from './templates/generateCol';
import { execSync } from 'child_process';

/**
 * 生成大屏的一系列文件
 * @param payload
 * @param api
 */
export default function(payload: ScreenConfigPayload, api: IApi) {
  const componentsPath = api.paths.absPagesPath + '/components';
  if (!existsSync(componentsPath)) {
    mkdirSync(componentsPath);
  }

  // 生成大屏的配置
  generateScreen(api.paths.absPagesPath!, payload);

  const { gutter, layout } = payload;

  // 生成布局组件(Left/Center/Right)
  layout.forEach((item) => {
    const {
      name: layoutName,
      rows,
    } = item;

    const layoutPath = componentsPath + '/' + layoutName;
    if (!existsSync(layoutPath)) {
      mkdirSync(layoutPath); // <- 创建布局的文件夹
    }
    generateLayout(layoutPath, item);

    rows.forEach(row => {
      const { name: rowName, cols } = row;

      const rowPath = layoutPath + '/' + rowName;
      if (!existsSync(rowPath)) {
        mkdirSync(rowPath); // <- 创建行的文件夹
      }
      generateRow(rowPath, gutter, row);

      cols.forEach(col => {
        const { name: colName } = col;

        const colPath = rowPath + '/' + colName;
        if (!existsSync(colPath)) {
          mkdirSync(colPath);
        }
        generateCol(colPath, col);
      });
    });
  });
  execSync(`cd ${api.paths.cwd} && npm run eslint:fix --scripts-prepend-node-path`);

  return true;
}
