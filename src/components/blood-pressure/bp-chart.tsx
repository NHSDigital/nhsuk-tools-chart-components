import { BpBounds } from '@custom-types/classifications.types';
import {
  BpGraphLayout,
  BpReadingValue,
} from '@custom-types/blood-pressure.types';
import React from 'react';
import { BpGraphAxes } from './bp-chart-axes';
import { BpGraphMarker } from './bp-chart-marker';
import { BpGraphRegions } from './bp-chart-regions';
import { BpChartCell } from './bp-chart-cell';
import './styles/bp-chart.module.scss';

/**
 * The properties for @BpChart component
 *
 * @param {BpBounds} bounds - The blood pressure classification ranges
 * @param {BpGraphLayout} graphLayout - The graph layout contains rows configuration and systolic/diastolic chart labels
 * @param {BpReadingValue} readings - The systolic and diastolic blood pressure readings
 */
export type BpChartProps = {
  bounds: BpBounds;
  graphLayout: BpGraphLayout;
  reading: BpReadingValue;
};

/**
 * A component to display the blood pressure chart
 *
 * @typedef {object} BpChartProps
 * @property {BpBounds} bounds - The blood pressure classification ranges
 * @property {BpGraphLayout} graphLayout - The graph layout contains rows configuration and systolic/diastolic chart labels
 * @property {BpReadingValue} readings - The systolic and diastolic blood pressure readings
 *
 * @param {BpChartProps} props
 * @returns {JSX.Element}
 */
export function BpChart({
  bounds,
  graphLayout,
  reading,
}: Readonly<BpChartProps>): JSX.Element {
  const { systolic, diastolic } = reading;
  const { systolicLabel, diastolicLabel } = graphLayout;

  return (
    <div className="nhsuk-body-s">
      <div className="nhsuk-bp-systolic-legend-wrapper" aria-hidden="true">
        <div className="nhsuk-bp-systolic-legend-marker" />
        <span>{systolicLabel}</span>
      </div>

      <div className="nhsuk-bp-graph" aria-hidden="true">
        <BpGraphAxes bounds={bounds} />
        <BpGraphMarker
          systolicReading={systolic}
          diastolicReading={diastolic}
          systolicLowerBound={bounds.systolic.lower}
          systolicUpperBound={bounds.systolic.upper.high.value!}
          diastolicLowerBound={bounds.diastolic.lower}
          diastolicUpperBound={bounds.diastolic.upper.high.value!}
        />
        <BpGraphRegions bounds={bounds} />
        {graphLayout.rows.map((rowConfig) => (
          <div key={rowConfig.id} className="nhsuk-bp-graph-row">
            {rowConfig.cells.map((cellProps) => (
              <BpChartCell key={cellProps.id} {...cellProps} />
            ))}
          </div>
        ))}
        <BpGraphRegions bounds={bounds} renderAsBoundary />
      </div>

      <div className="nhsuk-bp-diastolic-legend-wrapper" aria-hidden="true">
        <div className="nhsuk-bp-diastolic-legend-marker" />
        <span>{diastolicLabel}</span>
      </div>
    </div>
  );
}
