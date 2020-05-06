import React from 'react';
import { Drawer, Form, Input, Button } from 'antd';
import { FormItemProps, FormItemType } from '../../interfaces/common';
import { Store } from 'antd/lib/form/interface';

export default ({
  visible,
  onVisible,
  index,
  formItem,
  onConfirm,
}: {
  visible: boolean;
  onVisible: (visible: boolean) => void;
  index?: number;
  formItem: FormItemProps;
  onConfirm: (index: number, formItem: FormItemProps) => void;
}) => {
  const [form] = Form.useForm();
  const { name, type, label, placeholder, ...restProps } = formItem;

  const handleFinish = (values: Store) => {
    if (index !== undefined) {
      onConfirm(index, { ...formItem, ...values });
      onVisible(false);
    }
  };

  return (
    <Drawer
      title="表单项配置"
      visible={visible}
      onClose={() => onVisible(false)}
      destroyOnClose
      width={360}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        initialValues={{ name, type, label, placeholder }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="标签"
          name="label"
          required
          rules={[{ required: true, message: '请填写标签' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="字段名"
          name="name"
          required
          rules={[{ required: true, message: '请填写字段名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="占位符" name="placeholder">
          <Input />
        </Form.Item>
        {renderOtherProps(type, restProps)}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

/**
 * 渲染表单元素本身的属性
 * @param type
 * @param props
 */
function renderOtherProps(
  type: FormItemType,
  props: { [key: string]: unknown },
) {
  switch (type) {
    case 'input':
      break;

    default:
      break;
  }
}
