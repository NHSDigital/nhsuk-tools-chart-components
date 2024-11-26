import React, { JSX } from 'react';
import { ChartLegend } from '@components/chart-legend';
import {
  RiskClassificationBounds,
  WhtrLegendKeys,
} from '@custom-types/whtr.types';
import { WhtrChart } from './whtr-chart';
import './styles/whtr-chart-card.module.scss';

/**
 * The properties for @WhtrChartFigureProps component
 *
 * @param {RiskClassificationBounds} classificationBounds -  The waist to height classification ranges
 * @param {number} ratio - The waist to height ratio value
 * @param {string} ariaLabel - The aria label for the chart figure
 * @param {string} ratioMarkerText - The marker text for the waist to height ratio value
 * @param {WhtrLegendKeys} legendKeys - The chart legend items
 */
export type WhtrChartFigureProps = {
  classificationBounds: RiskClassificationBounds;
  ratio: number;
  ariaLabel: string;
  ratioMarkerText: string;
  legendKeys: WhtrLegendKeys;
};

/**
 * A component to display the waist to height chart figure
 *
 * @typedef {object} WhtrChartFigureProps
 * @property {RiskClassificationBounds} classificationBounds -  The waist to height classification ranges
 * @property {number} ratio - The waist to height ratio value
 * @property {string} ratioMarkerText - The marker text for the waist to height ratio value
 * @property {string} ariaLabel - The aria label for the chart figure
 * @property {WhtrLegendKeys} legendKeys - The chart legend items
 *
 * @param {WhtrChartFigureProps} props
 * @returns {JSX.Element}
 */
export function WhtrChartFigure({
  classificationBounds,
  ratio,
  ratioMarkerText,
  ariaLabel,
  legendKeys,
}: Readonly<WhtrChartFigureProps>): JSX.Element {
  const whtrLegendKeys = Object.entries(legendKeys).map(
    ([classification, label]) => ({
      text: label,
      className: `nhsuk-whtr-legend-key-classification-${classification}`,
      wrapperClassName: 'nhsuk-whtr-legend-marker',
    })
  );

  return (
    <figure className="nhsuk-u-margin-0">
      <figcaption className="nhsuk-u-visually-hidden">{ariaLabel}</figcaption>
      <WhtrChart
        classificationBounds={classificationBounds}
        ratio={ratio}
        markerText={ratioMarkerText}
      />
      <ChartLegend legendKeys={whtrLegendKeys} borderWrapper={false} />
    </figure>
  );
}
