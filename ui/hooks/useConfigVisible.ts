/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-11 15:23:37
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-29 10:41:43
 */
import { useState } from 'react';

export default function useConfigVisible() {
  const [formItemsDrawerVisible, setFormItemsDrawerVisible] = useState(false);
  const [pathModalVisible, setPathModalVisible] = useState(false);
  const [formConfigDrawerVisible, setFormConfigDrawerVisible] = useState(false);
  const [cardDrawerVisible, setCardDrawerVisible] = useState(false);
  const [formItemConfigDrawerVisible, setFormItemConfigDrawerVisible] = useState(false);
  const [tableConfigDrawerVisible, setTableConfigDrawerVisible] = useState(false);
  const [columnConfigDrawerVisible, setColumnConfigDrawerVisible] = useState(false);
  const [apiConfigDrawerVisible, setApiConfigDrawerVisible] = useState(false);

  return {
    formItemsDrawerVisible,
    pathModalVisible,
    formConfigDrawerVisible,
    cardDrawerVisible,
    formItemConfigDrawerVisible,
    tableConfigDrawerVisible,
    columnConfigDrawerVisible,
    apiConfigDrawerVisible,
    setFormItemsDrawerVisible,
    setPathModalVisible,
    setFormConfigDrawerVisible,
    setCardDrawerVisible,
    setFormItemConfigDrawerVisible,
    setTableConfigDrawerVisible,
    setColumnConfigDrawerVisible,
    setApiConfigDrawerVisible,
  };
}
