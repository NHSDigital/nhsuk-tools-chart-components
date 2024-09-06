import { ChildBmiResultChart } from '@models/cbmi-chart.model';
import React, { JSX } from 'react';
import { CentileValue } from '@custom-types/bmi.types';
import { ChildBmiChartMarkerIcon } from './cbmi-chart-marker-icon';
import './styles/cbmi-chart-marker.module.scss';

/**
 * Function to determine which style to load for aligning the centile results text following below rules:
 * First 20% - alight left
 * Middle 60% - align center
 * Left 20% - alight right
 */
const alignTextStyle = (position: number): string => {
  if (position <= 20) {
    return 'nhsuk-cbmi-chart-label-align-left';
  }
  if (position <= 80) {
    return 'nhsuk-cbmi-chart-label-align-center';
  }
  return 'nhsuk-cbmi-chart-label-align-right';
};

function ChildBmiChartMarkerText({
  centile,
  markerText,
}: Readonly<{
  centile: CentileValue;
  markerText: string;
}>): JSX.Element {
  return (
    <div className="nhsuk-cbmi-chart-label-marker">
      <div className={`nhsuk-u-font-size-19 ${alignTextStyle(centile.value)}`}>
        {markerText}
        <span className="nhsuk-cbmi-chart-centile-marker">{centile.label}</span>
      </div>
    </div>
  );
}
export function ChildBmiChartMarker({
  centile,
  model,
  markerText,
}: Readonly<{
  centile: CentileValue;
  model: ChildBmiResultChart;
  markerText: string;
}>): JSX.Element {
  const offset = model.clampedOffsetPercentage(centile.value);

  let roundedOffset = 0;
  if (offset > 0) {
    const roundingPrecision = 1;
    const multiplier = 10 ** roundingPrecision;
    roundedOffset = Math.round(offset * multiplier) / multiplier;
  }

  return (
    <div>
      <div
        className="nhsuk-cbmi-chart-arrow-marker"
        style={{ left: `${roundedOffset}%` }}>
        <ChildBmiChartMarkerText centile={centile} markerText={markerText} />
        <ChildBmiChartMarkerIcon />
      </div>
      <div
        className="nhsuk-cbmi-chart-axis-marker"
        style={{ left: `${roundedOffset}%` }}
      />
    </div>
  );
}
