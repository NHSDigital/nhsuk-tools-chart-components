import { Bounds } from './threshold.types';

export const BaseClassifications = {
  Underweight: 'underweight',
  Healthy: 'healthy',
  Overweight: 'overweight',
} as const;

export const BmiClassificationLabel = {
  ...BaseClassifications,
  Obese: 'obese',
} as const;

export const BmiClassification = {
  ...BaseClassifications,
  Obese1: 'obese1',
  Obese2: 'obese2',
  Obese3: 'obese3',
} as const;

export type BaseClassificationLevel =
  (typeof BaseClassifications)[keyof typeof BaseClassifications];

export type BaseClassificationBounds = Bounds<BaseClassificationLevel>;
export type BmiClassificationBounds = Bounds<BmiClassificationLevel>;

export type BmiClassificationLevel =
  (typeof BmiClassification)[keyof typeof BmiClassification];
export type BmiClassificationLevelLabel =
  (typeof BmiClassificationLabel)[keyof typeof BmiClassificationLabel];
export type HighestBmiClassification = 'obese3';

export const ChildBmiClassificationsOrderMap = {
  [BmiClassification.Underweight]: null,
  [BmiClassification.Healthy]: BmiClassification.Underweight,
  [BmiClassification.Overweight]: BmiClassification.Healthy,
} as const;

export type CentileValue = {
  value: number;
  label: string;
};

export type ChildBmiLegendKeys = {
  [key in BaseClassificationLevel]: string;
};

export type BmiLegendKeys = {
  [key in BmiClassificationLevelLabel]?: string;
};
