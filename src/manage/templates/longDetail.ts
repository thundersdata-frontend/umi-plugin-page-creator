/*
 * @文件描述: 生成长详情页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 16:05:30
 * @LastEditors: 廖军
 * @LastEditTime: 2020-10-09 15:38:34
 */
import { transformFormItemLines, generateBreadcrumbs } from './util';
import { CardItemProps } from '../../../interfaces/common';

export interface Payload {
  cards: CardItemProps[];
  initialFetch?: string[];
  menu: string;
}

export default function generateLongFormCode(payload: Payload): string {
  if (payload && payload.cards) {
    const { cards = [], initialFetch, menu } = payload;

    const breadcrumbs = generateBreadcrumbs(menu);

    const code = `
      import React from 'react';
      import {
        Form,
        Card,
        Row,
        Col,
        Spin,
      } from 'antd';
      import { history } from 'umi';
      import { useRequest } from 'ahooks';
      import Title from '@/components/Title';
      import DetailValue from '@/components/DetailValue';
      ${breadcrumbs.length > 1 && `import CustomBreadcrumb from '@/components/CustomBreadcrumb';`}
      console.log('emptyline');
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
      console.log('emptyline');
      export default () => {
        const [form] = Form.useForm();
        const { id } = history.location.query;
        console.log('emptyline');
        const { loading } = useRequest(API.${initialFetch && initialFetch.length === 3 ? `${initialFetch[0]}.${initialFetch[1]}.${
          initialFetch[2].split('-')[0]
        }.fetch({ id })` : `recruitment.person.getPerson.fetch(
          { personCode: id },
        )`}, {
          ready: !!id,
          onSuccess: data => {
            const values = {
              ...data
            };
            form.setFieldsValue(values);
          }
        });
        console.log('emptyline');
        return (
          <Spin spinning={loading}>
            <CustomBreadcrumb list={${breadcrumbs}} />
            <Form form={form} layout="vertical">
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
                              const { label, name, type, ...restProps } = formItem;

                              return `
                              <Col {...colLayout}>
                                <Form.Item
                                  label="${formItem.label}"
                                  name="${formItem.name}"
                                >
                                  <DetailValue ${formItem.detailItemType && formItem.detailItemType !== 'default' ? `type="${formItem.detailItemType}"` : ''} />
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
            </Form>
          </Spin>
        );
      };
    `;
    return code;
  }
  return '';
}
