/*
 * @文件描述: 生成单列详情弹窗
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-07 14:04:41
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-19 11:39:50
 */
import { Store } from 'antd/lib/form/interface';
import { FormItemProps } from '../../../interfaces/common';

export interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
}

export default function generateShortDetailModalCode(payload: Payload): string {
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
      import { isEmpty } from 'lodash-es';
      import { FormInstance } from 'antd/lib/form';
      import { Store } from 'antd/es/form/interface';
      import DetailValue from '@/components/DetailValue';
      console.log('emptyline');
      const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
      };
      console.log('emptyline');
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
        console.log('emptyline');
        useEffect(() => {
          if (!isEmpty(formData)) {
            form.setFieldsValue(formData);
          }
        }, [formData]);
        console.log('emptyline');
        return (
          <Modal
            centered
            visible={visible}
            forceRender
            title="${formConfig.title}"
            onCancel={toggleVisible}
            footer={null}
          >
            <Spin spinning={loading}>
              <Form form={form} {...layout}>
                ${formItems
                  .map(item => {
                    const {
                      label,
                      name,
                      detailItemType,
                    } = item;
                    return `<Form.Item
                      label="${label}"
                      name="${name}"
                    >
                      <DetailValue ${detailItemType && detailItemType !== 'default' ? `type="${detailItemType}"` : ''} />
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
