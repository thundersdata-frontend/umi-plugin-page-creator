import React, { useEffect, useContext, useState, useMemo } from 'react';
import { Drawer, Form, Input, Button, Radio, Tooltip, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FormItemProps, FormItemType } from '../../../interfaces/common';
import { Store } from 'antd/lib/form/interface';
import * as itemProps from './props';
import renderFormItem from '../FormItemConfig';
import { filterEmpty } from '../../utils';
import Context from '../../pages/manage/Context';

const { Option } = Select;

export default ({
  visible,
  onVisible,
  index,
  formItem,
  onConfirm,
  submitFetch,
  initialFetch,
  from = 'form',
}: {
  visible: boolean;
  onVisible: (visible: boolean) => void;
  index?: number;
  formItem: FormItemProps;
  onConfirm: (index: number, formItem: FormItemProps) => void;
  submitFetch?: string[],
  initialFetch?: string[],
  from?: 'form' | 'detail';
}) => {
  const { baseClasses = [] } = useContext(Context);

  const [form] = Form.useForm();
  const { name, type, label, placeholder, ...restProps } = formItem;

  const [paramsName, setParamsName] = useState<string>();
  const [responseName, setResponseName] = useState<string>();

  useEffect(() => {
    form.setFieldsValue(formItem);
  }, [formItem]);

  /** submitFetch中第三个值为value-paramsName-responseName，提交表单数据选用paramsName作为DTO */
  useEffect(() => {
    if (submitFetch && submitFetch.length > 0) {
      const paramsName = submitFetch[2].split('-')[1];
      setParamsName(paramsName);
    }
  }, [submitFetch]);

  /** initialFetch中第三个值为value-paramsName-responseName，获取初始数据选用responseName作为DTO */
  useEffect(() => {
    if (initialFetch && initialFetch.length > 0) {
      const responseName = initialFetch[2].split('-')[2];
      setResponseName(responseName);
    }
  }, [initialFetch]);

  const handleFinish = (values: Store) => {
    if (index !== undefined) {
      const { prop, ...restValues } = values;
      onConfirm(index, { ...formItem, ...filterEmpty(restValues) });
      onVisible(false);
      form.resetFields();
    }
  };

  const properties = useMemo(() => {
    if (from === 'form') {
      return baseClasses.find(item => item.name === paramsName)?.properties || [];
    }
    return baseClasses.find(item => item.name === responseName)?.properties || [];
  }, [baseClasses, paramsName, from, responseName]);

  const handleChange = (value: string) => {
    const matchClass = properties.find(item => item.value === value);
    form.setFieldsValue({
      label: matchClass?.label,
      name: value,
      required: matchClass?.required,
    })
  };

  const propVisible = (from === 'form' && submitFetch && submitFetch.length > 0) || (from === 'detail' && initialFetch && initialFetch.length > 0);

  return (
    <Drawer
      title="表单项配置"
      visible={visible}
      onClose={() => onVisible(false)}
      destroyOnClose
      width={400}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ required: false, disabled: false, allowClear: true }}
      >
        {propVisible && (
          <Form.Item
            label="属性值"
            name="prop"
          >
            <Select onChange={handleChange}>
              {properties.map(prop => (
                <Option key={prop.value} value={prop.value}>{`${prop.label}(${prop.value})`}</Option>
              ))}
            </Select>
          </Form.Item>
        )}
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
                  <span style={{ paddingRight: 10 }}>自定义规则</span>
                  <Tooltip
                    overlay={`[
  {required: true},
  {enum: []},
  {whitespace: true},
  {type: 'string', len: 10, max: 20, min: 6 },
  {type: 'number', len: 10, max: 20, min: 6},
  {type: 'array', len: 10, max: 20, min: 6},
  {type: 'date', format: '', parse: '', invalid: ''}
]`}
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </label>
              }
              name="customRules"
            >
              <Input.TextArea rows={4} autoSize />
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
