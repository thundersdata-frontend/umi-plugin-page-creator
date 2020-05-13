import { FormItemProps } from '@/interfaces/common';

/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-30 15:27:34
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-13 11:07:45
 */
export const inputProps: FormItemProps[] = [
  {
    name: 'maxLength',
    label: '最大长度',
    type: 'number',
  },
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'allowClear',
    label: '显示清除图标',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
];

export const passwordProps: FormItemProps[] = [
  {
    name: 'visibilityToggle',
    label: '显示切换按钮',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
];

export const textareaProps: FormItemProps[] = [
  {
    name: 'autoSize',
    label: '自适应内容高度',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'allowClear',
    label: '显示清除图标',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
];

export const cascaderProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: '显示清除图标',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'changeOnSelect',
    label: '选择即改变',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'showSearch',
    label: '显示搜索框',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
];

export const dateProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: '显示清除图标',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'showTime',
    label: '时间选择',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'showToday',
    label: '展示"今天"按钮',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'format',
    label: '格式化',
    type: 'input',
    placeholder: 'YYYY-MM-DD',
  },
];

export const rangeProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: '显示清除图标',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'showTime',
    label: '时间选择',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'format',
    label: '格式化',
    type: 'input',
    placeholder: 'YYYY-MM-DD HH:mm:ss',
  },
];

export const timeProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: '显示清除图标',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'format',
    label: '格式化',
    type: 'input',
    placeholder: 'HH:mm:ss',
  },
  {
    name: 'hourStep',
    label: '小时选项间隔	',
    type: 'number',
  },
  {
    name: 'minuteStep',
    label: '分钟选项间隔	',
    type: 'number',
  },
  {
    name: 'secondStep',
    label: '秒选项间隔	',
    type: 'number',
  },
];

export const numberProps: FormItemProps[] = [
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'min',
    label: '最小值',
    type: 'number',
  },
  {
    name: 'max',
    label: '最大值',
    type: 'number',
  },
  {
    name: 'precision',
    label: '数值精度',
    type: 'number',
  },
  {
    name: 'step',
    label: '每次改变步数',
    type: 'number',
  },
];

export const radioProps: FormItemProps[] = [
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'options',
    label: '配置',
    type: 'textarea',
    placeholder: `[{label: '', value: ''}]`,
  },
];

export const checkboxProps: FormItemProps[] = [
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'options',
    label: '配置',
    type: 'textarea',
    placeholder: `[{label: '', value: ''}]`,
  },
];

export const switchProps: FormItemProps[] = [
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'defaultChecked',
    label: '是否默认选中',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'loading',
    label: '加载中的开关',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
];

export const sliderProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: '显示清除图标',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'min',
    label: '最小值',
    type: 'number',
  },
  {
    name: 'max',
    label: '最大值',
    type: 'number',
  },
  {
    name: 'range',
    label: '双滑块模式',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'reverse',
    label: '反向坐标轴',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'vertical',
    label: '是否垂直',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'step',
    label: '步长',
    type: 'number',
    placeholder: '必须大于0, 并且可被 (max - min) 整除',
  },
];

export const selectProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: '显示清除图标',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'mode',
    label: '模式',
    type: 'radio',
    options: [
      { label: '单选', value: '' },
      { label: '多选', value: 'multiple' },
      { label: '标签', value: 'tags' },
    ],
  },
  {
    name: 'showSearch',
    label: '单选模式可搜索',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'options',
    label: '配置',
    type: 'textarea',
    placeholder: `[{label: '', value: ''}]`,
  },
];

export const treeselectProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: '显示清除图标',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'multiple',
    label: '多选',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'showSearch',
    label: '显示搜索框',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
];

export const uploadProps: FormItemProps[] = [
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'multiple',
    label: '多选',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
];

export const rateProps: FormItemProps[] = [
  {
    name: 'allowClear',
    label: '显示清除图标',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'allowHalf',
    label: '允许半选',
    type: 'radio',
    options: [
      { label: '是', value: 'true' },
      { label: '否', value: 'false' },
    ],
  },
  {
    name: 'count',
    label: 'star 总数',
    type: 'number',
  },
];
