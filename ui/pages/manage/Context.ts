/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 11:29:07
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-11 15:09:57
 */
import { createContext } from 'react';
import { IUiApi } from '@umijs/ui-types';
import { TemplateType } from '../../interfaces/common';

const MainContext = createContext(
  {} as {
    /** 主体 */
    api: IUiApi;

    templateType?: TemplateType;
    addTemplate: (templateType: TemplateType) => void;
  },
);

export default MainContext;
