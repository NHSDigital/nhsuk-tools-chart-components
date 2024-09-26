import { BmitChartBounds } from '@custom-types/classifications.types';
import {
  BmiClassificationLabel,
  BmiClassification,
  BmiClassificationLevelLabel,
  BmiClassificationBounds,
} from '@custom-types/bmi.types';

const CHART_LOWER_BOUND = 17.5;

export class BmiResultChart {
  readonly bounds: BmitChartBounds;

  constructor(classificationBounds: BmiClassificationBounds) {
    this.bounds = {
      lowerBound: CHART_LOWER_BOUND,
      upperBounds: {
        [BmiClassificationLabel.Underweight]:
          classificationBounds.upper[BmiClassification.Underweight].value!,
        [BmiClassificationLabel.Healthy]:
          classificationBounds.upper[BmiClassification.Healthy].value!,
        [BmiClassificationLabel.Overweight]:
          classificationBounds.upper[BmiClassification.Overweight].value!,
        [BmiClassificationLabel.Obese]:
          classificationBounds.upper[BmiClassification.Obese2].value!,
      },
    };
  }

  get chartRange(): number {
    return (
      this.bounds.upperBounds[BmiClassificationLabel.Obese] -
      this.bounds.lowerBound
    );
  }

  /**
   * Function for calculating the maximum value of a given BMI classification as a percentage of the entire result chart bounds.
   * @param classification - The BMI classification to calculate as a percentage
   */
  classificationPercentage(
    classification: BmiClassificationLevelLabel
  ): number {
    return this.offsetPercentage(this.bounds.upperBounds[classification]);
  }

  /**
   * Function for calculating the given `value` as a percentage of the entire graph range.
   */
  offsetPercentage(value: number): number {
    return ((value - this.bounds.lowerBound) / this.chartRange) * 100;
  }
}
