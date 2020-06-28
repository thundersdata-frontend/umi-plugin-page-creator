import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Card, message, Row, Col, Switch } from 'antd';
import Title from '../../../../../components/Title';
import renderFormItem from '../../../../../components/FormItemConfig';
import FormItemsDrawer from '../../../../../components/FormItemsDrawer';
import { FormItemType, AjaxResponse } from '../../../../../../interfaces/common';
import FormItemConfigDrawer from '../../../../../components/FormItemConfigDrawer';
import Context from '../../../Context';
import PathMenuAction from '../../PathMenuAction';
import { Store } from 'antd/lib/form/interface';
import ShortFormConfigDrawer from '../../drawers/ShortFormConfigDrawer';
import useConfigVisible from '../../../../../hooks/useConfigVisible';
import useFormItem from '../../../../../hooks/useFormItem';
import faker from 'faker';
import { transformFormItemLines } from '../../../../../utils';
import ApiConfigDrawer from '../../drawers/ApiConfigDrawer';
import useConfig from '../../../../../hooks/useConfig';
import copy from 'copy-to-clipboard';
import ExportActions from '../../ExportActions';

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
  const { api, impConfigJson } = useContext(Context);
  const [formConfig, setFormConfig] = useState<Store>({
    title: '两列表单',
  });
  const [checked, setChecked] = useState(true);
  const [fromTable, setFromTable] = useState(true);

  const { submitFetch, setSubmitFetch } = useConfig();

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

  const handleApiSubmit = (submitFetch?: string[]) => {
    setSubmitFetch(submitFetch);
  };

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

  /**
   * 把配置的表单信息和添加的表单项配置传到服务端
   */
  const remoteCall = async ({
    path,
    dirName,
    formPath,
    formDirName,
    detailPath,
    detailDirName,
  }: {
    path?: string;
    dirName?: string;
    formPath?: string;
    formDirName?: string;
    detailPath?: string;
    detailDirName?: string;
  }) => {
    // 对formItems进行遍历，如果其中有任一项没有配置label/name，则不允许提交
    if (formItems.length === 0) {
      message.error('您还没有添加表单项，不能提交！');
      return;
    }
    const key = 'message';
    try {
      message.loading({ content: '正在生成文件，请稍候...', key });
      const result = await api.callRemote({
        type: 'org.umi-plugin-page-creator.longFormModal',
        payload: {
          formConfig,
          formItems,
          path,
          dirName,
          formPath,
          formDirName,
          detailPath,
          detailDirName,
          submitFetch,
          generateDetail: checked,
          fromTable,
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
      const { formConfig = { title: '两列表单' }, formItems = [], submitFetch = [] } = JSON.parse(
        impConfigJson,
      );
      setFormConfig(formConfig);
      setFormItems(formItems);
      setSubmitFetch(submitFetch);
    }
  }, [impConfigJson]);

  /** 导出 */
  const handleExport = () => {
    copy(
      JSON.stringify(
        {
          formConfig,
          formItems,
          submitFetch,
        },
        null,
        2,
      ),
    );
    message.success('配置已复制到剪贴板');
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
        </Form>
        <Form.Item label="默认生成详情弹窗" style={{ marginBottom: 0 }}>
          <Switch checked={checked} onChange={setChecked} />
        </Form.Item>
        <Form.Item label="从Table页打开弹窗" style={{ marginBottom: 0 }}>
          <Switch checked={fromTable} onChange={setFromTable} />
        </Form.Item>
      </Card>
      <Button
        type="primary"
        style={{ marginBottom: 28 }}
        onClick={() => setApiConfigDrawerVisible(true)}
      >
        页面接口配置
      </Button>

      {/**页面接口配置 */}
      <ApiConfigDrawer
        visible={apiConfigDrawerVisible}
        setVisible={setApiConfigDrawerVisible}
        onSubmit={handleApiSubmit}
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
        />
      )}

      {/**提交时候弹出的输入文件路径 */}
      <PathMenuAction
        type={checked ? 'formWithDetail' : 'form'}
        onRemoteCall={remoteCall}
        modalVisible={pathModalVisible}
        setModalVisible={setPathModalVisible}
        modal
      />

      <ExportActions onClick={handleExport} />
    </>
  );
};
