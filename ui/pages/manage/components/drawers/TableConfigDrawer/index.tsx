import React from 'react';
import { Drawer, Form, Input, Button, Radio } from 'antd';
import { filterEmpty } from '../../../../../utils';
import { Store } from 'antd/lib/form/interface';

export default ({
  setVisible,
  visible,
  onSubmit,
  tableConfig,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (values: Store) => void;
  tableConfig: Store;
}) => {
  return (
    <Drawer
      title="表格配置"
      visible={visible}
      width={360}
      onClose={() => setVisible(false)}
    >
      <Form
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        labelAlign="left"
        initialValues={{ ...tableConfig }}
        onFinish={values => onSubmit(filterEmpty(values))}
      >
        <Form.Item label="表格title" name="headerTitle">
          <Input />
        </Form.Item>
        <Form.Item label="表格rowKey" name="rowKey">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          确定
        </Button>
      </Form>
    </Drawer>
  );
};
