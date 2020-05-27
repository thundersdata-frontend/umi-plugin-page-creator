import React from 'react';
import { Drawer, Form, InputNumber, Divider, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';

const formLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const initialValues = {
  flex: 1,
}

export default ({
  visible,
  toggleVisible,
  onFinish,
}: {
  visible: boolean;
  toggleVisible: () => void;
  onFinish: (values: Store) => void;
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: Store) => {
    onFinish(values);
    toggleVisible();
  };

  return (
    <Drawer title="图表容器配置" visible={visible} width={360} forceRender onClose={toggleVisible}>
      <Form form={form} onFinish={handleFinish} {...formLayout} initialValues={initialValues}>
        <Form.Item label="宽度占比(flex)" name="flex" required rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Divider />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
