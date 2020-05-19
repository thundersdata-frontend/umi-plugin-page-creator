/*
 * @文件描述: 生成长详情页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:05:30
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-19 11:29:57
 */
import { transformFormItemLines } from './util';
import { CardItemProps } from '../../interfaces/common';

export interface Payload {
  cards: CardItemProps[];
  initialFetch?: string[];
}

export default function generateLongFormCode(payload: Payload): string {
  if (payload && payload.cards) {
    const { cards = [], initialFetch } = payload;

    const code = `
      import React from 'react';
      import {
        Form,
        Card,
        Row,
        Col,
        Spin,
      } from 'antd';
      import Title from '@/components/Title';
      import DetailValue from '@/components/DetailValue';
      ${
        !initialFetch
          ? `import { useToggle } from '@umijs/hooks';`
          : `import { useRequest } from 'umi';`
      }

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
        ${
          initialFetch
            ? `
          const { loading } = useRequest(() => API.${initialFetch[0]}.${initialFetch[1]}.${initialFetch[2]}.fetch({}), {
            onSuccess: data => {
              form.setFieldsValue(data);
            },
            onError: error => {
              message.error(error.message);
            }
          })
        `
            : `
          const toggle = useToggle(false);
        `
        }

        return (
          <Spin spinning={${initialFetch ? 'loading' : 'toggle.state'}}>
            <Form form={form} layout="vertical">
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
                              const { label, name, type, ...restProps } = formItem;

                              return `
                              <Col {...colLayout}>
                                <Form.Item
                                  label="${formItem.label}"
                                  name="${formItem.name}"
                                >
                                  <DetailValue />
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
            </Form>
          </Spin>
        );
      };
    `;
    return code;
  }
  return '';
}
