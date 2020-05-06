/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 11:29:07
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-06 16:25:51
 */
import { createContext } from 'react';
import { IUiApi } from '@umijs/ui-types';

const UIContext = createContext({} as { api: IUiApi });

export default UIContext;
