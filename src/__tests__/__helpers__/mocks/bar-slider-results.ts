import { BarSliderConfig } from '@custom-types/bar-slider.types';

export const mockBarSliderConfigExample1: BarSliderConfig = {
  name: 'nhsuk-bar-slider',
  axis: {
    ticks: [
      { value: 0.4, isVisible: false },
      { value: 0.5, isVisible: true },
      { value: 0.6, isVisible: true },
      { value: 0.65, isVisible: false },
    ],
  },
  segments: [
    {
      styleSuffix: 'cyan',
      weight: 38,
      legend: 'Item 1 range',
    },
    {
      styleSuffix: 'yellow',
      weight: 38,
      legend: 'Item 2 range',
    },
    {
      styleSuffix: 'red',
      weight: 24,
      legend: 'Item 3 range',
    },
  ],
};

export const mockBarSliderConfigExample2: BarSliderConfig = {
  name: 'nhsuk-bar-slider',
  axis: {
    ticks: [
      { value: 0, isVisible: false },
      { value: 10 },
      { value: 40 },
      { value: 60 },
      { value: 90 },
      { value: 100, isVisible: false },
    ],
  },
  segments: [
    {
      start: 0,
      end: 10,
      styleSuffix: 'cyan',
      legend: 'Item 1 range',
    },
    {
      start: 10,
      end: 40,
      styleSuffix: 'yellow',
      legend: 'Item 2 range',
    },
    {
      start: 40,
      end: 60,
      styleSuffix: 'red',
      legend: 'Item 3 range',
    },
    {
      start: 60,
      end: 90,
      styleSuffix: 'purple',
      legend: 'Item 4 range',
    },
    {
      start: 90,
      end: 100,
      styleSuffix: 'green',
      legend: 'Item 5 range',
    },
  ],
};

export const mockBarSliderConfigWithConstraintsExample: BarSliderConfig = {
  name: 'nhsuk-bar-slider',
  axis: {
    ticks: [
      { value: 0.4, isVisible: false },
      { value: 0.5, isVisible: true },
      { value: 0.6, isVisible: true },
      { value: 0.65, isVisible: false },
    ],
  },
  constraints: {
    max: {
      value: 0.65,
      position: 98,
    },
  },
  segments: [
    {
      styleSuffix: 'bar-slider-cyan',
      weight: 38,
      legend: 'Item 1 range',
    },
    {
      styleSuffix: 'bar-slider-yellow',
      weight: 38,
      legend: 'Item 2 range',
    },
    {
      styleSuffix: 'bar-slider-red',
      weight: 24,
      legend: 'Item 3 range',
    },
  ],
};
