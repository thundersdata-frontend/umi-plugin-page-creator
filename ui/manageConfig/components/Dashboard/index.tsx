import React, { useState, useContext } from "react";
import { Drawer, Button } from "antd";
import Context, { TemplateType } from "../../Context";

import styles from "./index.module.less";
import ShortFormConfig from "../ShortFormConfig";

export default () => {
  const [visible, setVisible] = useState(false);
  const { templateType } = useContext(Context);

  /** 根据模板创建抽屉里的配置内容 */
  const createDrawerContentByType = () => {
    switch (templateType) {
      case 'login':
        return null;
      case 'register':
        return null;
      case 'short-form':
        return <ShortFormConfig />;
      case 'long-form':
        return null;
      case 'one-column-form-modal':
        return null;
      case 'two-columns-form-modal':
        return null;
      case 'detail':
        return null;
      case 'one-column-detail-modal':
        return null;
      case 'two-columns-detail-modal':
        return null;
      case 'table':
        return null;
      default:
        return null;
    }
  }

  return (
    <>
      <div className={styles.dashboard}>
        {templateType}
        <Button onClick={() => setVisible(true)} type="primary" className={styles.bubble}>配置</Button>
      </div>
      <Drawer
        visible={visible}
        onClose={() => setVisible(false)}
        title={getTitleByTemplate(templateType)}
      >
        {createDrawerContentByType()}
      </Drawer>
    </>
  );
};

function getTitleByTemplate(templateType: TemplateType) {
  let title = "";
  switch (templateType) {
    case "short-form":
    case "long-form":
    case "one-column-form-modal":
    case "two-columns-form-modal":
      title = "表单配置";
      break;

    case "table":
      title = "Table配置";
      break;

    case "login":
    case "register":
      title = "登录/注册配置";
      break;

    case "detail":
    case "one-column-detail-modal":
    case "two-columns-detail-modal":
    default:
      title = "详情配置";
      break;
  }
  return title;
}
