import { ColSize } from 'antd/lib/col';

export interface ScreenConfig {
  title: string;
  titleStyle: string;
  gutter: number;
  left: {
    xs: ColSize;
    sm: ColSize;
    md: ColSize;
    lg: ColSize;
    xl: ColSize;
    xxl: ColSize;
    rows: ScreenRow[];
  };
  center: {
    xs: ColSize;
    sm: ColSize;
    md: ColSize;
    lg: ColSize;
    xl: ColSize;
    xxl: ColSize;
    rows: ScreenRow[];
  };
  right: {
    xs: ColSize;
    sm: ColSize;
    md: ColSize;
    lg: ColSize;
    xl: ColSize;
    xxl: ColSize;
    rows: ScreenRow[];
  };
}

export interface ScreenRow {
  height: number;
  cols: ScreenCol[];
}

export interface ScreenCol {
  xs?: ColSize;
  sm?: ColSize;
  md?: ColSize;
  lg?: ColSize;
  xl?: ColSize;
  xxl?: ColSize;
  type: ColType;
  chartConfig: ChartConfig;
}

export type LayoutType = 'left' | 'center' | 'right';
export type ColType =
  | 'custom'
  | 'bar'
  | 'groupBar'
  | 'rangeBar'
  | 'barLine'
  | 'groupBarLine'
  | 'column'
  | 'groupColumn'
  | 'rangeColumn'
  | 'circle'
  | 'rose'
  | 'line'
  | 'wave'
  | 'radar'
  | 'circleStackBar'
  | 'scatter'
  | 'stackArea'
  | 'stackBar'
  | 'stackRose'
  | 'waterfall'
  | 'map'
  | 'table'
  | 'rank';

export interface ChartConfig {
  [key: string]: unknown;
}

export interface ScreenColConfig {
  layoutType: LayoutType;
  rowIndex: number;
  colIndex: number;
  config: Partial<ScreenCol>;
}

export interface ScreenConfigPayload {
  title: string;
  titleStyle: object;
  gutter: number;
  layout: ScreenConfigPayloadLayout[];
}

export interface ScreenConfigPayloadLayout {
  name: string;
  xs?: ColSize;
  sm?: ColSize;
  md?: ColSize;
  lg?: ColSize;
  xl?: ColSize;
  xxl?: ColSize;
  rows: ScreenConfigPayloadRow[];
}

export interface ScreenConfigPayloadRow {
  name: string;
  height: number;
  cols: ScreenConfigPayloadCol[];
}

export interface ScreenConfigPayloadCol {
  name: string;
  xs?: ColSize;
  sm?: ColSize;
  md?: ColSize;
  lg?: ColSize;
  xl?: ColSize;
  xxl?: ColSize;
  type: ColType;
  chartConfig: ChartConfig;
}
