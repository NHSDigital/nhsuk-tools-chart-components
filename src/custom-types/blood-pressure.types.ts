export const BpClassificationLevel = {
  Low: '0',
  Healthy: '1',
  SlightlyRaised: '2',
  High: '3',
  VeryHigh: '4',
} as const;

export type BpClassificationLevelType =
  (typeof BpClassificationLevel)[keyof typeof BpClassificationLevel];

export type BpLegendKeys = {
  [key in keyof typeof BpClassificationLevel as Lowercase<string>]: string;
};

export type BpReadingValue = {
  systolic: number;
  diastolic: number;
};

export type BpCellConfiguration = {
  id: string;
  firstInRow?: boolean;
  firstInColumn?: boolean;
};

export type BpRowConfiguration = {
  id: string;
  cells: BpCellConfiguration[];
};

export type BpGraphLayout = {
  systolicLabel: string;
  diastolicLabel: string;
  rows: BpRowConfiguration[];
};
