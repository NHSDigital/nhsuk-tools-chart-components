import React, { JSX } from 'react';
import { BmiResultChart } from '@models/bmi-chart.model';
import {
  BmiClassificationLabel,
  BmiClassificationLevelLabel,
} from '@custom-types/bmi.types';
import './styles/bmi-chart-regions.module.scss';

function RegionForClassification({
  classification,
  model,
}: Readonly<{
  classification: BmiClassificationLevelLabel;
  model: BmiResultChart;
}>): JSX.Element {
  const width = model.classificationPercentage(classification);

  return (
    <div
      className={`nhsuk-bmi-classification-${classification}`}
      style={{ width: `${width}%` }}
    />
  );
}

export function BmiChartRegions({
  model,
}: Readonly<{
  model: BmiResultChart;
}>): JSX.Element {
  return (
    <>
      <RegionForClassification
        classification={BmiClassificationLabel.Underweight}
        model={model}
      />
      <RegionForClassification
        classification={BmiClassificationLabel.Healthy}
        model={model}
      />
      <RegionForClassification
        classification={BmiClassificationLabel.Overweight}
        model={model}
      />
      <RegionForClassification
        classification={BmiClassificationLabel.Obese}
        model={model}
      />
    </>
  );
}
