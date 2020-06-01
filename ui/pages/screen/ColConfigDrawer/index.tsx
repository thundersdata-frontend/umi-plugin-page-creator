import React, { useState } from 'react';
import { Drawer, Form, InputNumber, Divider, Button, Select, Row, Col } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { SelectValue } from 'antd/lib/select';
import * as props from './props';
import renderFormItem from '../../../components/FormItemConfig';
import { FormItemProps } from '../../../../interfaces/common';
import { renderPreviewImage } from '../helper';

const formLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const initialValues = {
  flex: 1,
};

export default ({
  visible,
  toggleVisible,
  onFinish,
}: {
  visible: boolean;
  toggleVisible: () => void;
  onFinish: (values: Store) => void;
}) => {
  const [form] = Form.useForm();
  const [type, setType] = useState<string>('');

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
            <Form.Item label="宽度占比" name="flex" required rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="类型" name="type" required rules={[{ required: true }]}>
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
