/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-01 18:11:49
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-06 16:34:22
 */
import fs from 'fs';
import { join } from 'path';
import { utils } from 'umi';

const { winPath } = utils;

export interface TreeData {
  title: string;
  value: string;
  key: string;
  children?: TreeData[];
}

/**
 * 遍历文件地址
 * @param path
 */
export const getFolderTreeData = (
  path: string,
  parentPath: string = '/',
  depth: number = 0,
): TreeData[] => {
  const files = fs.readdirSync(winPath(path));
  return files
    .map((fileName: string) => {
      const status = fs.statSync(join(path, fileName));
      // 是文件夹 并且不已 . 开头, 且最深三层
      if (status.isDirectory() && fileName.indexOf('.') !== 0 && depth < 3) {
        const absPath = winPath(join(path, fileName));
        const absPagePath = winPath(join(parentPath, fileName));
        const children = getFolderTreeData(absPath, absPagePath, depth + 1);
        if (children && children.length > 0) {
          return {
            key: absPagePath,
            title: fileName,
            value: absPagePath,
            children,
          } as TreeData;
        }
        return {
          title: fileName,
          value: absPagePath,
          key: absPagePath,
        } as TreeData;
      }
      return undefined;
    })
    .filter(item => item !== undefined) as TreeData[];
};

/**
 * 遍历文件地址
 * 包含文件
 * @param path
 */
export const getFilesTreeData = (
  path: string,
  parentPath: string = '/',
  depth: number = 0,
): TreeData[] => {
  const files = fs.readdirSync(winPath(path));
  return files
    .map((fileName: string) => {
      const status = fs.statSync(join(path, fileName));
      const isDirectory = status.isDirectory();
      // 是文件夹 并且不已 . 开头, 且最深五层
      if (fileName.indexOf('.') !== 0 && depth < 5) {
        if (
          !isDirectory &&
          !fileName.includes('.tsx') &&
          !fileName.includes('.jsx') &&
          !fileName.includes('.js') &&
          !fileName.includes('.ts')
        ) {
          return undefined;
        }
        const absPath = winPath(join(path, fileName));
        const absPagePath = winPath(join(parentPath, fileName));
        const children = isDirectory ? getFilesTreeData(absPath, absPagePath, depth + 1) : [];
        return {
          selectable: !isDirectory,
          key: absPagePath,
          title: fileName,
          value: absPagePath,
          children,
        };
      }
      return undefined;
    })
    .filter(obj => obj) as TreeData[];
};
