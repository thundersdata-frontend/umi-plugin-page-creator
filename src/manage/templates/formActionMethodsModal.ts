/*
 * @文件描述: 生成table与form连接的一些方法组件（modal类型）
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-10-10 16:26:10
 * @LastEditors: 廖军
 * @LastEditTime: 2020-10-27 14:09:49
 */

export interface Payload {
  initialFetch?: string[];
  generateDetail: boolean;
}

export default ({ initialFetch = [], generateDetail }: Payload) => {
    const apiStr = initialFetch.length === 3 ? 
      `API.${initialFetch[0]}.${initialFetch[1]}` : 'API.recruitment.person';
    return `
      import React, { forwardRef } from 'react';
      import { Store } from 'antd/es/form/interface';
      import { useRequest } from 'ahooks';
      import { message } from 'antd';
      import { useImmer } from 'use-immer';
      import Edit from '../Edit';
      ${generateDetail ? `import Detail from '../Detail';` : ''}
      
      export interface FormActionMethodsInstance {
        onAdd?: () => void;
        onDelete?: (row: Store) => void;
        onEdit?: (row: Store) => void;
        onPreview?: (row: Store) => void;
        onDeleteBatch?: (ids: number[]) => void;
      }
      
      export default forwardRef<FormActionMethodsInstance, { reload?: () => void }>(({ reload }, ref) => {
        const formActionRef = ref as React.MutableRefObject<FormActionMethodsInstance>;
        const [editModalConfig, setEditModalConfig] = useImmer<{
          visible: boolean;
          formData: Store;
          loading: boolean;
        }>({
          visible: false,
          formData: {},
          loading: false,
        });
        ${generateDetail ? `const [detailModalConfig, setDetailModalConfig] = useImmer<{
          visible: boolean;
          formData: Store;
          loading: boolean;
        }>({
          visible: false,
          formData: {},
          loading: false,
        });` : ''}
      
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
        formActionRef.current.onAdd = () =>
          setEditModalConfig(config => {
            config.visible = true;
            config.formData = {};
          });
      
        /** 删除 */
        formActionRef.current.onDelete = (row: Store) => handleDelete(row.id);
      
        /** 编辑 */
        formActionRef.current.onEdit = (row: Store) =>
          setEditModalConfig(config => {
            config.visible = true;
            config.formData = row;
          });
      
        ${generateDetail ? `/** 查看 */
        formActionRef.current.onPreview = (row: Store) =>
          setDetailModalConfig(config => {
            config.visible = true;
            config.formData = row;
          });` : ''}
      
        /** 批量删除 */
        formActionRef.current.onDeleteBatch = (ids: number[]) => handleDeleteBatch(ids);
      
        return (
          <>
            <Edit
              visible={editModalConfig.visible}
              formData={editModalConfig.formData}
              loading={editModalConfig.loading}
              toggleVisible={() =>
                setEditModalConfig(config => {
                  config.visible = false;
                  config.loading = false;
                  config.formData = {};
                })
              }
              reload={reload}
            />
            ${generateDetail ? `<Detail
              visible={detailModalConfig.visible}
              formData={detailModalConfig.formData}
              loading={detailModalConfig.loading}
              toggleVisible={() =>
                setDetailModalConfig(config => {
                  config.visible = false;
                  config.loading = false;
                  config.formData = {};
                })
              }
            />` : ''}
          </>
        );
      });    
    `;
}