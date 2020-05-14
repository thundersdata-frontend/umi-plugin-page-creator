/*
 * @文件描述: 短表单的配置内容
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 17:56:31
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-11 15:21:35
 */
import React from 'react';
import { Form, Button, Input, Drawer } from 'antd';
import { Store } from 'antd/lib/form/interface';

export default ({
  visible,
  setVisible,
  onFinish,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onFinish: (values: Store) => void;
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: Store) => {
    onFinish(values);
    setVisible(false);
  };

  return (
    <Drawer title="Card配置" width={360} visible={visible} onClose={() => setVisible(false)}>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          label="卡片title"
          name="title"
          required
          rules={[{ required: true, message: '请填写卡片title' }]}
        >
          <Input placeholder="表单容器title" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
