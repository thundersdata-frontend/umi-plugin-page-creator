import { writeFileSync } from "fs";
import { ScreenConfigPayloadCol, ColType, ChartConfig } from "../../../interfaces/screen";
import { removeUnusedImport } from "../../utils/removeUnusedImport";

export default function(colPath: string, col: ScreenConfigPayloadCol) {
  const code = `
    import React from 'react';
    import { Col } from 'antd';
    import {
      ChartDom,
      ComBlock,
      ComCard,
      IconsScoreChart,
      CustomTable,
      createColumnPlot,
      createColumnLinePlot,
      createDonutPlot,
      createRadialStackPlot,
      createCustomBarPlot,
      createGroupColumnPlot,
      createGroupedColumnLinePlot,
      createCustomGroupedBarPlot,
      createLinePlot,
      createRadarPlot,
      createRangeColumnPlot,
      createCustomRangeBarPlot,
      createDonutRosePlot,
      createScatterPlot,
      createStackAreaPlot,
      createStackColumnPlot,
      createStackRosePlot,
      createWaterfallPlot,
      createLiquidPlot,
    } from '@td-design/charts';

    export default () => {
      return (
        <Col
          xs={${JSON.stringify(col.xs)}}
          sm={${JSON.stringify(col.sm)}}
          md={${JSON.stringify(col.md)}}
          lg={${JSON.stringify(col.lg)}}
          xl={${JSON.stringify(col.xl)}}
          xxl={${JSON.stringify(col.xxl)}}
        >
          <div style={{
            height: '100%',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            ${renderComponent(col.type, col.chartConfig)}
          </div>
        </Col>
      );
    };
  `;

  const removeUnusedImportCode = removeUnusedImport(code);
  if (removeUnusedImportCode) {
    writeFileSync(`${colPath}/index.tsx`, removeUnusedImportCode, 'utf-8');
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
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'barLine':
      code = `
        return createColumnLinePlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'circle':
      code = `
        return createDonutPlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'circleStackBar':
      code = `
        return createRadialStackPlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'column':
      code = `
        return createCustomBarPlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'groupBar':
      code = `
        return createGroupColumnPlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'groupBarLine':
      code = `
        return createGroupedColumnLinePlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'groupColumn':
      code = `
        return createCustomGroupedBarPlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'line':
      code = `
        return createLinePlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'map':
      code = `
        return ;
      `;
      break;

    case 'radar':
      code = `
        return createRadarPlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'rangeBar':
      code = `
        return createRangeColumnPlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'rangeColumn':
      code = `
        return createCustomRangeBarPlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'rank':
      code = `
        return (
          <ComBlock>
            <ComCard title="${title}>
              <IconsScoreChart standards={[]} scores={[]} />
            </ComCard>
          </ComBlock>
        );
      `;
      break;

    case 'rose':
      code = `
        return createDonutRosePlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'scatter':
      code = `
        return createScatterPlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'stackArea':
      code = `
        return createStackAreaPlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'stackBar':
      code = `
        return createStackColumnPlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'stackRose':
      code = `
        return createStackRosePlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'table':
      code = `
        return (
          <ComBlock>
            <ComCard title="${title}>
              <CustomTable columns={[]} dataSource={[]} enabledScroll />
            </ComCard>
          </ComBlock>
        );
      `;
      break;

    case 'waterfall':
      code = `
        return createWaterfallPlot({
          dom,
          data: [],
          config: ${JSON.stringify(restProps)},
        });
      `;
      break;

    case 'wave':
      code = `
        return createLiquidPlot({
          dom,
          data: 50,
        });
      `;
      break;
  }
  return `
    <ChartDom
      title="${title}"
      getDom={(dom: HTMLElement) => {
        ${code}
      }}
    />
  `;
}
