import {
  BpClassificationLevelType,
  BpReadingValue,
} from '@custom-types/blood-pressure.types';
import {
  BaseClassificationLevel,
  BmiClassification,
  BmiClassificationLevelLabel,
} from '@custom-types/bmi.types';
import { Bounds } from '@custom-types/threshold.types';

export interface ChildBmitChartBounds {
  lowerBound: number;
  upperBounds: Record<BaseClassificationLevel, number>;
}

export const ChildBmiClassificationsOrderMap = {
  [BmiClassification.Underweight]: null,
  [BmiClassification.Healthy]: BmiClassification.Underweight,
  [BmiClassification.Overweight]: BmiClassification.Healthy,
} as const;

export interface BmitChartBounds {
  lowerBound: number;
  upperBounds: Record<BmiClassificationLevelLabel, number>;
}

export type BpBounds = {
  [key in keyof BpReadingValue]: Bounds<BpClassificationLevelType>;
};
