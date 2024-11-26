import { RiskClassification } from '@custom-types/whtr.types';
import { HorizontalWeightedBarChart } from './horizontal-weighted-chart.model';

const MAX_RATIO_ALLOWED = 0.65;
const MAX_CHART_OFFSET_POSITION = 98;

export class WhtrResultChart extends HorizontalWeightedBarChart<RiskClassification> {
  /**
   * Function for clamping a `value`to the max allowed ratio value and calculating the given `value` as a percentage of the entire graph
   * @param value - The ratio value
   */
  clampedOffsetPercentage(value: number): number {
    const offset = this.calculatePosition(value);
    if (value >= MAX_RATIO_ALLOWED) {
      return MAX_CHART_OFFSET_POSITION;
    }

    return offset;
  }
}
