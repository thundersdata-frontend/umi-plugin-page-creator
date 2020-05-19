/*
 * @文件描述: 生成大表单页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:05:30
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-19 23:34:29
 */
import { createFormComponentsByType, transformFormItemLines, generateRules } from './util';
import { FormItemProps } from '../../interfaces/common';
import { Store } from 'antd/lib/form/interface';

export interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
  submitFetch?: string[];
}

export default function generateLongFormModalCode(payload: Payload): string {
  if (payload && payload.formConfig && payload.formItems) {
    const { formConfig, formItems = [], submitFetch } = payload;

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
      ${submitFetch ? `import { useRequest } from 'umi';` : ''}

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
        };

        ${
          submitFetch
            ? `
          const submit = (values: Store) => {
            console.log(values);
            return API.${submitFetch[0]}.${submitFetch[1]}.${submitFetch[2]}.fetch({ ... values });
          };

          const { run: handleFinish } = useRequest(submit, {
            manual: true,
            onSuccess: () => {
              message.success('保存成功');
              toggleVisible();
            },
            onError: error => {
              console.error(error.message);
              message.error('保存失败');
            }
          });
        `
            : `
          const handleFinish = (values: Store) => {
            console.log(values);
            toggleVisible();
          }
        `
        }

        return (
          <Modal
            width={650}
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
        const twoColumnsLayout = {
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
        };
        return (
          <Spin spinning={loading}>
            <Form form={form} onFinish={onFinish} {...twoColumnsLayout}>
              ${formItemLines
                .map(line => {
                  return `
                    <Row justify="space-between">
                      ${line
                        .map(formItem => {
                          const {
                            label,
                            name,
                            type,
                            required = false,
                            customRules = [],
                            ...restProps
                          } = formItem;
                          const rules = generateRules(customRules as string, required as boolean);
                          return `
                            <Col span={12}>
                              <Form.Item
                                label="${label}"
                                name="${name}"
                                ${required ? `required` : `required={false}`}
                                ${rules !== '[]' ? `rules={${rules}}` : ''}
                              >
                                ${createFormComponentsByType(type, restProps)}
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
        );
      };
    `;
    return code;
  }
  return '';
}
