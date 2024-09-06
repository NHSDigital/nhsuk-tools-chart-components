import {
  BpClassificationLevel,
  BpClassificationLevelType,
} from '@custom-types/blood-pressure.types';
import { BpBounds } from '@custom-types/classifications.types';
import { UpperBounds } from '@custom-types/threshold.types';
import React from 'react';
import './styles/bp-chart-region-boundaries.module.scss';

export type BpGraphBoundaryProps = Readonly<{
  bounds: BpBounds;
  renderAsBoundary?: boolean;
}>;

function getClassificationBoundaryPercentage(
  lowerBound: number,
  upperBounds: UpperBounds<string>,
  classification: BpClassificationLevelType
): number {
  const normalisedBound = upperBounds[classification].value! - lowerBound;
  const normalisedUpperBound = upperBounds[3].value! - lowerBound;

  return (normalisedBound / normalisedUpperBound) * 100;
}

function getStyleForClassification(
  classification: BpClassificationLevelType
): string {
  return `nhsuk-bp-classification-${classification.toLowerCase()}`;
}

export function RegionsForClassification({
  classification,
  bounds,
  renderAsBoundary = false,
}: Readonly<
  BpGraphBoundaryProps & {
    classification: BpClassificationLevelType;
  }
>): JSX.Element {
  const width = getClassificationBoundaryPercentage(
    bounds.diastolic.lower,
    bounds.diastolic.upper,
    classification
  );
  const height = getClassificationBoundaryPercentage(
    bounds.systolic.lower,
    bounds.systolic.upper,
    classification
  );

  return (
    <div
      className={
        renderAsBoundary
          ? 'nhsuk-bp-region-boundary'
          : getStyleForClassification(classification)
      }
      style={{
        width: `${width}%`,
        height: `${height}%`,
      }}
    />
  );
}

export function BpGraphRegions({
  bounds,
  renderAsBoundary = false,
}: BpGraphBoundaryProps): JSX.Element {
  return (
    <>
      <RegionsForClassification
        classification={BpClassificationLevel.Low}
        {...{ bounds, renderAsBoundary }}
      />
      <RegionsForClassification
        classification={BpClassificationLevel.Healthy}
        {...{ bounds, renderAsBoundary }}
      />
      <RegionsForClassification
        classification={BpClassificationLevel.SlightlyRaised}
        {...{ bounds, renderAsBoundary }}
      />
      {!renderAsBoundary && (
        <RegionsForClassification
          classification={BpClassificationLevel.High}
          {...{ bounds, renderAsBoundary }}
        />
      )}
    </>
  );
}
