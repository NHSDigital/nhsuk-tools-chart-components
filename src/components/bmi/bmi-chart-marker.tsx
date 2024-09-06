import React, { JSX } from 'react';
import { BmiResultChart } from '@models/bmi-chart.model';
import { BmiChartMarkerIcon } from './bmi-chart-marker-icon';
import './styles/bmi-chart-marker.module.scss';

export function BmiChartMarker({
  bmi,
  model,
}: Readonly<{
  bmi: number;
  model: BmiResultChart;
}>): JSX.Element {
  const offset = model.offsetPercentage(bmi);

  let roundedOffset = 0;
  if (offset > 0) {
    const roundingPrecision = 1;
    const multiplier = 10 ** roundingPrecision;

    roundedOffset = Math.round(offset * multiplier) / multiplier;
  }

  return (
    <div
      className="nhsuk-bmi-chart-marker"
      style={{ left: `${roundedOffset}%` }}>
      <BmiChartMarkerIcon />
    </div>
  );
}
