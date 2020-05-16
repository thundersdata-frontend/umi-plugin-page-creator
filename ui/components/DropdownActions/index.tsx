import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
import classNames from 'classnames';

import styles from './index.module.less';
import { Store } from 'antd/lib/form/interface';

export default ({
  onRemoteCall,
  modalVisible,
  setModalVisible,
  modal = false,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onRemoteCall: (values: { path: string; dirName?: string }) => void;
  modal?: boolean;
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: Store) => {
    if (!modal) {
      const path: string = values.path;
      onRemoteCall({ path: path.startsWith('/') ? path : `/${path}` });
    } else {
      const { path, dirName } = values;
      onRemoteCall({ path: path.startsWith('/') ? path : `/${path}`, dirName });
    }
  };

  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
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
        forceRender
        getContainer={false}
        visible={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} onFinish={handleSubmit} {...formLayout}>
          {!modal ? (
            <Form.Item
              label="添加到路径"
              name="path"
              required
              rules={[{ required: true, message: '请输入你要添加的路径' }]}
            >
              <Input />
            </Form.Item>
          ) : (
            <>
              <Form.Item
                label="添加到目录"
                name="path"
                required
                rules={[{ required: true, message: '请输入你要添加的目录' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="文件名"
                name="dirName"
                required
                rules={[
                  { required: true, message: '请输入文件名' },
                  {
                    pattern: /^[A-Z][a-zA-Z]+$/,
                    message: '文件名应采用大驼峰命名法',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};
