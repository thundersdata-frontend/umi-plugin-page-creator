/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 11:29:07
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-04-30 15:39:30
 */
import { createContext } from "react";
import { IUiApi } from "umi-types";
import { TemplateType, ShortFormConfig } from "ui/interfaces/common";


const MainContext = createContext(
  {} as {
    /** 主体 */
    api: IUiApi;
    templateType: TemplateType;
    addTemplate: (templateType: TemplateType) => void;

    visible: boolean;
    setVisible: (visible: boolean) => void;

    /** 短表单相关 */
    shortFormConfig: ShortFormConfig;
    addShortFormConfig: (shortFormConfig: ShortFormConfig) => void;

    /** 长表单相关 */

    /** 详情相关 */

    /** Table相关 */
  }
);

export default MainContext;
