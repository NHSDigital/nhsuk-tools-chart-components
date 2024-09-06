import React, { JSX } from 'react';
import {
  BmiClassificationBounds,
  BmiLegendKeys,
} from '@custom-types/bmi.types';
import { ChartLegend, ChartLegendKey } from '@components/chart-legend';
import { BmiChart } from './bmi-chart';
import { BmiChartMarkerIcon } from './bmi-chart-marker-icon';
import './styles/bmi-chart-card.module.scss';

const populateBmiChartLegendItems = (
  legendKeys: BmiLegendKeys,
  legendMarkerText: string
): ChartLegendKey[] =>
  Object.entries(legendKeys)
    .map(
      ([classification, label]): ChartLegendKey => ({
        text: label,
        className: `nhsuk-bmi-legend-key-classification-${classification}`,
      })
    )
    .concat({
      text: legendMarkerText,
      className: 'nhsuk-bmi-legend-key-marker',
      element: <BmiChartMarkerIcon />,
    });

/**
 * The properties for @BmiChartFigure component
 *
 * @param {classificationBounds} classificationBounds -  The body mass index classification ranges
 * @param {number} bmi - The body mass index value
 * @param {string} ariaLabel - The aria label for the chart figure
 * @param {BmiLegendKeys} legendKeys - The chart legend items
 * @param {string} legendMarkerText The chart legend marker text
 */
export type BmiChartFigureProps = {
  classificationBounds: BmiClassificationBounds;
  bmi: number;
  ariaLabel: string;
  legendKeys: BmiLegendKeys;
  legendMarkerText: string;
};

/**
 * A component to display the body mass index chart figure
 *
 * @typedef {object} BmiChartFigureProps
 * @property {classificationBounds} classificationBounds -  The body mass index classification ranges
 * @property {number} bmi - The body mass index value
 * @property {string} ariaLabel - The aria label for the chart figure
 * @property {BmiLegendKeys} legendKeys - The chart legend items
 * @property {string} legendMarkerText The chart legend marker text
 *
 * @param {BmiChartFigureProps} props
 * @returns {JSX.Element}
 */
export function BmiChartFigure({
  classificationBounds,
  bmi,
  ariaLabel,
  legendKeys,
  legendMarkerText,
}: Readonly<BmiChartFigureProps>): JSX.Element {
  const bmiLegendKeys = populateBmiChartLegendItems(
    legendKeys,
    legendMarkerText
  );

  return (
    <figure className="nhsuk-u-margin-0">
      <figcaption className="nhsuk-u-visually-hidden">{ariaLabel}</figcaption>
      <BmiChart classificationBounds={classificationBounds} bmi={bmi} />

      <ChartLegend legendKeys={bmiLegendKeys} borderWrapper />
    </figure>
  );
}
