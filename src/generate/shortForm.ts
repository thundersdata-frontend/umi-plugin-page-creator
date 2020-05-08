/*
 * @文件描述: 生成短表单
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-07 14:04:41
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-08 14:47:48
 */
import { Store } from 'antd/lib/form/interface';
import { FormItemProps } from '@/interfaces/common';
import { createFormComponentsByType } from './util';

export interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
}

export default function generateShortFormCode(payload: Payload): string {
  if (payload && payload.formConfig && payload.formItems) {
    const { formConfig, formItems } = payload;

    const code = `
        import React from 'react';
        import {
          Form,
          Input,
          Button,
          DatePicker,
          Tooltip,
          InputNumber,
          Radio,
          Card,
        } from 'antd';
        import { InfoCircleOutlined } from '@ant-design/icons';
        import { useToggle } from '@umijs/hooks';
        import { Store } from 'antd/es/form/interface';
        import Title from '@/components/Title';

        const { RangePicker } = DatePicker;
        const { TextArea } = Input;

        export default () => {
          const [form] = Form.useForm();
          const submitBtn = useToggle(false);

          const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 7 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12 },
              md: { span: 10 },
            },
          };

          const submitFormLayout = {
            wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 10, offset: 7 },
            },
          };

          const handleFinish = (values: Store) => {
            console.log(values);
            submitBtn.toggle();
          };

          return (
            <Card title={<Title text="${formConfig.title}" />}>
              <Form form={form} onFinish={handleFinish}>
                ${formItems.map(item => {
                  const { label, name, type, ...restProps } = item;
                  return `<Form.Item
                      {...formItemLayout}
                      label="${label}"
                      name="${name}"
                    >
                      ${createFormComponentsByType(type, restProps)}
                    </Form.Item>`;
                })}
                <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
                  <Button type="primary" htmlType="submit" loading={submitBtn.state}>
                    提交
                  </Button>
                  <Button style={{ marginLeft: 10 }}>取消</Button>
                </Form.Item>
              </Form>
            </Card>
          );
        };
      `;
    return code;
  }
  return '';
}
