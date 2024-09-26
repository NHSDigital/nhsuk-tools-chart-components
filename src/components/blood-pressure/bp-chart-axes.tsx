import {
  BpClassificationLevelType,
  BpClassificationLevel,
} from '@custom-types/blood-pressure.types';
import { BpBounds } from '@custom-types/classifications.types';
import { UpperBounds } from '@custom-types/threshold.types';
import React from 'react';
import './styles/bp-chart-axes.module.scss';

export enum AxisType {
  Systolic,
  Diastolic,
}

type BpGraphAxisLabelProps = Readonly<{
  axisType: AxisType;
  labelText: string;
  offsetPercent: number;
  applyLabelSpecificStyles?: boolean;
}>;

type BpGraphAxisProps = Readonly<{
  axisType: AxisType;
  upperBounds: UpperBounds<string>;
  lowerBound: number;
}>;

type BpGraphAxesProps = Readonly<{
  bounds: BpBounds;
}>;

export function BpGraphAxisValueLabel({
  axisType,
  labelText,
  offsetPercent,
  applyLabelSpecificStyles = true,
}: BpGraphAxisLabelProps): JSX.Element {
  const classPrefix = `${AxisType[axisType].toLowerCase()}-axis`;
  const genericMarkerClass = `nhsuk-bp-${classPrefix}-marker`;
  const specificMarkerClass = `nhsuk-bp-${classPrefix}-marker-${labelText}`;

  return (
    <div
      className={
        applyLabelSpecificStyles
          ? `${genericMarkerClass} ${specificMarkerClass}`
          : `${genericMarkerClass}`
      }
      style={
        axisType === AxisType.Systolic
          ? { bottom: `${offsetPercent}%` }
          : { left: `${offsetPercent}%` }
      }>
      <div className={`nhsuk-bp-${classPrefix}-label`}>{labelText}</div>
    </div>
  );
}

function boundaryPercentage(
  classificationUpperBoundValue: number,
  topUpperBoundValue: number,
  lowerBound: number
): number {
  return (
    ((classificationUpperBoundValue - lowerBound) /
      (topUpperBoundValue - lowerBound)) *
    100
  );
}

function classificationBoundaryPercentage(
  classification: BpClassificationLevelType,
  upperBounds: UpperBounds<string>,
  lowerBound: number
): number {
  return boundaryPercentage(
    upperBounds[classification].value!,
    upperBounds[BpClassificationLevel.High].value!,
    lowerBound
  );
}

function BpGraphAxis({
  axisType,
  upperBounds,
  lowerBound,
}: BpGraphAxisProps): JSX.Element {
  const extraDiastolicLabelConfig = {
    slightlyRaisedValueToCheck: 85,
    slightlyRaisedValueToAdd: 90,
  };
  return (
    <div>
      <BpGraphAxisValueLabel
        labelText={lowerBound.toString()}
        offsetPercent={0}
        axisType={axisType}
      />
      <BpGraphAxisValueLabel
        labelText={upperBounds[BpClassificationLevel.Low].value!.toString()}
        offsetPercent={classificationBoundaryPercentage(
          BpClassificationLevel.Low,
          upperBounds,
          lowerBound
        )}
        axisType={axisType}
      />
      <BpGraphAxisValueLabel
        labelText={upperBounds[BpClassificationLevel.Healthy].value!.toString()}
        offsetPercent={classificationBoundaryPercentage(
          BpClassificationLevel.Healthy,
          upperBounds,
          lowerBound
        )}
        axisType={axisType}
      />
      <BpGraphAxisValueLabel
        labelText={upperBounds[
          BpClassificationLevel.SlightlyRaised
        ].value!.toString()}
        offsetPercent={classificationBoundaryPercentage(
          BpClassificationLevel.SlightlyRaised,
          upperBounds,
          lowerBound
        )}
        axisType={axisType}
        applyLabelSpecificStyles={
          upperBounds[BpClassificationLevel.SlightlyRaised].value ===
          extraDiastolicLabelConfig.slightlyRaisedValueToCheck
        }
      />
      {axisType === AxisType.Diastolic &&
        upperBounds[BpClassificationLevel.SlightlyRaised].value ===
          extraDiastolicLabelConfig.slightlyRaisedValueToCheck && (
          <BpGraphAxisValueLabel
            labelText={extraDiastolicLabelConfig.slightlyRaisedValueToAdd.toString()}
            offsetPercent={boundaryPercentage(
              extraDiastolicLabelConfig.slightlyRaisedValueToAdd,
              upperBounds[BpClassificationLevel.High].value!,
              lowerBound
            )}
            axisType={axisType}
          />
        )}
      <BpGraphAxisValueLabel
        labelText={upperBounds[BpClassificationLevel.High].value!.toString()}
        offsetPercent={100}
        axisType={axisType}
      />
    </div>
  );
}

export function BpGraphAxes({ bounds }: BpGraphAxesProps): JSX.Element {
  return (
    <>
      <BpGraphAxis
        axisType={AxisType.Systolic}
        upperBounds={bounds.systolic.upper}
        lowerBound={bounds.systolic.lower}
      />
      <BpGraphAxis
        axisType={AxisType.Diastolic}
        upperBounds={bounds.diastolic.upper}
        lowerBound={bounds.diastolic.lower}
      />
    </>
  );
}
