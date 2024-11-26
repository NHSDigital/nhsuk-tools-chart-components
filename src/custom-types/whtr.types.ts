import { WeightedBounds } from './threshold.types';

export const RiskClassifications = {
  Low: 'low',
  Increased: 'increased',
  High: 'high',
} as const;

export type RiskClassification =
  (typeof RiskClassifications)[keyof typeof RiskClassifications];

export type RiskClassificationBounds = WeightedBounds<RiskClassification>;

export type WhtrLegendKeys = {
  [key in RiskClassification]: string;
};
