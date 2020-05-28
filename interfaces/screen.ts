export interface ScreenConfig {
  title: string;
  titleStyle: string;
  left: {
    flex: number;
    rows: ScreenRow[];
  };
  center: {
    flex: number;
    rows: ScreenRow[];
  };
  right: {
    flex: number;
    rows: ScreenRow[];
  };
}

export interface ScreenRow {
  height: number;
  cols: ScreenCol[];
}

export interface ScreenCol {
  flex: number;
  type: ColType;
  chartConfig: ChartConfig;
}

export type LayoutType = 'left' | 'center' | 'right';
export type ColType = 'custom' | 'bar' | 'pie' | 'map';

export interface ChartConfig {
  [key: string]: unknown;
}

export interface ScreenConfigPayload {
  title: string;
  titleStyle: object;
  gutter: number;
  layout: ScreenConfigPayloadLayout[];
}

export interface ScreenConfigPayloadLayout {
  name: string;
  flex: number;
  rows: ScreenConfigPayloadRow[];
}

export interface ScreenConfigPayloadRow {
  name: string;
  height: number;
  cols: ScreenConfigPayloadCol[];
}

export interface ScreenConfigPayloadCol {
  name: string;
  flex: number;
  type: ColType;
  chartConfig: ChartConfig;
}
