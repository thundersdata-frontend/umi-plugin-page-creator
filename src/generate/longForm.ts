/*
 * @文件描述: 生成大表单页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:05:30
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-25 09:48:07
 */
import { createFormComponentsByType, transformFormItemLines, generateRules } from './util';
import { CardItemProps } from '../../interfaces/common';

export interface Payload {
  cards: CardItemProps[];
  initialFetch?: string[];
  submitFetch?: string[];
}

export default function generateLongFormCode(payload: Payload): string {
  if (payload && payload.cards) {
    const { cards = [], initialFetch, submitFetch } = payload;

    const code = `
      import React from 'react';
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
      } from 'antd';

      ${initialFetch || submitFetch ? `import { useRequest } from 'umi';` : ''}
      ${!submitFetch ? `import { useToggle } from '@umijs/hooks';` : ''}
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
        ${!submitFetch ? `const submitBtn = useToggle(false);` : ''}

        ${
          initialFetch && initialFetch.length === 3
            ? `
          useRequest(() => API.${initialFetch[0]}.${initialFetch[1]}.${initialFetch[2].split('-')[0]}.fetch({}), {
            onSuccess: data => {
              form.setFieldsValue(data);
            },
            onError: error => {
              message.error(error.message);
            }
          })
        `
            : ''
        }

        ${
          submitFetch && submitFetch.length === 3
            ? `
          const submit = (values: Store) => {
            console.log(values);
            return API.${submitFetch[0]}.${submitFetch[1]}.${submitFetch[2].split('-')[0]}.fetch({ ... values });
          };

          const { loading, run: handleFinish } = useRequest(submit, {
            manual: true,
            onSuccess: () => {
              message.success('保存成功');
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
            submitBtn.toggle();
          }
        `
        }

        return (
          <Form form={form} onFinish={handleFinish} layout="vertical">
            ${cards.map(card => {
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
                              customRules = [],
                              ...restProps
                            } = formItem;
                            const rules = generateRules(customRules as string, required as boolean);
                            return `
                              <Col {...colLayout}>
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
                </Card>
              `;
            })}
            <FooterToolbar>
              <Button
                type="primary"
                onClick={() => form.submit()}
                loading={${submitFetch ? 'loading' : 'submitBtn.state'}}
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
