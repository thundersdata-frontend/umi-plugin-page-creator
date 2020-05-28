import prettier from 'prettier';
import { writeFileSync } from "fs";
import { ScreenConfigPayloadRow } from "../../../interfaces/screen";
import { removeUnusedImport } from "../../utils/removeUnusedImport";

export default function(rowPath: string, gutter: number, row: ScreenConfigPayloadRow) {
  const code = `
    import React from 'react';
    import { Row, Col } from 'antd';
    ${row.cols.map(item => `import ${item.name} from './${item.name}';`).join('')}

    export default () => {
      return (
        <Col
          style={{
            marginBottom: ${gutter},
            flex: ${row.height}
          }}
        >
          ${row.cols.map(row => `<${row.name} />`).join('')}
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
    writeFileSync(`${rowPath}/index.tsx`, formattedCode, 'utf-8');
  }
}
