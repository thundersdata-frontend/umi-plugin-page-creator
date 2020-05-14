import React, { useEffect } from 'react';
import { Drawer, Form, Input, Button, Radio, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FormItemProps, FormItemType } from '../../interfaces/common';
import { Store } from 'antd/lib/form/interface';
import * as itemProps from './props';
import renderFormItem from '../FormItemConfig';
import { filterEmpty } from '../../utils';

export default ({
  visible,
  onVisible,
  index,
  formItem,
  onConfirm,
  from = 'form',
}: {
  visible: boolean;
  onVisible: (visible: boolean) => void;
  index?: number;
  formItem: FormItemProps;
  onConfirm: (index: number, formItem: FormItemProps) => void;
  from?: 'form' | 'detail';
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
      width={400}
    >
      <Form form={form} onFinish={handleFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
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
        {from === 'form' && (
          <>
            <Form.Item
              label="是否必填"
              name="required"
              required
              rules={[{ required: true, message: '请选择是否必填' }]}
            >
              <Radio.Group
                options={[{ label: '是', value: true }, { label: '否', value: false }]}
              />
            </Form.Item>
            <Form.Item
              label={
                <label>
                  自定义规则
                  <Tooltip overlay="数组，参照antd官网Form文档进行配置">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </label>
              }
              name="customRules"
            >
              <Input.TextArea
                rows={4}
                autoSize
                placeholder={`[
  {required: true},
  {enum: []},
  {whitespace: true},
  {type: 'string', len: 10, max: 20, min: 6 },
  {type: 'number', len: 10, max: 20, min: 6},
  {type: 'array', len: 10, max: 20, min: 6},
  {type: 'date', format: '', parse: '', invalid: ''}
]`}
              />
            </Form.Item>
            <Form.Item label="占位符" name="placeholder">
              <Input />
            </Form.Item>
            {renderOtherProps(type)}
          </>
        )}
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
  let props: FormItemProps[] = itemProps[`${type}Props`];
  return props.map(item => renderFormItem({ formItem: item }));
}
