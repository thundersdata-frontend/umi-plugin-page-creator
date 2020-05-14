import React, { CSSProperties } from 'react';
import { Button, Tooltip } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
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
  position = 'left',
  style,
}: {
  position?: 'left' | 'top';
  moveUp?: () => void;
  moveDown?: () => void;
  configItem?: () => void;
  deleteItem?: () => void;
  copyItem?: () => void;
  style?: CSSProperties;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 5,
        ...style,
      }}
    >
      <Tooltip overlay={position === 'left' ? '上移' : '左移'} trigger={['hover']} placement="top">
        <Button style={{ marginRight: 10 }} onClick={moveUp}>
          {position === 'left' ? <ArrowUpOutlined /> : <ArrowLeftOutlined />}
        </Button>
      </Tooltip>
      <Tooltip overlay={position === 'left' ? '下移' : '右移'} trigger={['hover']} placement="top">
        <Button style={{ marginRight: 10 }} onClick={moveDown}>
          {position === 'left' ? <ArrowDownOutlined /> : <ArrowRightOutlined />}
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
