export type BarSliderConfig = {
  axis: BarSlidertAxis;
  segments: BarSliderSegment[];
  constraints?: BarSliderConstraints;
};

export type BarSliderConstraints = {
  max: {
    value: number;
    position: number;
  };
};

export type BarSlidertAxis = {
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
  styleClass: string;
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
