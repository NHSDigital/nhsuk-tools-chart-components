import React, { JSX } from 'react';
import {
  BaseClassificationBounds,
  CentileValue,
  ChildBmiLegendKeys,
} from '@custom-types/bmi.types';
import { ChartLegend } from '@components/chart-legend';
import { ChildBmiChart } from './cbmi-chart';
import './styles/cbmi-chart-card.module.scss';

/**
 * The properties for @ChildBmiChartFigure component
 *
 * @param {BaseClassificationBounds} classificationBounds -  The child body mass index classification ranges
 * @param {CentileValue} centile - The centile value and label
 * @param {string} ariaLabel - The aria label for the chart figure
 * @param {string} centileMarkerText - The marker text for the centile value
 * @param {ChildBmiLegendKeys} legendKeys - The chart legend items
 */
export type ChildBmiChartFigureProps = {
  classificationBounds: BaseClassificationBounds;
  centile: CentileValue;
  ariaLabel: string;
  centileMarkerText: string;
  legendKeys: ChildBmiLegendKeys;
};

/**
 * A component to display the child body mass index chart figure
 *
 * @typedef {object} ChildBmiChartFigureProps
 * @property {BaseClassificationBounds} classificationBounds -  The child body mass index classification ranges
 * @property {CentileValue} centile - The centile value and label
 * @property {string} centileMarkerText - The marker text for the centile value
 * @property {string} ariaLabel - The aria label for the chart figure
 * @property {ChildBmiLegendKeys} legendKeys - The chart legend items
 *
 * @param {ChildBmiChartFigureProps} props
 * @returns {JSX.Element}
 */
export function ChildBmiChartFigure({
  classificationBounds,
  centile,
  centileMarkerText,
  ariaLabel,
  legendKeys,
}: Readonly<ChildBmiChartFigureProps>): JSX.Element {
  const cbmiLegendKeys = Object.entries(legendKeys).map(
    ([classification, label]) => ({
      text: label,
      className: `nhsuk-cbmi-legend-key-classification-${classification}`,
      wrapperClassName: 'nhsuk-cbmi-legend-marker',
    })
  );

  return (
    <figure className="nhsuk-u-margin-0">
      <figcaption className="nhsuk-u-visually-hidden">{ariaLabel}</figcaption>
      <ChildBmiChart
        classificationBounds={classificationBounds}
        centile={centile}
        markerText={centileMarkerText}
      />
      <ChartLegend legendKeys={cbmiLegendKeys} borderWrapper={false} />
    </figure>
  );
}
