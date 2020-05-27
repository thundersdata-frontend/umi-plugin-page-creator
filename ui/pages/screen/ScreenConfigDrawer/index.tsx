import React, { useEffect } from 'react';
import { Drawer, Form, Input, InputNumber, Divider, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { ScreenConfig } from '../../../../interfaces/screen';

const formLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const initialValues = {
  leftWidth: 3,
  leftRows: 4,
  centerWidth: 4,
  centerRows: 1,
  rightWidth: 3,
  rightRows: 4,
}

export default ({
  visible,
  toggleVisible,
  config,
  onFinish,
}: {
  visible: boolean;
  toggleVisible: () => void;
  config?: ScreenConfig;
  onFinish: (values: Store) => void;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (config && config.title) {
      const values = transformConfig(config);
      form.setFieldsValue(values);
    } else {
      form.setFieldsValue(initialValues);
    }
  }, [config]);

  const handleFinish = (values: Store) => {
    onFinish(values);
    toggleVisible();
  };

  return (
    <Drawer title="大屏配置" visible={visible} width={360} forceRender onClose={toggleVisible}>
      <Form form={form} onFinish={handleFinish} {...formLayout} initialValues={initialValues}>
        <Form.Item label="标题" name="title" required rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="标题样式" name="titleStyle">
          <Input.TextArea rows={6} />
        </Form.Item>
        <Divider />
        <Form.Item label="左侧占比" name="leftWidth" required rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item label="左侧行数" name="leftRows" required rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Divider />
        <Form.Item label="中间占比" name="centerWidth" required rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item label="中间行数" name="centerRows" required rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Divider />
        <Form.Item label="右侧占比" name="rightWidth" required rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item label="右侧行数" name="rightRows" required rules={[{ required: true }]}>
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

function transformConfig(config: ScreenConfig): Store {
  const { title, titleStyle, left, center, right } = config;

  return {
    title,
    titleStyle,
    leftWidth: left.flex,
    leftRows: left.rows.length,
    centerWidth: center.flex,
    centerRows: center.rows.length,
    rightWidth: right.flex,
    rightRows: right.rows.length,
  };
}
