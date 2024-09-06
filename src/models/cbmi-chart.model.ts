import {
  ChildBmiClassificationsOrderMap,
  ChildBmitChartBounds,
} from '@custom-types/classifications.types';
import {
  BaseClassificationBounds,
  BaseClassificationLevel,
  BaseClassifications,
  BmiClassification,
  BmiClassificationLabel,
} from '@custom-types/bmi.types';

const CHART_LOWER_BOUND = 0;
const MIN_RANGE = 1;
const MAX_RANGE = 99;

export class ChildBmiResultChart {
  readonly bounds: ChildBmitChartBounds;

  constructor(classificationBounds: BaseClassificationBounds) {
    this.bounds = {
      lowerBound: CHART_LOWER_BOUND,
      upperBounds: {
        [BmiClassificationLabel.Underweight]:
          classificationBounds.upper[BmiClassification.Underweight].value!,
        [BmiClassificationLabel.Healthy]:
          classificationBounds.upper[BmiClassification.Healthy].value!,
        [BmiClassificationLabel.Overweight]:
          classificationBounds.upper[BmiClassification.Overweight].value!,
      },
    };
  }

  get chartRange(): number {
    return (
      this.bounds.upperBounds[BmiClassification.Overweight] -
      this.bounds.lowerBound
    );
  }

  /**
   * Function for calculating the maximum value of a given BMI classification as a percentage of the entire result chart bounds.
   * @param classification - The BMI classification to calculate as a percentage
   */
  classificationPercentage(classification: BaseClassificationLevel): number {
    return this.offsetPercentage(this.bounds.upperBounds[classification]);
  }

  /**
   * Function for calculating the given `value` as a percentage of the entire graph range following the below rules:
   * If the centile value is <= 2 (Underweight) scale the offset by 8%.
   * If the centile value is >= 2 and <= 91 (Health) scale the offset by 72%.
   * If the centile value is > 91 (Overweight) scale the offset by 20%.
   */
  offsetPercentage(value: number): number {
    const containerWidth = this.chartRange;

    if (value <= 2) {
      const scaledWidth = containerWidth * 0.08;
      return this.calculateOffset(
        value,
        BaseClassifications.Underweight,
        scaledWidth
      );
    }

    if (value <= 91) {
      const scaledWidth = containerWidth * 0.72;
      const scaledStart = containerWidth * 0.08;
      return (
        this.calculateOffset(value, BaseClassifications.Healthy, scaledWidth) +
        scaledStart
      );
    }

    const scaledWidth = containerWidth * 0.2;
    const scaledStart = containerWidth * 0.8;
    return (
      this.calculateOffset(value, BaseClassifications.Overweight, scaledWidth) +
      scaledStart
    );
  }

  private calculateOffset(
    value: number,
    classification: BaseClassificationLevel,
    width: number
  ): number {
    const previousOffset = ChildBmiClassificationsOrderMap[classification]
      ? this.bounds.upperBounds[
          ChildBmiClassificationsOrderMap[classification]!
        ]
      : 0;
    const currentOffset =
      this.bounds.upperBounds[classification] - previousOffset;

    return ((value - previousOffset) / currentOffset) * width;
  }

  /**
   * Function for clamping a `value`to the min/max boundaries and calculating the given `value` as a percentage of the entire graph
   * If the centile value is < 1, clamp to 1
   * If the centile value is > 99, clamp to 99
   */
  clampedOffsetPercentage(value: number): number {
    const clampedValue = Math.max(MIN_RANGE, Math.min(value, MAX_RANGE));
    return this.offsetPercentage(clampedValue);
  }
}
