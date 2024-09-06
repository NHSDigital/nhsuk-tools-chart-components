import Big from 'big.js';
import React, { JSX } from 'react';
import { BpGraphMarkerIcon } from './bp-chart-marker-icon';
import './styles/bp-chart-marker.module.scss';

// Changes rounding strategy to banker's rounding for unbias rounding
Big.RM = Big.roundHalfEven;

type BpGraphMarkerProps = Readonly<{
  systolicReading: number;
  diastolicReading: number;
  systolicLowerBound: number;
  systolicUpperBound: number;
  diastolicLowerBound: number;
  diastolicUpperBound: number;
}>;

export function BpGraphMarker({
  systolicReading,
  diastolicReading,
  systolicLowerBound,
  systolicUpperBound,
  diastolicLowerBound,
  diastolicUpperBound,
}: BpGraphMarkerProps): JSX.Element {
  const systolicDifference = systolicUpperBound - systolicLowerBound;
  const diastolicDifference = diastolicUpperBound - diastolicLowerBound;

  const bottomPercent = new Big(
    (systolicReading - systolicLowerBound) / systolicDifference
  ).times(100);
  const leftPercent = new Big(
    (diastolicReading - diastolicLowerBound) / diastolicDifference
  ).times(100);

  const roundingPrecision = 1;

  const roundedBottomPercent = bottomPercent.round(roundingPrecision);
  const roundedLeftPercent = leftPercent.round(roundingPrecision);

  return (
    <div
      className="nhsuk-bp-graph-marker"
      style={{
        left: `${roundedLeftPercent}%`,
        bottom: `${roundedBottomPercent}%`,
      }}>
      <BpGraphMarkerIcon />
    </div>
  );
}
