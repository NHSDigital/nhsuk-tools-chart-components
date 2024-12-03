export type BarSliderConfig = {
  name: string;
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
  stylePrefix: string;
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
