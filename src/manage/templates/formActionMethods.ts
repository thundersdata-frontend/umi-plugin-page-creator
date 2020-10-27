/*
 * @文件描述: 生成table与form连接的一些方法组件（非modal类型）
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-10-10 16:15:04
 * @LastEditors: 廖军
 * @LastEditTime: 2020-10-27 14:08:34
 */

export interface Payload {
  initialFetch?: string[];
  pageName: string;
  generateDetail: boolean;
}

export default ({ pageName, initialFetch = [], generateDetail }: Payload) => {
    const apiStr = initialFetch.length === 3 ? 
      `API.${initialFetch[0]}.${initialFetch[1]}` : 'API.recruitment.person';
    return `
      import React, { forwardRef } from 'react';
      import { Store } from 'antd/es/form/interface';
      import { history } from 'umi';
      import { useRequest } from 'ahooks';
      import { message } from 'antd';

      export interface FormActionMethodsInstance {
        onAdd?: () => void;
        onDelete?: (row: Store) => void;
        onEdit?: (row: Store) => void;
        onPreview?: (row: Store) => void;
        onDeleteBatch?: (ids: number[]) => void;
      }

      export default forwardRef<FormActionMethodsInstance, { reload?: () => void }>(({ reload }, ref) => {
        const formActionRef = ref as React.MutableRefObject<FormActionMethodsInstance>;
        const { run: handleDelete } = useRequest(${apiStr}.remove.fetch, {
          manual: true,
          onSuccess: () => {
            message.success('删除成功');
            reload && reload();
          },
        });
        const { run: handleDeleteBatch } = useRequest(${apiStr}.deleteBatch, {
          manual: true,
          onSuccess: () => {
            message.success('批量删除成功');
            reload && reload();
          },
        });

        /** 新增 */
        formActionRef.current.onAdd = () => history.push('/${pageName}/edit');

        /** 删除 */
        formActionRef.current.onDelete = (row: Store) => handleDelete(row.id);

        /** 编辑 */
        formActionRef.current.onEdit = (row: Store) => history.push(\`/${pageName}/edit?id=\${row.id}\`);

        ${generateDetail ? `/** 查看 */
        formActionRef.current.onPreview = (row: Store) => history.push(\`/${pageName}/detail?id=\${row.id}\`);` : ''}

        /** 批量删除 */
        formActionRef.current.onDeleteBatch = (ids: number[]) => handleDeleteBatch(ids);

        return <></>;
      });
    `;
}