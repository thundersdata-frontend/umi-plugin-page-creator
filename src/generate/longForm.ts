/*
 * @文件描述: 生成大表单页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:05:30
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-08 16:13:24
 */
import { Store } from 'antd/lib/form/interface';
import { FormItemProps } from '@/interfaces/common';

export interface Payload {
  formConfig: Store;
  formItems: FormItemProps[];
}

export default function generateLongFormCode(payload: Payload): string {
  if (payload && payload.formConfig && payload.formItems) {
    const { formConfig, formItems } = payload;

    const code = `
      import React from 'react';
      import {
        Form,
        Input,
        Button,
        Card,
        Row,
        Col,
        Select,
        DatePicker,
        TimePicker,
      } from 'antd';
      import { useToggle } from '@umijs/hooks';
      import { Store } from 'antd/es/form/interface';
      import Title from '@/components/Title';
      import FooterToolbar from '@/components/FooterToolbar';
      import styles from './index.less';

      const { Option } = Select;
      const { RangePicker } = DatePicker;

      const colLayout = {
        lg: {
          span: 8
        },
        md: {
          span: 12
        },
        sm: {
          span: 24
        }
      }

      export default () => {
        const [form] = Form.useForm();
        const btnToggle = useToggle(false);

        const handleFinish = (values: Store) => {
          console.log(values);
          btnToggle.toggle();
        };

        return (
          <Form form={form} onFinish={handleFinish} layout="vertical">
            <Card title={<Title text="${formConfig.title}" />} style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col {...colLayout}>
                  <Form.Item
                    label={fieldLabels.name}
                    name="name"
                    rules={[{ required: true, message: '请输入仓库名称' }]}
                  >
                    <Input placeholder="请输入仓库名称" />
                  </Form.Item>
                </Col>
                <Col {...colLayout}>
                  <Form.Item
                    label={fieldLabels.url}
                    name="url"
                    rules={[{ required: true, message: '请选择' }]}
                  >
                    <Input
                      style={{ width: '100%' }}
                      addonBefore="http://"
                      addonAfter=".com"
                      placeholder="请输入"
                    />
                  </Form.Item>
                </Col>
                <Col {...colLayout}>
                  <Form.Item
                    label={fieldLabels.owner}
                    name="owner"
                    rules={[{ required: true, message: '请选择管理员' }]}
                  >
                    <Select placeholder="请选择管理员">
                      <Option value="xiao">付晓晓</Option>
                      <Option value="mao">周毛毛</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <FooterToolbar>
              <Button
                type="primary"
                onClick={() => form.submit()}
                loading={btnToggle.state}
              >
                提交
              </Button>
            </FooterToolbar>
          </Form>
        );
      };
    `;
    return code;
  }
  return '';
}
