import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
import classNames from 'classnames';

import styles from './index.module.less';
import { Store } from 'antd/lib/form/interface';

export default ({
  onRemoteCall,
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onRemoteCall: (path: string) => void;
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: Store) => {
    const path: string = values.path;
    onRemoteCall(path.startsWith('/') ? path : `/${path}`);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModalVisible(true)}
        className={classNames(styles.bubble, styles.fixed)}
      >
        提交
      </Button>
      <Modal
        title="添加页面"
        destroyOnClose
        visible={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="添加到路径"
            name="path"
            required
            rules={[{ required: true, message: '请输入你要添加的路径' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
