import { BmiClassificationBounds } from '@custom-types/bmi.types';
import { render } from '@testing-library/react';
import { mockedBmiClassificationBounds } from '@tests/__helpers__/mocks/bmi-results';
import React, { JSX } from 'react';
import { BmiChart } from '@components/bmi/bmi-chart';
import '@testing-library/jest-dom';

function ResultBmiResultChartTestApp({
  classificationBounds = mockedBmiClassificationBounds,
  bmi = 0,
}: Readonly<{
  classificationBounds?: BmiClassificationBounds;
  bmi?: number;
}>): JSX.Element {
  return <BmiChart classificationBounds={classificationBounds} bmi={bmi} />;
}

describe('The BMI result chart component', () => {
  it('Renders with the expected content', () => {
    const { container } = render(<ResultBmiResultChartTestApp />);
    expect(container).toMatchSnapshot();
  });

  it('Renders the chart axis ', () => {
    const { container } = render(<ResultBmiResultChartTestApp />);

    const axisElements = container?.querySelectorAll('.nhsuk-bmi-axis-marker');

    expect(axisElements.length).toBe(3);
    const underweightAxisEl = axisElements[0] as HTMLElement;
    const healthyAxisEl = axisElements[1] as HTMLElement;
    const overweightAxisEl = axisElements[2] as HTMLElement;

    expect(underweightAxisEl.style.left).toBe('4.444444444444445%');
    expect(healthyAxisEl.style.left).toBe('33.33333333333333%');
    expect(overweightAxisEl.style.left).toBe('55.55555555555556%');

    const axisLabelElements = container?.querySelectorAll(
      '.nhsuk-bmi-axis-marker-label'
    );

    expect(axisLabelElements.length).toBe(3);
    const underweightAxisLabelEl = axisLabelElements[0];
    const healthyAxisLabelEl = axisLabelElements[1];
    const overweightAxisLabelEl = axisLabelElements[2];

    expect(underweightAxisLabelEl.innerHTML).toBe('18.5');
    expect(healthyAxisLabelEl.innerHTML).toBe('25');
    expect(overweightAxisLabelEl.innerHTML).toBe('30');
  });

  it('Renders the chart regions', () => {
    const { container } = render(<ResultBmiResultChartTestApp />);

    const underweightRegionEl = container?.querySelector(
      '.nhsuk-bmi-classification-underweight'
    ) as HTMLElement;
    expect(underweightRegionEl).not.toBeNull();
    expect(underweightRegionEl.style.width).toBe('4.444444444444445%');

    const healthyRegionEl = container?.querySelector(
      '.nhsuk-bmi-classification-healthy'
    ) as HTMLElement;
    expect(healthyRegionEl).not.toBeNull();
    expect(healthyRegionEl.style.width).toBe('33.33333333333333%');

    const overweightRegionEl = container?.querySelector(
      '.nhsuk-bmi-classification-overweight'
    ) as HTMLElement;
    expect(overweightRegionEl).not.toBeNull();
    expect(overweightRegionEl.style.width).toBe('55.55555555555556%');

    const obeseRegionEl = container?.querySelector(
      '.nhsuk-bmi-classification-obese'
    ) as HTMLElement;
    expect(obeseRegionEl).not.toBeNull();
    expect(obeseRegionEl.style.width).toBe('100%');
  });

  it.each`
    bmiValue | expectedPosition
    ${0}     | ${0}
    ${12}    | ${0}
    ${30}    | ${55.6}
    ${45}    | ${122.2}
    ${67}    | ${220}
    ${89}    | ${317.8}
    ${92}    | ${331.1}
    ${98}    | ${357.8}
    ${100}   | ${366.7}
  `(
    'expect the chart to contain a chart marker positioned at $expectedPosition',
    async ({
      bmiValue,
      expectedPosition,
    }: {
      bmiValue: number;
      expectedPosition: number;
    }) => {
      const { container } = render(
        <ResultBmiResultChartTestApp bmi={bmiValue} />
      );

      const markerEl = container?.querySelector(
        '.nhsuk-bmi-chart-marker'
      ) as HTMLElement;
      expect(markerEl).not.toBeNull();
      expect(markerEl.style.left).toBe(`${expectedPosition}%`);
    }
  );
});
