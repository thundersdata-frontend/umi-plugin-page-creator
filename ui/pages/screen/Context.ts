/*
 * @文件描述: 
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 11:29:07
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-04-29 11:29:42
 */
import { createContext } from 'react';
import { IUiApi } from 'umi-types';

const UIContext = createContext({} as { api: IUiApi; });

export default UIContext;
