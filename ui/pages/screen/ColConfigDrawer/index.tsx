import React, { useState, useEffect } from 'react';
import { Drawer, Form, InputNumber, Divider, Button, Select, Row, Col, Input } from 'antd';
import { Store } from 'antd/lib/form/interface';
import * as props from './props';
import renderFormItem from '../../../components/FormItemConfig';
import { FormItemProps } from '../../../../interfaces/common';
import { renderPreviewImage } from '../helper';
import { ScreenColConfig } from '../../../../interfaces/screen';

const formLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const initialValues = {
  xs: 1,
  sm: 1,
  md: 1,
  lg: 1,
  xl: 1,
  xxl: 1,
  type: 'custom',
};

export default ({
  visible,
  toggleVisible,
  onFinish,
  col,
}: {
  visible: boolean;
  toggleVisible: () => void;
  onFinish: (values: Store) => void;
  col: ScreenColConfig;
}) => {
  const [form] = Form.useForm();
  const [type, setType] = useState('custom');

  useEffect(() => {
    if (col) {
      const {config: { type, chartConfig, xs, sm, md, lg, xl, xxl }} = col;
      form.setFieldsValue({
        type,
        ...chartConfig,
        xs: xs?.span,
        sm: sm?.span,
        md: md?.span,
        lg: lg?.span,
        xl: xl?.span,
        xxl: xxl?.span,
      });
      setType(type!);
    } else {
      form.setFieldsValue(initialValues);
      setType('custom');
    }
  }, [col])

  const renderOtherProps = () => {
    const otherProps = props[`${type}Props`];
    if (otherProps) {
      return otherProps.map((prop: FormItemProps) => renderFormItem({ formItem: prop }));
    }
    return null;
  };

  const handleFinish = (values: Store) => {
    onFinish(values);
    toggleVisible();
  };

  return (
    <Drawer title="图表容器配置" visible={visible} width={360} forceRender onClose={toggleVisible}>
      <Row justify="space-between" style={{ flexDirection: 'column' }}>
        <Col flex={3}>
          <Form form={form} onFinish={handleFinish} {...formLayout} initialValues={initialValues}>
            <Divider plain>宽度</Divider>
            <Form.Item label="xs" name="xs" required rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="sm" name="sm" required rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="md" name="md" required rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="lg" name="lg" required rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="xl" name="xl" required rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="xxl" name="xxl" required rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Divider plain>图表</Divider>
            <Form.Item label="标题" name="title" required rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="选择类型" name="type" required rules={[{ required: true }]}>
              <Select onChange={value => setType(value as string)}>
                <Select.Option value="custom">自定义</Select.Option>
                <Select.Option value="bar">普通柱状图</Select.Option>
                <Select.Option value="groupBar">分组柱状图</Select.Option>
                <Select.Option value="rangeBar">区间柱状图</Select.Option>
                <Select.Option value="barLine">柱线混合图</Select.Option>
                <Select.Option value="groupBarLine">分组柱线混合图</Select.Option>
                <Select.Option value="column">普通条形图</Select.Option>
                <Select.Option value="groupColumn">分组条形图</Select.Option>
                <Select.Option value="rangeColumn">区间条形图</Select.Option>
                <Select.Option value="circle">普通环形图</Select.Option>
                <Select.Option value="rose">玫瑰图</Select.Option>
                <Select.Option value="line">普通折线图</Select.Option>
                <Select.Option value="wave">水波图</Select.Option>
                <Select.Option value="radar">雷达图</Select.Option>
                <Select.Option value="circleStackBar">径向堆叠柱形图</Select.Option>
                <Select.Option value="scatter">单象限散点图</Select.Option>
                <Select.Option value="stackArea">堆叠面积图</Select.Option>
                <Select.Option value="stackBar">堆叠柱状图</Select.Option>
                <Select.Option value="stackRose">堆叠玫瑰图</Select.Option>
                <Select.Option value="waterfall">瀑布图</Select.Option>
                <Select.Option value="map">地图</Select.Option>
                <Select.Option value="table">滚动表格</Select.Option>
                <Select.Option value="rank">评分排名</Select.Option>
              </Select>
            </Form.Item>
            {renderOtherProps()}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Divider />
        <Col flex={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {renderPreviewImage(type)}
        </Col>
      </Row>
    </Drawer>
  );
};
