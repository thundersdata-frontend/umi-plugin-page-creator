/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 11:06:58
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-29 14:27:52
 */
import React, { useState, useEffect } from 'react'; // -> 暂时先解决报错，后期全部删掉
import { Layout, message } from 'antd';
import { IUiApi } from '@umijs/ui-types';
import Context from './Context';
import './index.module.less';
import { CascaderOptionType } from 'antd/lib/cascader';
import { Store } from 'antd/lib/form/interface';
import { TemplateType } from '../../../interfaces/common';
import { BaseClass } from '../../../interfaces/api';
import TemplateList from './components/TemplateList';
import Dashboard from './components/Dashboard';
import ImportAction from './components/ImportAction';
import ConstantConfigAction from './components/ConstantConfigAction';

const { Header, Content } = Layout;

export default ({ api }: { api: IUiApi }) => {
  const [databases, setDatabases] = useState<CascaderOptionType[]>([]);
  const [baseClasses, setBaseClasses] = useState<BaseClass[]>([]);
  const [templateType, setTemplate] = useState<TemplateType>();
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [impConfigJson, setImpConfigJson] = useState<string>(''); // 导入的json
  const [constantModalVisible, setConstantModalVisible] = useState(false);
  const [constantConfig, setConstantConfig] = useState('');

  /** 页面加载时调用后端接口，后端从services/api-lock.json读取数据，生成对应的接口以及类型 */
  useEffect(() => {
    (async () => {
      const result = (await api.callRemote({
        type: 'org.umi-plugin-page-creator.apiGenerator',
        payload: {
          fetchApiJson: true,
        },
      })) as { databases: CascaderOptionType[]; success: boolean; baseClasses: BaseClass[] };

      if (!result.success) {
        message.warning('你的项目没有集成pont');
      } else {
        setDatabases(result.databases);
        setBaseClasses(result.baseClasses);
      }
    })();
  }, []);

  /**
   * 页面初始化之后，通过服务端读取项目下的constant.ts文件，把文件内容返回回来
   */
  useEffect(() => {
    (async () => {
      const result = (await api.callRemote({
        type: 'org.umi-plugin-page-creator.constantLoad',
      })) as { success: boolean; data: string };
      if (result.success) {
        setConstantConfig(result.data);
      }
    })();
  }, []);

  const addTemplate = (templateType: TemplateType) => {
    setTemplate(templateType);
    setImpConfigJson('');
    message.success('模板添加成功，你可以开始配置了');
  };

  /** 导入 */
  const handleImportSubmit = (values: Store) => {
    setImportModalVisible(false);
    const { importConfig } = values;
    setImpConfigJson(importConfig);
  };

  /**
   * 保存常量的配置，调用服务端接口写回数据
   * @param code
   */
  const saveConstantConfig = async (code: string) => {
    const key = 'message';
    message.loading({ content: '正在保存，请稍候...', key });
    await api.callRemote({
      type: 'org.umi-plugin-page-creator.constantSave',
      payload: {
        code,
      }
    });
    message.success({ content: '常量配置保存成功', key });
  };

  return (
    <Context.Provider
      value={{
        api,
        templateType,
        addTemplate,
        databases,
        baseClasses,
        impConfigJson,
        setImpConfigJson,
        constantConfig,
      }}
    >
      <Layout style={{ overflowY: 'auto' }}>
        <Header>
          <TemplateList />
        </Header>
        <Content>
          {/* 导入 */}
          <ImportAction
            modalVisible={importModalVisible}
            setModalVisible={setImportModalVisible}
            onSubmit={handleImportSubmit}
          />
          <ConstantConfigAction
            visible={constantModalVisible}
            setVisible={setConstantModalVisible}
            onSubmit={saveConstantConfig}
          />
          <Dashboard />
        </Content>
      </Layout>
    </Context.Provider>
  );
};
