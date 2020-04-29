/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 11:29:07
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-04-29 17:32:28
 */
import { createContext } from "react";
import { IUiApi } from "umi-types";

export type TemplateType =
  | "login"
  | "register"
  | "short-form"
  | "long-form"
  | "one-column-form-modal"
  | "two-columns-form-modal"
  | "detail"
  | "one-column-detail-modal"
  | "two-columns-detail-modal"
  | "table";

const UIContext = createContext(
  {} as {
    api: IUiApi;
    templateType: TemplateType;
    addTemplate: (templateType: TemplateType) => void;
  }
);

export default UIContext;
