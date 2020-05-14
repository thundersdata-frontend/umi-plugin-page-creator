/*
 * @文件描述: 生成表格页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:14:11
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-14 11:55:21
 */
import { Store } from 'antd/lib/form/interface';
import { ColumnType } from 'antd/lib/table';
import { generatePropsStr } from './util';

export interface Payload<T> {
  tableConfig: Store;
  columns: ColumnType<T>[];
}

export default function generateTable<T>(payload: Payload<T>): string {
  if (payload && payload.tableConfig && payload.columns) {
    const { tableConfig, columns } = payload;

    const code = `
      import React, { useRef } from 'react';
      import { PlusOutlined } from '@ant-design/icons';
      import { Button, Tag } from 'antd';
      import ProTable, { ProColumns, TableDropdown, ActionType } from '@ant-design/pro-table';
      import { request } from 'umi';

      export default () => {
        const actionRef = useRef<ActionType>();
        const columns: ProColumns<T>[] = ${columns
          .map(column => generatePropsStr(column))
          .join(',')}

        return (
          <ProTable<T>
            actionRef={actionRef}
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
