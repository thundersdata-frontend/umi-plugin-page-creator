/*
 * @文件描述: 生成单列表单弹窗
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-07 14:04:41
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-22 17:05:04
 */
import { Store } from 'antd/lib/form/interface';
import { createFormComponentsByType, generateRules } from './util';
import { FormItemProps } from '../../../interfaces/common';

export interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
  submitFetch?: string[];
}

export default function generateShortFormModalCode(payload: Payload): string {
  if (payload && payload.formConfig && payload.formItems) {
    const { formConfig, formItems, submitFetch } = payload;

    const code = `
      import React, { useEffect } from 'react';
      import {
        Button,
        Modal,
        Form,
        Spin,
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
      import isEmpty from 'lodash/isEmpty';
      import { FormInstance } from 'antd/lib/form';
      import { Store } from 'antd/es/form/interface';
      import { useRequest } from 'umi';

      const formLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 17 },
      };

      export default ({
        visible,
        toggleVisible,
        formData,
        loading,
      }: {
        visible: boolean;
        toggleVisible: () => void;
        formData: Store;
        loading: boolean;
      }) => {
        const [form] = Form.useForm();

        useEffect(() => {
          if (!isEmpty(formData)) {
            form.setFieldsValue(formData);
          }
        }, [formData]);

        const handleCancel = () => {
          toggleVisible();
        }

        const submit = (values: Store) => {
          // 这里可以做一些数据转换
          const payload = {
            ...values,
          };
          return API.${submitFetch && submitFetch.length === 3 ? `${submitFetch[0]}.${submitFetch[1]}.${
            submitFetch[2].split('-')[0]
          }` : 'recruitment.person.addPerson'}.fetch(payload);
        };

        const { submitting, run: handleFinish } = useRequest(submit, {
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
          <Modal
            centered
            visible={visible}
            destroyOnClose
            forceRender // -> 如果modal里面装form，这个配置必须，否则会报错
            getContainer={false}
            maskClosable={false}
            title="${formConfig.title}"
            okButtonProps={{ htmlType: 'submit', loading: submitting }}
            onOk={() => form.submit()}
            onCancel={handleCancel}
          >
            <Spin spinning={loading}>
              <Form form={form} onFinish={handleFinish} {...formLayout}>
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
                      label="${label}"
                      name="${name}"
                      ${required ? `required` : ``}
                      ${rules !== '[]' ? `rules={${rules}}` : ''}
                    >
                      ${createFormComponentsByType(type, restProps)}
                    </Form.Item>`;
                  })
                  .join('')}
              </Form>
            </Spin>
          </Modal>
        );
      };
    `;
    return code;
  }
  return '';
}
