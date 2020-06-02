const baseProps = [
  {
    label: 'x轴字段',
    name: 'xField',
    type: 'input',
    required: true,
  },
  {
    label: 'y轴字段',
    name: 'yField',
    type: 'input',
    required: true,
  },
];

/**普通柱状图 */
export const barProps = [...baseProps];

/**分组柱状图 */
export const groupBarProps = [
  ...baseProps,
  {
    label: '分组字段',
    name: 'groupField',
    type: 'input',
  },
];

/**区间柱状图 */
export const rangeBarProps = [...baseProps];

/**柱线混合图 */
export const barLineProps = [
  {
    label: '是否单轴',
    name: 'isSingleAxis',
    type: 'radio',
    options: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
  },
];

/**分组柱线混合图 */
export const groupBarLineProps = [
  {
    label: '分组字段',
    name: 'columnGroupField',
    type: 'input',
  },
];

/**普通条形图 */
export const columnProps = [...baseProps];

/**分组条形图 */
export const groupColumnProps = [
  ...baseProps,
  {
    label: '分组字段',
    name: 'groupField',
    type: 'input',
  },
];

/**区间条形图 */
export const rangeColumnProps = [
  {
    label: '图表内边距',
    name: 'padding',
    type: 'input',
  },
];

/**普通环形图 */
export const circleProps = [
  {
    label: '是否单例图',
    name: 'isSingle',
    type: 'radio',
    options: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
  },
  {
    label: '指标盘标题',
    name: 'titleName',
    type: 'input',
  },
  {
    label: '间隔',
    name: 'bordered',
    type: 'radio',
    options: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
  },
  {
    label: '是否高亮',
    name: 'hoverHighlight',
    type: 'radio',
    options: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
  },
];

/**玫瑰图 */
export const roseProps = [
  {
    label: '半径字段',
    name: 'radiusField',
    type: 'input',
  },
  {
    label: '颜色字段',
    name: 'colorField',
    type: 'input',
  },
  {
    label: '是否为半圆',
    name: 'layout',
    type: 'radio',
    options: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
  },
  {
    label: '是否空心',
    name: 'emptyInside',
    type: 'radio',
    options: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
  },
  {
    label: '是否显示轴',
    name: 'hasAxis',
    type: 'radio',
    options: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
  },
  {
    label: '图表内边距',
    name: 'padding',
    type: 'input',
  },
];

/**普通折线图 */
export const lineProps = [
  ...baseProps,
  {
    label: '分组字段名',
    name: 'seriesField',
    type: 'input',
  },
  {
    label: 'color',
    name: '颜色',
    type: 'textarea',
    tooltip: '可以只填一个值，或者一个数组，或者一个函数',
  },
  {
    label: '折线样式',
    name: 'lineStyle',
    type: 'textarea',
    tooltip: `{
      stroke: 折线颜色,
      lineWidth: 线宽,
      lineDash: 虚线
      opacity: 透明度
    }`,
  },
  {
    label: '折线上的点',
    name: 'point',
    type: 'textarea',
    tooltip: `{
      visible: 是否显示,
      shape: 形状,
      size: 大小,
      style: 样式,
    }`,
  },
];

/**水波图 */
export const waveProps = [
  {
    label: '精确位数',
    name: 'fixedNumber',
    type: 'number',
  },
  {
    label: '后缀',
    name: 'suffix',
    type: 'input',
  },
  {
    label: '最大值',
    name: 'max',
    type: 'number',
  },
  {
    label: '最小值',
    name: 'min',
    type: 'number',
  },
  {
    label: '颜色',
    name: 'color',
    type: 'string',
    tooltip: '可以只填一个值，或者一个数组，或者一个函数',
  },
  {
    label: '样式',
    name: 'liqiudStyle',
    type: 'textarea',
    tooltip: `{
      fill: 填充颜色,
      stroke: 描边颜色,
      lineWidth: 边框宽度,
      lineDash: 虚线描边,
      strokeOpacity: 描边透明度,
    }`,
  },
];

/**雷达图 */
export const radarProps = [
  {
    label: '分类字段',
    name: 'angleField',
    type: 'input',
    tooltip: '对应圆周角度的字段，一般为一个分类字段'
  },
  {
    label: '半径字段',
    name: 'radiusField',
    type: 'input',
    tooltip: '雷达图映射到半径所对应的字段，一般为一个连续字段',
  },
  {
    label: '分组字段',
    name: 'seriesField',
    type: 'input',
    tooltip: '对雷达图进行分组的字段，一般对应一个图例字段。通过该字段的值，雷达图将会被分为多个组，通过颜色进行区分，并上下重叠。',
  },
  {
    label: 'smooth',
    name: '曲线绘制',
    type: 'radio',
    options: [{ label: '是', value: true }, { label: '否', value: false }],
  },
  {
    label: '分组颜色',
    name: 'color',
    type: 'input',
    tooltip: '可以只填一个值，或者一个数组，或者一个函数',
  },
  {
    label: '填充色',
    name: 'area',
    type: 'input',
    tooltip: '数组或者函数'
  },
  {
    label: '雷达图的点',
    name: 'point',
    type: 'textarea',
    tooltip: '具体配置参见官网'
  },
  {
    label: '雷达图的折线',
    name: 'line',
    type: 'textarea',
    tooltip: '具体配置参见官网'
  },
];

/**径向堆叠柱形图 */
export const circleStackBarProps = [
  {
    label: '数据字段',
    name: 'angleField',
    type: 'input',
  },
  {
    label: '分类字段',
    name: 'colorField',
    type: 'input',
  },
];

/**单象限散点图 */
export const scatterProps = [
  ...baseProps,
  {
    label: 'y轴字段的格式化函数',
    name: 'yNameFormatter',
    type: 'textarea',
  },
  {
    label: '颜色数据字段名',
    name: 'colorField',
    type: 'input',
  },
  {
    label: '气泡大小字段名',
    name: 'sizeField',
    type: 'input',
  },
  {
    label: '颜色',
    name: 'color',
    type: 'textarea',
    tooltip: `如没有配置 colorField,指定一个单值即可。对 colorFiled 进行了配置的情况下，即可以指定一系列色值，也可以通过回调函数的方法根据对应数值进行设置。`,
  },
  {
    label: '气泡大小',
    name: 'pointSize',
    type: 'input',
    tooltip: `数组，[min,max]`,
  },
  {
    label: '气泡样式',
    name: 'pointStyle',
    type: 'textarea',
    tooltip: `{
      fill: 填充颜色,
      stroke: 描边颜色,
      lineWidth: 描边宽度,
      lineDash: 虚线描边,
      opacity: 整体透明度,
      fillOpacity: 填充透明度,
      strokeOpacity: 描边透明度,
    }`,
  },
];

/**堆叠面积图 */
export const stackAreaProps = [
  ...baseProps,
  {
    label: '堆叠字段名',
    name: 'stackField',
    type: 'input',
  },
  {
    label: '颜色',
    name: 'color',
    type: 'textarea',
    tooltip: '可以只填一个值，或者一个数组，或者一个函数',
  },
  {
    label: '堆叠样式',
    name: 'areaStyle',
    type: 'textarea',
    tooltip: `{
      fill: 填充颜色,
      stroke: 描边颜色,
      lineWidth: 描边宽度,
      lineDash: 虚线描边,
      opacity: 整体透明度,
      fillOpacity: 填充透明度,
      strokeOpacity: 描边透明度,
    }`,
  },
];

/**堆叠柱状图 */
export const stackBarProps = [
  ...baseProps,
  {
    label: '分组字段名',
    name: 'stackField',
    type: 'input',
  },
  {
    label: '颜色',
    name: 'color',
    type: 'textarea',
    tooltip: '可以只填一个值，或者一个数组，或者一个函数',
  },
  {
    label: '柱形宽度',
    name: 'columnSize',
    type: 'number',
  },
  {
    label: '柱形样式',
    name: 'columnStyle',
    type: 'textarea',
    tooltip: `{
      fill: 填充颜色,
      stroke: 描边颜色,
      lineWidth: 描边宽度,
      lineDash: 虚线描边,
      opacity: 整体透明度,
      fillOpacity: 填充透明度,
      strokeOpacity: 描边透明度,
    }`,
  },
];

/**堆叠玫瑰图 */
export const stackRoseProps = [
  {
    label: '扇形半径字段',
    name: 'radiusField',
    type: 'input',
  },
  {
    label: '扇形分类字段',
    name: 'categoryField',
    type: 'input',
  },
  {
    label: '颜色字段',
    name: 'colorField',
    type: 'input',
  },
  {
    label: '玫瑰图半径',
    name: 'radius',
    type: 'input',
    tooltip: '配置值域[0,1]，0表示不显示，1表示撑满',
  },
  {
    label: '颜色',
    name: 'color',
    type: 'textarea',
    tooltip: '可以只填一个值，或者一个数组，或者一个函数',
  },
  {
    label: '扇形样式',
    name: 'sectorStyle',
    type: 'textarea',
    tooltip: `{
      fill: 填充颜色,
      stroke: 描边颜色,
      lineWidth: 描边宽度,
      lineDash: 虚线描边,
      opacity: 整体透明度,
      fillOpacity: 填充透明度,
      strokeOpacity: 描边透明度,
    }`,
  },
];

/**瀑布图 */
export const waterfallProps = [
  ...baseProps,
  {
    label: '颜色字段',
    name: 'colorField',
    type: 'input',
  },
  {
    label: '颜色',
    name: 'color',
    type: 'textarea',
    tooltip: '可以只填一个值，或者一个数组，或者一个函数',
  },
  {
    label: '样式',
    name: 'waterfallStyle',
    type: 'textarea',
    tooltip: `{
      fill: 填充颜色,
      stroke: 描边颜色,
      lineWidth: 描边宽度,
      lineDash: 虚线描边,
      opacity: 整体透明度,
      fillOpacity: 填充透明度,
      strokeOpacity: 描边透明度,
    }`,
  },
];

/**地图 */
export const mapProps = [
  {
    label: '',
    name: '',
    type: '',
  },
];
