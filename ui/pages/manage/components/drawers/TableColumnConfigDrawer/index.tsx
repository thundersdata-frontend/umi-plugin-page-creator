import React, { useContext, useMemo, useEffect, useState } from 'react';
import { Drawer, Form, Input, Button, Radio, Select, InputNumber, Tooltip, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { ColumnType } from 'antd/lib/table';
import Context from '../../../Context';

const { Option } = Select;

export default function <T>({
  setVisible,
  visible,
  onSubmit,
  current,
  initialFetch,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (values: Store) => void;
  current?: ColumnType<T>;
  initialFetch?: string[];
}) {
  const [form] = Form.useForm();
  const { baseClasses = [] } = useContext(Context);
  const [responseName, setResponseName] = useState<string>();

  const initialValues = {
    title: '',
    dataIndex: '',
    align: 'left',
    ellipsis: false,
    copyable: false,
    valueType: 'text',
    hideInSearch: false,
    hideInTable: false,
    order: undefined,
  };
  useEffect(() => {
    if (current) {
      form.setFieldsValue(current);
    } else {
      form.setFieldsValue(initialValues);
    }
  }, [current]);

  /** initialFetch中第三个值为value-paramsName-responseName，获取初始数据选用responseName作为DTO */
  useEffect(() => {
    if (initialFetch && initialFetch.length === 3) {
      const responseName = initialFetch[2].split('-')[2];
      setResponseName(responseName);
    }
  }, [initialFetch]);

  const properties = useMemo(
    () => baseClasses.find(item => item.name === responseName)?.properties || [],
    [baseClasses, responseName],
  );

  const handleChange = (value: string) => {
    const matchClass = properties.find(item => item.value === value);
    form.setFieldsValue({
      title: matchClass?.label,
      dataIndex: value,
    });
  };

  return (
    <Drawer
      title="表格列配置"
      visible={visible}
      width={360}
      onClose={() => {
        form.setFieldsValue(initialValues);
        setVisible(false);
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        labelAlign="right"
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        {initialFetch && initialFetch.length > 0 && (
          <Form.Item label="属性值" name="prop">
            <Select onChange={handleChange}>
              {properties.map(prop => (
                <Option
                  key={prop.value}
                  value={prop.value}
                >{`${prop.label}(${prop.value})`}</Option>
              ))}
            </Select>
          </Form.Item>
        )}
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
          <Radio.Group
            options={[
              { label: '是', value: true },
              { label: '否', value: false },
            ]}
          />
        </Form.Item>
        <Form.Item label="支持复制" name="copyable">
          <Radio.Group
            options={[
              { label: '是', value: true },
              { label: '否', value: false },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={
            <label>
              <span style={{ paddingRight: 5 }}>枚举值</span>
              <Tooltip
                overlay={`{
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
  },
}`}
              >
                <QuestionCircleOutlined />
              </Tooltip>
            </label>
          }
          name="valueEnum"
        >
          <Input.TextArea rows={5} autoSize placeholder="此处可以输入常量配置里面的变量" />
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
          <Radio.Group
            options={[
              { label: '是', value: true },
              { label: '否', value: false },
            ]}
          />
        </Form.Item>
        <Form.Item label="不在table里显示" name="hideInTable">
          <Radio.Group
            options={[
              { label: '是', value: true },
              { label: '否', value: false },
            ]}
          />
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
