import { RiskClassifications } from '@custom-types/whtr.types';

export const mockedWtRatioValue = 0.64;

export const mockedWtrClassificationBounds = {
  lower: 0.4,
  upper: {
    [RiskClassifications.Low]: {
      value: 0.5,
      weight: 38,
    },
    [RiskClassifications.Increased]: {
      value: 0.6,
      weight: 38,
    },
    [RiskClassifications.High]: {
      value: 0.65,
      weight: 24,
    },
  },
};
