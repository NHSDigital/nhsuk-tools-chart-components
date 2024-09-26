import { ChildBmiResultChart } from '@models/cbmi-chart.model';
import { BaseClassifications } from '@custom-types/bmi.types';
import React, { JSX } from 'react';
import './styles/cbmi-chart-axes.module.scss';

type ChildBmitGraphAxisMarkerProps = {
  markerText: string;
  offsetPercent: number;
};

type ChildBmitGraphAxesProps = {
  model: ChildBmiResultChart;
};

function AxisMarker({
  markerText,
  offsetPercent,
}: Readonly<ChildBmitGraphAxisMarkerProps>): JSX.Element {
  return (
    <div
      className="nhsuk-cbmi-axis-marker"
      style={{ left: `${offsetPercent}%` }}>
      <div className="nhsuk-font-size-16 nhsuk-cbmi-axis-marker-label">
        {markerText}
      </div>
    </div>
  );
}

export function ChildBmiChartAxes({
  model,
}: Readonly<ChildBmitGraphAxesProps>): JSX.Element {
  return (
    <>
      <AxisMarker
        markerText={model.bounds.upperBounds[
          BaseClassifications.Underweight
        ].toString()}
        offsetPercent={model.classificationPercentage(
          BaseClassifications.Underweight
        )}
      />
      <AxisMarker
        markerText={model.bounds.upperBounds[
          BaseClassifications.Healthy
        ].toString()}
        offsetPercent={model.classificationPercentage(
          BaseClassifications.Healthy
        )}
      />
    </>
  );
}
