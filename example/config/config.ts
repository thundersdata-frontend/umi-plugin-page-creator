/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-07 11:07:13
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-07 11:22:12
 */
import { defineConfig } from 'umi';
import routeConfig from './routeConfig';

export default defineConfig({
  presets: [require.resolve('@umijs/preset-ui')],
  plugins: [require.resolve('../../lib')],
  routes: routeConfig,
});
