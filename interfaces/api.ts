/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-18 21:18:11
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-22 15:29:38
 */

/** api-lock.json的结构 */
export interface ApiJSON {
  name: string;
  mods: ApiMod[];
  baseClasses: ApiClass[];
}

/** 模块 */
export interface ApiMod {
  name: string;
  description: string;
  interfaces: ApiInterface[];
}

/** 模块下的接口 */
export interface ApiInterface {
  consumes: string[];
  description: string;
  name: string;
  method: string;
  path: string;
  response: DataType;
  parameters: ApiProperty[];
}

export interface DataType {
  typeArgs: DataType[];
  typeName: string;
  isDefsType: boolean;
}

export interface ApiProperty {
  in?: string;
  description: string;
  name: string;
  required: boolean;
  dataType: DataType;
}

export interface ApiClass {
  name: string;
  properties: ApiProperty[];
  description?: string;
  required: boolean;
}

export interface BaseClass {
  name: string;
  dbId: string;
  description: string;
  properties: {
    label: string;
    value: string;
    required: boolean;
  }[];
}
