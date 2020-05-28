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

export interface Payload {
  cardConfig: Store;
  formItems: FormItemProps[];
  initialFetch?: string[];
}

export default function generateShortDetail(payload: Payload): string {
  if (payload && payload.cardConfig && payload.formItems) {
    const { cardConfig, formItems, initialFetch } = payload;

    const code = `
      import React from 'react';
      import { Card, Form, Spin } from 'antd';
      import Title from '@/components/Title';
      import DetailValue from '@/components/DetailValue';
      ${
        !initialFetch
          ? `import { useToggle } from '@umijs/hooks';`
          : `import { useRequest } from 'umi';`
      }

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
        ${
          initialFetch && initialFetch.length === 3
            ? `
          const { loading } = useRequest(() => API.${initialFetch[0]}.${initialFetch[1]}.${initialFetch[2].split('-')[0]}.fetch({}), {
            onSuccess: data => {
              form.setFieldsValue(data);
            },
            onError: error => {
              message.error(error.message);
            }
          })
        `
            : `
          const toggle = useToggle(false);
        `
        }

        return (
          <Spin spinning={${initialFetch ? 'loading' : 'toggle.state'}}>
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
