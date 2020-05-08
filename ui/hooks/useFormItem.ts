/*
 * @文件描述: 对表单元素操作的封装，包含上移、下移、配置
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-30 11:31:49
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-08 17:38:35
 */
import { useState } from 'react';
import { FormItemProps } from '../interfaces/common';

export default function useFormItem() {
  const [formItems, setFormItems] = useState<FormItemProps[]>([]);
  const [index, setIndex] = useState<number>(); // 当前选中的表单元素的index
  const [currentItem, setCurrentItem] = useState<FormItemProps>(); // 当前选中的表单元素
  const [visible, setVisible] = useState(false); // 是否显示表单元素配置的Drawer

  /**
   * 上移表单项
   * @param index
   */
  const moveUp = (index: number) => () => {
    if (index === 0) return;
    const _formItems = formItems.slice();

    // 拿到这个index对应的item
    const formItem = _formItems.splice(index, 1);
    // 插入回去
    _formItems.splice(index - 1, 0, ...formItem);

    setFormItems(_formItems);
  };
  /**
   * 下移表单项
   * @param index
   */
  const moveDown = (index: number) => () => {
    if (index === formItems.length - 1) return;
    const _formItems = formItems.slice();

    // 拿到这个index对应的item
    const formItem = _formItems.splice(index, 1);
    // 插入回去
    _formItems.splice(index + 1, 0, ...formItem);

    setFormItems(_formItems);
  };
  /**
   * 配置表单项
   * @param formItem
   */
  const configItem = (formItem: FormItemProps, index: number) => () => {
    setIndex(index);
    setCurrentItem(formItem);
    setVisible(true);
  };

  /** 表单元素配置项配置完成 */
  const handleConfirm = (index: number, formItem: FormItemProps) => {
    const _formItems = formItems.slice();
    const item = _formItems.splice(index, 1);
    const mergedItem = {
      ...item[0],
      ...formItem,
    };
    _formItems.splice(index, 0, mergedItem);
    setFormItems(_formItems);
  };

  /**
   * 删除配置项
   * @param formItem
   * @param index
   */
  const deleteItem = (index: number) => () => {
    const _formItems = formItems.slice();
    _formItems.splice(index, 1);
    setFormItems(_formItems);
  };

  /**
   * 复制配置项
   * @param formItem
   * @param index
   */
  const copyItem = (index: number) => () => {
    const _formItems = formItems.slice();
    const formItem = _formItems[index];
    _formItems.splice(index + 1, 0, formItem);

    setFormItems(_formItems);
  };

  return {
    formItems,
    setFormItems,
    moveUp,
    moveDown,
    configItem,
    deleteItem,
    copyItem,
    index,
    currentItem,
    visible,
    setVisible,
    onConfirm: handleConfirm,
  };
}
