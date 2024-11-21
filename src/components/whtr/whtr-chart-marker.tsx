import React, { JSX } from 'react';
import { WhtrResultChart } from '@models/whtr-chart.model';
import { ArrowMarkerIcon } from '@components/markers/arrow-marker-icon';
import './styles/whtr-chart-marker.module.scss';

const markerAlighTextClassname = (offset: number): string => {
  if (offset <= 20) {
    return 'nhsuk-whtr-chart-label-align-left';
  }
  if (offset <= 80) {
    return 'nhsuk-whtr-chart-label-align-center';
  }
  return 'nhsuk-whtr-chart-label-align-right';
};

function WhtrChartMarkerText({
  ratio,
  offset,
  markerText,
}: Readonly<{
  ratio: number;
  offset: number;
  markerText: string;
}>): JSX.Element {
  return (
    <div className="nhsuk-whtr-chart-label-marker">
      <div className={`nhsuk-font-size-16 ${markerAlighTextClassname(offset)}`}>
        {markerText}
        <span className="nhsuk-whtr-chart-ratio-marker">{ratio}</span>
      </div>
    </div>
  );
}
export function WhtrChartMarker({
  ratio,
  model,
  markerText,
}: Readonly<{
  ratio: number;
  model: WhtrResultChart;
  markerText: string;
}>): JSX.Element {
  const offset = model.clampedOffsetPercentage(ratio);

  const roundingPrecision = 1;
  const multiplier = 10 ** roundingPrecision;
  const roundedOffset = Math.round(offset * multiplier) / multiplier;

  return (
    <div>
      <div
        className="nhsuk-whtr-chart-arrow-marker"
        style={{ left: `${roundedOffset}%` }}>
        <WhtrChartMarkerText
          ratio={ratio}
          markerText={markerText}
          offset={roundedOffset}
        />
        <ArrowMarkerIcon />
      </div>
      <div
        className="nhsuk-whtr-chart-axis-marker"
        style={{ left: `${roundedOffset}%` }}
      />
    </div>
  );
}
