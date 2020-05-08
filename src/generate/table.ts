/*
 * @文件描述: 生成表格页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:14:11
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-08 16:17:20
 */
import { Store } from 'antd/lib/form/interface';
import { FormItemProps } from '@/interfaces/common';
import { createFormComponentsByType } from './util';

export interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
}

export default function generateTable(payload: Payload): string {
  if (payload && payload.formConfig && payload.formItems) {
    const { formConfig, formItems } = payload;

    const code = `
      import React from 'react';
      import { PlusOutlined } from '@ant-design/icons';
      import { Button, Tag } from 'antd';
      import ProTable, { ProColumns, TableDropdown } from '@ant-design/pro-table';
      import { request } from 'umi';

      export default () => {
        const columns: ProColumns<GithubIssueItem>[] = [
          {
            title: '标题',
            dataIndex: 'title',
            copyable: true,
            ellipsis: true,
            width: 200,
            hideInSearch: true,
          },
          {
            title: '状态',
            dataIndex: 'state',
            initialValue: 'all',
            valueEnum: {
              all: { text: '全部', status: 'Default' },
              open: {
                text: '未解决',
                status: 'Error',
              },
              closed: {
                text: '已解决',
                status: 'Success',
              },
            },
          },
          {
            title: '标签',
            dataIndex: 'labels',
            width: 120,
            render: (_, row) =>
              row.labels.map(({ name, id, color }) => (
                <Tag
                  key={id}
                  style={{
                    margin: 4,
                  }}
                >
                  {name}
                </Tag>
              )),
          },
          {
            title: '创建时间',
            key: 'since',
            dataIndex: 'created_at',
            valueType: 'dateTime',
          },
          {
            title: 'option',
            valueType: 'option',
            dataIndex: 'id',
            render: (_, row) => [
              <a key="1" href={row.html_url} target="_blank" rel="noopener noreferrer">
                查看
              </a>,
              <TableDropdown
                key="2"
                onSelect={(key) => console.log(key)}
                menus={[
                  { key: 'copy', name: '复制' },
                  { key: 'delete', name: '删除' },
                ]}
              />,
            ],
          },
        ];

        return (
          <ProTable<GithubIssueItem>
            columns={columns}
            bordered
            request={async (params = {}) => {
              const data = await request<GithubIssueItem[]>(
                'https://api.github.com/repos/ant-design/ant-design-pro/issues',
                {
                  params: {
                    ...params,
                    page: params.current,
                    per_page: params.pageSize,
                  },
                  timeout: 10000,
                },
              );
              const totalObj = await request(
                'https://api.github.com/repos/ant-design/ant-design-pro/issues?per_page=1',
                {
                  params,
                  timeout: 10000,
                },
              );
              return {
                data,
                page: params.current,
                success: true,
                total: ((totalObj[0] || { number: 0 }).number - 56) as number,
              };
            }}
            rowKey="id"
            rowSelection={{}}
            pagination={{
              size: 'default'
            }}
            dateFormatter="string"
            headerTitle="Github Issue列表" // -> 自定义
            tableAlertRender={false}
            toolBarRender={(_, { selectedRowKeys }) => [
              <Button key="3" type="primary">
                <PlusOutlined />
                新建
              </Button>,
              selectedRowKeys && selectedRowKeys.length && (
                <Button
                  key="3"
                  onClick={() => {
                    console.log(selectedRowKeys.join('-'));
                  }}
                >
                  批量删除
                </Button>
              ),
            ]}
          />
        );
      }
    `;
    return code;
  }
  return '';
}
