import {
  BarSliderConfig,
  BarSliderConstraints,
  BarSliderRegionPosition,
  BarSliderSegment,
  BarSliderAxis,
  BarSliderTickPosition,
} from '@custom-types/bar-slider.types';
import { calculateWeights } from '@utils/bar-slider.utils';

export class BarSliderChartModel {
  protected chartWidth: number;

  protected readonly chartName: string;

  private readonly constraints?: BarSliderConstraints;

  private readonly axis: BarSliderAxis;

  private readonly segments: BarSliderSegment[];

  constructor(config: BarSliderConfig, width: number) {
    this.chartWidth = width;
    this.chartName = config.name;
    this.axis = config.axis;
    this.constraints = config.constraints;
    this.segments = calculateWeights(config);
  }

  get name(): string {
    return this.chartName;
  }

  getAxisTicks(): BarSliderTickPosition[] {
    return Object.values(this.axis.ticks).map((tick) => {
      const isVisible = tick.isVisible ?? true;

      return {
        label: tick.value.toString(),
        value: this.calculateRawPosition(tick.value),
        isVisible,
      };
    });
  }

  getChartRegions(): BarSliderRegionPosition[] {
    return Object.values(this.axis.ticks)
      .slice(1)
      .map((tick) => ({
        value: this.calculateRawPosition(tick.value),
        styleClass: this.segmentstyleSuffix(tick.value),
      }));
  }

  private segmentstyleSuffix(value: number): string {
    const segment = this.getSegmentByTick(value);
    return segment?.styleSuffix
      ? `${this.chartName}-${segment.styleSuffix}`
      : '';
  }

  private getSegmentByTick(tickValue: number): BarSliderSegment | null {
    for (const segment of this.segments) {
      if (tickValue >= segment.start! && tickValue <= segment.end!) {
        return segment;
      }
    }
    return null;
  }

  /**
   * Function to calculate the pixel position on a chart for a given value,  applying constraints if necessary.
   *
   * @param value - The value to calculate the position for.
   * @returns A pixel position corresponding to the given value.
   * @remarks It calculates the pixel position based on the segment's width and the overall chart width.
   */
  calculatePosition(value: number): number {
    if (this.constraints) {
      const { value: maxValue, position } = this.constraints.max;
      if (value >= maxValue) {
        return position;
      }
    }

    return this.calculateRawPosition(value);
  }

  /**
   * Function to calculate the pixel position on a chart for a given value.
   *
   * @param value - The value to calculate the position for.
   * @returns A pixel position corresponding to the given value.
   * @remarks It calculates the pixel position based on the segment's width and the overall chart width.
   */
  private calculateRawPosition(value: number): number {
    let offset = 0;

    const clampedValue = this.clampValue(value);

    // iterate through each segment and checks if the value falls within the segment's range.
    const { totalSegmentsWidth } = this;
    for (const segment of this.segments) {
      if (clampedValue >= segment.start! && clampedValue <= segment.end!) {
        // normalize the value within the segment and calculates the pixel position
        const normalized =
          (clampedValue - segment.start!) / (segment.end! - segment.start!);

        // scale the normalized value and add the offset
        return (
          offset +
          normalized * (segment.weight! / totalSegmentsWidth) * this.chartWidth
        );
      }

      // increase offset using the segments width
      offset += (segment.weight! / totalSegmentsWidth) * this.chartWidth;
    }
    return 0;
  }

  /**
   * Clamps a value to the range of the axis ticks.
   *
   * @private
   * @param {number} value - The value to clamp.
   * @returns {number} The clamped value.
   */
  private clampValue(value: number): number {
    return Math.min(
      Math.max(value, this.axis.ticks[0].value),
      this.axis.ticks[this.axis.ticks.length - 1].value
    );
  }

  /**
   * Calculates the total width of all segments.
   *
   * @private
   * @returns {number} The total width of all segments.
   */
  private get totalSegmentsWidth(): number {
    return this.segments.reduce((sum, segment) => sum + segment.weight!, 0);
  }
}
