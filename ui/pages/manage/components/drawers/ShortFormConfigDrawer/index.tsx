/*
 * @文件描述: 短表单的配置内容
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 17:56:31
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-28 18:21:40
 */
import React, { useContext, useEffect } from 'react';
import { Form, Button, Input, Drawer } from 'antd';
import { Store } from 'antd/lib/form/interface';

export default ({
  visible,
  setVisible,
  onFinish,
  formConfig,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onFinish: (values: Store) => void;
  formConfig: Store;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formConfig);
  }, [formConfig]);

  const handleFinish = (values: Store) => {
    setVisible(false);
    onFinish(values);
  };

  return (
    <Drawer title="短表单配置" width={360} visible={visible} onClose={() => setVisible(false)}>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          label="title"
          name="title"
          required
          rules={[{ required: true, message: '请填写title' }]}
        >
          <Input placeholder="请填写title" />
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
