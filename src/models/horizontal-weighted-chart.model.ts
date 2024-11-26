import {
  ChartSegment,
  HorizontalBarChartBounds as HorizontalWeightBarBounds,
} from '@custom-types/chart.types';
import { WeightedBounds } from '@custom-types/threshold.types';
import {
  convertToChartSegments,
  convertToHorizontalBarChartBounds,
} from '@utils/horizontal-bar-transformer.utils';

export class HorizontalWeightedBarChart<T extends string> {
  readonly bounds: HorizontalWeightBarBounds<T>;

  protected segments: ChartSegment[];

  protected chartWidth: number;

  constructor(classificationBounds: WeightedBounds<T>, width: number) {
    this.chartWidth = width;
    this.segments = convertToChartSegments(classificationBounds);
    this.bounds = convertToHorizontalBarChartBounds(classificationBounds);
  }

  classificationPosition(classification: T): number {
    return this.calculatePosition(this.bounds.upperBounds[classification]);
  }

  /**
   * This function calculates the pixel position on a chart for a given value.
   * @param value - The value used for the calculation
   * @returns A pixel position corresponding to the given value.
   * @remarks It determines the segment that the value falls within and then calculates the precise pixel position based on the segment's width and the overall chart width.
   */
  calculatePosition(value: number): number {
    let offset = 0;

    // iterate through each segment and checks if the value falls within the segment's range.
    const { totalSegmentsWidth } = this;
    for (const segment of this.segments) {
      if (value >= segment.start && value <= segment.end) {
        // normalize the value within the segment and calculates the pixel position
        const normalized =
          (value - segment.start) / (segment.end - segment.start);

        // scale the normalized value and add the offset
        return (
          offset +
          normalized * (segment.width / totalSegmentsWidth) * this.chartWidth
        );
      }

      // increase offset using the segments width
      offset += (segment.width / totalSegmentsWidth) * this.chartWidth;
    }
    return 0;
  }

  /**
   * Calculate the total segment width to ensure correct proportions for each segment
   */
  private get totalSegmentsWidth(): number {
    return this.segments.reduce((sum, segment) => sum + segment.width, 0);
  }
}
