/*
 * @文件描述: 生成大表单页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:05:30
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-15 19:33:41
 */
import { transformFormItemLines } from './util';
import { FormItemProps } from '../../../interfaces/common';
import { Store } from 'antd/lib/form/interface';

export interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
}

export default function generateLongDetailModalCode(payload: Payload): string {
  if (payload && payload.formConfig && payload.formItems) {
    const { formConfig, formItems = [] } = payload;

    const cols = 2;
    // 把formItems分成2列
    const formItemLines = transformFormItemLines(formItems, cols);

    const code = `
      import React, { useEffect } from 'react';
      import {
        Modal,
        Form,
        Row,
        Col,
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
      import { FormInstance } from 'antd/lib/form';
      import { Store } from 'antd/es/form/interface';
      import isEmpty from 'lodash/isEmpty';
      import DetailValue from '@/components/DetailValue';

      const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
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

        return (
          <Modal
            width={650}
            centered
            visible={visible}
            destroyOnClose
            forceRender // -> 如果modal里面装form，这个配置必须，否则会报错
            getContainer={false}
            title="${formConfig.title}"
            onCancel={toggleVisible}
            footer={null}
          >
            <Spin spinning={loading}>
              <Form form={form} {...layout}>
                ${formItemLines
                  .map(line => {
                    return `
                      <Row>
                        ${line
                          .map(formItem => {
                            return `
                              <Col span={12}>
                                <Form.Item
                                  label="${formItem.label}"
                                  name="${formItem.name}"
                                >
                                  <DetailValue ${formItem.detailItemType && formItem.detailItemType !== 'default' ? `type="${formItem.detailItemType}"` : ''} />
                                </Form.Item>
                              </Col>
                            `;
                          })
                          .join('')}
                      </Row>
                    `;
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
