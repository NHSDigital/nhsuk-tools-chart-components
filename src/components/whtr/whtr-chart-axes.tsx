import React, { JSX } from 'react';
import { WhtrResultChart } from '@models/whtr-chart.model';
import { RiskClassifications } from '@custom-types/whtr.types';
import './styles/whtr-chart-axes.module.scss';

type WhtrtGraphAxisMarkerProps = {
  markerText: string;
  offsetPercent: number;
};

type WhtrtGraphAxesProps = {
  model: WhtrResultChart;
};

const markerAxisLabelClassname = (offsetPercent: number): string =>
  offsetPercent > 0
    ? 'nhsuk-whtr-axis-marker-label'
    : 'nhsuk-whtr-axis-start-marker-label';

const markerAxisClassname = (offsetPercent: number): string =>
  offsetPercent > 0 ? 'nhsuk-whtr-axis-marker' : 'nhsuk-whtr-start-axis-marker';

function AxisMarker({
  markerText,
  offsetPercent,
}: Readonly<WhtrtGraphAxisMarkerProps>): JSX.Element {
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

export function WhtrChartAxes({
  model,
}: Readonly<WhtrtGraphAxesProps>): JSX.Element {
  return (
    <>
      <AxisMarker
        markerText={model.bounds.lowerBound.toString()}
        offsetPercent={model.calculatePosition(model.bounds.lowerBound)}
      />
      <AxisMarker
        markerText={model.bounds.upperBounds[
          RiskClassifications.Low
        ].toString()}
        offsetPercent={model.classificationPosition(RiskClassifications.Low)}
      />
      <AxisMarker
        markerText={model.bounds.upperBounds[
          RiskClassifications.Increased
        ].toString()}
        offsetPercent={model.classificationPosition(
          RiskClassifications.Increased
        )}
      />
    </>
  );
}
