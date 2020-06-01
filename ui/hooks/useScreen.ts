import { useState } from 'react';
import { Store } from 'antd/lib/form/interface';
import { ScreenConfig, LayoutType } from '../../interfaces/screen';
import { useImmer } from 'use-immer';

const initialConfig: ScreenConfig = {
  title: '',
  titleStyle: '',
  gutter: 16,
  left: {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 7,
    xxl: 7,
    rows: [],
  },
  center: {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 10,
    xxl: 10,
    rows: [],
  },
  right: {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 7,
    xxl: 7,
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
      gutter,
      leftRows,
      centerRows,
      rightRows,
      leftXs,
      leftSm,
      leftMd,
      leftLg,
      leftXl,
      leftXxl,
      centerXs,
      centerSm,
      centerMd,
      centerLg,
      centerXl,
      centerXxl,
      rightXs,
      rightSm,
      rightMd,
      rightLg,
      rightXl,
      rightXxl,
    } = values;
    const config: ScreenConfig = {
      title,
      titleStyle,
      gutter,
      left: {
        xs: leftXs,
        sm: leftSm,
        md: leftMd,
        lg: leftLg,
        xl: leftXl,
        xxl: leftXxl,
        rows: Array(leftRows)
          .fill('')
          .map(_ => ({
            height: 1,
            cols: [
              {
                xs: { span: 24 },
                sm: { span: 24 },
                md: { span: 24 },
                lg: { span: 24 },
                xl: { span: 24 },
                xxl: { span: 24 },
                type: 'custom',
                chartConfig: {},
              },
            ],
          })),
      },
      center: {
        xs: centerXs,
        sm: centerSm,
        md: centerMd,
        lg: centerLg,
        xl: centerXl,
        xxl: centerXxl,
        rows: Array(centerRows)
          .fill('')
          .map(_ => ({
            height: 1,
            cols: [
              {
                xs: { span: 24 },
                sm: { span: 24 },
                md: { span: 24 },
                lg: { span: 24 },
                xl: { span: 24 },
                xxl: { span: 24 },
                type: 'custom',
                chartConfig: {},
              },
            ],
          })),
      },
      right: {
        xs: rightXs,
        sm: rightSm,
        md: rightMd,
        lg: rightLg,
        xl: rightXl,
        xxl: rightXxl,
        rows: Array(rightRows)
          .fill('')
          .map(_ => ({
            height: 1,
            cols: [
              {
                xs: { span: 24 },
                sm: { span: 24 },
                md: { span: 24 },
                lg: { span: 24 },
                xl: { span: 24 },
                xxl: { span: 24 },
                type: 'custom',
                chartConfig: {},
              },
            ],
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
        cols: [
          {
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 24 },
            lg: { span: 24 },
            xl: { span: 24 },
            xxl: { span: 24 },
            type: 'custom',
            chartConfig: {},
          },
        ],
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
  };

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
        type: 'custom',
        chartConfig: {},
      });
      row.cols.forEach(col => {
        col.xs = { span: 24 };
        col.sm = { span: 24 };
        col.md = { span: 24 };
        col.lg = { span: 24 };
        col.xl = { span: Math.floor(24 / row.cols.length) };
        col.xxl = { span: Math.floor(24 / row.cols.length) };
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
      row.cols.forEach(col => {
        col.xs = { span: 24 };
        col.sm = { span: 24 };
        col.md = { span: 24 };
        col.lg = { span: 24 };
        col.xl = { span: Math.floor(24 / row.cols.length) };
        col.xxl = { span: Math.floor(24 / row.cols.length) };
      });
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
