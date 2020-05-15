/*
 * @文件描述: 生成短详情页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-07 14:04:41
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-15 11:37:28
 */
import { Store } from 'antd/lib/form/interface';
import { FormItemProps } from '../../ui/interfaces/common';

export interface Payload {
  cardConfig: Store;
  formItems: FormItemProps[];
}

export default function generateShortDetail(payload: Payload): string {
  if (payload && payload.cardConfig && payload.formItems) {
    const { cardConfig, formItems } = payload;

    const code = `
      import React from 'react';
      import { Card, Form, Spin } from 'antd';
      import Title from '@/components/Title';
      import DetailValue from '@/components/DetailValue';
      import { useRequest } from 'umi';

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
        const { data, loading } = useRequest('/api/detail');

        return (
          <Spin spinning={loading}>
            <Form form={form}>
              <Card title={<Title text="${cardConfig.title}" />} style={{ marginBottom: 16 }}>
                ${formItems
                  .map(item => {
                    const { label, name } = item;
                    return `<Form.Item
                      {...formItemLayout}
                      label="${label}"
                      name="${name}"
                    >
                      <DetailValue />
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
