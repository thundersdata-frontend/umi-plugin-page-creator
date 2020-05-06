/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 11:29:07
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-06 16:22:31
 */
import { createContext } from 'react';
import { IUiApi } from '@umijs/ui-types';
import { TemplateType } from '../../interfaces/common';
import { Store } from 'antd/lib/form/interface';

const MainContext = createContext(
  {} as {
    /** 主体 */
    api: IUiApi;
    templateType?: TemplateType;
    addTemplate: (templateType: TemplateType) => void;

    visible: boolean;
    setVisible: (visible: boolean) => void;

    /** 短表单相关 */
    shortFormConfig: Store;
    addShortFormConfig: (shortFormConfig: Store) => void;

    /** 长表单相关 */

    /** 详情相关 */

    /** Table相关 */
  },
);

export default MainContext;
