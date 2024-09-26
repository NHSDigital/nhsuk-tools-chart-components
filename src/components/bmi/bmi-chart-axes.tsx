import React, { JSX } from 'react';
import { BmiResultChart } from '@models/bmi-chart.model';
import { BmiClassificationLabel } from '@custom-types/bmi.types';
import './styles/bmi-chart-axes.module.scss';

type BmitGraphAxisMarkerProps = {
  markerText: string;
  offsetPercent: number;
};

type BmitGraphAxesProps = {
  model: BmiResultChart;
};

function AxisMarker({
  markerText,
  offsetPercent,
}: Readonly<BmitGraphAxisMarkerProps>): JSX.Element {
  return (
    <div
      className="nhsuk-bmi-axis-marker"
      style={{ left: `${offsetPercent}%` }}>
      <div className={`${'nhsuk-bmi-axis-marker-label'}`}>{markerText}</div>
    </div>
  );
}

export function BmiChartAxes({
  model,
}: Readonly<BmitGraphAxesProps>): JSX.Element {
  return (
    <>
      <AxisMarker
        markerText={model.bounds.upperBounds[
          BmiClassificationLabel.Underweight
        ].toString()}
        offsetPercent={model.classificationPercentage(
          BmiClassificationLabel.Underweight
        )}
      />
      <AxisMarker
        markerText={model.bounds.upperBounds[
          BmiClassificationLabel.Healthy
        ].toString()}
        offsetPercent={model.classificationPercentage(
          BmiClassificationLabel.Healthy
        )}
      />
      <AxisMarker
        markerText={model.bounds.upperBounds[
          BmiClassificationLabel.Overweight
        ].toString()}
        offsetPercent={model.classificationPercentage(
          BmiClassificationLabel.Overweight
        )}
      />
    </>
  );
}
