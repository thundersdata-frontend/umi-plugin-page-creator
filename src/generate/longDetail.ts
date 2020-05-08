/*
 * @文件描述: 生成长详情页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-07 14:04:41
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-08 16:14:48
 */
import { Store } from 'antd/lib/form/interface';
import { FormItemProps } from '@/interfaces/common';
import { createFormComponentsByType } from './util';

export interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
}

export default function generateLongDetail(payload: Payload): string {
  if (payload && payload.formConfig && payload.formItems) {
    const { formConfig, formItems } = payload;

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
        const { data, loading } = useRequest('/api/detail');

        return (
          <Spin spinning={loading}>
            <Form initialValues={data}>
              <Card title={<Title text="仓库管理" />} style={{ marginBottom: 16 }}>
                <Row gutter={16}>
                  <Col {...colLayout}>
                    <Form.Item
                      label={fieldLabels.name}
                      name="name"
                      rules={[{ required: true, message: '请输入仓库名称' }]}
                    >
                      <DetailValue />
                    </Form.Item>
                  </Col>
                  <Col {...colLayout}>
                    <Form.Item
                      label={fieldLabels.url}
                      name="url"
                      rules={[{ required: true, message: '请选择' }]}
                    >
                      <DetailValue />
                    </Form.Item>
                  </Col>
                  <Col {...colLayout}>
                    <Form.Item
                      label={fieldLabels.owner}
                      name="owner"
                      rules={[{ required: true, message: '请选择管理员' }]}
                    >
                      <DetailValue />
                    </Form.Item>
                  </Col>
                </Row>
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
