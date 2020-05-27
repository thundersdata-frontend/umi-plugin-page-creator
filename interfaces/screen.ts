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
  chartConfig: ChartConfig;
}

export interface ChartConfig {
  [key: string]: unknown;
}
