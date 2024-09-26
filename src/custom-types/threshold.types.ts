export type LowerBound = number;
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
  lower: LowerBound;
  upper: UpperBounds<TClassificationLevel>;
};
