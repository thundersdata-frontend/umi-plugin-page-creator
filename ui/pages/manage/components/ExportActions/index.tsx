import React from 'react';
import { Button, Modal, Input, message } from 'antd';
import classNames from 'classnames';
import styles from './index.module.less';
import { ConfigProps } from '../../../../../interfaces/common';
import copy from 'copy-to-clipboard';

export default ({
  modalVisible,
  setModalVisible,
  config,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  config: ConfigProps,
}) => {

  const handleOk = () => {
    copy(JSON.stringify(config));
    message.success('复制成功');
    setModalVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModalVisible(true)}
        className={classNames(styles.bubble, styles.fixed)}
      >
        导出
      </Button>
      <Modal
        title="导出页面（请复制配置参数）"
        destroyOnClose
        forceRender
        width={650}
        getContainer={false}
        visible={modalVisible}
        okText="复制"
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
      >
        <Input.TextArea autoSize value={JSON.stringify(config)} />
      </Modal>
    </>
  )
}