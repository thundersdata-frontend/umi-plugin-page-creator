import React from "react";
import { Button, message, Dropdown } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import classnames from "classnames";

import styles from "./index.module.less";

export default ({
  setVisible,
  templateType,
  onRemoteCall
}: {
  setVisible: (visible: boolean) => void;
  templateType: string;
  onRemoteCall: () => void;
}) => {
  const actions = (
    <div className={styles.actionWrap}>
      <Button
        type="primary"
        onClick={() => {
          if (!templateType) {
            message.warning("请选择模板");
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
        onClick={() => setVisible(true)}
        className={classnames(styles.bubble, styles.space)}
      >
        预览
      </Button>
      <Button
        type="primary"
        onClick={onRemoteCall}
        className={classnames(styles.bubble, styles.space)}
      >
        提交
      </Button>
    </div>
  );

  return (
    <Dropdown
      overlay={actions}
      trigger={["click"]}
      placement="topCenter"
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
    >
      <Button className={classnames(styles.bubble, styles.fixed)}>
        <PlusCircleOutlined style={{ fontSize: 30 }} />
      </Button>
    </Dropdown>
  );
};
