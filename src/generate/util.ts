/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 13:56:59
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-14 11:54:38
 */
import { FormItemType, FormItemProps } from '@/interfaces/common';
import { LabeledValue } from 'antd/lib/select';

export function createFormComponentsByType(
  type: FormItemType,
  props: Omit<FormItemProps, 'label' | 'name' | 'type'>,
) {
  const propsStr = generatePropsStr(props);
  switch (type) {
    case 'input':
    default:
      return `
        <Input ${propsStr} />
      `;
    case 'cascader':
      return `<Cascader ${propsStr} />`;

    case 'checkbox':
      return `<Checkbox.Group ${propsStr} />`;

    case 'date':
      return `<DatePicker ${propsStr} />`;

    case 'number':
      return `<InputNumber ${propsStr} />`;

    case 'password':
      return `<Input.Password ${propsStr} />`;

    case 'radio':
      return `<Radio.Group ${propsStr} />`;

    case 'range':
      return `<DatePicker.RangePicker ${propsStr} />`;

    case 'rate':
      return `<Rate ${propsStr} />`;

    case 'select':
      const { options = [], ...restProps } = props;

      return `<Select ${generatePropsStr(restProps)}>
        ${(options as LabeledValue[]).map(
          option => `<Select.Option value={${option.value}}>${option.label}</Select.Option>`,
        )}
      </Select>`;

    case 'slider':
      return `<Slider ${propsStr} />`;

    case 'switch':
      return `<Switch ${propsStr} />`;

    case 'textarea':
      return `<Input.TextArea ${propsStr} />`;

    case 'time':
      return `<TimePicker ${propsStr} />`;

    case 'treeselect':
      return `<TreeSelect ${propsStr} />`;

    case 'upload':
      return `<Upload ${propsStr}><Button>上传</Button></Upload>`;
  }
}

/**
 * 把属性打平成字符串
 */
export function generatePropsStr(props: object): string {
  const result = `${Object.entries(props)
    .map(item => {
      const [key, value] = item;
      if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'bigint') {
        return `${key}={${value}}`;
      } else if (typeof value === 'string') {
        return `${key}="${value}"`;
      } else if (typeof value === 'function') {
        return `${key}={${value.toString()}}`;
      } else if (typeof value === 'object') {
        return `${key}={${JSON.stringify(value)}}`;
      }

      return '';
    })
    .join(' ')}`;

  return result;
}

/**
 * 将一个数组按照指定的列拆分成N个二维数组
 * @param formItems
 * @param cols
 */
export function transformFormItemLines(formItems: FormItemProps[], cols = 3) {
  let lineNum =
    formItems.length % cols === 0
      ? formItems.length / cols
      : Math.floor(formItems.length / cols + 1);
  let res = [];
  for (let i = 0; i < lineNum; i++) {
    let temp = formItems.slice(i * cols, i * cols + cols);
    res.push(temp);
  }
  return res;
}
