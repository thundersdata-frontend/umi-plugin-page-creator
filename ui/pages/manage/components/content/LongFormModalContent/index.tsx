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
import ImportActions from '../../ImportActions';
import ExportActions from '../../ExportActions';
import useConfig from '../../../../../hooks/useConfig';

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

  const {
    initialFetch,
    setInitialFetch,
    submitFetch,
    setSubmitFetch,
  } = useConfig();

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
    importModalVisible,
    setImportModalVisible,
    exportModalVisible,
    setExportModalVisible,
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
          formConfig,
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

  /** 把导入的配置信息进行解析 */
  const handleImportSubmit = (values: Store) => {
    setImportModalVisible(false);
    const { importConfig } = values;
    const { formConfig, formItems, initialFetch, submitFetch } = JSON.parse(importConfig);
    setFormConfig(formConfig);
    setFormItems(formItems);
    setInitialFetch(initialFetch);
    setSubmitFetch(submitFetch);
  }

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
              {line.map((formItem, itemIndex) => (
                <Col span={12}>
                  {renderFormItem({
                    formItem,
                    config: true,
                    position: 'top',
                    moveUp: moveUp(index * cols + itemIndex),
                    moveDown: moveDown(index * cols + itemIndex),
                    configItem: () => {
                      configItem(formItem, index * cols + itemIndex);
                      setFormItemConfigDrawerVisible(true);
                    },
                    deleteItem: deleteItem(index * cols + itemIndex),
                    copyItem: copyItem(index * cols + itemIndex),
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
        initialFetch={initialFetch}
        submitFetch={submitFetch}
      />

      {/**表单配置 */}
      <ShortFormConfigDrawer
        visible={formConfigDrawerVisible}
        setVisible={setFormConfigDrawerVisible}
        onFinish={setFormConfig}
        formConfig={formConfig}
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

      {/* 导入 */}
      <ImportActions
        modalVisible={importModalVisible}
        setModalVisible={setImportModalVisible}
        onSubmit={handleImportSubmit}
      />

      {/* 导出 */}
      <ExportActions
        config={{
          formConfig,
          formItems,
          initialFetch,
          submitFetch,
        }}
        modalVisible={exportModalVisible}
        setModalVisible={setExportModalVisible}
      />
    </>
  );
};
