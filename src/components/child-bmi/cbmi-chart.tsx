import { ChildBmiResultChart } from '@models/cbmi-chart.model';
import React, { JSX } from 'react';
import {
  BaseClassificationBounds,
  CentileValue,
} from '@custom-types/bmi.types';
import { ChildBmiChartAxes } from './cbmi-chart-axes';
import { ChildBmiChartMarker } from './cbmi-chart-marker';
import { ChildBmiChartRegions } from './cbmi-chart-regions';
import './styles/cbmi-chart.module.scss';

/**
 * The properties for @ChildBmiChart component
 *
 * @param {BaseClassificationBounds} classificationBounds -  The child body mass index classification ranges
 * @param {CentileValue} centile - The centile value and label
 * @param {string} markerText - Marker text for the centile value
 */
export type ChildBmiChartProps = {
  classificationBounds: BaseClassificationBounds;
  centile: CentileValue;
  markerText: string;
};

/**
 * A component to display the child body mass index chart
 *
 * @typedef {object} ChildBmiChartProps
 * @property {BaseClassificationBounds} classificationBounds -  The child body mass index classification ranges
 * @property {CentileValue} centile - The centile value and label
 * @property {string} markerText - Marker text for the centile value
 *
 * @param {ChildBmiChartProps} props
 * @returns {JSX.Element}
 */
export function ChildBmiChart({
  classificationBounds,
  centile,
  markerText,
}: Readonly<ChildBmiChartProps>): JSX.Element {
  const chartModel = new ChildBmiResultChart(classificationBounds);

  return (
    <div
      className={`nhsuk-cbmi-graph nhsuk-u-margin-bottom-9 `}
      aria-hidden="true">
      <ChildBmiChartAxes model={chartModel} />
      <ChildBmiChartMarker
        centile={centile}
        markerText={markerText}
        model={chartModel}
      />
      <ChildBmiChartRegions model={chartModel} />
    </div>
  );
}
