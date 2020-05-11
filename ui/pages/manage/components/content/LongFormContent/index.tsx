import React, { useContext } from 'react';
import { Form, Button, Card, message, Row, Col } from 'antd';
import Title from '../../../../../components/Title';
import renderFormItem from '../../../../../components/FormItemConfig';
import FormItemsDrawer from '../../../../../components/FormItemsDrawer';
import { AjaxResponse } from '../../../../../interfaces/common';
import Context from '../../../Context';
import DropdownActions from '../../../../../components/DropdownActions';
import ConfigActions from '@/components/ConfigActions';
import useCard from '@/hooks/useCard';
import CardConfigDrawer from '../../drawers/CardConfigDrawer';
import useConfigVisible from '@/hooks/useConfigVisible';
import { transformFormItemLines } from '@/utils';
import FormItemConfigDrawer from '@/components/FormItemConfigDrawer';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};
const colLayout = {
  lg: {
    span: 8,
  },
  md: {
    span: 12,
  },
  sm: {
    span: 24,
  },
};

export default () => {
  const { api } = useContext(Context);

  const {
    formItemsDrawerVisible,
    pathModalVisible,
    setFormItemsDrawerVisible,
    setPathModalVisible,
    cardDrawerVisible,
    setCardDrawerVisible,
    formItemConfigDrawerVisible,
    setFormItemConfigDrawerVisible,
  } = useConfigVisible();

  const {
    setCardIndex,
    moveCardUp,
    moveCardDown,
    deleteCard,
    copyCard,
    configCard,
    cards,
    setCards,
    addFormItemsToCard,
    moveItemUp,
    moveItemDown,
    configItem,
    deleteItem,
    copyItem,
    currentItem,
    setCurrentItem,
    itemIndex,
    setItemIndex,
  } = useCard();

  /**
   * 把配置的表单信息和添加的表单项配置传到服务端
   */
  const remoteCall = async (path: string) => {
    try {
      const result = await api.callRemote({
        type: 'org.umi-plugin-page-creator.longForm',
        payload: {
          cards,
          path,
        },
      });
      message.success((result as AjaxResponse<string>).message);
      setPathModalVisible(false);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <Form {...formItemLayout}>
        {cards.map((card, cardIndex) => {
          const { title, formItems = [] } = card;
          const cols = 3;
          // 把formItems分成3列
          const formItemLines = transformFormItemLines(formItems, cols);
          return (
            <Card
              bordered={false}
              title={<Title text={title} />}
              extra={
                <ConfigActions
                  moveUp={moveCardUp(cardIndex)}
                  moveDown={moveCardDown(cardIndex)}
                  deleteItem={deleteCard(cardIndex)}
                  copyItem={copyCard(cardIndex)}
                  configItem={() => {
                    setCardDrawerVisible(true);
                    setCardIndex(cardIndex);
                  }}
                />
              }
            >
              {formItemLines.map((line, index) => (
                <Row key={index} gutter={16}>
                  {line.map((formItem, itemIndex) => (
                    <Col key={formItem.name} {...colLayout}>
                      {renderFormItem({
                        formItem,
                        config: true,
                        position: 'top',
                        moveUp: moveItemUp(index * cols + itemIndex, cardIndex),
                        moveDown: moveItemDown(
                          index * cols + itemIndex,
                          cardIndex,
                        ),
                        configItem: () => {
                          setCardIndex(cardIndex);
                          setCurrentItem(formItem);
                          setItemIndex(index * cols + itemIndex);
                          setFormItemConfigDrawerVisible(true);
                        },
                        deleteItem: deleteItem(
                          index * cols + itemIndex,
                          cardIndex,
                        ),
                        copyItem: copyItem(index * cols + itemIndex, cardIndex),
                      })}
                    </Col>
                  ))}
                </Row>
              ))}
              <Button
                onClick={() => {
                  setCardIndex(cardIndex);
                  setFormItemsDrawerVisible(true);
                }}
                type="dashed"
                style={{ width: '100%' }}
              >
                添加表单元素
              </Button>
            </Card>
          );
        })}
      </Form>
      <Button
        type="primary"
        onClick={() =>
          setCards(cards =>
            cards.concat([
              { title: `自定义Card${cards.length}`, formItems: [] },
            ]),
          )
        }
        style={{ margin: 24 }}
      >
        新增Card
      </Button>

      {/**Card编辑的抽屉 */}
      <CardConfigDrawer
        visible={cardDrawerVisible}
        setVisible={setCardDrawerVisible}
        onFinish={configCard}
      />

      {/** 选择表单元素的抽屉 */}
      <FormItemsDrawer
        visible={formItemsDrawerVisible}
        setVisible={setFormItemsDrawerVisible}
        onSubmit={values => {
          addFormItemsToCard(values);
          setFormItemsDrawerVisible(false);
        }}
      />
      {currentItem && (
        <FormItemConfigDrawer
          visible={formItemConfigDrawerVisible}
          onVisible={setFormItemConfigDrawerVisible}
          index={itemIndex}
          formItem={currentItem}
          onConfirm={configItem}
        />
      )}
      <DropdownActions
        onRemoteCall={remoteCall}
        modalVisible={pathModalVisible}
        setModalVisible={setPathModalVisible}
      />
    </>
  );
};
