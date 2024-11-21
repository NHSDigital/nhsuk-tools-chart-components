export type UpperBoundInequalityMethod = (a: number, b: number) => boolean;

export type UpperBoundValue = {
  value?: number;
  label?: string;
  inequalityMethod?: UpperBoundInequalityMethod;
};

export type UpperBounds<TClassificationLevel extends string> = {
  [key in TClassificationLevel]: UpperBoundValue;
};

export type Bounds<TClassificationLevel extends string> = {
  lower: number;
  upper: UpperBounds<TClassificationLevel>;
};

export type WeightedUpperBoundValue = {
  value: number;
  weight: number;
  label?: string;
};

export type WeightedUpperBounds<TClassificationLevel extends string> = {
  [key in TClassificationLevel]: WeightedUpperBoundValue;
};

export type WeightedBounds<TClassificationLevel extends string> = {
  lower: number;
  upper: WeightedUpperBounds<TClassificationLevel>;
};
