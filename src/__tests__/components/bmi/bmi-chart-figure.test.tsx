import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import React from 'react';
import { mockedBmiClassificationBounds } from '@tests/__helpers__/mocks/bmi-results';
import {
  BmiClassificationBounds,
  BmiLegendKeys,
} from '@custom-types/bmi.types';
import { BmiChartFigure } from '@components/bmi/bmi-figure-chart';

const mockedAriaLabel = 'Body mass index figure description';

const mockedMarkerText = 'Your BMI';
const mockedLegendKeys: BmiLegendKeys = {
  underweight: 'Underweight',
  healthy: 'Healthy',
  overweight: 'Overweight',
  obese: 'Obese',
};

function BmiChartFigureTestApp({
  classificationBounds = mockedBmiClassificationBounds,
  bmi = 0,
  ariaLabel = mockedAriaLabel,
  legendKeys = mockedLegendKeys,
  markerText = mockedMarkerText,
}: Readonly<{
  classificationBounds?: BmiClassificationBounds;
  bmi?: number;
  ariaLabel?: string;
  legendKeys?: BmiLegendKeys;
  markerText?: string;
}>): JSX.Element {
  return (
    <BmiChartFigure
      classificationBounds={classificationBounds}
      bmi={bmi}
      ariaLabel={ariaLabel}
      legendKeys={legendKeys}
      legendMarkerText={markerText}
    />
  );
}

describe('The Body mass index chart figure component', () => {
  it('Renders with the expected content', () => {
    const { container } = render(<BmiChartFigureTestApp />);
    expect(container).toMatchSnapshot();
  });

  it('Renders a figcaption with aria label', () => {
    const { container } = render(
      <BmiChartFigureTestApp ariaLabel={mockedAriaLabel} />
    );
    const figcaptionEl = container?.querySelector('figcaption');

    expect(figcaptionEl).not.toBeNull();
    expect(figcaptionEl?.classList).toContain('nhsuk-u-visually-hidden');
    expect(figcaptionEl?.innerHTML).toBe(mockedAriaLabel);
  });

  it('Renders with the expected marker keys', () => {
    const { container } = render(<BmiChartFigureTestApp />);
    const legendCardEl = container?.querySelector('.nhsuk-chart-legend-card');

    expect(legendCardEl).not.toBeNull();

    const legendKeyWrappersEl = container?.querySelectorAll(
      '.nhsuk-chart-legend-key-wrapper'
    );
    expect(legendKeyWrappersEl).not.toBeNull();
    expect(legendKeyWrappersEl?.length).toBe(5);

    Object.entries(mockedLegendKeys).forEach(([key, value], index) => {
      const legendKeyWrapper = legendKeyWrappersEl![index];
      const legendKeyEl = legendKeyWrapper?.querySelector(
        `.nhsuk-bmi-legend-key-classification-${key}`
      );
      expect(legendKeyEl).not.toBeNull();
      expect(legendKeyWrapper.innerHTML).toContain(value);
    });

    const legendKeyMarkerWrapperEl = legendKeyWrappersEl[4];
    const legendKeyMarkerEl = legendKeyMarkerWrapperEl?.querySelector(
      `.nhsuk-bmi-legend-key-marker`
    );
    expect(legendKeyMarkerEl).not.toBeNull();
  });
});
