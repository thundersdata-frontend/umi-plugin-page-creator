import React, { useContext } from "react";
import Context from "../../Context";

import styles from "./index.module.less";
import ShortFormConfigDrawer from "../drawers/ShortForm";
import ShortFormContent from "../content/ShortForm";

export default () => {
  const { templateType } = useContext(Context);

  /** 根据模板映射不同的显示内容 */
  const createContentByType = () => {
    switch (templateType) {
      case "login":
        return null;
      case "register":
        return null;
      case "short-form":
        return <ShortFormContent />;
      case "long-form":
        return null;
      case "one-column-form-modal":
        return null;
      case "two-columns-form-modal":
        return null;
      case "detail":
        return null;
      case "one-column-detail-modal":
        return null;
      case "two-columns-detail-modal":
        return null;
      case "table":
        return null;
      default:
        return null;
    }
  };

  /** 根据模板创建抽屉里的配置内容 */
  const createDrawerByType = () => {
    switch (templateType) {
      case "login":
        return null;
      case "register":
        return null;
      case "short-form":
        return <ShortFormConfigDrawer />;
      case "long-form":
        return null;
      case "one-column-form-modal":
        return null;
      case "two-columns-form-modal":
        return null;
      case "detail":
        return null;
      case "one-column-detail-modal":
        return null;
      case "two-columns-detail-modal":
        return null;
      case "table":
        return null;
      default:
        return null;
    }
  };

  return (
    <div className={styles.dashboard}>
      {createContentByType()}
      {createDrawerByType()}
    </div>
  );
};
