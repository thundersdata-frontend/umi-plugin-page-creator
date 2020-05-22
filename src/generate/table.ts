/*
 * @文件描述: 生成表格页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:14:11
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-22 17:05:17
 */
import { Store } from 'antd/lib/form/interface';
import { ColumnType } from 'antd/lib/table';
import { generatePropsStr } from './util';

export interface Payload<T> {
  tableConfig: Store;
  columns: ColumnType<T>[];
  initialFetch?: string[];
}

export default function generateTable<T>(payload: Payload<T>): string {
  if (payload && payload.tableConfig && payload.columns) {
    const { tableConfig, columns, initialFetch } = payload;

    const code = `
      import React, { useRef } from 'react';
      import { message } from 'antd';
      import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

      export default () => {
        const actionRef = useRef<ActionType>();
        const columns: ProColumns[] = ${JSON.stringify(columns)};

        return (
          <ProTable
            actionRef={actionRef}
            ${
              initialFetch && initialFetch.length > 0
                ? `request={API.${initialFetch[0]}.${initialFetch[1]}.${initialFetch[2].split('-')[0]}.fetch}`
                : ''
            }
            onRequestError={error => {
              console.error(error.message);
              message.error('数据加载失败');
            }}
            columns={columns}
            bordered={${!!tableConfig.bordered}}
            search={${!!tableConfig.search}}
            rowKey=""
            pagination={{
              size: 'default'
            }}
            dateFormatter="string"
            headerTitle="${tableConfig.headerTitle}"
            tableAlertRender={false}
          />
        );
      }
    `;
    return code;
  }
  return '';
}
