/*
 * @文件描述: 生成短表单
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-07 14:04:41
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-25 09:48:39
 */
import { Store } from 'antd/lib/form/interface';
import { createFormComponentsByType, generateRules, generateBreadcrumbs } from './util';
import { FormItemProps } from '../../../interfaces/common';

export interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
  initialFetch?: string[];
  submitFetch?: string[];
  menu: string;
}

export default function generateShortFormCode(payload: Payload): string {
  if (payload && payload.formConfig && payload.formItems) {
    const { formConfig, formItems, initialFetch, submitFetch, menu, } = payload;
    const item = formItems.find(item => item.type === 'upload');

    const breadcrumbs = generateBreadcrumbs(menu);

    const code = `
      import React, { useCallback ${item ? ', useState' : ''} } from 'react';
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
        Spin,
      } from 'antd';
      import { Store } from 'antd/es/form/interface';
      import { history } from 'umi';
      import { useRequest } from 'ahooks';
      import Title from '@/components/Title';
      import useSpinning from '@/hooks/useSpinning';
      ${breadcrumbs.length > 1 && `import CustomBreadcrumb from '@/components/CustomBreadcrumb';`}

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
        const { tip, setTip } = useSpinning(loading);
        ${item ? `const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);` : ''}

        const { id } = history.location.query;

        const fetchDetail = () => {
            setTip('加载详情中，请稍候...');
            return API.${initialFetch && initialFetch.length === 3 ? `${initialFetch[0]}.${initialFetch[1]}.${
              initialFetch[2].split('-')[0]
            }` : 'recruitment.person.getPerson'}.fetch(
              { personCode: id },
            );
        };


        const { loading } = useRequest(fetchDetail, {
          ready: !!id,
          onSuccess: data => {
            // TODO 这里可以做数据转换操作
            const values = {
              ...data
            };
            form.setFieldsValue(values);
          },
        });

        const submit = (values: Store) => {
          setTip('数据保存中，请稍候...');

          const payload = {
            ...values,
          }; // TODO 这里可以做一些数据转换

          return API.${submitFetch && submitFetch.length === 3 ? `${submitFetch[0]}.${submitFetch[1]}.${
            submitFetch[2].split('-')[0]
          }` : 'recruitment.person.addPerson'}.fetch(payload);
        };

        const { run: handleFinish, loading: submitting } = useRequest(submit, {
          manual: true,
          onSuccess: () => {
            message.success('保存成功');
          },
        });

        return (
          <Spin spinning={loading && submitting} tip={tip}>
            <CustomBreadcrumb list={${breadcrumbs}} />
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
                      ${item.type === 'upload' ? `
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
                <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
                  <Button type="primary" htmlType="submit" ${item ? 'disabled={submitBtnDisabled}' : ''}>
                    提交
                  </Button>
                  <Button style={{ marginLeft: 10 }}>取消</Button>
                </Form.Item>
              </Form>
            </Card>
          </Spin>
        );
      };
    `;
    return code;
  }
  return '';
}
