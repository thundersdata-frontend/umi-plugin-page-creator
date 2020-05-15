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
        <Card title={<Title text="单列详情" />} style={{ marginBottom: 16 }}>
          <Form.Item {...formItemLayout} label="Dynamic Paradigm Consultant" name="Metz">
            <DetailValue />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Principal Communications Assistant" name="Anderson">
            <DetailValue />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Internal Marketing Representative" name="Doyle">
            <DetailValue />
          </Form.Item>
        </Card>
      </Form>
    </Spin>
  );
};
