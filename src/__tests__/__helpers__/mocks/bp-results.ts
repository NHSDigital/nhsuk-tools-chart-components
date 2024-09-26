import {
  BpClassificationLevel,
  BpGraphLayout,
  BpReadingValue,
} from '@custom-types/blood-pressure.types';
import { BpBounds } from '@custom-types/classifications.types';

export const mockedBptReading: BpReadingValue = {
  systolic: 140,
  diastolic: 80,
};

export const mockedBpClassificationBounds: BpBounds = {
  systolic: {
    lower: 70,
    upper: {
      [BpClassificationLevel.Low]: {
        value: 90,
      },
      [BpClassificationLevel.Healthy]: {
        value: 120,
      },
      [BpClassificationLevel.SlightlyRaised]: {
        value: 140,
      },
      [BpClassificationLevel.High]: {
        value: 180,
      },
      [BpClassificationLevel.VeryHigh]: {
        value: 300,
      },
    },
  },
  diastolic: {
    lower: 40,
    upper: {
      [BpClassificationLevel.Low]: {
        value: 60,
      },
      [BpClassificationLevel.Healthy]: {
        value: 80,
      },
      [BpClassificationLevel.SlightlyRaised]: {
        value: 90,
      },
      [BpClassificationLevel.High]: {
        value: 120,
      },
      [BpClassificationLevel.VeryHigh]: {
        value: 200,
      },
    },
  },
};

export const mockedBpGraphLayout: BpGraphLayout = {
  systolicLabel: 'Systolic (high number)',
  diastolicLabel: 'Diastolic (low number)',
  rows: [
    {
      id: '0',
      cells: [
        { id: '0-0', firstInColumn: true, firstInRow: true },
        { id: '0-1', firstInColumn: true, firstInRow: false },
        { id: '0-2', firstInColumn: true, firstInRow: false },
        { id: '0-3', firstInColumn: true, firstInRow: false },
        { id: '0-4', firstInColumn: true, firstInRow: false },
        { id: '0-5', firstInColumn: true, firstInRow: false },
      ],
    },
  ],
};
