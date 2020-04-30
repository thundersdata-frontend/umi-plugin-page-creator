/*
 * @文件描述: 短表单的配置内容
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 17:56:31
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-04-30 15:42:51
 */
import React, { useContext } from "react";
import { Form, Button, Input, Drawer } from "antd";

import Context from "../../../Context";
import { ShortFormConfig } from "ui/interfaces/common";

export default () => {
  const [form] = Form.useForm();
  const { addShortFormConfig, visible, setVisible } = useContext(Context);

  const handleFinish = (values: ShortFormConfig) => {
    addShortFormConfig(values);
    setVisible(false);
  };

  return (
    <Drawer
      title="短表单配置"
      width={360}
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          label="表单title"
          name="title"
          required
          rules={[{ required: true, message: "请填写表单title" }]}
        >
          <Input placeholder="单列表单" />
        </Form.Item>
        <Form.Item label="Pont接口" name="pont">
          <Input />
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
