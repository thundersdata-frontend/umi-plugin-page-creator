/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 11:06:58
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-06 16:24:03
 */
import React, { useState } from 'react'; // -> 暂时先解决报错，后期全部删掉
import { Layout, message } from 'antd';
import { IUiApi } from '@umijs/ui-types';
import Context from './Context';
import TemplateList from './components/TemplateList';
import Dashboard from './components/Dashboard';
import './index.module.less';
import { TemplateType } from '../../interfaces/common';
import { Store } from 'antd/lib/form/interface';

const { Header, Content } = Layout;

export default ({ api }: { api: IUiApi }) => {
  const [visible, setVisible] = useState(false);
  const [templateType, setTemplate] = useState<TemplateType>();
  const [shortFormConfig, setShortFormConfig] = useState<Store>({
    title: '单列表单',
  });

  const addTemplate = (templateType: TemplateType) => {
    setTemplate(templateType);
    message.success('模板添加成功，你可以开始配置了');
  };

  const addShortFormConfig = (shortFormConfig: Store) => {
    setShortFormConfig(shortFormConfig);
    message.success('表单配置成功，你可以开始配置表单内容了');
  };

  return (
    <Context.Provider
      value={{
        api,
        templateType,
        visible,
        setVisible,
        addTemplate,
        shortFormConfig,
        addShortFormConfig,
      }}
    >
      <Layout style={{ overflowY: 'auto' }}>
        <Header>
          <TemplateList />
        </Header>
        <Content>
          <Dashboard />
        </Content>
      </Layout>
    </Context.Provider>
  );
};
