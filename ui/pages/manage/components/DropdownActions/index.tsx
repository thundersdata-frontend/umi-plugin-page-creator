import React, { useContext } from 'react';
import { Button, Modal, Form, Input, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
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
  onRemoteCall: (values: {
    path: string;
    menu?: string;
    dirName?: string;
    initialFetch?: string[];
    submitFetch?: string[];
  }) => void;
  modal?: boolean;
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: Store) => {
    const { initialFetch, submitFetch } = values;
    if (!modal) {
      const { path, menu } = values;
      onRemoteCall({
        path: path.startsWith('/') ? path : `/${path}`,
        menu,
        initialFetch,
        submitFetch,
      });
    } else {
      const { path, dirName } = values;
      onRemoteCall({
        path: path.startsWith('/') ? path : `/${path}`,
        dirName,
        initialFetch,
        submitFetch,
      });
    }
  };

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
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
        width={650}
        getContainer={false}
        visible={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} onFinish={handleSubmit} {...formLayout}>
          {!modal ? (
            <>
              <Form.Item
                label={
                  <label>
                    <span style={{ paddingRight: 10 }}>添加到路径</span>
                    <Tooltip overlay="多级路径以/分隔">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </label>
                }
                name="path"
                required
                rules={[{ required: true, message: '请输入你要添加的路径' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <label>
                    <span style={{ paddingRight: 10 }}>菜单</span>
                    <Tooltip overlay="多级菜单以/分隔，目前只支持两级菜单">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </label>
                }
                name="menu"
                required
                rules={[{ required: true, message: '请输入你要添加的菜单' }]}
              >
                <Input />
              </Form.Item>
            </>
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
