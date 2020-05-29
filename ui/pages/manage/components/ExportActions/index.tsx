import React, { useContext } from 'react';
import { Button, message } from 'antd';
import classNames from 'classnames';
import styles from './index.module.less';
import Context from '../../Context';

export default ({ onClick }: { onClick: () => void }) => {
  const { templateType } = useContext(Context);

  return (
    <Button
      type="primary"
      onClick={() => {
        if (templateType) {
          onClick();
        } else {
          message.warning('请先选择模板')
        }
      }}
      className={classNames(styles.bubble, styles.fixed)}
    >
      导出
    </Button>
  )
}