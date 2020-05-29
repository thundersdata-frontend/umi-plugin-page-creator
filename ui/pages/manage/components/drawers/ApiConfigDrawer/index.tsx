/*
 * @文件描述: 接口API的配置内容
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 17:56:31
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-28 18:24:49
 */
import React, { useContext, useEffect } from 'react';
import { Form, Button, Drawer, Cascader } from 'antd';
import { Store } from 'antd/lib/form/interface';
import Context from '../../../Context';

export default ({
  visible,
  setVisible,
  onSubmit,
  submitFetch,
  initialFetch,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (initialFetch?: string[], submitFetch?: string[]) => void;
  submitFetch?: string[];
  initialFetch?: string[];
}) => {
  const { databases = [] } = useContext(Context);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      initialFetch
    })
  }, [initialFetch]);

  useEffect(() => {
    form.setFieldsValue({
      submitFetch
    })
  }, [submitFetch]);

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
