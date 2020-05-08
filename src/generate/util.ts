/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-08 13:56:59
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-08 14:38:43
 */
import { FormItemType, FormItemProps } from '@/interfaces/common';

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
      return ``;

    case 'checkbox':
      return ``;

    case 'date':
      return ``;

    case 'number':
      return ``;

    case 'password':
      return ``;

    case 'radio':
      return ``;

    case 'range':
      return ``;

    case 'rate':
      return ``;

    case 'select':
      return ``;

    case 'slider':
      return ``;

    case 'switch':
      return ``;

    case 'textarea':
      return ``;

    case 'time':
      return ``;

    case 'treeselect':
      return ``;

    case 'upload':
      return ``;
  }
}

/**
 * 把属性打平成字符串
 */
function generatePropsStr(props: object): string {
  const result = `${Object.entries(props)
    .map(item => {
      const [key, value] = item;
      if (
        typeof value === 'boolean' ||
        typeof value === 'number' ||
        typeof value === 'bigint'
      ) {
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
