export type BarSliderConfig = {
  name: string;
  axis: BarSliderAxis;
  segments: BarSliderSegment[];
  constraints?: BarSliderConstraints;
};

export type BarSliderConstraints = {
  max: {
    value: number;
    position: number;
  };
};

export type BarSliderAxis = {
  ticks: BarSliderAxisTicks[];
};
export type BarSliderAxisTicks = {
  value: number;
  isVisible?: boolean;
};

export type BarSliderSegment = {
  start?: number;
  end?: number;
  weight?: number;
  styleSuffix: string;
  legend?: string;
};

export type BarSliderTickPosition = {
  value: number;
  label: string;
  isVisible: boolean;
};

export type BarSliderRegionPosition = {
  value: number;
  styleClass: string;
};
