import { BarSliderConfig } from '@custom-types/bar-slider.types';
import { calculateWeights } from '@utils/bar-slider.utils';

const mockConfig: BarSliderConfig = {
  name: 'bar-slider',
  axis: {
    ticks: [
      { value: 0 },
      { value: 20 },
      { value: 40 },
      { value: 60 },
      { value: 100 },
    ],
  },
  segments: [
    {
      styleSuffix: 'mock-style-1',
    },
    {
      styleSuffix: 'mock-style-2',
    },
    {
      styleSuffix: 'mock-style-3',
    },
  ],
};

describe('calculateWeights', () => {
  it('calculates weights for segments with and without weight', () => {
    const config: BarSliderConfig = {
      ...mockConfig,
      segments: [
        { start: 0, end: 20, weight: 30, styleSuffix: 'style1' },
        { start: 20, end: 40, styleSuffix: 'styles2' },
        { start: 40, end: 60, weight: 30, styleSuffix: 'styles3' },
        { start: 60, end: 100, styleSuffix: 'styles4' },
      ],
    };

    const expectedSegements = [
      { start: 0, end: 20, weight: 30 },
      { start: 20, end: 40, weight: 13.333333333333332 },
      { start: 40, end: 60, weight: 30 },
      { start: 60, end: 100, weight: 26.666666666666664 },
    ];

    const actualWeights = calculateWeights(config);

    actualWeights.forEach((segment, id) => {
      expect(segment.weight).toEqual(expectedSegements[id].weight);
      expect(segment.start).toEqual(expectedSegements[id].start);
      expect(segment.end).toEqual(expectedSegements[id].end);
    });
  });

  it('throws error for invalid weight (total weight > 100)', () => {
    const config: BarSliderConfig = {
      ...mockConfig,
      segments: [
        { start: 0, end: 20, weight: 80, styleSuffix: 'style1' },
        { start: 20, end: 40, weight: 30, styleSuffix: 'styles2' },
        { start: 40, end: 60, styleSuffix: 'styles3' },
        { start: 60, end: 100, styleSuffix: 'styles4' },
      ],
    };

    expect(() => calculateWeights(config)).toThrow('Invalid segment weight.');
  });
});
