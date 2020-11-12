/*
 * @文件描述: 生成单列表单弹窗
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-07 14:04:41
 * @LastEditors: 廖军
 * @LastEditTime: 2020-10-10 17:41:18
 */
import { Store } from 'antd/lib/form/interface';
import { createFormComponentsByType, generateRules } from './util';
import { FormItemProps } from '../../../interfaces/common';
import { getPageNameByPath } from '..';

export interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
  submitFetch?: string[];
  fromTable: boolean;
  path: string;
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
      import { isEmpty } from 'lodash-es';
      import { FormInstance } from 'antd/lib/form';
      import { Store } from 'antd/es/form/interface';
      import { useRequest } from 'ahooks';
      import useSpinning from '@/hooks/useSpinning';
      import { getVerificationRules } from '@/pages/${getPageNameByPath(payload.path)}/validators';
      console.log('emptyline');
      const formLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 17 },
      };
      console.log('emptyline');
      export default ({
        visible,
        toggleVisible,
        formData,
        loading,
        ${fromTable ? `reload,` : ''}
      }: {
        visible: boolean;
        toggleVisible: () => void;
        formData: Store;
        loading: boolean;
        ${fromTable ? `reload?: () => void;` : ''}
      }) => {
        const [form] = Form.useForm();
        const { tip, setTip } = useSpinning();
        ${item ? `const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);` : ''}
        console.log('emptyline');
        useEffect(() => {
          if (!isEmpty(formData)) {
            form.setFieldsValue(formData);
          }
        }, [formData]);
        console.log('emptyline');
        const handleCancel = () => {
          toggleVisible();
          form.resetFields();
        }
        console.log('emptyline');
        const submit = (values: Store) => {
          setTip('数据保存中，请稍候...');
          console.log('emptyline');
          const payload = {
            ...values,
          };
          console.log('emptyline');
          return API.${submitFetch && submitFetch.length === 3 ? `${submitFetch[0]}.${submitFetch[1]}.${
            submitFetch[2].split('-')[0]
          }` : 'recruitment.person.addPerson'}.fetch(payload);
        };
        console.log('emptyline');
        const { run: handleFinish, loading: submitting } = useRequest(submit, {
          manual: true,
          onSuccess: () => {
            message.success('保存成功');
            form.resetFields();
            ${fromTable ? `reload && reload();` : ''}
          },
        });
        console.log('emptyline');
        return (
          <Modal
            centered
            visible={visible}
            forceRender
            maskClosable={false}
            title="${formConfig.title}"
            okButtonProps={{ htmlType: 'submit', ${item ? 'disabled: submitBtnDisabled' : ''} }}
            onOk={() => form.submit()}
            onCancel={handleCancel}
            confirmLoading={submitting}
          >
            <Spin spinning={loading && submitting} tip={tip}>
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
                      ${`rules={[...${rules}, ...getVerificationRules('${name}').rules]}`}
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
