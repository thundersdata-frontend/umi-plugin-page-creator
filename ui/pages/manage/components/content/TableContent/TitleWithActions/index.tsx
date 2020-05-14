import React from 'react';
import ConfigActions from '../../../../../../components/ConfigActions';
import { ColumnTitle } from 'antd/lib/table/interface';
import { Tooltip } from 'antd';

export default function<T>({
  title,
  moveUp,
  moveDown,
  configItem,
  deleteItem,
  copyItem,
}: {
  title?: ColumnTitle<T>;
  moveUp?: () => void;
  moveDown?: () => void;
  configItem?: () => void;
  deleteItem?: () => void;
  copyItem?: () => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip
        overlay={
          <ConfigActions
            position="top"
            style={{ marginBottom: 0 }}
            moveUp={moveUp}
            moveDown={moveDown}
            configItem={configItem}
            deleteItem={deleteItem}
            copyItem={copyItem}
          />
        }
      >
        <div style={{ lineHeight: '32px', marginRight: 5 }}>{title}</div>
      </Tooltip>
    </div>
  );
}
