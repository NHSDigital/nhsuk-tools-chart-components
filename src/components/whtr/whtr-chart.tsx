import { WhtrResultChart } from '@models/whtr-chart.model';
import React, { JSX } from 'react';
import { RiskClassificationBounds } from '@custom-types/whtr.types';
import { WhtrChartMarker } from './whtr-chart-marker';
import { WhtrChartRegions } from './whtr-chart-regions';
import { WhtrChartAxes } from './whtr-chart-axes';
import './styles/whtr-chart.module.scss';

const CHART_WIDTH = 100;

/**
 * The properties for @WhtrChart component
 *
 * @param {RiskClassificationBounds} classificationBounds -  The Waist to height classification ranges
 * @param {number} ratio - The waist to height ratio value
 * @param {string} markerText - Marker text for the ratio value
 */
export type WhtrChartProps = {
  classificationBounds: RiskClassificationBounds;
  ratio: number;
  markerText: string;
};

/**
 * A component to display the waist to height chart
 *
 * @typedef {object} WhtrChartProps
 * @property {RiskClassificationBounds} classificationBounds -  The waist to height classification ranges
 * @property {number} ratio - The waist to height ratio value
 * @property {string} markerText - Marker text for the ratio value
 *
 * @param {WhtrChartProps} props
 * @returns {JSX.Element}
 */
export function WhtrChart({
  classificationBounds,
  ratio,
  markerText,
}: Readonly<WhtrChartProps>): JSX.Element {
  const chartModel = new WhtrResultChart(classificationBounds, CHART_WIDTH);

  return (
    <div
      className={`nhsuk-whtr-graph nhsuk-u-margin-bottom-9 `}
      aria-hidden="true">
      <WhtrChartAxes model={chartModel} />
      <WhtrChartMarker
        ratio={ratio}
        markerText={markerText}
        model={chartModel}
      />
      <WhtrChartRegions model={chartModel} />
    </div>
  );
}
