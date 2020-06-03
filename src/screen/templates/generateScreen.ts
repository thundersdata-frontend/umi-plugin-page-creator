import { ScreenConfigPayload } from "../../../interfaces/screen";
import { removeUnusedImport } from "../../utils/removeUnusedImport";
import { writeFileSync } from "fs";

/**
 * 生成大屏页面
 * @param payload
 */
export default function(screenPath: string, payload: ScreenConfigPayload) {
  const { title, titleStyle, gutter, layout } = payload;

  const code = `
    import React from 'react';
    import { Row, Col } from 'antd';
    ${layout.map(item => `import ${item.name} from './components/${item.name}';`).join('')}

    export default () => {
      return (
        <div style={{height: '100%', paddingLeft: ${gutter}, paddingRight: ${gutter}}}>
          <Row>
            <Col span={24}>
              <div style={${JSON.stringify(titleStyle)}}>${title}</div>
            </Col>
          </Row>
          <Row style={{ height: 'calc(100% - ${(titleStyle as any).height})'}} gutter={${gutter}}>
            ${layout.map(item => `
              <${item.name} />
            `).join('')}
          </Row>
        </div>
      );
    }
  `;
  const removeUnusedImportCode = removeUnusedImport(code);
  if (removeUnusedImportCode) {
    writeFileSync(`${screenPath}/index.tsx`, removeUnusedImportCode, 'utf-8');
  }
}
