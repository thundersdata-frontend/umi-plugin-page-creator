import React, { useContext, useState, useEffect } from 'react';
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
import useConfig from '../../../../../hooks/useConfig';
import { ColumnType } from 'antd/lib/table/interface';
import copy from 'copy-to-clipboard';
import ExportActions from '../../ExportActions';

export default () => {
  const { api, impConfigJson } = useContext(Context);
  const [tableConfig, setTableConfig] = useState<Store>({
    headerTitle: '表格配置',
    search: false,
    bordered: true,
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

  /** 把导入的配置信息进行解析 */
  useEffect(() => {
    if (impConfigJson) {
      const { tableConfig = {
        headerTitle: '表格配置',
        search: false,
        bordered: true,
      }, columns = [], initialFetch = [], submitFetch = [] } = JSON.parse(impConfigJson);
      setTableConfig(tableConfig);
      (columns as ColumnType<any>[]).map(item => onConfirm(item));
      setInitialFetch(initialFetch);
      setSubmitFetch(submitFetch);
    }
  }, [impConfigJson]);

  /** 导出 */
  const handleExport = () => {
    copy(JSON.stringify({
      tableConfig,
      columns,
      initialFetch,
      submitFetch
    }, null, 2));
    message.success('配置已复制到剪贴板');
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
        initialFetch={initialFetch}
        submitFetch={submitFetch}
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

      <ExportActions onClick={handleExport} />
    </>
  );
};
