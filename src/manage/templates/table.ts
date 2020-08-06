/*
 * @文件描述: 生成表格页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:14:11
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-25 09:48:50
 */
import { Store } from 'antd/lib/form/interface';
import { ColumnType } from 'antd/lib/table';
import { generateBreadcrumbs } from './util';

export interface Payload<T> {
  tableConfig: Store;
  columns: ColumnType<T>[];
  initialFetch?: string[];
  menu: string;
}

export default function generateTable<T>(payload: Payload<T>): string {
  if (payload && payload.tableConfig && payload.columns) {
    const { tableConfig, columns, initialFetch, menu } = payload;

    const breadcrumbs = generateBreadcrumbs(menu);

    const code = `
      import React, { useRef } from 'react';
      import { message } from 'antd';
      import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
      import json from '@/utils/json';
      import { initialPagination } from '@/constant';
      ${breadcrumbs.length > 1 && `import CustomBreadcrumb from '@/components/CustomBreadcrumb';`}
      console.log('emptyline');
      export default () => {
        const actionRef = useRef<ActionType>();
        const columns: ProColumns<${initialFetch && initialFetch.length === 3 ? `defs.${initialFetch[0]}.${initialFetch[2].split('-')[2]}` : 'defs.recruitment.PersonResultDTO'}>[] = ${JSON.stringify(columns)};
        console.log('emptyline');
        return (
          <>
            <CustomBreadcrumb list={${breadcrumbs}} />
            <ProTable
              actionRef={actionRef}
              request={async params => {
                const {
                  list,
                  page,
                  total,
                } = await ${initialFetch && initialFetch.length === 3 ? `API.${initialFetch[0]}.${initialFetch[1]}.${initialFetch[2].split('-')[0]}` : 'API.recruitment.person.queryPerson'}.fetch(
                  json.removeEmpty({
                    ...params,
                    page: params?.current || initialPagination.page,
                    pageSize: params?.pageSize || initialPagination.pageSize,
                  })
                );
                return {
                  success: true,
                  data: list || [],
                  page,
                  total,
                };
              }}
              columns={columns}
              rowKey="${tableConfig.rowKey}"
              headerTitle="${tableConfig.headerTitle}"
            />
          </>
        );
      }
    `;
    return code;
  }
  return '';
}
