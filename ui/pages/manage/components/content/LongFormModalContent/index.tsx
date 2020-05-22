import React, { useContext, useState } from 'react';
import { Form, Button, Card, message, Row, Col } from 'antd';
import Title from '../../../../../components/Title';
import renderFormItem from '../../../../../components/FormItemConfig';
import FormItemsDrawer from '../../../../../components/FormItemsDrawer';
import { FormItemType, AjaxResponse } from '../../../../../../interfaces/common';
import FormItemConfigDrawer from '../../../../../components/FormItemConfigDrawer';
import Context from '../../../Context';
import DropdownActions from '../../DropdownActions';
import { Store } from 'antd/lib/form/interface';
import ShortFormConfigDrawer from '../../drawers/ShortFormConfigDrawer';
import useConfigVisible from '../../../../../hooks/useConfigVisible';
import useFormItem from '../../../../../hooks/useFormItem';
import faker from 'faker';
import { transformFormItemLines } from '../../../../../utils';
import ApiConfigDrawer from '../../drawers/ApiConfigDrawer';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
    md: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 14 },
  },
};

export default () => {
  const { api } = useContext(Context);
  const [formConfig, setFormConfig] = useState<Store>({
    title: '两列表单',
  });
  const [initialFetch, setInitialFetch] = useState<string[]>();
  const [submitFetch, setSubmitFetch] = useState<string[]>();

  const {
    formItemsDrawerVisible,
    setFormItemsDrawerVisible,
    pathModalVisible,
    setPathModalVisible,
    formConfigDrawerVisible,
    setFormConfigDrawerVisible,
    formItemConfigDrawerVisible,
    setFormItemConfigDrawerVisible,
    apiConfigDrawerVisible,
    setApiConfigDrawerVisible,
  } = useConfigVisible();

  const {
    formItems,
    setFormItems,
    moveUp,
    moveDown,
    configItem,
    deleteItem,
    copyItem,
    index,
    currentItem,
    onConfirm,
  } = useFormItem();

  /**
   * 添加表单元素
   * @param checkedComponents
   */
  const handleSubmit = (checkedComponents: FormItemType[]) => {
    const newFormItems = checkedComponents.map(type => ({
      type,
      label: faker.name.title(),
      name: faker.name.lastName(),
    }));
    setFormItems(formItems => [...formItems, ...newFormItems]);
    setFormItemsDrawerVisible(false);
    message.success('添加成功');
  };

  const handleApiSubmit = (initialFetch?: string[], submitFetch?: string[]) => {
    setInitialFetch(initialFetch);
    setSubmitFetch(submitFetch);
  };

  /**
   * 把配置的表单信息和添加的表单项配置传到服务端
   */
  const remoteCall = async ({ path, dirName }: { path: string; dirName?: string }) => {
    // 对formItems进行遍历，如果其中有任一项没有配置label/name，则不允许提交
    if (formItems.length === 0) {
      message.error('您还没有添加表单项，不能提交！');
      return;
    }
    try {
      const result = await api.callRemote({
        type: 'org.umi-plugin-page-creator.longFormModal',
        payload: {
          formConfig: formConfig,
          formItems,
          path,
          dirName,
          initialFetch,
          submitFetch,
        },
      });
      message.success((result as AjaxResponse<string>).message);
      setPathModalVisible(false);
    } catch (error) {
      message.error(error.message);
    }
  };

  const cols = 2;
  // 把formItems分成2列
  const formItemLines = transformFormItemLines(formItems, cols);

  return (
    <>
      <Card
        title={<Title text={formConfig.title} />}
        extra={
          <Button type="primary" onClick={() => setFormConfigDrawerVisible(true)}>
            配置
          </Button>
        }
      >
        <Form {...formItemLayout}>
          {formItemLines.map((line, index) => (
            <Row>
              {line.map(formItem => (
                <Col span={12}>
                  {renderFormItem({
                    formItem,
                    config: true,
                    moveUp: moveUp(index),
                    moveDown: moveDown(index),
                    configItem: () => {
                      configItem(formItem, index);
                      setFormItemConfigDrawerVisible(true);
                    },
                    deleteItem: deleteItem(index),
                    copyItem: copyItem(index),
                  })}
                </Col>
              ))}
            </Row>
          ))}
          <Button
            onClick={() => setFormItemsDrawerVisible(true)}
            type="dashed"
            style={{ width: '100%', marginBottom: 32 }}
          >
            添加表单元素
          </Button>
          <Button type="primary" onClick={() => setApiConfigDrawerVisible(true)}>
            页面接口配置
          </Button>
        </Form>
      </Card>

      {/**页面接口配置 */}
      <ApiConfigDrawer
        visible={apiConfigDrawerVisible}
        setVisible={setApiConfigDrawerVisible}
        onSubmit={handleApiSubmit}
      />

      {/**表单配置 */}
      <ShortFormConfigDrawer
        visible={formConfigDrawerVisible}
        setVisible={setFormConfigDrawerVisible}
        onFinish={setFormConfig}
      />

      {/**表单项集合 */}
      <FormItemsDrawer
        visible={formItemsDrawerVisible}
        setVisible={setFormItemsDrawerVisible}
        onSubmit={handleSubmit}
      />

      {/**配置单个表单项 */}
      {currentItem && (
        <FormItemConfigDrawer
          visible={formItemConfigDrawerVisible}
          onVisible={setFormItemConfigDrawerVisible}
          index={index}
          formItem={currentItem}
          onConfirm={onConfirm}
          submitFetch={submitFetch}
        />
      )}

      {/**提交时候弹出的输入文件路径 */}
      <DropdownActions
        onRemoteCall={remoteCall}
        modalVisible={pathModalVisible}
        setModalVisible={setPathModalVisible}
        modal
      />
    </>
  );
};
