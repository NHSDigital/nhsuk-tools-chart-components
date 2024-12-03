import React, { JSX } from 'react';
import { ChartLegend } from '@components/chart-legend';
import { BarSliderConfig } from '@custom-types/bar-slider.types';
import { BarSliderChart } from './bar-slider-chart';

/**
 * The properties for @BarSliderChartFigureProps component
 *
 * @param {BarSliderConfig} config -  The bar slider chart configuration
 * @param {number} value - The value to render in the chart
 * @param {string} ariaLabel - The aria label for the chart figure
 * @param {string} markerText - The marker text for value
 */
export type BarSliderChartFigureProps = {
  config: BarSliderConfig;
  value: number;
  ariaLabel: string;
  markerText: string;
};

/**
 * A component to display the bar slider chart figure
 *
 * @typedef {object} BarSliderChartFigureProps
 * @param {BarSliderConfig} config -  The bar slider chart configuration
 * @param {number} value - The value to render in the chart
 * @param {string} ariaLabel - The aria label for the chart figure
 * @param {string} markerText - The marker text for value
 * @param {BarSliderChartFigureProps} props
 *
 * @returns {JSX.Element}
 */
export function BarSliderChartFigure({
  config,
  value,
  ariaLabel,
  markerText,
}: Readonly<BarSliderChartFigureProps>): JSX.Element {
  const barSliderLegendKeys = Object.values(config.segments)
    .filter((s) => s.legend != null)
    .map((segment) => ({
      text: segment.legend!,
      className: `${config.name}-legend-key-${segment.styleSuffix}`,
      wrapperClassName: `${config.name}-legend-marker`,
    }));

  return (
    <figure className="nhsuk-u-margin-0">
      <figcaption className="nhsuk-u-visually-hidden">{ariaLabel}</figcaption>
      <BarSliderChart config={config} value={value} markerText={markerText} />
      <ChartLegend legendKeys={barSliderLegendKeys} borderWrapper={false} />
    </figure>
  );
}
