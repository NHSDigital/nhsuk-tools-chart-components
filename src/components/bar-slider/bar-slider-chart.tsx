import React, { JSX } from 'react';
import { BarSliderChartModel } from '@models/bar-slider-chart.model';
import { BarSliderConfig } from '@custom-types/bar-slider.types';
import { BarSliderChartAxis } from './bar-slider-chart-axis';
import { BarSliderChartMarker } from './bar-slider-chart-marker';
import { BarSliderChartRegions } from './bar-slider-chart-regions';
import './styles/bar-slider-chart.module.scss';

const CHART_WIDTH = 100;

/**
 * The properties for @BarSliderChart component
 *
 * @param {BarSliderConfig} BarSliderConfig -  The bar slider chart configuration
 * @param {number} value - The value to render in the chart
 * @param {string} markerText - Marker text for the value
 */
export type BarSliderChartProps = {
  config: BarSliderConfig;
  value: number;
  markerText: string;
};

/**
 * A component to display the bar slider chart
 *
 * @typedef {object} BarSliderChartProps
 * @property {BarSliderChartProps} config -  The bar slider chart configuration
 * @property {number} value - The value to render in the chart
 * @property {string} markerText - Marker text for the value
 *
 * @param {BarSliderChartProps} props
 * @returns {JSX.Element}
 */
export function BarSliderChart({
  config,
  value,
  markerText,
}: Readonly<BarSliderChartProps>): JSX.Element {
  const chartModel = new BarSliderChartModel(config, CHART_WIDTH);

  return (
    <div
      className={`${config.name}-graph nhsuk-u-margin-bottom-9`}
      aria-hidden="true">
      <BarSliderChartAxis model={chartModel} />
      <BarSliderChartMarker
        value={value}
        markerText={markerText}
        model={chartModel}
      />
      <BarSliderChartRegions model={chartModel} />
    </div>
  );
}
