import { BarSliderChartModel } from '@models/bar-slider-chart.model';
import React, { JSX } from 'react';

function RegionForClassification({
  value,
  styleClass,
}: Readonly<{
  value: number;
  styleClass: string;
}>): JSX.Element {
  return <div className={styleClass} style={{ width: `${value}%` }} />;
}

export function BarSliderChartRegions({
  model,
}: Readonly<{
  model: BarSliderChartModel;
}>): JSX.Element {
  return (
    <>
      {model.getChartRegions().map(({ value, styleClass }) => (
        <RegionForClassification
          value={value}
          styleClass={styleClass}
          key={value}
        />
      ))}
    </>
  );
}
