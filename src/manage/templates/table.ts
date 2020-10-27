/*
 * @文件描述: 生成表格页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:14:11
 * @LastEditors: 廖军
 * @LastEditTime: 2020-10-27 14:07:26
 */
import { Store } from 'antd/lib/form/interface';
import { ColumnType } from 'antd/lib/table';
import { generateBreadcrumbs } from './util';

export interface Payload<T> {
  tableConfig: Store;
  columns: ColumnType<T>[];
  initialFetch?: string[];
  menu: string;
  pageName: string;
}

export default function generateTable<T>(payload: Payload<T>): string {
  if (payload && payload.tableConfig && payload.columns) {
    const { tableConfig, columns, initialFetch, menu, pageName } = payload;

    const breadcrumbs = generateBreadcrumbs(menu);
    const columnsStrings = columns.map(config => JSON.stringify(config));

    const code = `
      import React, { useRef } from 'react';
      import { message, Popconfirm, Button } from 'antd';
      import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
      import json from '@/utils/json';
      import { initialPagination } from '@/constant';
      ${breadcrumbs.length > 1 && `import CustomBreadcrumb from '@/components/CustomBreadcrumb';`}
      import LinkButtons from '@/components/LinkButtons';
      import { Store } from 'antd/es/form/interface';
      import FormActionMethods, { FormActionMethodsInstance } from '@/pages/${pageName}/components/FormActionMethods';
      console.log('emptyline');
      export default () => {
        const actionRef = useRef<ActionType>();
        const formActionRef = useRef<FormActionMethodsInstance>({});
        const columns: ProColumns<${initialFetch && initialFetch.length === 3 ? `defs.${initialFetch[0]}.${initialFetch[2].split('-')[2]}` : 'defs.recruitment.PersonResultDTO'}>[] = [${[...columnsStrings, `
          {
            title: '操作',
            dataIndex: 'id',
            align: 'left',
            copyable: false,
            valueType: 'text',
            hideInSearch: true,
            render: (_, row) => (
              <LinkButtons
                buttons={[
                  {
                    name: '查看',
                    key: 'view',
                    onClick: () => formActionRef.current?.onPreview!(row),
                  },
                  {
                    name: '编辑',
                    key: 'edit',
                    onClick: () => formActionRef.current?.onEdit!(row),
                  },
                  {
                    name: '删除',
                    key: 'delete',
                    onClick: () => formActionRef.current?.onDelete!(row),
                  },
                ]}
              />
            ),
          }
        `].join(',')}];
        console.log('emptyline');
        return (
          <>
            <CustomBreadcrumb list={${breadcrumbs}} />
            <ProTable
              actionRef={actionRef}
              request={async ({ current, ...rest }: Store) => {
                delete rest._timestamp;
                const {
                  list,
                  page,
                  total,
                } = await ${initialFetch && initialFetch.length === 3 ? `API.${initialFetch[0]}.${initialFetch[1]}.${initialFetch[2].split('-')[0]}` : 'API.recruitment.person.queryPerson'}.fetch(
                  json.removeEmpty({
                    ...rest,
                    page: current || initialPagination.page,
                    pageSize: rest?.pageSize || initialPagination.pageSize,
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
              rowSelection={{}}
              toolBarRender={(_, { selectedRowKeys = [] }) => [
                ...(selectedRowKeys?.length > 0
                  ? [
                      <Popconfirm
                        key="1"
                        placement="topLeft"
                        title="确定删除?"
                        onConfirm={() => formActionRef.current?.onDeleteBatch!(selectedRowKeys.map(id => +id))}
                        okText="是"
                        cancelText="否"
                      >
                        <Button>删除</Button>
                      </Popconfirm>,
                    ]
                  : []),
                <Button
                  onClick={formActionRef.current?.onAdd}
                  key="add"
                  type="primary"
                >
                  新增
                </Button>,
              ]}
            />
            <FormActionMethods ref={formActionRef} reload={actionRef.current?.reload} />
          </>
        );
      }
    `;
    return code;
  }
  return '';
}
