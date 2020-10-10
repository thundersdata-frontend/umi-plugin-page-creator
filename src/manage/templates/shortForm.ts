/*
 * @文件描述: 生成短表单
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-07 14:04:41
 * @LastEditors: 廖军
 * @LastEditTime: 2020-10-10 10:10:28
 */
import { Store } from 'antd/lib/form/interface';
import { createFormComponentsByType, generateRules, generateBreadcrumbs } from './util';
import { FormItemProps } from '../../../interfaces/common';
import { getPageNameByPath } from '..';

export interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
  initialFetch?: string[];
  submitFetch?: string[];
  menu: string;
  path: string;
}

export default function generateShortFormCode(payload: Payload): string {
  if (payload && payload.formConfig && payload.formItems) {
    const { formConfig, formItems, initialFetch, submitFetch, menu, } = payload;
    const hasUploadItem = formItems.find(item => item.type === 'upload');

    const breadcrumbs = generateBreadcrumbs(menu);

    const code = `
      import React ${hasUploadItem ? ', { useState }' : ''} from 'react';
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
      import { getVerificationRules } from '@/pages/${getPageNameByPath(payload.path)}/validators';
      console.log('emptyline');
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
      console.log('emptyline');
      const submitFormLayout = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 10, offset: 7 },
        },
      };
      console.log('emptyline');
      export default () => {
        const [form] = Form.useForm();
        const { tip, setTip } = useSpinning();
        ${hasUploadItem ? `const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);` : ''}
        console.log('emptyline');
        const { id } = history.location.query;
        console.log('emptyline');
        const fetchDetail = () => {
            if (id) {
              setTip('加载详情中，请稍候...');
              return API.${initialFetch && initialFetch.length === 3 ? `${initialFetch[0]}.${initialFetch[1]}.${
                initialFetch[2].split('-')[0]
              }.fetch({ id })` : `recruitment.person.getPerson.fetch(
                { personCode: id },
              )`};
            }
            return Promise.resolve(false);
        };
        console.log('emptyline');
        const { loading } = useRequest(fetchDetail, {
          refreshDeps: [id],
          onSuccess: data => {
            const values = {
              ...data
            };
            form.setFieldsValue(values);
          },
        });
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
          },
        });
        console.log('emptyline');
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
                      ${`rules={[...${rules}, ...getVerificationRules('${name}').rules]}`}
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
                  <Button type="primary" htmlType="submit" loading={submitting} ${hasUploadItem ? 'disabled={submitBtnDisabled}' : ''}>
                    提交
                  </Button>
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
