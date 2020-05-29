import React, { useContext } from 'react';
import { Button, Modal, Input, message } from 'antd';
import classNames from 'classnames';
import styles from './index.module.less';
import copy from 'copy-to-clipboard';
import Context from '../../Context';

export default ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  const { expConfigJson, templateType } = useContext(Context);

  const handleOk = () => {
    copy(expConfigJson);
    message.success('复制成功');
    setModalVisible(false);
  };

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
        <Input.TextArea autoSize value={expConfigJson} />
      </Modal>
    </>
  )
}