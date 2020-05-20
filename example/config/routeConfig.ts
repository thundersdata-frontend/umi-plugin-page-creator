/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-07 11:41:44
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-20 12:04:03
 */
export default [
  {
    path: '/user',
    component: '../layouts/LoginLayout',
    routes: [
      {
        path: '/user/login',
        component: './login',
        title: '登录',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/homepage',
        component: './index',
      },
      {
        path: '/',
        redirect: '/homepage',
      },
      {
        path: '*',
        component: './404',
      },
    ],
  },
];
