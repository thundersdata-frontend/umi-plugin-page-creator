/*
 * @文件描述: 生成长详情页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:05:30
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-12 20:24:34
 */
import { CardItemProps } from '@/interfaces/common';
import { transformFormItemLines } from './util';

export interface Payload {
  cards: CardItemProps[];
}

export default function generateLongFormCode(payload: Payload): string {
  if (payload && payload.cards) {
    const { cards = [] } = payload;

    const code = `
      import React from 'react';
      import {
        Form,
        Button,
        Card,
        Row,
        Col,
      } from 'antd';
      import { Store } from 'antd/es/form/interface';
      import Title from '@/components/Title';
      import FooterToolbar from '@/components/FooterToolbar';
      import DetailValue from '@/components/DetailValue';

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

        return (
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
        );
      };
    `;
    return code;
  }
  return '';
}
