export const BpClassificationLevel = {
  Low: 'low',
  Healthy: 'healthy',
  SlightlyRaised: 'slightlyRaised',
  High: 'high',
  VeryHigh: 'veryHigh',
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
