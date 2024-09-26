import { BaseClassifications } from '@custom-types/bmi.types';

export const mockedCentileValue = {
  value: 1,
  label: 'Below 2',
};

export const mockedChildBmiClassificationBounds = {
  lower: 0,
  upper: {
    [BaseClassifications.Underweight]: {
      value: 2,
      label: '2',
    },
    [BaseClassifications.Healthy]: {
      value: 91,
      label: '91',
    },
    [BaseClassifications.Overweight]: {
      value: 100,
      label: '100',
    },
  },
};
