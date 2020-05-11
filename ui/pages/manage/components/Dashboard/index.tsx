import React, { useContext } from 'react';
import Context from '../../Context';

import styles from './index.module.less';
import ShortFormContent from '../content/ShortFormContent';
import LongFormContent from '../content/LongFormContent';
import ShortDetailContent from '../content/ShortDetailContent';
import LongDetailContent from '../content/LongDetailContent';
import TableContent from '../content/TableContent';

export default () => {
  const { templateType } = useContext(Context);

  /** 根据模板映射不同的显示内容 */
  const createContentByType = () => {
    switch (templateType) {
      case 'short-form':
        return <ShortFormContent />;
      case 'long-form':
        return <LongFormContent />;
      case 'one-column-form-modal':
        return null;
      case 'two-columns-form-modal':
        return null;
      case 'short-detail':
        return <ShortDetailContent />;
      case 'long-detail':
        return <LongDetailContent />;
      case 'one-column-detail-modal':
        return null;
      case 'two-columns-detail-modal':
        return null;
      case 'table':
        return <TableContent />;
      default:
        return null;
    }
  };

  return <div className={styles.dashboard}>{createContentByType()}</div>;
};
