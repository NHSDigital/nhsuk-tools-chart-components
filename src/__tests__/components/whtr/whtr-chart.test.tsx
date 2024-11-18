import { render, screen } from '@testing-library/react';
import React, { JSX } from 'react';
import '@testing-library/jest-dom';
import {
  mockedWtRatioValue,
  mockedWtrClassificationBounds,
} from '@tests/__helpers__/mocks/whtr-results';
import { WhtrChart } from '@components/whtr/whtr-chart';
import { WeightedBounds } from '@custom-types/threshold.types';
import { RiskClassification } from '@custom-types/whtr.types';

const mockedMarkerText = 'The ratio:';

function ResultWhtrResultChartTestApp({
  classificationBounds = mockedWtrClassificationBounds,
  ratio = mockedWtRatioValue,
  markerText = mockedMarkerText,
}: Readonly<{
  classificationBounds?: WeightedBounds<RiskClassification>;
  ratio?: number;
  markerText?: string;
}>): JSX.Element {
  return (
    <WhtrChart
      classificationBounds={classificationBounds}
      ratio={ratio}
      markerText={markerText}
    />
  );
}

describe('The Waist to height result chart component', () => {
  it('Renders with the expected content', () => {
    const { container } = render(<ResultWhtrResultChartTestApp />);
    expect(container).toMatchSnapshot();
  });

  it('Renders the markerText', () => {
    const { container } = render(
      <ResultWhtrResultChartTestApp markerText={mockedMarkerText} />
    );

    const labelMarkerEl = container?.querySelector(
      '.nhsuk-whtr-chart-label-marker'
    );
    expect(labelMarkerEl).not.toBeNull();
    expect(labelMarkerEl?.innerHTML).toContain(mockedMarkerText);

    expect(screen.getByText(mockedMarkerText).classList[1]).toContain(
      'nhsuk-whtr-chart-label-align-right'
    );
  });

  it.each`
    ratioValue | expectedAxisPosition
    ${1}       | ${98}
    ${0.7}     | ${98}
    ${0.68}    | ${98}
    ${0.65}    | ${98}
    ${0.64}    | ${95.2}
    ${0.55}    | ${57}
    ${0.5}     | ${38}
    ${0.49}    | ${34.2}
    ${0.45}    | ${19}
    ${0.41}    | ${3.8}
    ${0.4}     | ${0}
    ${0.39}    | ${0}
    ${0.35}    | ${0}
    ${0.1}     | ${0}
  `(
    'expect the chart market axis to be positioned relative to ratio value with $expectedAxisPosition',
    async ({
      ratioValue,
      expectedAxisPosition,
    }: {
      ratioValue: number;
      expectedAxisPosition: number;
    }) => {
      const { container } = render(
        <ResultWhtrResultChartTestApp ratio={ratioValue} />
      );

      const axisMarkerEl = container?.querySelector(
        '.nhsuk-whtr-chart-axis-marker'
      ) as HTMLElement;
      expect(axisMarkerEl).not.toBeNull();
      expect(axisMarkerEl.style.left).toBe(`${expectedAxisPosition}%`);

      const arrowMarkerEl = container?.querySelector(
        '.nhsuk-whtr-chart-arrow-marker'
      ) as HTMLElement;
      expect(arrowMarkerEl).not.toBeNull();
      expect(arrowMarkerEl.style.left).toBe(`${expectedAxisPosition}%`);
    }
  );

  it('Renders the chart regions', () => {
    const { container } = render(<ResultWhtrResultChartTestApp />);

    const lowRiskRegionEl = container?.querySelector(
      '.nhsuk-whtr-classification-low'
    ) as HTMLElement;
    expect(lowRiskRegionEl).not.toBeNull();
    expect(lowRiskRegionEl.style.width).toBe('38%');

    const increasedRiskRegionEl = container?.querySelector(
      '.nhsuk-whtr-classification-increased'
    ) as HTMLElement;
    expect(increasedRiskRegionEl).not.toBeNull();
    expect(increasedRiskRegionEl.style.width).toBe('76%');

    const highRiskRegionEl = container?.querySelector(
      '.nhsuk-whtr-classification-high'
    ) as HTMLElement;
    expect(highRiskRegionEl).not.toBeNull();
    expect(highRiskRegionEl.style.width).toBe('100%');
  });

  it('Renders the chart axis ', () => {
    const { container } = render(<ResultWhtrResultChartTestApp />);

    const axisElements = container?.querySelectorAll('.nhsuk-whtr-axis-marker');

    expect(axisElements.length).toBe(2);
    const lowRiskAxisEl = axisElements[0] as HTMLElement;
    const increasedRiskAxisEl = axisElements[1] as HTMLElement;

    expect(lowRiskAxisEl.style.left).toBe('38%');
    expect(increasedRiskAxisEl.style.left).toBe('76%');

    const startAxisLabelElement = container?.querySelector(
      '.nhsuk-whtr-axis-start-marker-label'
    );
    expect(startAxisLabelElement!.innerHTML).toBe('0.4');

    const axisLabelElements = container?.querySelectorAll(
      '.nhsuk-whtr-axis-marker-label'
    );

    expect(axisLabelElements.length).toBe(2);
    const lowRiskAxisLabelEl = axisLabelElements[0];
    const increasedRiskAxisLabelEl = axisLabelElements[1];
    expect(lowRiskAxisLabelEl.innerHTML).toBe('0.5');

    expect(increasedRiskAxisLabelEl.innerHTML).toBe('0.6');
  });

  it.each`
    ratioValue
    ${0.6}
    ${0.61}
    ${0.56}
    ${0.45}
    ${0.4}
  `(
    'expect the chart to contain the ratio label value as $ratioValue',
    async ({ ratioValue }: { ratioValue: number }) => {
      const { container } = render(
        <ResultWhtrResultChartTestApp ratio={ratioValue} />
      );

      const ratioMarkerEl = container?.querySelector(
        '.nhsuk-whtr-chart-ratio-marker'
      );
      expect(ratioMarkerEl).not.toBeNull();
      expect(ratioMarkerEl?.innerHTML).toContain(ratioValue.toString());
    }
  );
});
