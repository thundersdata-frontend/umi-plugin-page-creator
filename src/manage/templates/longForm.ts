/*
 * @文件描述: 生成大表单页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:05:30
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-25 09:48:07
 */
import { createFormComponentsByType, transformFormItemLines, generateRules } from './util';
import { CardItemProps } from '../../../interfaces/common';

export interface Payload {
  cards: CardItemProps[];
  initialFetch?: string[];
  submitFetch?: string[];
}

export default function generateLongFormCode(payload: Payload): string {
  if (payload && payload.cards) {
    const { cards = [], initialFetch, submitFetch } = payload;

    const code = `
      import React, { useCallback } from 'react';
      import {
        Form,
        Button,
        Card,
        Row,
        Col,
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
      import { useRequest, history } from 'umi';
      import { Store } from 'antd/es/form/interface';
      import Title from '@/components/Title';
      import FooterToolbar from '@/components/FooterToolbar';

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
        const { id } = history.location.query;

        const fetchDetail = useCallback(async () => {
          if (id) {
            const result = await API.${initialFetch && initialFetch.length === 3 ? `${initialFetch[0]}.${initialFetch[1]}.${
              initialFetch[2].split('-')[0]
            }` : 'recruitment.person.getPerson'}.fetch(
              { personCode: id },
            );
            // 这里可以做数据转换操作
            const values = {
              ...result
            }
            form.setFieldsValue(values);
          }
        }, [id]);

        useRequest(fetchDetail, {
          refreshDeps: [fetchDetail],
        });

        const submit = (values: Store) => {
          // 这里可以做一些数据转换
          const payload = {
            ...values,
          };
          return API.${submitFetch && submitFetch.length === 3 ? `${submitFetch[0]}.${submitFetch[1]}.${
            submitFetch[2].split('-')[0]
          }` : 'recruitment.person.addPerson'}.fetch(payload);
        };

        const { loading, run: handleFinish } = useRequest(submit, {
          manual: true,
          onSuccess: () => {
            message.success('保存成功');
          },
          onError: error => {
            console.error(error.message);
            message.error('保存失败');
          },
        });

        return (
          <Form form={form} onFinish={handleFinish} layout="vertical">
            ${cards
              .map(card => {
                const { title = '', formItems = [] } = card;
                const cols = 3;
                // 把formItems分成3列
                const formItemLines = transformFormItemLines(formItems, cols);

                return `
                <Card title={<Title text="${title}" />} style={{ marginBottom: 16 }}>
                  ${formItemLines
                    .map(line => {
                      return `
                      <Row gutter={16}>
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
                              <Col {...colLayout}>
                                <Form.Item
                                  label="${label}"
                                  name="${name}"
                                  ${required ? `required` : ``}
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
                </Card>
              `;
              })
              .join('')}
            <FooterToolbar>
              <Button
                type="primary"
                onClick={() => form.submit()}
                loading={loading}
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
