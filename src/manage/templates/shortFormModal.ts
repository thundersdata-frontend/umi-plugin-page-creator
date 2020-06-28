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
  fromTable: boolean;
}

export default function generateShortFormModalCode(payload: Payload): string {
  if (payload && payload.formConfig && payload.formItems) {
    const { formConfig, formItems, submitFetch, fromTable } = payload;
    const item = formItems.find(item => item.type === 'upload');

    const code = `
      import React, { useEffect ${item ? ', useState' : ''} } from 'react';
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
      import useSpinning from '@/hooks/useSpinning';
      ${fromTable && `import { ActionType } from '@ant-design/pro-table';`}

      const formLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 17 },
      };

      export default ({
        visible,
        toggleVisible,
        formData,
        loading,
        ${fromTable && `tableRef,`}
      }: {
        visible: boolean;
        toggleVisible: () => void;
        formData: Store;
        loading: boolean;
        ${fromTable && `tableRef: ActionType;`}
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
          form.resetFields();
        }

        const submit = (values: Store) => {
          setSpinning(true);
          setTip('数据保存中，请稍候...');

          const payload = {
            ...values,
          }; // TODO 这里可以做一些数据转换

          return API.${submitFetch && submitFetch.length === 3 ? `${submitFetch[0]}.${submitFetch[1]}.${
            submitFetch[2].split('-')[0]
          }` : 'recruitment.person.addPerson'}.fetch(payload);
        };

        const { run: handleFinish } = useRequest(submit, {
          manual: true,
          onSuccess: () => {
            message.success('保存成功');
            setSpinning(false);
            form.resetFields();
            ${fromTable && `tableRef.reload();`}
          },
          onError: error => {
            console.error(error.message);
            message.error('保存失败');
            setSpinning(false);
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
            okButtonProps={{ htmlType: 'submit', ${item ? 'disabled: submitBtnDisabled' : ''} }}
            onOk={() => form.submit()}
            onCancel={handleCancel}
          >
            <Spin spinning={spinning} tip={tip}>
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
