import {
  ChartSegment,
  HorizontalBarChartBounds,
} from '@custom-types/chart.types';
import {
  WeightedBounds,
  WeightedUpperBoundValue,
} from '@custom-types/threshold.types';
import { recordValues } from './type-safe.utils.';

/**
 * Converts the weighted bounds to suitable format used in the  horizontal bar charts.
 * @template TClassificationLevel
 * @param {WeightedBounds<TClassificationLevel>} bounds The weighted bounds to convert.
 * @returns {HorizontalBarChartBounds<TClassificationLevel>} The converted horizontal bar chart bounds.
 */
export const convertToHorizontalBarChartBounds = <
  TClassificationLevel extends string
>(
  bounds: WeightedBounds<TClassificationLevel>
): HorizontalBarChartBounds<TClassificationLevel> => ({
  lowerBound: bounds.lower,
  upperBounds: Object.keys(bounds.upper).reduce((acc, key) => {
    acc[key as TClassificationLevel] =
      bounds.upper[key as TClassificationLevel].value;

    return acc;
  }, {} as Record<TClassificationLevel, number>),
});

/**
 * Converts weighted bounds into chart segments.
 * @template TClassificationLevel
 * @param {WeightedBounds<TClassificationLevel>} bounds The weighted bounds to convert.
 * @returns {ChartSegment[]} An array of chart segments.
 */
export const convertToChartSegments = <TClassificationLevel extends string>(
  bounds: WeightedBounds<TClassificationLevel>
): ChartSegment[] => {
  let currentStart = bounds.lower;

  return recordValues<WeightedUpperBoundValue>(bounds.upper).map(
    (boundValue) => {
      const segment: ChartSegment = {
        start: currentStart,
        end: boundValue.value,
        width: boundValue.weight,
      };
      currentStart = boundValue.value;

      return segment;
    }
  );
};
