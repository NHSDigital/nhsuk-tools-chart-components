import { BmiClassification } from '@custom-types/bmi.types';

export const mockedBmiClassificationBounds = {
  lower: 0,
  upper: {
    [BmiClassification.Underweight]: {
      value: 18.5,
      label: '18.4',
    },
    [BmiClassification.Healthy]: {
      value: 25,
      label: '24.9',
    },
    [BmiClassification.Overweight]: {
      value: 30,
      label: '29.9',
    },
    [BmiClassification.Obese1]: {
      value: 35,
      label: '34.9',
    },
    [BmiClassification.Obese2]: {
      value: 40,
      label: '39.9',
    },
    [BmiClassification.Obese3]: {
      value: undefined,
      label: '',
    },
  },
};
