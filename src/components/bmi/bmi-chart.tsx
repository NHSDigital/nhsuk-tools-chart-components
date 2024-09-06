import React, { JSX } from 'react';
import { BmiResultChart } from '@models/bmi-chart.model';
import { BmiClassificationBounds } from '@custom-types/bmi.types';
import { BmiChartMarker } from './bmi-chart-marker';
import { BmiChartRegions } from './bmi-chart-regions';
import { BmiChartAxes } from './bmi-chart-axes';
import './styles/bmi-chart.module.scss';

/**
 * The properties for @BmiChart component
 *
 * @param {classificationBounds} classificationBounds -  The body mass index classification ranges
 * @param {number} bmi - The body mass index value
 */
export type BmiChartProps = {
  classificationBounds: BmiClassificationBounds;
  bmi: number;
};

/**
 * A component to display the body mass index chart
 *
 * @typedef {object} BmiChartProps
 * @property {classificationBounds} classificationBounds -  The body mass index classification ranges
 * @property {number} bmi - The body mass index value
 *
 * @param {BmiChartProps} props
 * @returns {JSX.Element}
 */
export function BmiChart({
  classificationBounds,
  bmi,
}: Readonly<BmiChartProps>): JSX.Element {
  const chartModel = new BmiResultChart(classificationBounds);

  return (
    <div className="nhsuk-bmi-graph" aria-hidden="true">
      <BmiChartAxes model={chartModel} />
      <BmiChartMarker bmi={bmi} model={chartModel} />
      <BmiChartRegions model={chartModel} />
    </div>
  );
}
