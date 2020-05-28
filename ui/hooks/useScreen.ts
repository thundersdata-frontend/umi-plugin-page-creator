import { useState } from 'react';
import { Store } from 'antd/lib/form/interface';
import { ScreenConfig, LayoutType } from '../../interfaces/screen';
import { useImmer } from 'use-immer';

const initialConfig: ScreenConfig = {
  title: '',
  titleStyle: '',
  left: {
    flex: 0,
    rows: [],
  },
  center: {
    flex: 0,
    rows: [],
  },
  right: {
    flex: 0,
    rows: [],
  },
};

export default function useScreen() {
  const [screenConfigDrawerVisible, setScreenConfigDrawerVisible] = useState(false);
  const [colConfigDrawerVisible, setColConfigDrawerVisible] = useState(false);
  const [screenConfig, setScreenConfig] = useImmer<ScreenConfig>(initialConfig);
  const [currentCol, setCurrentCol] = useImmer({
    type: '',
    rowIndex: 0,
    colIndex: 0,
    config: {},
  });

  const toggleScreenConfigVisible = () => {
    setScreenConfigDrawerVisible(!screenConfigDrawerVisible);
  };

  const toggleColConfigVisible = () => {
    setColConfigDrawerVisible(!colConfigDrawerVisible);
  };

  /**
   * 配置大屏的title，布局
   * @param values
   */
  const handleScreenConfig = (values: Store) => {
    const {
      title,
      titleStyle,
      leftWidth,
      centerWidth,
      rightWidth,
      leftRows,
      centerRows,
      rightRows,
    } = values;
    const config: ScreenConfig = {
      title,
      titleStyle,
      left: {
        flex: leftWidth,
        rows: Array(leftRows)
          .fill('')
          .map((_) => ({
            height: 1,
            cols: [{ flex: 1, type: 'custom', chartConfig: {} }],
          })),
      },
      center: {
        flex: centerWidth,
        rows: Array(centerRows)
          .fill('')
          .map((_) => ({
            height: 1,
            cols: [{ flex: 1, type: 'custom', chartConfig: {} }],
          })),
      },
      right: {
        flex: rightWidth,
        rows: Array(rightRows)
          .fill('')
          .map((_) => ({
            height: 1,
            cols: [{ flex: 1, type: 'custom', chartConfig: {} }],
          })),
      },
    };
    setScreenConfig(draft => (draft = config));
  };

  /**
   * 添加一行
   * @param type
   */
  const handleAddRow = (type: LayoutType) => {
    setScreenConfig(draft => {
      const layout = draft[type];
      layout.rows.push({
        height: 1,
        cols: [{ flex: 1, type: 'custom', chartConfig: {} }],
      });
    });
  };

  /**
   * 删除一行
   * @param type
   * @param rowIndex
   */
  const handleDeleteRow = (type: LayoutType, rowIndex: number) => {
    setScreenConfig(draft => {
      const layout = draft[type];
      layout.rows.splice(rowIndex, 1);
    });
  };

  /**
   * 配置row的行高占比
   * @param type
   * @param rowIndex
   * @param flex
   */
  const handleConfigRow = (type: LayoutType, rowIndex: number, flex: number) => {
    console.log(type, rowIndex, flex);
    setScreenConfig(draft => {
      const layout = draft[type];
      const row = layout.rows[rowIndex];
      row.height = flex;
    });
  }

  /**
   * 在某一行里面新增一列
   * @param type
   * @param rowIndex
   */
  const handleAddCol = (type: LayoutType, rowIndex: number) => {
    setScreenConfig(draft => {
      const layout = draft[type];
      const row = layout.rows[rowIndex];
      row.cols.push({
        flex: 1,type: 'custom',
        chartConfig: {},
      });
    });
  };

  /**
   * 选中要配置的某个列
   * @param type
   * @param rowIndex
   * @param colIndex
   */
  const chooseConfigCol = (type: LayoutType, rowIndex: number, colIndex: number) => {
    setCurrentCol(draft => {
      draft.type = type;
      draft.rowIndex = rowIndex;
      draft.colIndex = colIndex;
    });
    toggleColConfigVisible();
  };

  /**
   * 配置某一行的某一列（宽度占比、图表配置）
   * @param type
   * @param rowIndex
   * @param colIndex
   */
  const handleConfigCol = (config: Store) => {
    const { type, rowIndex, colIndex } = currentCol;
    setScreenConfig(draft => {
      const layout = draft[type];
      const row = layout.rows[rowIndex];
      row.cols[colIndex] = config;
    });
    setCurrentCol(draft => {
      draft.config = config;
    });
  };

  /**
   * 从某一行删除一列
   * @param type
   * @param rowIndex
   * @param colIndex
   */
  const handleDeleteCol = (type: LayoutType, rowIndex: number, colIndex: number) => {
    setScreenConfig(draft => {
      const layout = draft[type];
      const row = layout.rows[rowIndex];
      row.cols.splice(colIndex, 1);
    });
  };

  return {
    screenConfigDrawerVisible,
    toggleScreenConfigVisible,
    colConfigDrawerVisible,
    toggleColConfigVisible,
    screenConfig,
    setScreenConfig: handleScreenConfig,
    handleAddCol,
    handleDeleteCol,
    chooseConfigCol,
    handleConfigCol,
    handleAddRow,
    handleDeleteRow,
    handleConfigRow,
  };
}
