/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 21:58:39
 * @LastEditors: 廖军
 * @LastEditTime: 2020-10-09 17:03:40
 */
import { Store } from 'antd/lib/form/interface';
import { ColumnType } from 'antd/lib/table';

export type FormItemType =
  | 'input'
  | 'cascader'
  | 'date'
  | 'range'
  | 'time'
  | 'number'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'slider'
  | 'select'
  | 'treeselect'
  | 'upload'
  | 'rate'
  | 'password'
  | 'textarea';

/** 适用于input/date/time/number */
export type FormItemProps = {
  type: FormItemType;
  name: string;
  label: string;
  placeholder?: string | [string, string];
  [key: string]: unknown;
};

export type TemplateType =
  | 'short-form'
  | 'long-form'
  | 'one-column-form-modal'
  | 'two-columns-form-modal'
  | 'short-detail'
  | 'long-detail'
  | 'one-column-detail-modal'
  | 'two-columns-detail-modal'
  | 'table';

export type ShortFormConfig = {
  title: string;
};

export type Template = {
  name: string;
  type: TemplateType;
  image: string;
};

export type AjaxResponse<T> = {
  success: boolean;
  data?: T;
  message: string;
};

export type CardItemProps = {
  title: string;
  formItems: FormItemProps[];
};

/** 导出/导入的json格式 */
export type ConfigProps = {
  formConfig?: Store;
  formItems?: FormItemProps[];
  initialFetch?: string[];
  submitFetch?: string[];
  cards?: CardItemProps[];
  tableConfig?: Store;
  columns?: ColumnType<any>[];
};

/**
 * 表字段验证配置
 */
export interface TableVerificationRuleList {
  appVerificationRuleCode: string;
  tableCode: string;
  tableName: string;
  tableFieldCode: string;
  isRequired: boolean;
  requiredMaxLength: number;
  requiredMinLength: number;
  fieldName: string;
  fieldType: string;
  pattern: string;
}
