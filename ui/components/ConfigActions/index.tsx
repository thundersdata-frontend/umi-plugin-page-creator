import React from 'react';
import { Button, Tooltip } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  SettingOutlined,
  DeleteOutlined,
  CopyOutlined,
} from '@ant-design/icons';

export default ({
  moveUp,
  moveDown,
  configItem,
  deleteItem,
  copyItem,
}: {
  moveUp?: () => void;
  moveDown?: () => void;
  configItem?: () => void;
  deleteItem?: () => void;
  copyItem?: () => void;
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip overlay="上移" trigger={['hover']} placement="top">
        <Button style={{ marginRight: 10 }} onClick={moveUp}>
          <ArrowUpOutlined />
        </Button>
      </Tooltip>
      <Tooltip overlay="下移" trigger={['hover']} placement="top">
        <Button style={{ marginRight: 10 }} onClick={moveDown}>
          <ArrowDownOutlined />
        </Button>
      </Tooltip>
      <Tooltip overlay="删除" trigger={['hover']} placement="top">
        <Button style={{ marginRight: 10 }} onClick={deleteItem}>
          <DeleteOutlined />
        </Button>
      </Tooltip>
      <Tooltip overlay="复制" trigger={['hover']} placement="top">
        <Button style={{ marginRight: 10 }} onClick={copyItem}>
          <CopyOutlined />
        </Button>
      </Tooltip>
      <Tooltip overlay="配置" trigger={['hover']} placement="top">
        <Button style={{ marginRight: 10 }} onClick={configItem}>
          <SettingOutlined />
        </Button>
      </Tooltip>
    </div>
  );
};
