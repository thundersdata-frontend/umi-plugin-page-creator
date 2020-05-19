/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 11:29:07
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-18 21:49:20
 */
import { createContext } from 'react';
import { IUiApi } from '@umijs/ui-types';
import { TemplateType } from '../../../interfaces/common';
import { ApiJSON } from '../../../interfaces/api';

const MainContext = createContext({} as {
  /** 主体 */
  api: IUiApi;
  templateType?: TemplateType;
  addTemplate: (templateType: TemplateType) => void;
  databases: ApiJSON[];
});

export default MainContext;
