import React from "react";
import { Button, Tooltip } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export default ({
  moveUp,
  moveDown,
  configItem,
}: {
  moveUp: () => void;
  moveDown: () => void;
  configItem: () => void;
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Tooltip overlay="上移" trigger={["hover"]} placement="left">
        <Button style={{ marginRight: 10 }} onClick={moveUp}>
          <ArrowUpOutlined />
        </Button>
      </Tooltip>
      <Tooltip overlay="下移" trigger={["hover"]} placement="left">
        <Button style={{ marginRight: 10 }} onClick={moveDown}>
          <ArrowDownOutlined />
        </Button>
      </Tooltip>
      <Tooltip overlay="配置" trigger={["hover"]} placement="left">
        <Button style={{ marginRight: 10 }} onClick={configItem}>
          <SettingOutlined />
        </Button>
      </Tooltip>
    </div>
  );
};
