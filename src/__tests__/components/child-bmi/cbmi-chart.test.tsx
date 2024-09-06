import {
  BaseClassificationBounds,
  CentileValue,
} from '@custom-types/bmi.types';
import { render, screen } from '@testing-library/react';
import {
  mockedCentileValue,
  mockedChildBmiClassificationBounds,
} from '@tests/__helpers__/mocks/cbmi-results';
import React, { JSX } from 'react';
import { ChildBmiChart } from '@components/child-bmi/cbmi-chart';
import '@testing-library/jest-dom';

const mockedMarkerText = 'The centile:';

function ResultChildBmiResultChartTestApp({
  classificationBounds = mockedChildBmiClassificationBounds,
  centile = mockedCentileValue,
  markerText = mockedMarkerText,
}: Readonly<{
  classificationBounds?: BaseClassificationBounds;
  centile?: CentileValue;
  markerText?: string;
}>): JSX.Element {
  return (
    <ChildBmiChart
      classificationBounds={classificationBounds}
      centile={centile}
      markerText={markerText}
    />
  );
}

describe('The Child Bmi result chart component', () => {
  it('Renders with the expected content', () => {
    const { container } = render(<ResultChildBmiResultChartTestApp />);
    expect(container).toMatchSnapshot();
  });

  it('Renders the markerText', () => {
    const { container } = render(
      <ResultChildBmiResultChartTestApp markerText={mockedMarkerText} />
    );

    const labelMarkerEl = container?.querySelector(
      '.nhsuk-cbmi-chart-label-marker'
    );
    expect(labelMarkerEl).not.toBeNull();
    expect(labelMarkerEl?.innerHTML).toContain(mockedMarkerText);

    expect(screen.getByText(mockedMarkerText).classList).toContain(
      'nhsuk-cbmi-chart-label-align-left'
    );
  });

  it.each`
    centileLabel | centileValue | expectedAxisPosition
    ${'over 99'} | ${100}       | ${97.8}
    ${'90'}      | ${90}        | ${79.2}
    ${'87'}      | ${87}        | ${76.8}
    ${'60'}      | ${60}        | ${54.9}
    ${'45'}      | ${45}        | ${42.8}
    ${'23'}      | ${23}        | ${25}
    ${'2'}       | ${2}         | ${8}
    ${'0'}       | ${0}         | ${4}
  `(
    'expect the chart market axis to be positioned relative to centile value with $expectedAxisPosition',
    async ({
      centileLabel,
      centileValue,
      expectedAxisPosition,
    }: {
      centileLabel: string;
      centileValue: number;
      expectedAxisPosition: number;
    }) => {
      const { container } = render(
        <ResultChildBmiResultChartTestApp
          centile={{ value: centileValue, label: centileLabel }}
        />
      );

      const axisMarkerEl = container?.querySelector(
        '.nhsuk-cbmi-chart-axis-marker'
      ) as HTMLElement;
      expect(axisMarkerEl).not.toBeNull();
      expect(axisMarkerEl.style.left).toBe(`${expectedAxisPosition}%`);

      const arrowMarkerEl = container?.querySelector(
        '.nhsuk-cbmi-chart-arrow-marker'
      ) as HTMLElement;
      expect(arrowMarkerEl).not.toBeNull();
      expect(arrowMarkerEl.style.left).toBe(`${expectedAxisPosition}%`);
    }
  );

  it('Renders the chart regions', () => {
    const { container } = render(<ResultChildBmiResultChartTestApp />);

    const underweightRegionEl = container?.querySelector(
      '.nhsuk-cbmi-classification-underweight'
    ) as HTMLElement;
    expect(underweightRegionEl).not.toBeNull();
    expect(underweightRegionEl.style.width).toBe('8%');

    const healthyRegionEl = container?.querySelector(
      '.nhsuk-cbmi-classification-healthy'
    ) as HTMLElement;
    expect(healthyRegionEl).not.toBeNull();
    expect(healthyRegionEl.style.width).toBe('80%');

    const overweightRegionEl = container?.querySelector(
      '.nhsuk-cbmi-classification-overweight'
    ) as HTMLElement;
    expect(overweightRegionEl).not.toBeNull();
    expect(overweightRegionEl.style.width).toBe('100%');
  });

  it('Renders the chart axis ', () => {
    const { container } = render(<ResultChildBmiResultChartTestApp />);

    const axisElements = container?.querySelectorAll('.nhsuk-cbmi-axis-marker');

    expect(axisElements.length).toBe(2);
    const underweightAxisEl = axisElements[0] as HTMLElement;
    const overweightAxisEl = axisElements[1] as HTMLElement;

    expect(underweightAxisEl.style.left).toBe('8%');
    expect(overweightAxisEl.style.left).toBe('80%');

    const axisLabelElements = container?.querySelectorAll(
      '.nhsuk-cbmi-axis-marker-label'
    );

    expect(axisLabelElements.length).toBe(2);
    const underweightAxisLabelEl = axisLabelElements[0];
    const overweightAxisLabelEl = axisLabelElements[1];
    expect(underweightAxisLabelEl.innerHTML).toBe('2');

    expect(overweightAxisLabelEl.innerHTML).toBe('91');
  });

  it.each`
    centileLabel
    ${'over 99'}
    ${'1'}
    ${'0'}
    ${'below 1'}
  `(
    'expect the chart to contain the centile label value as $centileLabel',
    async ({ centileLabel }: { centileLabel: string }) => {
      const { container } = render(
        <ResultChildBmiResultChartTestApp
          centile={{
            value: 1,
            label: centileLabel,
          }}
        />
      );

      const centileMarkerEl = container?.querySelector(
        '.nhsuk-cbmi-chart-centile-marker'
      );
      expect(centileMarkerEl).not.toBeNull();
      expect(centileMarkerEl?.innerHTML).toContain(centileLabel);
    }
  );
});
