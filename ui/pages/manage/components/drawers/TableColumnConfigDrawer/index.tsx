import React from 'react';
import { Drawer, Form, Input, Button, Radio, Select, InputNumber } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { ColumnType } from 'antd/lib/table';

export default function<T>({
  setVisible,
  visible,
  onSubmit,
  current,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (values: Store) => void;
  current?: ColumnType<T>;
}) {
  const initialValues = current || {
    align: 'left',
    ellipsis: true,
    copyable: true,
    valueType: 'text',
    hideInSearch: false,
  };
  return (
    <Drawer
      title="表格列配置"
      visible={visible}
      width={360}
      onClose={() => setVisible(false)}
      destroyOnClose
    >
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        labelAlign="right"
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          label="列头显示文字"
          name="title"
          required
          rules={[{ required: true, message: '字段必填' }]}
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="dataIndex"
          name="dataIndex"
          required
          rules={[{ required: true, message: '字段必填' }]}
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item label="对齐方式" name="align">
          <Radio.Group
            options={[
              { label: '左', value: 'left' },
              { label: '右', value: 'right' },
              { label: '居中', value: 'center' },
            ]}
          />
        </Form.Item>
        <Form.Item label="自动缩略" name="ellipsis">
          <Radio.Group options={[{ label: '是', value: true }, { label: '否', value: false }]} />
        </Form.Item>
        <Form.Item label="支持复制" name="copyable">
          <Radio.Group options={[{ label: '是', value: true }, { label: '否', value: false }]} />
        </Form.Item>
        <Form.Item label="枚举值" name="valueEnum">
          <Input.TextArea
            rows={5}
            autoSize
            placeholder={`{
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
  },
}`}
          />
        </Form.Item>
        <Form.Item label="值类型" name="valueType">
          <Select>
            {[
              { label: '默认值', value: 'text' },
              { label: '转化值为金额', value: 'money' },
              { label: '日期', value: 'date' },
              { label: '日期区间', value: 'dateRange' },
              { label: '日期和时间', value: 'dateTime' },
              { label: '日期和时间区间', value: 'dateTimeRange' },
              { label: '时间', value: 'time' },
              { label: '操作项', value: 'option' },
              { label: 'textarea 组件', value: 'textarea' },
              { label: '序号列', value: 'index' },
              { label: '带 border 的序号列', value: 'indexBorder' },
              { label: '进度条', value: 'progress' },
              { label: '单纯的数字', value: 'digit' },
              { label: '百分比', value: 'percent' },
              { label: '代码块', value: 'code' },
              { label: '头像', value: 'avatar' },
              { label: '自定义', value: 'custom' },
            ].map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="不在查询里显示" name="hideInSearch">
          <Radio.Group options={[{ label: '是', value: true }, { label: '否', value: false }]} />
        </Form.Item>
        <Form.Item label="查询显示顺序" name="order">
          <InputNumber min={0} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          确定
        </Button>
      </Form>
    </Drawer>
  );
}
