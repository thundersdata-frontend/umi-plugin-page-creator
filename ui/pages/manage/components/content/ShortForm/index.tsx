import React, { useContext, useState } from 'react';
import { Form, Button, Card, message } from 'antd';
import Title from '../../../../../components/Title';
import FormItemConfig from '../../../../../components/FormItemConfig';
import FormComponentsDrawer from '../../../../../components/FormComponentsDrawer';
import { FormItemType, AjaxResponse } from '../../../../../interfaces/common';
import FormItemConfigDrawer from '../../../../../components/FormItemConfigDrawer';
import useFormItem from '../../../../../hooks/useFormItem';
import Context from '../../../Context';
import DropdownActions from '../../../../../components/DropdownActions';

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

export default () => {
  const {
    api,
    shortFormConfig,
    templateType,
    setVisible: setFormConfigDrawerVisible,
  } = useContext(Context);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    formItems,
    setFormItems,
    moveUp,
    moveDown,
    configItem,
    index,
    currentItem,
    visible: configDrawerVisible,
    setVisible: setConfigDrawerVisible,
    onConfirm,
  } = useFormItem();

  /**
   * 添加表单元素
   * @param checkedComponents
   */
  const handleSubmit = (checkedComponents: FormItemType[]) => {
    const newFormItems = checkedComponents.map(type => ({
      type,
      name: '',
      label: '',
    }));
    setFormItems(formItems => [...formItems, ...newFormItems]);
    setVisible(false);
    message.success('添加成功');
  };

  /**
   * 把配置的表单信息和添加的表单项配置传到服务端
   */
  const remoteCall = async (path: string) => {
    // 对formItems进行遍历，如果其中有任一项没有配置label/name，则不允许提交
    if (formItems.length === 0) {
      message.error('您还没有添加表单项，不能提交！');
      return;
    }
    if (formItems.some(item => !item.label || !item.name)) {
      message.error('您还有表单项没有配置，不能提交！');
      return;
    }
    try {
      const result = await api.callRemote({
        type: 'org.umi-plugin-page-creator.shortForm',
        payload: {
          formConfig: shortFormConfig,
          formItems,
          path,
        },
      });
      message.success((result as AjaxResponse<string>).message);
      setModalVisible(false);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <Card title={<Title text={shortFormConfig.title} />}>
        <Form {...formItemLayout}>
          {formItems.map((formItem, index) => (
            <FormItemConfig
              key={index}
              config
              formItem={formItem}
              moveUp={moveUp(index)}
              moveDown={moveDown(index)}
              configItem={configItem(formItem, index)}
            />
          ))}
          <Button
            onClick={() => setVisible(true)}
            type="dashed"
            style={{ width: '100%', marginBottom: 32 }}
          >
            添加表单元素
          </Button>
        </Form>
      </Card>
      <FormComponentsDrawer
        visible={visible}
        setVisible={setVisible}
        onSubmit={handleSubmit}
      />
      {currentItem && (
        <FormItemConfigDrawer
          visible={configDrawerVisible}
          onVisible={setConfigDrawerVisible}
          index={index}
          formItem={currentItem}
          onConfirm={onConfirm}
        />
      )}
      <DropdownActions
        setVisible={setFormConfigDrawerVisible}
        templateType={templateType}
        onRemoteCall={remoteCall}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};
