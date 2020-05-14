/*
 * @文件描述: 对表单或者详情页的Card的操作的封装。包含上移、下移、复制
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-05-11 11:07:24
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-14 18:28:44
 */
import { useState } from 'react';
import { CardItemProps, FormItemProps, FormItemType } from '../interfaces/common';
import { Store } from 'antd/lib/form/interface';
import produce from 'immer';
import faker from 'faker';

export default function useCard() {
  const [cards, setCards] = useState<CardItemProps[]>([{ title: '自定义Card0', formItems: [] }]);
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<CardItemProps>();
  const [itemIndex, setItemIndex] = useState<number>();
  const [currentItem, setCurrentItem] = useState<FormItemProps>();

  /**
   * 上移Card
   * @param index
   */
  const moveCardUp = (index: number) => () => {
    if (index === 0) return;

    setCards(
      produce(cards, draft => {
        const card = draft.splice(index, 1);
        draft.splice(index - 1, 0, ...card);
      }),
    );
  };

  /**
   * 下移Card
   * @param index
   */
  const moveCardDown = (index: number) => () => {
    if (index === cards.length - 1) return;

    setCards(
      produce(cards, draft => {
        const card = draft.splice(index, 1);
        draft.splice(index + 1, 0, ...card);
      }),
    );
  };

  /**
   * 配置Card
   * @param values
   */
  const configCard = (values: Store) => {
    setCards(
      produce(cards, draft => {
        draft[cardIndex].title = values.title;
      }),
    );
  };

  /** 往Card中添加表单项 */
  const addFormItemsToCard = (checkedComponents: FormItemType[]) => {
    const newFormItems = checkedComponents.map(type => ({
      type,
      name: faker.name.lastName(),
      label: faker.name.title(),
    }));
    setCards(
      produce(cards, draft => {
        draft[cardIndex].formItems.push(...newFormItems);
      }),
    );
  };

  /**
   * 删除Card
   * @param index
   */
  const deleteCard = (index: number) => () => {
    setCards(
      produce(cards, draft => {
        draft.splice(index, 1);
      }),
    );
  };

  /**
   * 复制card
   * @param index
   */
  const copyCard = (index: number) => () => {
    setCards(
      produce(cards, draft => {
        draft.splice(index + 1, 0, draft[index]);
      }),
    );
  };

  /**
   * card里面的某个form配置项上移
   * @param cardIndex
   * @param itemIndex
   */
  const moveItemUp = (itemIndex: number, cardIndex: number) => () => {
    setCards(
      produce(cards, draft => {
        const card = draft[cardIndex];
        const { formItems = [] } = card;
        if (itemIndex === 0) return;
        const items = formItems.splice(itemIndex, 1);
        formItems.splice(itemIndex - 1, 0, ...items);
      }),
    );
  };

  /**
   * card里面某个form配置项下移
   * @param cardIndex
   * @param itemIndex
   */
  const moveItemDown = (itemIndex: number, cardIndex: number) => () => {
    setCards(
      produce(cards, draft => {
        const card = draft[cardIndex];
        const { formItems = [] } = card;
        if (itemIndex === formItems.length - 1) return;
        const items = formItems.splice(itemIndex, 1);
        formItems.splice(itemIndex + 1, 0, ...items);
      }),
    );
  };

  /**
   * 配置某个Card的某个表单项
   * @param itemIndex
   * @param formItem
   */
  const configItem = (itemIndex: number, formItem: FormItemProps) => {
    setCards(
      produce(cards, draft => {
        const { formItems = [] } = draft[cardIndex];
        formItems[itemIndex] = formItem;
      }),
    );
  };

  /**
   * 删除某个Card的某个表单项
   * @param cardIndex
   * @param itemIndex
   */
  const deleteItem = (itemIndex: number, cardIndex: number) => () => {
    setCards(
      produce(cards, draft => {
        const card = draft[cardIndex];
        const { formItems = [] } = card;
        formItems.splice(itemIndex, 1);
      }),
    );
  };

  /**
   * 复制某个card的某个表单项
   * @param cardIndex
   * @param itemIndex
   */
  const copyItem = (itemIndex: number, cardIndex: number) => () => {
    setCards(
      produce(cards, draft => {
        const card = draft[cardIndex];
        const { formItems = [] } = card;
        const formItem = {
          ...formItems[itemIndex],
          name: faker.name.lastName(),
        };
        formItems.splice(itemIndex + 1, 0, formItem);
      }),
    );
  };

  return {
    cards,
    setCards,
    moveCardUp,
    moveCardDown,
    configCard,
    deleteCard,
    copyCard,
    moveItemUp,
    moveItemDown,
    configItem,
    deleteItem,
    copyItem,
    cardIndex,
    setCardIndex,
    currentCard,
    addFormItemsToCard,
    currentItem,
    setCurrentItem,
    itemIndex,
    setItemIndex,
  };
}
