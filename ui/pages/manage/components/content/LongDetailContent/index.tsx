import React, { useContext, useEffect } from 'react';
import { Form, Button, Card, message, Row, Col, Input } from 'antd';
import Title from '../../../../../components/Title';
import { AjaxResponse } from '../../../../../../interfaces/common';
import Context from '../../../Context';
import PathMenuAction from '../../PathMenuAction';
import CardConfigDrawer from '../../drawers/CardConfigDrawer';
import { transformFormItemLines } from '../../../../../utils';
import produce from 'immer';
import faker from 'faker';
import styles from './index.module.less';
import useConfigVisible from '../../../../../hooks/useConfigVisible';
import useCard from '../../../../../hooks/useCard';
import ConfigActions from '../../../../../components/ConfigActions';
import FormItemConfigDrawer from '../../../../../components/FormItemConfigDrawer';
import ApiConfigDrawer from '../../drawers/ApiConfigDrawer';
import useConfig from '../../../../../hooks/useConfig';
import copy from 'copy-to-clipboard';
import ExportActions from '../../ExportActions';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 14 },
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
  const { api, impConfigJson } = useContext(Context);

  const {
    initialFetch,
    setInitialFetch,
    submitFetch,
    setSubmitFetch,
  } = useConfig();

  const {
    formItemsDrawerVisible,
    pathModalVisible,
    setFormItemsDrawerVisible,
    setPathModalVisible,
    cardDrawerVisible,
    setCardDrawerVisible,
    formItemConfigDrawerVisible,
    setFormItemConfigDrawerVisible,
    apiConfigDrawerVisible,
    setApiConfigDrawerVisible,
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
   * 添加详情展示项
   */
  const addDetailItem = (cardIndex: number) => () => {
    setCards(
      produce(cards, draft => {
        draft[cardIndex].formItems.push({
          label: faker.name.title(),
          name: faker.name.lastName(),
          type: 'input',
        });
      }),
    );
  };

  const handleApiSubmit = (initialFetch?: string[], submitFetch?: string[]) => {
    setInitialFetch(initialFetch);
    setSubmitFetch(submitFetch);
  };

  /**
   * 把配置的表单信息和添加的表单项配置传到服务端
   */
  const remoteCall = async ({ path, menu }: { path?: string; menu?: string }) => {
    const key = 'message';
    try {
      if (cards.length === 0) {
        message.error('你还没有添加Card');
        return;
      }
      if (cards.some(item => item.formItems.length === 0)) {
        message.error('你有Card里面没有配置展示项');
        return;
      }
      message.loading({ content: '正在生成文件，请稍候...', key });
      const result = await api.callRemote({
        type: 'org.umi-plugin-page-creator.longDetail',
        payload: {
          cards,
          path,
          menu,
          initialFetch,
          submitFetch,
        },
      });
      message.success({ content: (result as AjaxResponse<string>).message, key });
      setPathModalVisible(false);
    } catch (error) {
      message.error({ content: error.message, key });
    }
  };

  /** 把导入的配置信息进行解析 */
  useEffect(() => {
    if (impConfigJson) {
      const { cards = [{ title: '自定义Card0', formItems: [] }], initialFetch = [], submitFetch = [] } = JSON.parse(impConfigJson);
      setCards(cards);
      setInitialFetch(initialFetch);
      setSubmitFetch(submitFetch);
    }
  }, [impConfigJson]);

  /** 导出 */
  const handleExport = () => {
    copy(JSON.stringify({
      cards,
      initialFetch,
      submitFetch
    }, null, 2));
    message.success('配置已复制到剪贴板');
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
                      <div className={styles.formItemConfig}>
                        <ConfigActions
                          position="top"
                          moveUp={moveItemUp(index * cols + itemIndex, cardIndex)}
                          moveDown={moveItemDown(index * cols + itemIndex, cardIndex)}
                          configItem={() => {
                            setCardIndex(cardIndex);
                            setCurrentItem(formItem);
                            setItemIndex(index * cols + itemIndex);
                            setFormItemConfigDrawerVisible(true);
                          }}
                          deleteItem={deleteItem(index * cols + itemIndex, cardIndex)}
                          copyItem={copyItem(index * cols + itemIndex, cardIndex)}
                        />
                        <Form.Item label={formItem.label} name={formItem.name}>
                          <Input disabled />
                        </Form.Item>
                      </div>
                    </Col>
                  ))}
                </Row>
              ))}
              <Button onClick={addDetailItem(cardIndex)} type="dashed" style={{ width: '100%' }}>
                添加展示项
              </Button>
            </Card>
          );
        })}
      </Form>
      <Button
        type="primary"
        onClick={() =>
          setCards(cards => cards.concat([{ title: `自定义Card${cards.length}`, formItems: [] }]))
        }
        style={{ margin: 24 }}
      >
        新增Card
      </Button>
      <Button type="primary" onClick={() => setApiConfigDrawerVisible(true)}>
        页面接口配置
      </Button>

      {/**页面接口配置 */}
      <ApiConfigDrawer
        visible={apiConfigDrawerVisible}
        setVisible={setApiConfigDrawerVisible}
        onSubmit={handleApiSubmit}
        initialFetch={initialFetch}
        submitFetch={submitFetch}
      />

      {/**Card编辑的抽屉 */}
      <CardConfigDrawer
        visible={cardDrawerVisible}
        setVisible={setCardDrawerVisible}
        onFinish={configCard}
      />

      {currentItem && (
        <FormItemConfigDrawer
          visible={formItemConfigDrawerVisible}
          onVisible={setFormItemConfigDrawerVisible}
          index={itemIndex}
          formItem={currentItem}
          onConfirm={configItem}
          from="detail"
          initialFetch={initialFetch}
        />
      )}

      <PathMenuAction
        showCreatePatchCheckbox
        type="detail"
        onRemoteCall={remoteCall}
        modalVisible={pathModalVisible}
        setModalVisible={setPathModalVisible}
      />

      {/* 导出 */}
      <ExportActions onClick={handleExport} />
    </>
  );
};
