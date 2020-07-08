import React, { useContext } from 'react';
import { Button, Modal, Form, Input, Tooltip, Divider, Checkbox, Radio } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './index.module.less';
import { Store } from 'antd/lib/form/interface';

export default ({
  showCreatePatchCheckbox = false,
  onRemoteCall,
  modalVisible,
  setModalVisible,
  modal = false,
  type,
}: {
  showCreatePatchCheckbox?: boolean;
  type: 'detail' | 'form' | 'table' | 'formWithDetail';
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onRemoteCall: (values: {
    formPath?: string;
    formMenu?: string;
    detailPath?: string;
    detailMenu?: string;
    path?: string;
    menu?: string;
    formDirName?: string;
    detailDirName?: string;
    dirName?: string;
  }) => void;
  modal?: boolean;
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: Store) => {
    if (!modal) {
      if (type !== 'formWithDetail') {
        const { path, menu } = values;
        onRemoteCall({
          path: path.startsWith('/') ? path : `/${path}`,
          menu,
        });
      } else {
        const { formPath, formMenu, detailPath, detailMenu } = values;
        onRemoteCall({
          formPath: formPath.startsWith('/') ? formPath : `/${formPath}`,
          formMenu,
          detailPath: detailPath.startsWith('/') ? detailPath : `/${detailPath}`,
          detailMenu,
        });
      }
    } else {
      if (type !== 'formWithDetail') {
        const { path, dirName } = values;
        onRemoteCall({
          path: path.startsWith('/') ? path : `/${path}`,
          dirName,
        });
      } else {
        const { formPath, formDirName, detailPath, detailDirName } = values;
        onRemoteCall({
          formPath: formPath.startsWith('/') ? formPath : `/${formPath}`,
          formDirName,
          detailPath: detailPath.startsWith('/') ? detailPath : `/${detailPath}`,
          detailDirName,
        });
      }
    }
  };

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const normalContent = (
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
            <Tooltip overlay="多级菜单以/分隔">
              <QuestionCircleOutlined />
            </Tooltip>
          </label>
        }
        name="menu"
      >
        <Input />
      </Form.Item>
    </>
  );
  const normalModalContent = (
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
  );
  const formWithDetailContent = (
    <>
      <Divider plain>表单路径</Divider>
      <Form.Item
        label={
          <label>
            <span style={{ paddingRight: 10 }}>添加到路径</span>
            <Tooltip overlay="多级路径以/分隔">
              <QuestionCircleOutlined />
            </Tooltip>
          </label>
        }
        name="formPath"
        required
        rules={[{ required: true, message: '请输入你要添加的路径' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <label>
            <span style={{ paddingRight: 10 }}>菜单</span>
            <Tooltip overlay="多级菜单以/分隔">
              <QuestionCircleOutlined />
            </Tooltip>
          </label>
        }
        name="formMenu"
        required
        rules={[{ required: true, message: '请输入你要添加的菜单' }]}
      >
        <Input />
      </Form.Item>
      <Divider plain>详情路径</Divider>
      <Form.Item
        label={
          <label>
            <span style={{ paddingRight: 10 }}>添加到路径</span>
            <Tooltip overlay="多级路径以/分隔">
              <QuestionCircleOutlined />
            </Tooltip>
          </label>
        }
        name="detailPath"
        required
        rules={[{ required: true, message: '请输入你要添加的路径' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <label>
            <span style={{ paddingRight: 10 }}>菜单</span>
            <Tooltip overlay="多级菜单以/分隔">
              <QuestionCircleOutlined />
            </Tooltip>
          </label>
        }
        name="detailMenu"
        required
        rules={[{ required: true, message: '请输入你要添加的菜单' }]}
      >
        <Input />
      </Form.Item>
    </>
  );
  const formWithDetailModalContent = (
    <>
      <Divider plain>表单目录</Divider>
      <Form.Item
        label="添加到目录"
        name="formPath"
        required
        rules={[{ required: true, message: '请输入你要添加的目录' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="文件名"
        name="formDirName"
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
      <Divider plain>详情目录</Divider>
      <Form.Item
        label="添加到目录"
        name="detailPath"
        required
        rules={[{ required: true, message: '请输入你要添加的目录' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="文件名"
        name="detailDirName"
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
  );

  const renderFormItems = () => {
    if (modal) {
      if (type === 'formWithDetail') {
        return formWithDetailModalContent;
      }
      return normalModalContent;
    } else {
      if (type === 'formWithDetail') {
        return formWithDetailContent;
      }
      return normalContent;
    }
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
        title="添加路由和菜单配置"
        forceRender
        width={650}
        visible={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} onFinish={handleSubmit} {...formLayout}>
          {renderFormItems()}
        </Form>
      </Modal>
    </>
  );
};
