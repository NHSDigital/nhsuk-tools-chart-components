import { BpChart } from '@components/blood-pressure/bp-chart';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  BpGraphLayout,
  BpReadingValue,
} from '@custom-types/blood-pressure.types';
import { BpBounds } from '@custom-types/classifications.types';
import {
  mockedBpClassificationBounds as mockedClassificationBounds,
  mockedBpGraphLayout,
  mockedBptReading,
} from '@tests/__helpers__/mocks/bp-results';
import React from 'react';

const systolicAxis = [
  { value: 70, offset: 0 },
  { value: 90, offset: 18.181818181818183 },
  { value: 120, offset: 45.45454545454545 },
  { value: 140, offset: 63.63636363636363 },
  { value: 180, offset: 100 },
];

const diastolicAxis = [
  { value: 40, offset: 0 },
  { value: 60, offset: 25 },
  { value: 80, offset: 50 },
  { value: 90, offset: 62.5 },
  { value: 120, offset: 100 },
];

const bptClassificationRegions = [
  { name: 'classification-0', width: 25, height: 18.181818181818183 },
  { name: 'classification-1', width: 50, height: 45.45454545454545 },
  { name: 'classification-2', width: 62.5, height: 63.63636363636363 },
  { name: 'classification-3', width: 100, height: 100 },
];

const btpRegionBoundaries = [
  { width: 25, height: 18.181818181818183 },
  { width: 50, height: 45.45454545454545 },
  { width: 62.5, height: 63.63636363636363 },
];

function ResultBpChartTestApp({
  classificationBounds = mockedClassificationBounds,
  reading = mockedBptReading,
  layout = mockedBpGraphLayout,
}: Readonly<{
  classificationBounds?: BpBounds;
  reading?: BpReadingValue;
  layout?: BpGraphLayout;
}>): JSX.Element {
  return (
    <BpChart
      bounds={classificationBounds}
      reading={reading}
      graphLayout={layout}
    />
  );
}

describe('The Blood pressure result chart component', () => {
  it('Renders with the expected content', () => {
    const { container } = render(<ResultBpChartTestApp />);
    expect(container).toMatchSnapshot();
  });

  it('Renders the systolic chart axis ', () => {
    const { container } = render(<ResultBpChartTestApp />);

    const axisElements = container?.querySelectorAll(
      '.nhsuk-bp-systolic-axis-marker'
    ) as NodeListOf<HTMLElement>;

    expect(axisElements.length).toBe(systolicAxis.length);

    axisElements.forEach((sysAxis, index) => {
      expect(sysAxis.style.bottom).toBe(`${systolicAxis[index].offset}%`);

      const axisLabelEl = sysAxis.querySelector(
        '.nhsuk-bp-systolic-axis-label'
      );
      expect(axisLabelEl).not.toBeNull();

      expect(axisLabelEl?.innerHTML).toBe(systolicAxis[index].value.toString());
    });
  });

  it('Renders the systolic legend marker and label ', () => {
    const { container } = render(<ResultBpChartTestApp />);

    const axisLegendMarkerEl = container?.querySelector(
      '.nhsuk-bp-systolic-legend-wrapper'
    );
    expect(axisLegendMarkerEl).not.toBeNull();
    const legendMarkerEl = axisLegendMarkerEl!.querySelector(
      '.nhsuk-bp-systolic-legend-marker'
    );

    expect(legendMarkerEl).not.toBeNull();
    const spanElement = axisLegendMarkerEl!.querySelector('span');

    expect(spanElement?.innerHTML).toBe(mockedBpGraphLayout.systolicLabel);
  });

  it('Renders the diastolic legend marker and label ', () => {
    const { container } = render(<ResultBpChartTestApp />);

    const axisLegendMarkerEl = container?.querySelector(
      '.nhsuk-bp-diastolic-legend-wrapper'
    );
    expect(axisLegendMarkerEl).not.toBeNull();
    const legendMarkerEl = axisLegendMarkerEl!.querySelector(
      '.nhsuk-bp-diastolic-legend-marker'
    );

    expect(legendMarkerEl).not.toBeNull();
    const spanElement = axisLegendMarkerEl!.querySelector('span');

    expect(spanElement?.innerHTML).toBe(mockedBpGraphLayout.diastolicLabel);
  });

  it('Renders the diastolic chart axis ', () => {
    const { container } = render(<ResultBpChartTestApp />);

    const axisElements = container?.querySelectorAll(
      '.nhsuk-bp-diastolic-axis-marker'
    ) as NodeListOf<HTMLElement>;

    expect(axisElements.length).toBe(diastolicAxis.length);

    axisElements.forEach((sysAxis, index) => {
      expect(sysAxis.style.left).toBe(`${diastolicAxis[index].offset}%`);

      const axisLabelEl = sysAxis.querySelector(
        '.nhsuk-bp-diastolic-axis-label'
      );
      expect(axisLabelEl).not.toBeNull();

      expect(axisLabelEl?.innerHTML).toBe(
        diastolicAxis[index].value.toString()
      );
    });
  });

  it('Renders the chart classification regions', () => {
    const { container } = render(<ResultBpChartTestApp />);

    bptClassificationRegions.forEach((region) => {
      const regionEl = container?.querySelector(
        `.nhsuk-bp-${region.name}`
      ) as HTMLElement;

      expect(regionEl).not.toBeNull();

      expect(regionEl.style.width).toBe(`${region.width}%`);
      expect(regionEl.style.height).toBe(`${region.height}%`);
    });
  });

  it('Renders the chart region boundaries', () => {
    const { container } = render(<ResultBpChartTestApp />);

    const regionBoundariesEl = container?.querySelectorAll(
      '.nhsuk-bp-region-boundary'
    ) as NodeListOf<HTMLElement>;

    expect(regionBoundariesEl.length).toBe(regionBoundariesEl.length);

    regionBoundariesEl.forEach((regionBoundary, index) => {
      expect(regionBoundary.style.width).toBe(
        `${btpRegionBoundaries[index].width}%`
      );
      expect(regionBoundary.style.height).toBe(
        `${btpRegionBoundaries[index].height}%`
      );
    });
  });

  it('Renders the chart layout', () => {
    const { container } = render(<ResultBpChartTestApp />);

    const rowsEl = container?.querySelectorAll('.nhsuk-bp-graph-row');
    expect(rowsEl).not.toBeNull();
    expect(rowsEl.length).toBe(mockedBpGraphLayout.rows.length);

    rowsEl.forEach((rowEl, rowIdx) => {
      const row = mockedBpGraphLayout.rows[rowIdx];

      const cellsEl = rowEl?.querySelectorAll('.nhsuk-bp-graph-cell');
      expect(cellsEl.length).toBe(row.cells.length);

      cellsEl.forEach((cellEl, cellIdx) => {
        const cell = row.cells[cellIdx];

        if (cell.firstInRow) {
          expect(cellEl.classList).toContain('nhsuk-bp-first-in-row');
        }

        if (cell.firstInColumn) {
          expect(cellEl.classList).toContain('nhsuk-bp-first-in-column');
        }
      });
    });
  });

  it.each`
    bpReading     | expectedOffset
    ${[100, 60]}  | ${[25, 27.3]}
    ${[110, 71]}  | ${[38.8, 36.4]}
    ${[120, 75]}  | ${[43.8, 45.5]}
    ${[124, 72]}  | ${[40, 49.1]}
    ${[145, 83]}  | ${[53.8, 68.2]}
    ${[160, 65]}  | ${[31.2, 81.8]}
    ${[180, 83]}  | ${[53.8, 100]}
    ${[200, 100]} | ${[75, 118.2]}
  `(
    'when reading value of $bpReading is provided, the chart should contain a chart marker positioned at $expectedOffset',
    async ({
      bpReading,
      expectedOffset,
    }: {
      bpReading: [number, number];
      expectedOffset: [number, number];
    }) => {
      const [systolic, diastolic] = bpReading;
      const { container } = render(
        <ResultBpChartTestApp
          reading={{
            systolic,
            diastolic,
          }}
        />
      );

      const [left, bottom] = expectedOffset;
      const markerEl = container?.querySelector(
        '.nhsuk-bp-graph-marker'
      ) as HTMLElement;

      expect(markerEl).not.toBeNull();

      expect(markerEl.style.left).toBe(`${left}%`);
      expect(markerEl.style.bottom).toBe(`${bottom}%`);
    }
  );
});
