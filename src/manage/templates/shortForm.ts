/*
 * @文件描述: 生成短表单
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-07 14:04:41
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-25 09:48:39
 */
import { Store } from 'antd/lib/form/interface';
import { createFormComponentsByType, generateRules } from './util';
import { FormItemProps } from '../../../interfaces/common';

export interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
  initialFetch?: string[];
  submitFetch?: string[];
}

export default function generateShortFormCode(payload: Payload): string {
  if (payload && payload.formConfig && payload.formItems) {
    const { formConfig, formItems, initialFetch, submitFetch } = payload;
    const code = `
      import React, { useCallback } from 'react';
      import {
        Form,
        Button,
        Card,
        Input,
        DatePicker,
        TimePicker,
        Cascader,
        InputNumber,
        Radio,
        Checkbox,
        Switch,
        Slider,
        Select,
        TreeSelect,
        Upload,
        Rate,
        message,
      } from 'antd';
      import { Store } from 'antd/es/form/interface';
      import { useRequest, history } from 'umi';
      import Title from '@/components/Title';

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

      export default () => {
        const [form] = Form.useForm();
        const { id } = history.location.query;

        const fetchDetail = useCallback(async () => {
          if (id) {
            const result = await API.${initialFetch && initialFetch.length === 3 ? `${initialFetch[0]}.${initialFetch[1]}.${
              initialFetch[2].split('-')[0]
            }` : 'recruitment.person.getPerson'}.fetch(
              { personCode: id },
            );
            // 这里可以做数据转换操作
            const values = {
              ...result
            }
            form.setFieldsValue(values);
          }
        }, [id]);

        useRequest(fetchDetail, {
          refreshDeps: [fetchDetail],
        });

        const submit = (values: Store) => {
          // 这里可以做一些数据转换
          const payload = {
            ...values,
          };
          return API.${submitFetch && submitFetch.length === 3 ? `${submitFetch[0]}.${submitFetch[1]}.${
            submitFetch[2].split('-')[0]
          }` : 'recruitment.person.addPerson'}.fetch(payload);
        };

        const { loading, run: handleFinish } = useRequest(submit, {
          manual: true,
          onSuccess: () => {
            message.success('保存成功');
          },
          onError: error => {
            console.error(error.message);
            message.error('保存失败');
          },
        });

        return (
          <Card title={<Title text="${formConfig.title}" />}>
            <Form form={form} onFinish={handleFinish}>
              ${formItems
                .map(item => {
                  const {
                    label,
                    name,
                    type,
                    required = false,
                    customRules = '',
                    ...restProps
                  } = item;
                  const rules = generateRules(customRules as string, required as boolean);
                  return `<Form.Item
                    {...formItemLayout}
                    label="${label}"
                    name="${name}"
                    ${required ? `required` : ``}
                    ${rules !== '[]' ? `rules={${rules}}` : ''}
                  >
                    ${createFormComponentsByType(type, restProps)}
                  </Form.Item>`;
                })
                .join('')}
              <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
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
