/*
 * @文件描述: 接口API的配置内容
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 17:56:31
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-19 14:40:21
 */
import React, { useContext } from 'react';
import { Form, Button, Drawer, Cascader } from 'antd';
import { Store } from 'antd/lib/form/interface';
import Context from '../../../Context';

export default ({
  visible,
  setVisible,
  onSubmit,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (initialFetch?: string[], submitFetch?: string[]) => void;
}) => {
  const { databases = [] } = useContext(Context);
  const [form] = Form.useForm();

  const handleFinish = (values: Store) => {
    setVisible(false);
    const { initialFetch, submitFetch } = values;
    onSubmit(initialFetch, submitFetch);
  };

  return (
    <Drawer title="接口API配置" width={360} visible={visible} onClose={() => setVisible(false)}>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item label="页面加载时调用" name="initialFetch">
          <Cascader options={databases} />
        </Form.Item>
        <Form.Item label="提交时调用" name="submitFetch">
          <Cascader options={databases} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
