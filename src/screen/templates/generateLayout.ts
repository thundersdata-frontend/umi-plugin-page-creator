import prettier from 'prettier';
import { writeFileSync } from "fs";
import { ScreenConfigPayloadLayout } from "../../../interfaces/screen";
import { removeUnusedImport } from "../../utils/removeUnusedImport";

/**
 * 生成布局组件
 * @param payload
 */
export default function(layoutPath: string, layout: ScreenConfigPayloadLayout) {
  const code = `
    import React from 'react';
    import { Row, Col } from 'antd';
    ${layout.rows.map(item => `import ${item.name} from './${item.name}';`).join('')}

    export default () => {
      return (
        <Col
          flex={${layout.flex}}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          ${layout.rows.map(row => `<${row.name} />`).join('')}
        </Col>
      );
    }
  `;
  const removeUnusedImportCode = removeUnusedImport(code);
  const formattedCode = prettier.format(removeUnusedImportCode, {
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
    parser: 'typescript',
  });
  if (formattedCode) {
    writeFileSync(`${layoutPath}/index.tsx`, formattedCode, 'utf-8');
  }
}
