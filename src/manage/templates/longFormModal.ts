/*
 * @文件描述: 生成大表单页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:05:30
 * @LastEditors: 廖军
 * @LastEditTime: 2020-10-10 17:40:45
 */
import { createFormComponentsByType, transformFormItemLines, generateRules } from './util';
import { FormItemProps } from '../../../interfaces/common';
import { Store } from 'antd/lib/form/interface';
import { getPageNameByPath } from '..';

export interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
  submitFetch?: string[];
  fromTable: boolean;
  path: string;
}

export default function generateLongFormModalCode(payload: Payload): string {
  if (payload && payload.formConfig && payload.formItems) {
    const { formConfig, formItems = [], submitFetch, fromTable } = payload;

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
      import { isEmpty } from 'lodash-es';
      import { useRequest } from 'ahooks';
      import useSpinning from '@/hooks/useSpinning';
      import { getVerificationRules } from '@/pages/${getPageNameByPath(payload.path)}/validators';
      console.log('emptyline');
      const twoColumnsLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
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
        };
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
          }
        });
        console.log('emptyline');
        return (
          <Modal
            width={650}
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
