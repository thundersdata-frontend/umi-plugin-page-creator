/*
 * @文件描述: 生成短详情页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-07 14:04:41
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-22 17:04:35
 */
import { Store } from 'antd/lib/form/interface';
import { FormItemProps } from '../../../interfaces/common';
import { generateBreadcrumbs } from './util';

export interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
  initialFetch?: string[];
  menu: string;
}

export default function generateShortDetail(payload: Payload): string {
  if (payload && payload.formConfig && payload.formItems) {
    const { formConfig, formItems, initialFetch, menu } = payload;

    const breadcrumbs = generateBreadcrumbs(menu);

    const code = `
      import React, { useCallback } from 'react';
      import { Card, Form, Spin } from 'antd';
      import { useRequest, history } from 'umi';
      import Title from '@/components/Title';
      import DetailValue from '@/components/DetailValue';
      ${breadcrumbs.length > 1 && `import CustomBreadcrumb from '@/components/CustomBreadcrumb';`}

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
          md: { span: 10 },
        },
      };

      export default () => {
        const [form] = Form.useForm();
        const { id } = history.location.query;

        const fetchDetail = useCallback(async () => {
          if (id) {
            const result = await API.${initialFetch && initialFetch.length === 3 ? `${initialFetch[0]}.${initialFetch[1]}.${
              initialFetch[2].split('-')[0]
            }` : 'recruitment.person.getPerson'}.fetch(
              { personCode: id },
            );
            // 这里可以做数据转换操作
            const values = {
              ...result
            }
            form.setFieldsValue(values);
          }
        }, [id]);

        const { loading } = useRequest(fetchDetail, {
          refreshDeps: [fetchDetail],
        });

        return (
          <Spin spinning={loading}>
            <CustomBreadcrumb list={${breadcrumbs}} />
            <Form form={form}>
              <Card title={<Title text="${formConfig.title}" />} style={{ marginBottom: 16 }}>
                ${formItems
                  .map(item => {
                    const { label, name, detailItemType } = item;
                    return `<Form.Item
                      {...formItemLayout}
                      label="${label}"
                      name="${name}"
                    >
                      <DetailValue ${detailItemType && detailItemType !== 'default' ? `type="${detailItemType}"` : ''} />
                    </Form.Item>`;
                  })
                  .join('')}
              </Card>
            </Form>
          </Spin>
        );
      };
    `;
    return code;
  }
  return '';
}
