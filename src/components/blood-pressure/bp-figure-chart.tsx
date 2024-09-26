import React, { JSX } from 'react';
import { ChartLegend, ChartLegendKey } from '@components/chart-legend';
import { BpBounds } from '@custom-types/classifications.types';
import {
  BpGraphLayout,
  BpLegendKeys,
  BpReadingValue,
} from '@custom-types/blood-pressure.types';
import { BpChart } from './bp-chart';
import { BpGraphMarkerIcon } from './bp-chart-marker-icon';
import './styles/bp-chart-panel.module.scss';

const populateBpChartLegendItems = (
  legendKeys: BpLegendKeys,
  legendMarkerText: string
): ChartLegendKey[] =>
  Object.entries(legendKeys)
    .map(
      ([classification, label]): ChartLegendKey => ({
        text: label,
        className: `nhsuk-bp-legend-key-classification-${classification}`,
      })
    )
    .concat({
      text: legendMarkerText,
      className: 'nhsuk-bp-legend-key-marker',
      element: <BpGraphMarkerIcon />,
    });

/**
 * The properties for @BpChartFigure component
 *
 * @param {BpBounds} bounds - The blood pressure classification ranges
 * @param {BpGraphLayout} graphLayout - The graph layout with row configuration and systolic/diastolic chart labels
 * @param {BpReadingValue} readings - The systolic and diastolic blood pressure readings
 * @param {string }ariaLabel - The aria label for the chart figure
 * @param {BpLegendKeys} legendKeys - The legend keys for the chart figure
 * @param {string } legendMarkerText - The legend marker text
 */
export type BpChartFigureProps = {
  bounds: BpBounds;
  graphLayout: BpGraphLayout;
  reading: BpReadingValue;
  ariaLabel: string;
  legendKeys: BpLegendKeys;
  legendMarkerText: string;
};

/**
 * A component to display the blood pressure chart figure
 *
 * @typedef {object} BpChartFigureProps
 * @property {BpBounds} bounds - The blood pressure classification ranges
 * @property {BpGraphLayout} graphLayout - The graph layout with row configuration and systolic/diastolic chart labels
 * @property {BpReadingValue} readings - The systolic and diastolic blood pressure readings
 * @property {string }ariaLabel - The aria label for the chart figure
 * @property {BpLegendKeys} legendKeys - The legend keys for the chart figure
 * @property {string } legendMarkerText - The legend marker text
 *
 * @param {BpChartFigureProps} props
 * @returns {JSX.Element}
 */
export function BpChartFigure({
  bounds,
  graphLayout,
  reading,
  ariaLabel,
  legendKeys,
  legendMarkerText,
}: Readonly<BpChartFigureProps>): JSX.Element {
  const bpLegendKeys = populateBpChartLegendItems(legendKeys, legendMarkerText);
  return (
    <figure className="nhsuk-u-margin-0">
      <figcaption className="nhsuk-u-visually-hidden">{ariaLabel}</figcaption>
      <BpChart bounds={bounds} reading={reading} graphLayout={graphLayout} />

      <ChartLegend legendKeys={bpLegendKeys} />
    </figure>
  );
}
