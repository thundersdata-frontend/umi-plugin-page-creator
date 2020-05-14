/*
 * @文件描述: 生成大表单页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:05:30
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-14 18:27:12
 */
import { createFormComponentsByType, transformFormItemLines } from './util';
import { CardItemProps } from '../../ui/interfaces/common';

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
        Input,
        Button,
        Card,
        Row,
        Col,
      } from 'antd';
      import { useToggle } from '@umijs/hooks';
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
        const btnToggle = useToggle(false);

        const handleFinish = (values: Store) => {
          console.log(values);
          btnToggle.toggle();
        };

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
                            const { label, name, type, ...restProps } = formItem;

                            return `
                            <Col {...colLayout}>
                              <Form.Item
                                label="${formItem.label}"
                                name="${formItem.name}"
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
