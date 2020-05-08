import React, { useState } from 'react';
import { Button, message, Dropdown, Modal, Form, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import styles from './index.module.less';
import { TemplateType } from '../../interfaces/common';
import { Store } from 'antd/lib/form/interface';

export default ({
  setVisible,
  templateType,
  onRemoteCall,
  modalVisible,
  setModalVisible,
}: {
  setVisible: (visible: boolean) => void;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  templateType?: TemplateType;
  onRemoteCall: (path: string) => void;
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: Store) => {
    const path: string = values.path;
    onRemoteCall(path.startsWith('/') ? path : `/${path}`);
  };

  const actions = (
    <div className={styles.actionWrap}>
      <Button
        type="primary"
        onClick={() => {
          if (!templateType) {
            message.warning('请选择模板');
            return;
          }
          setVisible(true);
        }}
        className={classnames(styles.bubble, styles.space)}
      >
        配置
      </Button>
      <Button
        type="primary"
        onClick={() => setModalVisible(true)}
        className={classnames(styles.bubble, styles.space)}
      >
        提交
      </Button>
    </div>
  );

  return (
    <>
      <Dropdown
        overlay={actions}
        trigger={['click']}
        placement="topCenter"
        getPopupContainer={triggerNode => triggerNode.parentElement!}
      >
        <Button className={classnames(styles.bubble, styles.fixed)}>
          <PlusCircleOutlined style={{ fontSize: 30 }} />
        </Button>
      </Dropdown>
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
