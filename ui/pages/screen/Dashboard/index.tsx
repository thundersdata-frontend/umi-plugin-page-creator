import React, { useContext, useState } from 'react';
import Context from '../Context';
import { Button, Row, Col, Tooltip, Space, Divider, InputNumber } from 'antd';
import { SettingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import useScreen from '../../../hooks/useScreen';
import ScreenConfigDrawer from '../ScreenConfigDrawer';
import ColConfigDrawer from '../ColConfigDrawer';

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
    handleAddCol,
    handleDeleteCol,
    chooseConfigCol,
    handleConfigCol,
    handleAddRow,
    handleDeleteRow,
    handleConfigRow,
  } = useScreen();

  const titleStyleJSON =
    screenConfig && screenConfig.titleStyle
      ? {
          ...initialStyle,
          ...JSON.parse(screenConfig.titleStyle.replace(/'/g, '"').replace(/(\w+):/is, '"$1":')),
        }
      : initialStyle;

  return (
    <div className={styles.screen}>
      <Row>
        <Col span={24}>
          <div style={titleStyleJSON}>{screenConfig?.title}</div>
        </Col>
      </Row>
      <Row style={{ height: `calc(100% - ${titleStyleJSON.height} - 30px)` }}>
        {/**左侧 */}
        {screenConfig.left.flex ? (
          <Col flex={screenConfig.left.flex} className={styles.layout}>
            {screenConfig.left.rows.map((row, rowIndex) => (
              <Row key={rowIndex} className={styles.row} style={{ flex: row.height }}>
                {row.cols.map((col, colIndex) => (
                  <Col key={colIndex} className={styles.col} flex={col.flex}>
                    <ColConfigBtn
                      onAddCol={() => handleAddCol('left', rowIndex)}
                      onDeleteCol={() => handleDeleteCol('left', rowIndex, colIndex)}
                      onChooseCol={() => chooseConfigCol('left', rowIndex, colIndex)}
                      onAddRow={() => handleAddRow('left')}
                      onDeleteRow={() => handleDeleteRow('left', rowIndex)}
                      rowFlex={row.height}
                      onConfigRow={value => handleConfigRow('left', rowIndex, value)}
                    />
                  </Col>
                ))}
              </Row>
            ))}
          </Col>
        ) : null}
        {/**中间 */}
        {screenConfig.center.flex ? (
          <Col
            flex={screenConfig.center.flex}
            className={styles.layout}
            style={{ marginLeft: 16, marginRight: 16 }}
          >
            {screenConfig.center.rows.map((row, rowIndex) => (
              <Row key={rowIndex} className={styles.row} style={{ flex: row.height }}>
                {row.cols.map((col, colIndex) => (
                  <Col key={colIndex} className={styles.col} flex={col.flex}>
                    <ColConfigBtn
                      onAddCol={() => handleAddCol('center', rowIndex)}
                      onDeleteCol={() => handleDeleteCol('center', rowIndex, colIndex)}
                      onChooseCol={() => chooseConfigCol('center', rowIndex, colIndex)}
                      onAddRow={() => handleAddRow('center')}
                      onDeleteRow={() => handleDeleteRow('center', rowIndex)}
                      rowFlex={row.height}
                      onConfigRow={value => handleConfigRow('center', rowIndex, value)}
                    />
                  </Col>
                ))}
              </Row>
            ))}
          </Col>
        ) : null}
        {/**右侧 */}
        {screenConfig.right.flex ? (
          <Col flex={screenConfig.right.flex} className={styles.layout}>
            {screenConfig.right.rows.map((row, rowIndex) => (
              <Row key={rowIndex} className={styles.row} style={{ flex: row.height }}>
                {row.cols.map((col, colIndex) => (
                  <Col key={colIndex} className={styles.col} flex={col.flex}>
                    <ColConfigBtn
                      onAddCol={() => handleAddCol('right', rowIndex)}
                      onDeleteCol={() => handleDeleteCol('right', rowIndex, colIndex)}
                      onChooseCol={() => chooseConfigCol('right', rowIndex, colIndex)}
                      onAddRow={() => handleAddRow('right')}
                      onDeleteRow={() => handleDeleteRow('right', rowIndex)}
                      rowFlex={row.height}
                      onConfigRow={value => handleConfigRow('right', rowIndex, value)}
                    />
                  </Col>
                ))}
              </Row>
            ))}
          </Col>
        ) : null}
      </Row>
      <Button className={styles.floatBtn} onClick={() => toggleScreenConfigVisible()}>
        大屏配置
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
