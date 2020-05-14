/*
 * @文件描述: 生成短详情页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-07 14:04:41
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-14 18:27:26
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
      import { Card, Row, Col, Form, Spin } from 'antd';
      import Title from '@/components/Title';
      import styles from './index.less';
      import DetailValue from '@/components/DetailValue';
      import { useRequest } from 'umi';

      const colLayout = {
        lg: {
          span: 8,
        },
        md: {
          span: 12,
        },
        sm: {
          span: 24,
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
