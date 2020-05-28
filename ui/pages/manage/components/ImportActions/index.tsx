import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
import classNames from 'classnames';
import styles from './index.module.less';
import { Store } from 'antd/lib/form/interface';

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default ({
  modalVisible,
  setModalVisible,
  onSubmit,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onSubmit: (values: Store) => void;
}) => {
  const [form] = Form.useForm();

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModalVisible(true)}
        className={classNames(styles.bubble, styles.fixed)}
      >
        导入
      </Button>
      <Modal
        title="导入页面"
        destroyOnClose
        forceRender
        width={650}
        getContainer={false}
        visible={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} onFinish={onSubmit} {...formLayout}>
          <Form.Item
            label="配置参数"
            name="importConfig"
            required
            rules={[{ required: true, message: '请输入你要导入的配置参数' }]}
          >
            <Input.TextArea autoSize placeholder="请输入你要导入的配置参数" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}