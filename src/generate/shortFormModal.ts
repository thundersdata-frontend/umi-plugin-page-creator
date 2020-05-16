/*
 * @文件描述: 生成单列表单弹窗
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-07 14:04:41
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-16 10:55:39
 */
import { Store } from 'antd/lib/form/interface';
import { createFormComponentsByType } from './util';
import { FormItemProps } from '../../ui/interfaces/common';

export interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
}

export default function generateShortFormModalCode(payload: Payload): string {
  if (payload && payload.formConfig && payload.formItems) {
    const { formConfig, formItems } = payload;

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
      } from 'antd';
      import isEmpty from 'lodash/isEmpty';
      import { FormInstance } from 'antd/lib/form';
      import { Store } from 'antd/es/form/interface';

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

        const handleFinish = (values: Store) => {
          console.log(values);
          toggleVisible();
        };

        return (
          <Modal
            centered
            visible={visible}
            destroyOnClose
            forceRender
            getContainer={false} // -> 如果modal里面装form，这个配置必须，否则会报错
            maskClosable={false}
            title="${formConfig.title}"
            onOk={() => form.submit()}
            onCancel={handleCancel}
          >
            <ModalForm form={form} onFinish={handleFinish} loading={loading} />
          </Modal>
        );
      };

      const ModalForm = ({
        form,
        onFinish,
        loading,
      }: {
        form: FormInstance;
        onFinish: (values: Store) => void;
        loading: boolean;
      }) => {
        const formLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 17 },
        };
        return (
          <Spin spinning={loading}>
            <Form form={form} onFinish={onFinish} {...formLayout}>
              ${formItems
                .map(item => {
                  const {
                    label,
                    name,
                    type,
                    required = false,
                    customRules = [],
                    ...restProps
                  } = item;
                  return `<Form.Item
                    label="${label}"
                    name="${name}"
                    required={${required}}
                    rules={${JSON.stringify(customRules)}}
                  >
                    ${createFormComponentsByType(type, restProps)}
                  </Form.Item>`;
                })
                .join('')}
            </Form>
          </Spin>
        );
      };
    `;
    return code;
  }
  return '';
}
