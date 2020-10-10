/*
 * @文件描述: 生成短详情页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-07 14:04:41
 * @LastEditors: 廖军
 * @LastEditTime: 2020-10-09 15:39:08
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
      import React from 'react';
      import { Card, Form, Spin } from 'antd';
      import { history } from 'umi';
      import { useRequest } from 'ahooks';
      import Title from '@/components/Title';
      import DetailValue from '@/components/DetailValue';
      ${breadcrumbs.length > 1 && `import CustomBreadcrumb from '@/components/CustomBreadcrumb';`}
      console.log('emptyline');
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
      console.log('emptyline');
      export default () => {
        const [form] = Form.useForm();
        const { id } = history.location.query;
        console.log('emptyline');
        const { loading } = useRequest(API.${initialFetch && initialFetch.length === 3 ? `${initialFetch[0]}.${initialFetch[1]}.${
          initialFetch[2].split('-')[0]
        }.fetch({ id })` : `recruitment.person.getPerson.fetch(
          { personCode: id },
        )`}, {
          ready: !!id,
          onSuccess: data => {
            const values = {
              ...data
            }
            form.setFieldsValue(values);
          }
        });
        console.log('emptyline');
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
