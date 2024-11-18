import React, { JSX } from 'react';
import { WhtrResultChart } from '@models/whtr-chart.model';
import {
  RiskClassification,
  RiskClassifications,
} from '@custom-types/whtr.types';
import './styles/whtr-chart-regions.module.scss';

function RegionForClassification({
  classification,
  model,
}: Readonly<{
  classification: RiskClassification;
  model: WhtrResultChart;
}>): JSX.Element {
  const width = model.classificationPosition(classification);
  return (
    <div
      className={`nhsuk-whtr-classification-${classification}`}
      style={{ width: `${width}%` }}
    />
  );
}

export function WhtrChartRegions({
  model,
}: Readonly<{
  model: WhtrResultChart;
}>): JSX.Element {
  return (
    <>
      <RegionForClassification
        classification={RiskClassifications.Low}
        model={model}
      />
      <RegionForClassification
        classification={RiskClassifications.Increased}
        model={model}
      />
      <RegionForClassification
        classification={RiskClassifications.High}
        model={model}
      />
    </>
  );
}
