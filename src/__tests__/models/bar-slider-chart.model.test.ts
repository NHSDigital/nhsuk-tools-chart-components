import { BarSliderConfig } from '@custom-types/bar-slider.types';
import { BarSliderChartModel } from '@models/bar-slider-chart.model';

const mockConfig: BarSliderConfig = {
  axis: {
    ticks: [
      { value: 0, isVisible: false },
      { value: 10 },
      { value: 40 },
      { value: 60 },
      { value: 90, isVisible: true },
      { value: 100, isVisible: false },
    ],
  },
  segments: [
    {
      styleClass: 'mock-style-1',
      weight: 10,
    },
    {
      styleClass: 'mock-style-2',
      weight: 30,
    },
    {
      styleClass: 'mock-style-3',
      weight: 20,
    },
    {
      styleClass: 'mock-style-4',
      weight: 30,
    },
    {
      styleClass: 'mock-style-5',
      weight: 10,
    },
  ],
};

const chartWidth = 100;
describe('Bar slider model', () => {
  it('expect the chart axis ticks to contain the config values', () => {
    const model = new BarSliderChartModel(mockConfig, chartWidth);

    model.AxisTicks().forEach((tick, id) => {
      expect(tick.isVisible).toBe(mockConfig.axis.ticks[id].isVisible ?? true);
      expect(tick.value).toBe(mockConfig.axis.ticks[id].value);
      expect(tick.label).toBe(mockConfig.axis.ticks[id].value.toString());
    });
  });

  it('expect the chart segments to contain the css style for the segment', () => {
    const model = new BarSliderChartModel(mockConfig, chartWidth);

    model.ChartRegions().forEach((segment, id) => {
      expect(segment.styleClass).toBe(mockConfig.segments[id].styleClass);
    });
  });

  it('when invalid ranges are set the css style defaults to empty string', () => {
    const config = {
      axis: {
        ticks: [{ value: 0, isVisible: false }, { value: 1000 }, { value: 40 }],
      },
      segments: [
        {
          start: 0,
          end: 10,
          styleClass: 'mock-style-1',
          weight: 60,
        },
        { start: 10, end: 40, styleClass: 'mock-style-2', weight: 40 },
      ],
    };

    const model = new BarSliderChartModel(config, chartWidth);
    const ticks = Object.values(config.axis.ticks).slice(1);

    model.ChartRegions().forEach((segment, id) => {
      const tick = ticks[id];

      // if start/end is outside valid range
      if (
        tick.value < config.segments[id].start! ||
        tick.value > config.segments[id].end!
      ) {
        expect(segment.styleClass).toBe('');
      } else {
        expect(segment.styleClass).toBe(config.segments[id].styleClass);
      }
    });
  });

  it('When axis contains invalid number of ticks expect the chart model to throw exception', () => {
    const config = {
      axis: {
        ticks: [{ value: 0 }, { value: 1000 }],
      },
      segments: [
        {
          styleClass: 'mock-style-1',
        },
        { styleClass: 'mock-style-2' },
      ],
    };
    expect(() => new BarSliderChartModel(config, chartWidth)).toThrow(
      'invalid number of axis ticks'
    );
  });
});
