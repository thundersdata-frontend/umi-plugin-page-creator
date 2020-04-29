/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-29 11:06:58
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-04-29 17:32:55
 */
import React, { useState } from "react"; // -> 暂时先解决报错，后期全部删掉
import { Layout } from "antd";
import { IUiApi } from "umi-types";
import Context, { TemplateType } from "./Context";
import TemplateList from "./components/TemplateList";
import Dashboard from "./components/Dashboard";
import "./index.module.less";

const { Header, Content } = Layout;

export default ({ api }: { api: IUiApi }) => {
  const [templateType, setTemplate] = useState<TemplateType>();

  const addTemplate = (templateType: TemplateType) => {
    setTemplate(templateType);
  };

  return (
    <Context.Provider value={{ api, templateType, addTemplate }}>
      <Layout>
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
