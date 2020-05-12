import React from 'react';
import { Form, Button, Card, Row, Col } from 'antd';
import { useToggle } from '@umijs/hooks';
import { Store } from 'antd/es/form/interface';
import Title from '@/components/Title';
import FooterToolbar from '@/components/FooterToolbar';
import DetailValue from '@/components/DetailValue';

const colLayout = {
  lg: {
    span: 8,
  },
  md: {
    span: 12,
  },
  sm: {
    span: 24,
  },
};

export default () => {
  const [form] = Form.useForm();
  const btnToggle = useToggle(false);

  return (
    <Form form={form} layout="vertical">
      <Card title={<Title text="自定义Card0" />} style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col {...colLayout}>
            <Form.Item label="International Group Architect" name="Koch">
              <DetailValue />
            </Form.Item>
          </Col>

          <Col {...colLayout}>
            <Form.Item
              label="District Configuration Executive"
              name="McLaughlin"
            >
              <DetailValue />
            </Form.Item>
          </Col>

          <Col {...colLayout}>
            <Form.Item label="Principal Web Coordinator" name="Osinski">
              <DetailValue />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col {...colLayout}>
            <Form.Item label="Direct Security Consultant" name="Ebert">
              <DetailValue />
            </Form.Item>
          </Col>

          <Col {...colLayout}>
            <Form.Item
              label="Central Implementation Strategist"
              name="Medhurst"
            >
              <DetailValue />
            </Form.Item>
          </Col>

          <Col {...colLayout}>
            <Form.Item
              label="Future Interactions Representative"
              name="Spencer"
            >
              <DetailValue />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      ,
      <Card title={<Title text="自定义Card1" />} style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col {...colLayout}>
            <Form.Item
              label="Regional Infrastructure Officer"
              name="Altenwerth"
            >
              <DetailValue />
            </Form.Item>
          </Col>

          <Col {...colLayout}>
            <Form.Item label="Central Interactions Agent" name="Conn">
              <DetailValue />
            </Form.Item>
          </Col>

          <Col {...colLayout}>
            <Form.Item label="Central Markets Planner" name="Bosco">
              <DetailValue />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col {...colLayout}>
            <Form.Item label="Product Integration Assistant" name="Carroll">
              <DetailValue />
            </Form.Item>
          </Col>

          <Col {...colLayout}>
            <Form.Item label="Investor Solutions Facilitator" name="Farrell">
              <DetailValue />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};
