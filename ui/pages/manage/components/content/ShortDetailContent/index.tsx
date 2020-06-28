import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Card, message, Input } from 'antd';
import Title from '../../../../../components/Title';
import { AjaxResponse } from '../../../../../../interfaces/common';
import FormItemConfigDrawer from '../../../../../components/FormItemConfigDrawer';
import Context from '../../../Context';
import PathMenuAction from '../../PathMenuAction';
import { Store } from 'antd/lib/form/interface';
import ShortFormConfigDrawer from '../../drawers/ShortFormConfigDrawer';
import useFormItem from '../../../../../hooks/useFormItem';
import produce from 'immer';
import faker from 'faker';
import styles from './index.module.less';
import useConfigVisible from '../../../../../hooks/useConfigVisible';
import ConfigActions from '../../../../../components/ConfigActions';
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
    title: '单列详情',
  });

  const {
    initialFetch,
    setInitialFetch,
    submitFetch,
    setSubmitFetch,
  } = useConfig();

  const {
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
    currentItem,
    index,
    onConfirm,
  } = useFormItem();

  /**
   * 添加详情展示项
   */
  const addDetailItem = () => {
    setFormItems(
      produce(formItems, draft => {
        draft.push({
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
    // 对formItems进行遍历，如果其中有任一项没有配置label/name，则不允许提交
    if (formItems.length === 0) {
      message.error('您还没有添加详情展示项，不能提交！');
      return;
    }
    const key = 'message';
    try {
      message.loading({ content: '正在生成文件，请稍候...', key });
      const result = await api.callRemote({
        type: 'org.umi-plugin-page-creator.shortDetail',
        payload: {
          formConfig,
          formItems,
          path,
          menu,
          initialFetch,
          submitFetch,
        },
      });
      message.success({ content: (result as AjaxResponse<string>).message , key });
      setPathModalVisible(false);
    } catch (error) {
      message.error({ content: error.message, key });
    }
  };

  /** 把导入的配置信息进行解析 */
  useEffect(() => {
    if (impConfigJson) {
      const { formConfig = { title: '单列详情', }, formItems = [], initialFetch = [], submitFetch = [] } = JSON.parse(impConfigJson);
      setFormConfig(formConfig);
      setFormItems(formItems);
      setInitialFetch(initialFetch);
      setSubmitFetch(submitFetch);
    }
  }, [impConfigJson]);

  /** 导出 */
  const handleExport = () => {
    copy(JSON.stringify({
      formConfig,
      formItems,
      initialFetch,
      submitFetch
    }, null, 2));
    message.success('配置已复制到剪贴板');
  };

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
          {formItems.map((formItem, index) => (
            <div className={styles.formItemConfig}>
              <ConfigActions
                moveUp={moveUp(index)}
                moveDown={moveDown(index)}
                configItem={() => {
                  configItem(formItem, index);
                  setFormItemConfigDrawerVisible(true);
                }}
                deleteItem={deleteItem(index)}
                copyItem={copyItem(index)}
              />
              <Form.Item label={formItem.label} name={formItem.name}>
                <Input disabled />
              </Form.Item>
            </div>
          ))}
          <Button onClick={addDetailItem} type="dashed" style={{ width: '100%', marginBottom: 32 }}>
            添加展示项
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

      {/**配置单个表单项 */}
      {currentItem && (
        <FormItemConfigDrawer
          visible={formItemConfigDrawerVisible}
          onVisible={setFormItemConfigDrawerVisible}
          index={index}
          formItem={currentItem}
          onConfirm={onConfirm}
          from="detail"
          initialFetch={initialFetch}
        />
      )}

      {/**提交时候弹出的输入文件路径 */}
      <PathMenuAction
        showCreatePatchCheckbox
        type="detail"
        onRemoteCall={remoteCall}
        modalVisible={pathModalVisible}
        setModalVisible={setPathModalVisible}
      />

      <ExportActions onClick={handleExport} />
    </>
  );
};
