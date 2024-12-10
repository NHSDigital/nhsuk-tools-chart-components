import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BarSliderChart } from '@components/bar-slider/bar-slider-chart';
import { BarSliderConfig } from '@custom-types/bar-slider.types';
import { mockBarSliderConfigWithConstraintsExample } from '@tests/__helpers__/mocks/bar-slider-results';

const markerTest = 'Your Result:';

const mockConfig: BarSliderConfig = {
  name: 'nhsuk-bar-slider',
  axis: {
    ticks: [
      { value: 0, isVisible: false },
      { value: 10, isVisible: true },
      { value: 40, isVisible: true },
      { value: 60, isVisible: true },
      { value: 90, isVisible: true },
      { value: 100, isVisible: false },
    ],
  },
  segments: [
    {
      styleSuffix: 'mock-style-1',
      weight: 10,
    },
    {
      styleSuffix: 'mock-style-2',
      weight: 30,
    },
    {
      styleSuffix: 'mock-style-3',
      weight: 20,
    },
    {
      styleSuffix: 'mock-style-4',
      weight: 30,
    },
    {
      styleSuffix: 'mock-style-5',
      weight: 10,
    },
  ],
};

function BarSliderTestApp({
  config = mockConfig,
  value = 15.9,
  markerText = markerTest,
}: Readonly<{
  config?: BarSliderConfig;
  value?: number;
  markerText?: string;
}>): JSX.Element {
  return (
    <BarSliderChart config={config} value={value} markerText={markerText} />
  );
}

describe('The Bar slider chart component', () => {
  it('Renders with the expected content', () => {
    const { container } = render(<BarSliderTestApp />);
    expect(container).toMatchSnapshot();
  });

  it('Renders the markerText', () => {
    const markerText = 'Mocked Result:';
    const { container } = render(
      <BarSliderTestApp markerText={markerText} value={85} />
    );

    const labelMarkerEl = container?.querySelector(
      '.nhsuk-bar-slider-label-marker'
    );
    expect(labelMarkerEl).not.toBeNull();
    expect(labelMarkerEl?.innerHTML).toContain(markerText);

    expect(screen.getByText(markerText).classList[1]).toContain(
      'nhsuk-bar-slider-label-align-right'
    );
  });

  it.each`
    value  | labelAlignment
    ${1}   | ${'left'}
    ${10}  | ${'left'}
    ${20}  | ${'left'}
    ${21}  | ${'center'}
    ${50}  | ${'center'}
    ${80}  | ${'center'}
    ${81}  | ${'right'}
    ${90}  | ${'right'}
    ${100} | ${'right'}
  `(
    'with chart $value expect the label to be positioned in $labelAlignment',
    async ({
      value,
      labelAlignment,
    }: {
      value: number;
      labelAlignment: string;
    }) => {
      const markerText = 'Mocked Result:';
      const { container } = render(
        <BarSliderTestApp markerText={markerText} value={value} />
      );

      const labelMarkerEl = container?.querySelector(
        '.nhsuk-bar-slider-label-marker'
      );
      expect(labelMarkerEl).not.toBeNull();
      expect(labelMarkerEl?.innerHTML).toContain(markerText);

      expect(screen.getByText(markerText).classList[1]).toContain(
        `nhsuk-bar-slider-label-align-${labelAlignment}`
      );
    }
  );

  it.each`
    value  | expectedArrowPosition
    ${1}   | ${1}
    ${10}  | ${10}
    ${50}  | ${50}
    ${60}  | ${60}
    ${90}  | ${90}
    ${100} | ${100}
  `(
    'expect the chart arrow marker axis to be positioned relative to value with $expectedArrowPosition',
    async ({
      value,
      expectedArrowPosition,
    }: {
      value: number;
      expectedArrowPosition: number;
    }) => {
      const { container } = render(<BarSliderTestApp value={value} />);

      const arrowMarkerEl = container?.querySelector(
        '.nhsuk-bar-slider-arrow-marker'
      ) as HTMLElement;
      expect(arrowMarkerEl).not.toBeNull();
      expect(arrowMarkerEl.style.left).toBe(`${expectedArrowPosition}%`);
    }
  );

  it('Renders the chart regions', () => {
    const { container } = render(<BarSliderTestApp />);

    const expectedWeights = [10, 40, 60, 90, 100];
    mockConfig.segments.forEach((tick, id) => {
      const regionEl = container?.querySelector(
        `.nhsuk-bar-slider-mock-style-${id + 1}`
      ) as HTMLElement;
      expect(regionEl).not.toBeNull();
      expect(regionEl.style.width).toBe(`${expectedWeights[id]}%`);
    });
  });

  it('Renders the chart axis ticks', () => {
    const { container } = render(<BarSliderTestApp />);

    const expectedWeights = [10, 40, 60, 90];
    const axisTickElements = container?.querySelectorAll(
      `.nhsuk-bar-slider-axis-marker`
    );

    expect(axisTickElements.length).toBe(4);
    axisTickElements.forEach((axisEl, id) => {
      expect((axisEl as HTMLElement).style.left).toBe(
        `${expectedWeights[id]}%`
      );
      const axisLabelElement = axisEl?.querySelector(
        '.nhsuk-bar-slider-axis-marker-label'
      );
      expect(axisLabelElement!.innerHTML).toBe(`${expectedWeights[id]}`);
    });
  });

  it.each`
    value
    ${1}
    ${11.23}
    ${45.2}
    ${67.1}
    ${100}
  `(
    'expect the chart to contain the label value as $value',
    async ({ value }: { value: number }) => {
      const { container } = render(<BarSliderTestApp value={value} />);

      const ratioMarkerEl = container?.querySelector(
        '.nhsuk-bar-slider-value-marker'
      );
      expect(ratioMarkerEl).not.toBeNull();
      expect(ratioMarkerEl?.innerHTML).toContain(value.toString());
    }
  );

  it.each`
    value   | expectedAxisPosition
    ${0.1}  | ${0}
    ${0.4}  | ${0}
    ${0.5}  | ${38}
    ${0.55} | ${57}
    ${0.6}  | ${76}
    ${0.64} | ${95.2}
    ${0.65} | ${98}
    ${1}    | ${98}
  `(
    'expect the chart arrow market to be positioned in $expectedAxisPosition and clamped if $value exceeds max constraints ',
    async ({
      value,
      expectedAxisPosition,
    }: {
      value: number;
      expectedAxisPosition: number;
    }) => {
      const { container } = render(
        <BarSliderTestApp
          config={mockBarSliderConfigWithConstraintsExample}
          value={value}
        />
      );

      const arrowMarkerEl = container?.querySelector(
        '.nhsuk-bar-slider-arrow-marker'
      ) as HTMLElement;
      expect(arrowMarkerEl).not.toBeNull();
      expect(arrowMarkerEl.style.left).toBe(`${expectedAxisPosition}%`);
    }
  );
});
