import { BarSliderChartModel } from '@models/bar-slider-chart.model';
import React, { JSX } from 'react';

type BarSliderGraphAxisMarkerProps = {
  markerText: string;
  offsetPercent: number;
};

type BarSliderGraphAxesProps = {
  model: BarSliderChartModel;
};

const markerAxisLabelClassname = (offsetPercent: number): string =>
  offsetPercent > 0
    ? 'nhsuk-bar-slider-axis-marker-label'
    : 'nhsuk-bar-slider-axis-start-marker-label';

const markerAxisClassname = (offsetPercent: number): string =>
  offsetPercent > 0
    ? 'nhsuk-bar-slider-axis-marker'
    : 'nhsuk-bar-slider-start-axis-marker';

function AxisMarker({
  markerText,
  offsetPercent,
}: Readonly<BarSliderGraphAxisMarkerProps>): JSX.Element {
  return (
    <div
      className={`${markerAxisClassname(offsetPercent)}`}
      style={{ left: `${offsetPercent}%` }}>
      <div
        className={`nhsuk-font-size-16 nhsuk-u-secondary-text-color ${markerAxisLabelClassname(
          offsetPercent
        )}`}>
        {markerText}
      </div>
    </div>
  );
}

export function BarSliderChartAxes({
  model,
}: Readonly<BarSliderGraphAxesProps>): JSX.Element {
  return (
    <>
      {model
        .AxisTicks()
        .map(
          ({ label, value, isVisible }) =>
            isVisible && (
              <AxisMarker
                markerText={label}
                offsetPercent={value}
                key={label}
              />
            )
        )}
    </>
  );
}
