import React, { JSX } from 'react';
import { ArrowMarkerIcon } from '@components/markers/arrow-marker-icon';
import { BarSliderChartModel } from '@models/bar-slider-chart.model';
import './styles/bar-slider-chart-marker.module.scss';

const markerAlighTextClassname = (name: string, offset: number): string => {
  if (offset <= 20) {
    return `${name}-label-align-left`;
  }
  if (offset <= 80) {
    return `${name}-label-align-center`;
  }
  return `${name}-label-align-right`;
};

type BarSliderChartMarkerTextProps = Readonly<{
  chartName: string;
  value: number;
  offset: number;
  markerText: string;
}>;

function BarSliderChartMarkerText({
  chartName,
  value,
  offset,
  markerText,
}: Readonly<BarSliderChartMarkerTextProps>): JSX.Element {
  return (
    <div className={`${chartName}-label-marker`}>
      <div
        className={`nhsuk-font-size-16 ${markerAlighTextClassname(
          chartName,
          offset
        )}`}>
        {markerText}
        <span className={`${chartName}-value-marker`}>{value}</span>
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
        className={`${model.name}-arrow-marker`}
        style={{ left: `${roundedOffset}%` }}>
        <BarSliderChartMarkerText
          chartName={model.name}
          value={value}
          markerText={markerText}
          offset={roundedOffset}
        />
        <ArrowMarkerIcon />
      </div>
      <div
        className={`${model.name}-value-axis-marker`}
        style={{ left: `${roundedOffset}%` }}
      />
    </>
  );
}
