import {
  BarSliderConfig,
  BarSliderSegment,
} from '@custom-types/bar-slider.types';

/**
 * Function to normalize the start and end values of each segment in the BarSliderConfig.
 * If the start and end values are not provided, it populates them using the sorted axis ticks.
 *
 * @param {BarSliderConfig} config - The configuration object for the BarSlider.
 * @throws {Error} If the axis length is smaller or equal to 2.
 * @returns {BarSliderSegment[]} An array of segments with normalized start and end values.
 */
function normalizeSegmentBounds(config: BarSliderConfig): BarSliderSegment[] {
  if (config.axis.ticks.length <= 2) {
    throw Error('invalid number of axis ticks');
  }
  const sortedTicks = [...config.axis.ticks].sort((a, b) => a.value - b.value);

  // check if segment start/end values are provided, if not use ticks to populate them
  return config.segments.map((segment, pos) => {
    const start = segment.start ?? sortedTicks[pos].value;
    const end = segment.end ?? sortedTicks[pos + 1].value;
    return {
      ...segment,
      start,
      end,
    };
  });
}

/**
 * Function to calculates the weight for each segment in the BarSliderConfig.
 * If the weight is not provided it is calculated based on its proportional length.
 *
 * @param {BarSliderConfig} config - The configuration object for the BarSlider.
 * @throws {Error} If the total weight of the segments exceeds 100.
 * @returns {BarSliderSegment[]} An array of segments with calculated weights.
 */
export function calculateWeights(config: BarSliderConfig): BarSliderSegment[] {
  const sanitizedSegments = normalizeSegmentBounds(config);

  // calculate total weight from segments with  weight
  const totalWeight = sanitizedSegments.reduce(
    (sum, segment) => sum + (segment.weight ?? 0),
    0
  );

  // calculate total weight from segments without weight
  const totalUnweightedLength = sanitizedSegments
    .filter((segment) => segment.weight === undefined)
    .reduce((sum, segment) => sum + (segment.end! - segment.start!), 0);

  const remainingWeight = 100 - totalWeight;
  if (remainingWeight < 0) {
    throw new Error('Invalid segment weight.');
  }

  return sanitizedSegments.map((segment) => {
    if (segment.weight !== undefined) {
      return segment;
    }
    // find segments without weight and calculate it using the segment's proportional distribution
    const segmentLength = segment.end! - segment.start!;
    const proportionalWeight =
      (segmentLength / totalUnweightedLength) * remainingWeight;

    return { ...segment, weight: proportionalWeight };
  });
}
