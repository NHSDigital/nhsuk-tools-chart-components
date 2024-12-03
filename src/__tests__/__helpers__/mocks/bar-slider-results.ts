import { BarSliderConfig } from '@custom-types/bar-slider.types';

export const mockBarSliderConfigExample1: BarSliderConfig = {
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
      styleClass: 'bar-slider-cyan',
      weight: 38,
      legend: 'Item 1 range',
    },
    {
      styleClass: 'bar-slider-yellow',
      weight: 38,
      legend: 'Item 2 range',
    },
    {
      styleClass: 'bar-slider-red',
      weight: 24,
      legend: 'Item 3 range',
    },
  ],
};

export const mockBarSliderConfigExample2: BarSliderConfig = {
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
      styleClass: 'bar-slider-cyan',
      legend: 'Item 1 range',
    },
    {
      start: 10,
      end: 40,
      styleClass: 'bar-slider-yellow',
      legend: 'Item 2 range',
    },
    {
      start: 40,
      end: 60,
      styleClass: 'bar-slider-red',
      legend: 'Item 3 range',
    },
    {
      start: 60,
      end: 90,
      styleClass: 'bar-slider-purple',
      legend: 'Item 4 range',
    },
    {
      start: 90,
      end: 100,
      styleClass: 'bar-slider-green',
      legend: 'Item 5 range',
    },
  ],
};

export const mockBarSliderConfigWithConstraintsExample: BarSliderConfig = {
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
      styleClass: 'bar-slider-cyan',
      weight: 38,
      legend: 'Item 1 range',
    },
    {
      styleClass: 'bar-slider-yellow',
      weight: 38,
      legend: 'Item 2 range',
    },
    {
      styleClass: 'bar-slider-red',
      weight: 24,
      legend: 'Item 3 range',
    },
  ],
};
