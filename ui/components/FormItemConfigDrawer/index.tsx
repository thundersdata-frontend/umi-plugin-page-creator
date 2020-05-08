import React, { useEffect, useState } from 'react';
import { Drawer, Form, Input, Button } from 'antd';
import { FormItemProps, FormItemType } from '../../interfaces/common';
import { Store } from 'antd/lib/form/interface';
import { inputProps } from './props';
import renderFormItem from '../FormItemConfig';

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

  useEffect(() => {
    form.setFieldsValue(formItem);
  }, [formItem]);

  const handleFinish = (values: Store) => {
    if (index !== undefined) {
      onConfirm(index, { ...formItem, ...filterEmpty(values) });
      onVisible(false);
      form.resetFields();
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
        {renderOtherProps(type)}
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
function renderOtherProps(type: FormItemType) {
  switch (type) {
    case 'input':
    default:
      return inputProps.map(item => renderFormItem({ formItem: item }));
  }
}

/**
 * 过滤掉空数据
 * @param values
 */
function filterEmpty(values: Store) {
  const filteredValues = {};

  Object.entries(values).forEach(([key, value]) => {
    if (value !== '' && value !== undefined && value !== null) {
      filteredValues[key] = value;
    }
  });
  return filteredValues;
}
