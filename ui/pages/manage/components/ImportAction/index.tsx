import React, { useContext } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import classNames from 'classnames';
import styles from './index.module.less';
import { Store } from 'antd/lib/form/interface';
import Context from '../../Context';

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

  const { templateType } = useContext(Context);

  const handleFinish = (values: Store) => {
    form.resetFields();
    onSubmit(values);
  }
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          if (templateType) {
            setModalVisible(true)
          } else {
            message.warning('请先选择模板')
          }
        }}
        className={classNames(styles.bubble, styles.fixed)}
      >
        导入
      </Button>
      <Modal
        title="导入页面"
        forceRender
        width={650}
        visible={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => setModalVisible(false)}
        bodyStyle={{ maxHeight: 650, overflowY: 'auto' }}
      >
        <Form form={form} onFinish={handleFinish} {...formLayout}>
          <Form.Item
            label="配置参数"
            name="importConfig"
            required
            rules={[{ required: true, message: '请输入你要导入的配置参数' }]}
          >
            <Input.TextArea cols={10} placeholder="请输入你要导入的配置参数" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
