/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 11:06:58
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-19 10:21:03
 */
import React, { useState, useEffect } from 'react'; // -> 暂时先解决报错，后期全部删掉
import { Layout, message } from 'antd';
import { IUiApi } from '@umijs/ui-types';
import Context from './Context';
import TemplateList from './components/TemplateList';
import Dashboard from './components/Dashboard';
import './index.module.less';
import { TemplateType } from '../../../interfaces/common';
import { ApiJSON } from '../../../interfaces/api';

const { Header, Content } = Layout;

export default ({ api }: { api: IUiApi }) => {
  const [databases, setDatabases] = useState<ApiJSON[]>([]);
  const [templateType, setTemplate] = useState<TemplateType>();

  /** 页面加载时调用后端接口，后端从services/api-lock.json读取数据，生成对应的接口以及类型 */
  useEffect(() => {
    (async () => {
      const result = (await api.callRemote({
        type: 'org.umi-plugin-page-creator.apiGenerator',
        payload: {
          fetchApiJson: true,
        },
      })) as { databases: ApiJSON[]; success: boolean };

      if (!result.success) {
        message.warning('你的项目没有集成pont');
      } else {
        setDatabases(result.databases);
      }
    })();
  }, []);

  const addTemplate = (templateType: TemplateType) => {
    setTemplate(templateType);
    message.success('模板添加成功，你可以开始配置了');
  };

  return (
    <Context.Provider
      value={{
        api,
        templateType,
        addTemplate,
        databases,
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
