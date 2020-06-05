/*
 * @文件描述: 生成大表单页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:05:30
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-25 09:48:26
 */
import { createFormComponentsByType, transformFormItemLines, generateRules } from './util';
import { FormItemProps } from '../../../interfaces/common';
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
    const item = formItems.find(item => item.type === 'upload');

    const code = `
      import React, { useEffect ${item ? ', useState' : ''} } from 'react';
      import {
        Modal,
        Button,
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
        message,
      } from 'antd';
      import { FormInstance } from 'antd/lib/form';
      import { Store } from 'antd/es/form/interface';
      import isEmpty from 'lodash/isEmpty';
      import { useRequest } from 'umi';
      import useSpinning from '@/hooks/useSpinning';

      const twoColumnsLayout = {
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
        const { spinning, tip, setSpinning, setTip } = useSpinning(loading);
        ${item ? `const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);` : ''}

        useEffect(() => {
          setSpinning(loading);
        }, [loading]);

        useEffect(() => {
          if (!isEmpty(formData)) {
            form.setFieldsValue(formData);
          }
        }, [formData]);

        const handleCancel = () => {
          toggleVisible();
        };

        const submit = (values: Store) => {
          setSpinning(true);
          setTip('数据保存中，请稍候...');

          // 这里可以做一些数据转换
          const payload = {
            ...values,
          };
          return API.${submitFetch && submitFetch.length === 3 ? `${submitFetch[0]}.${submitFetch[1]}.${
            submitFetch[2].split('-')[0]
          }` : 'recruitment.person.addPerson'}.fetch(payload);
        };

        const { run: handleFinish } = useRequest(submit, {
          manual: true,
          onSuccess: () => {
            message.success('保存成功');
            setSpinning(false);
          },
          onError: error => {
            console.error(error.message);
            message.error('保存失败');
            setSpinning(false);
          },
        });

        return (
          <Modal
            width={650}
            centered
            visible={visible}
            destroyOnClose
            forceRender // -> 如果modal里面装form，这个配置必须，否则会报错
            getContainer={false}
            maskClosable={false}
            title="${formConfig.title}"
            okButtonProps={{ htmlType: 'submit', ${item ? 'disabled: submitBtnDisabled' : ''} }}
            onOk={() => form.submit()}
            onCancel={handleCancel}
          >
            <Spin spinning={spinning} tip={tip}>
              <Form form={form} onFinish={handleFinish} {...twoColumnsLayout}>
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
                              customRules = '',
                              ...restProps
                            } = formItem;
                            const rules = generateRules(customRules as string, required as boolean);
                            return `
                              <Col span={12}>
                                <Form.Item
                                  label="${label}"
                                  name="${name}"
                                  ${required ? `required` : ``}
                                  ${rules !== '[]' ? `rules={${rules}}` : ''}
                                  ${type === 'upload' ? `
                                  valuePropName="fileList"
                                  getValueFromEvent={e => {
                                    if (Array.isArray(e)) {
                                      return e;
                                    }
                                    return e && e.fileList;
                                  }}` : ''}
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
          </Modal>
        );
      };
    `;
    return code;
  }
  return '';
}
