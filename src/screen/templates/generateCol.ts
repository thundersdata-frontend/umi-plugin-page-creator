import prettier from 'prettier';
import { writeFileSync } from "fs";
import { ScreenConfigPayloadCol } from "../../../interfaces/screen";
import { removeUnusedImport } from "../../utils/removeUnusedImport";

export default function(colPath: string, col: ScreenConfigPayloadCol, gutter: number, marginRight: boolean) {
  const code = `
    import React from 'react';
    import { Col } from 'antd';

    export default () => {

      return (
        <Col flex={${col.flex}} style={{ marginRight: ${marginRight ? gutter : 0 }}}>
          <div>123</div>
        </Col>
      );
    };
  `;

  const removeUnusedImportCode = removeUnusedImport(code);
  const formattedCode = prettier.format(removeUnusedImportCode, {
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
    parser: 'typescript',
  });
  if (formattedCode) {
    writeFileSync(`${colPath}/index.tsx`, formattedCode, 'utf-8');
  }
}
