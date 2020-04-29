import React from 'react';
import { Form, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';

export default () => {
  const [form] = Form.useForm();

  const handleFinish = (values: Store) => {
    console.log(values);
  }

  return (
    <Form form={form} onFinish={handleFinish}>
      <Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};
