import { WeightedBounds } from './threshold.types';

export type ChartRegion = {
  name: string;
  size: number;
};

export type ChartAxis = {
  position: number;
  label: string;
};

export type ChartSegment = {
  start: number;
  end: number;
  width: number;
};

export interface HorizontalBarChartBounds<T extends string> {
  lowerBound: number;
  upperBounds: Record<T, number>;
}

export type BarClassificationBounds<T extends string> = WeightedBounds<T>;
