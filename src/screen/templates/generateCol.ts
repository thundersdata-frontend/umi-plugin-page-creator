import prettier from 'prettier';
import { writeFileSync } from "fs";
import { ScreenConfigPayloadCol, ColType, ChartConfig } from "../../../interfaces/screen";
import { removeUnusedImport } from "../../utils/removeUnusedImport";

export default function(colPath: string, col: ScreenConfigPayloadCol) {
  console.log(col);
  const code = `
    import React from 'react';
    import { Col } from 'antd';
    import { ChartDom, createColumnPlot } from '@td-design/charts';

    export default () => {
      return (
        <Col xs={${col.xs}} sm={${col.sm}} md={${col.md}} lg={${col.lg}} xl={${col.xl}} xxl={${col.xxl}}>
          <div style={{
            height: '100%',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ChartDom
              title="测试标题7"
            />
          </div>
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

/**
 * 根据图表类型和配置，生成不同的代码
 * @param type
 * @param chartConfig
 */
function renderComponent(type: ColType, chartConfig: ChartConfig) {
  const { title, ...restProps} = chartConfig;
  let code = '';

  switch (type) {
    case 'custom':
    default:
      code = `
        return (<div>我是自定义组件，请开发人员自行补充</div>);
      `;
      break;

    case 'bar':
      code = `
        return createColumnPlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)}
        });
      `;
      break;

    case 'barLine':
      break;

    case 'circle':
      break;

    case 'circleStackBar':
      break;

    case 'column':
      break;

    case 'groupBar':
      break;

    case 'groupBarLine':
      break;

    case 'groupColumn':
      break;

    case 'line':
      break;

    case 'map':
      break;

    case 'radar':
      break;

    case 'rangeBar':
      break;

    case 'rangeColumn':
      break;

    case 'rank':
      break;

    case 'rose':
      break;

    case 'scatter':
      break;

    case 'stackArea':
      break;

    case 'stackBar':
      break;

    case 'stackRose':
      break;

    case 'table':
      break;

    case 'waterfall':
      break;

    case 'wave':
      break;
  }
  console.log(code);
  const result = `
    <ChartDom
      title="${title}"
      getDom={(dom: HTMLElement) => {
        ${code}
      }}
    />
  `;
  console.log(result);
}
