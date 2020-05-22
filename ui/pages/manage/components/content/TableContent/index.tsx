import React, { useContext, useState } from 'react';
import { Button, Card, message, Table } from 'antd';
import Title from '../../../../../components/Title';
import { AjaxResponse } from '../../../../../../interfaces/common';
import Context from '../../../Context';
import DropdownActions from '../../DropdownActions';
import { Store } from 'antd/lib/form/interface';
import TableConfigDrawer from '../../drawers/TableConfigDrawer';
import TableColumnConfigDrawer from '../../drawers/TableColumnConfigDrawer';
import TitleWithActions from './TitleWithActions';
import useConfigVisible from '../../../../../hooks/useConfigVisible';
import useTable from '../../../../../hooks/useTable';
import { filterEmpty } from '../../../../../utils';
import ApiConfigDrawer from '../../drawers/ApiConfigDrawer';

export default () => {
  const { api } = useContext(Context);
  const [tableConfig, setTableConfig] = useState<Store>({
    headerTitle: '表格配置',
    search: 1,
    bordered: 1,
  });
  const [initialFetch, setInitialFetch] = useState<string[]>();
  const [submitFetch, setSubmitFetch] = useState<string[]>();

  const {
    pathModalVisible,
    setPathModalVisible,
    tableConfigDrawerVisible,
    setTableConfigDrawerVisible,
    columnConfigDrawerVisible,
    setColumnConfigDrawerVisible,
    apiConfigDrawerVisible,
    setApiConfigDrawerVisible,
  } = useConfigVisible();

  const {
    columns,
    moveUp,
    moveDown,
    copyColumn,
    configColumn,
    deleteColumn,
    currentColumn,
    setIndex,
    setCurrentColumn,
    onConfirm,
  } = useTable();

  const handleApiSubmit = (initialFetch?: string[], submitFetch?: string[]) => {
    setInitialFetch(initialFetch);
    setSubmitFetch(submitFetch);
  };

  /**
   * 把配置的表单信息和添加的表单项配置传到服务端
   */
  const remoteCall = async ({ path, menu }: { path: string; menu?: string }) => {
    try {
      const result = await api.callRemote({
        type: 'org.umi-plugin-page-creator.table',
        payload: {
          tableConfig,
          columns,
          path,
          menu,
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

  return (
    <>
      <Card
        title={<Title text={tableConfig.headerTitle} />}
        extra={
          <Button type="primary" onClick={() => setTableConfigDrawerVisible(true)}>
            配置
          </Button>
        }
      >
        <Table
          bordered
          pagination={{
            pageSize: 10,
            current: 1,
            total: 10,
            showQuickJumper: true,
          }}
          columns={columns.map((column, index) => ({
            ...column,
            title: (
              <TitleWithActions
                title={column.title}
                moveUp={moveUp(index)}
                moveDown={moveDown(index)}
                deleteItem={deleteColumn(index)}
                copyItem={copyColumn(index)}
                configItem={() => {
                  configColumn(column, index);
                  setColumnConfigDrawerVisible(true);
                }}
              />
            ),
          }))}
          dataSource={[]}
        />
        <Button type="primary" style={{ margin: 24 }} onClick={() => setApiConfigDrawerVisible(true)}>
          页面接口配置
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setIndex(0);
            setCurrentColumn(undefined);
            setColumnConfigDrawerVisible(true);
          }}
        >
          添加列
        </Button>
      </Card>

      {/**页面接口配置 */}
      <ApiConfigDrawer
        visible={apiConfigDrawerVisible}
        setVisible={setApiConfigDrawerVisible}
        onSubmit={handleApiSubmit}
      />

      <TableConfigDrawer
        visible={tableConfigDrawerVisible}
        setVisible={setTableConfigDrawerVisible}
        tableConfig={tableConfig}
        onSubmit={values => {
          setTableConfig(values);
          setTableConfigDrawerVisible(false);
        }}
      />

      <TableColumnConfigDrawer
        visible={columnConfigDrawerVisible}
        setVisible={setColumnConfigDrawerVisible}
        onSubmit={values => {
          onConfirm(filterEmpty(values));
          setColumnConfigDrawerVisible(false);
        }}
        current={currentColumn}
        initialFetch={initialFetch}
      />

      {/**提交时候弹出的输入文件路径 */}
      <DropdownActions
        onRemoteCall={remoteCall}
        modalVisible={pathModalVisible}
        setModalVisible={setPathModalVisible}
      />
    </>
  );
};
