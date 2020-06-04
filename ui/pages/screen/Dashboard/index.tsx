import React, { useContext, useState } from 'react';
import Context from '../Context';
import { Button, Row, Col, Tooltip, Space, Divider, InputNumber, message } from 'antd';
import { SettingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import useScreen from '../../../hooks/useScreen';
import ScreenConfigDrawer from '../ScreenConfigDrawer';
import ColConfigDrawer from '../ColConfigDrawer';
import classNames from 'classnames';
import { transformConfig } from '../../../utils';
import { ScreenConfigPayload } from '../../../../interfaces/screen';
import { AjaxResponse } from '../../../../interfaces/common';
import { renderPreviewImage } from '../helper';

const initialStyle = {
  textAlign: 'center',
  height: '80px',
  lineHeight: '80px',
};

export default () => {
  const { api } = useContext(Context);
  const {
    screenConfigDrawerVisible,
    toggleScreenConfigVisible,
    colConfigDrawerVisible,
    toggleColConfigVisible,
    screenConfig,
    setScreenConfig,
    currentCol,
    handleAddCol,
    handleDeleteCol,
    chooseConfigCol,
    handleConfigCol,
    handleAddRow,
    handleDeleteRow,
    handleConfigRow,
  } = useScreen();

  const { title, titleStyle, gutter, left, right, center } = screenConfig;

  const titleStyleJSON = titleStyle
    ? {
        ...initialStyle,
        ...JSON.parse(titleStyle.replace(/'/g, '"').replace(/(\w+):/is, '"$1":')),
      }
    : initialStyle;

  /**
   * 提交配置信息到后台生成页面和组件
   */
  const remoteCall = async () => {
    const key = 'message';
    if (!title) {
      message.error('您还没有做任何配置，不能提交');
      return;
    }
    const payload: ScreenConfigPayload = {
      title,
      titleStyle: titleStyleJSON,
      gutter: gutter,
      ...transformConfig(screenConfig),
    };

    try {
      message.loading({ content: '正在生成文件，请稍候...', key });
      const result = await api.callRemote({
        type: 'org.umi-plugin-page-creator.screen',
        payload,
      });
      message.success({ content: (result as AjaxResponse<string>).message, key });
    } catch (error) {
      message.error({ content: error.message, key });
    }
  };

  return (
    <div
      style={{
        height: '100%',
        paddingLeft: gutter,
        paddingRight: gutter,
      }}
    >
      <Row>
        <Col span={24}>
          <div style={titleStyleJSON}>{title}</div>
        </Col>
      </Row>
      <Row style={{ height: `calc(100% - ${titleStyleJSON.height} - 30px)` }} gutter={gutter}>
        {/**左侧 */}
        {left.xs && left.sm && left.md && left.lg && left.xl && left.xxl ? (
          <Col xs={left.xs} sm={left.sm} md={left.md} lg={left.lg} xl={left.xl} xxl={left.xxl}>
            <div className={styles.layout}>
              {left.rows.map((row, rowIndex) => (
                <Row key={rowIndex} gutter={[gutter, gutter]} style={{ flex: row.height }}>
                  {row.cols.map((col, colIndex) => (
                    <Col
                      key={colIndex}
                      xs={col.xs}
                      sm={col.sm}
                      md={col.md}
                      lg={col.lg}
                      xl={col.xl}
                      xxl={col.xxl}
                    >
                      <div className={styles.col}>
                        {renderPreviewImage(col.type)}
                        <ColConfigBtn
                          onAddCol={() => handleAddCol('left', rowIndex)}
                          onDeleteCol={() => handleDeleteCol('left', rowIndex, colIndex)}
                          onChooseCol={() => chooseConfigCol('left', rowIndex, colIndex)}
                          onAddRow={() => handleAddRow('left')}
                          onDeleteRow={() => handleDeleteRow('left', rowIndex)}
                          rowFlex={row.height}
                          onConfigRow={value => handleConfigRow('left', rowIndex, value)}
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              ))}
            </div>
          </Col>
        ) : null}
        {/**中间 */}
        {center.xs && center.sm && center.md && center.lg && center.xl && center.xxl ? (
          <Col
            xs={center.xs}
            sm={center.sm}
            md={center.md}
            lg={center.lg}
            xl={center.xl}
            xxl={center.xxl}
          >
            <div className={styles.layout}>
              {center.rows.map((row, rowIndex) => (
                <Row key={rowIndex} gutter={[gutter, gutter]} style={{ flex: row.height }}>
                  {row.cols.map((col, colIndex) => (
                    <Col
                      key={colIndex}
                      xs={col.xs}
                      sm={col.sm}
                      md={col.md}
                      lg={col.lg}
                      xl={col.xl}
                      xxl={col.xxl}
                    >
                      <div className={styles.col}>
                        {renderPreviewImage(col.type)}
                        <ColConfigBtn
                          onAddCol={() => handleAddCol('center', rowIndex)}
                          onDeleteCol={() => handleDeleteCol('center', rowIndex, colIndex)}
                          onChooseCol={() => chooseConfigCol('center', rowIndex, colIndex)}
                          onAddRow={() => handleAddRow('center')}
                          onDeleteRow={() => handleDeleteRow('center', rowIndex)}
                          rowFlex={row.height}
                          onConfigRow={value => handleConfigRow('center', rowIndex, value)}
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              ))}
            </div>
          </Col>
        ) : null}
        {/**右侧 */}
        {right.xs && right.sm && right.md && right.lg && right.xl && right.xxl ? (
          <Col
            xs={right.xs}
            sm={right.sm}
            md={right.md}
            lg={right.lg}
            xl={right.xl}
            xxl={right.xxl}
          >
            <div className={styles.layout}>
              {right.rows.map((row, rowIndex) => (
                <Row key={rowIndex} gutter={[gutter, gutter]} style={{ flex: row.height }}>
                  {row.cols.map((col, colIndex) => (
                    <Col
                      key={colIndex}
                      xs={col.xs}
                      sm={col.sm}
                      md={col.md}
                      lg={col.lg}
                      xl={col.xl}
                      xxl={col.xxl}
                    >
                      <div className={styles.col}>
                        {renderPreviewImage(col.type)}
                        <ColConfigBtn
                          onAddCol={() => handleAddCol('right', rowIndex)}
                          onDeleteCol={() => handleDeleteCol('right', rowIndex, colIndex)}
                          onChooseCol={() => chooseConfigCol('right', rowIndex, colIndex)}
                          onAddRow={() => handleAddRow('right')}
                          onDeleteRow={() => handleDeleteRow('right', rowIndex)}
                          rowFlex={row.height}
                          onConfigRow={value => handleConfigRow('right', rowIndex, value)}
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              ))}
            </div>
          </Col>
        ) : null}
      </Row>
      <Button type="primary" className={styles.floatBtn} onClick={remoteCall}>
        提交
      </Button>
      <Button
        type="primary"
        className={classNames(styles.floatBtn, styles.submitBtn)}
        onClick={() => toggleScreenConfigVisible()}
      >
        配置
      </Button>
      <ScreenConfigDrawer
        visible={screenConfigDrawerVisible}
        toggleVisible={toggleScreenConfigVisible}
        config={screenConfig}
        onFinish={setScreenConfig}
      />
      <ColConfigDrawer
        visible={colConfigDrawerVisible}
        toggleVisible={toggleColConfigVisible}
        onFinish={handleConfigCol}
        col={currentCol}
      />
    </div>
  );
};

function ColConfigBtn({
  onAddCol,
  onDeleteCol,
  onChooseCol,
  onAddRow,
  onDeleteRow,
  rowFlex,
  onConfigRow,
}: {
  onAddCol: () => void;
  onDeleteCol: () => void;
  onChooseCol: () => void;
  onAddRow: () => void;
  onDeleteRow: () => void;
  rowFlex: number;
  onConfigRow: (flex: number) => void;
}) {
  const [flex, setFlex] = useState(rowFlex || 1);

  return (
    <Tooltip
      title={
        <>
          <Divider plain>列操作</Divider>
          <Row>
            <Space>
              <Tooltip placement="bottom" title="新增一列">
                <Button onClick={onAddCol}>
                  <PlusOutlined />
                </Button>
              </Tooltip>
              <Tooltip placement="bottom" title="删除一列">
                <Button onClick={onDeleteCol}>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
              <Tooltip placement="bottom" title="配置这列">
                <Button onClick={onChooseCol}>
                  <SettingOutlined />
                </Button>
              </Tooltip>
            </Space>
          </Row>
          <Divider plain>行操作</Divider>
          <Row>
            <Space>
              <Tooltip placement="bottom" title="新增一行">
                <Button onClick={onAddRow}>
                  <PlusOutlined />
                </Button>
              </Tooltip>
              <Tooltip placement="bottom" title="删除一行">
                <Button onClick={onDeleteRow}>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
              <Tooltip
                placement="bottom"
                trigger="click"
                title={
                  <Row align="middle">
                    <Space>
                      <label>行高占比: </label>
                      <InputNumber
                        min={1}
                        value={flex}
                        onChange={value => setFlex(value as number)}
                      />
                      <Button type="primary" onClick={() => onConfigRow(flex)}>
                        确定
                      </Button>
                    </Space>
                  </Row>
                }
              >
                <Button>
                  <SettingOutlined />
                </Button>
              </Tooltip>
            </Space>
          </Row>
        </>
      }
      trigger="click"
      placement="left"
    >
      <Button type="primary">
        <SettingOutlined />
      </Button>
    </Tooltip>
  );
}
