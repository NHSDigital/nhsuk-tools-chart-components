import React, { JSX } from 'react';
import { ArrowMarkerIcon } from '@components/markers/arrow-marker-icon';
import { BarSliderChartModel } from '@models/bar-slider-chart.model';
import './styles/bar-slider-chart-marker.module.scss';

const markerAlighTextClassname = (offset: number): string => {
  if (offset <= 20) {
    return 'nhsuk-bar-slider-label-align-left';
  }
  if (offset <= 80) {
    return 'nhsuk-bar-slider-label-align-center';
  }
  return 'nhsuk-bar-slider-label-align-right';
};

type BarSliderChartMarkerTextProps = Readonly<{
  value: number;
  offset: number;
  markerText: string;
}>;

function BarSliderChartMarkerText({
  value,
  offset,
  markerText,
}: Readonly<BarSliderChartMarkerTextProps>): JSX.Element {
  return (
    <div className="nhsuk-bar-slider-label-marker">
      <div className={`nhsuk-font-size-16 ${markerAlighTextClassname(offset)}`}>
        {markerText}
        <span className="nhsuk-bar-slider-value-marker">{value}</span>
      </div>
    </div>
  );
}
export function BarSliderChartMarker({
  value,
  model,
  markerText,
}: Readonly<{
  value: number;
  model: BarSliderChartModel;
  markerText: string;
}>): JSX.Element {
  const offset = model.calculatePosition(value);

  const roundingPrecision = 1;
  const multiplier = 10 ** roundingPrecision;
  const roundedOffset = Math.round(offset * multiplier) / multiplier;
  return (
    <>
      <div
        className="nhsuk-bar-slider-arrow-marker"
        style={{ left: `${roundedOffset}%` }}>
        <BarSliderChartMarkerText
          value={value}
          markerText={markerText}
          offset={roundedOffset}
        />
        <ArrowMarkerIcon />
      </div>
      <div
        className="nhsuk-bar-slider-value-axis-marker"
        style={{ left: `${roundedOffset}%` }}
      />
    </>
  );
}
