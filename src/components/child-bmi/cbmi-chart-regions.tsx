import { ChildBmiResultChart } from '@models/cbmi-chart.model';
import {
  BaseClassificationLevel,
  BaseClassifications,
} from '@custom-types/bmi.types';
import React, { JSX } from 'react';
import './styles/cbmi-chart-regions.module.scss';

function RegionForClassification({
  classification,
  model,
}: Readonly<{
  classification: BaseClassificationLevel;
  model: ChildBmiResultChart;
}>): JSX.Element {
  const width = model.classificationPercentage(classification);
  return (
    <div
      className={`nhsuk-cbmi-classification-${classification}`}
      style={{ width: `${width}%` }}
    />
  );
}

export function ChildBmiChartRegions({
  model,
}: Readonly<{
  model: ChildBmiResultChart;
}>): JSX.Element {
  return (
    <>
      <RegionForClassification
        classification={BaseClassifications.Underweight}
        model={model}
      />
      <RegionForClassification
        classification={BaseClassifications.Healthy}
        model={model}
      />
      <RegionForClassification
        classification={BaseClassifications.Overweight}
        model={model}
      />
    </>
  );
}
