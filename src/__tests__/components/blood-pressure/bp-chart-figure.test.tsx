import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  BpGraphLayout,
  BpLegendKeys,
  BpReadingValue,
} from '@custom-types/blood-pressure.types';
import { BpBounds } from '@custom-types/classifications.types';
import {
  mockedBpClassificationBounds,
  mockedBpGraphLayout,
  mockedBptReading,
} from '@tests/__helpers__/mocks/bp-results';
import React from 'react';
import { BpChartFigure } from '@components/blood-pressure/bp-figure-chart';

const mockedAriaLabel = 'Blood Pressure figure description';

const mockedMarkerText = 'Your reading';
const mockedLegendKeys: BpLegendKeys = {
  high: 'High',
  slightlyraised: 'Slightly raised',
  healthy: 'healthy',
  low: 'low',
};

function BpChartFigureTestApp({
  classificationBounds = mockedBpClassificationBounds,
  reading = mockedBptReading,
  layout = mockedBpGraphLayout,
  ariaLabel = mockedAriaLabel,
  legendKeys = mockedLegendKeys,
  legendMarkerText = mockedMarkerText,
}: Readonly<{
  classificationBounds?: BpBounds;
  reading?: BpReadingValue;
  layout?: BpGraphLayout;
  ariaLabel?: string;
  legendKeys?: BpLegendKeys;
  legendMarkerText?: string;
}>): JSX.Element {
  return (
    <BpChartFigure
      bounds={classificationBounds}
      reading={reading}
      graphLayout={layout}
      ariaLabel={ariaLabel}
      legendKeys={legendKeys}
      legendMarkerText={legendMarkerText}
    />
  );
}

describe('The Blood pressure chart figure component', () => {
  it('Renders with the expected content', () => {
    const { container } = render(<BpChartFigureTestApp />);
    expect(container).toMatchSnapshot();
  });

  it('Renders a figcaption with aria label', () => {
    const { container } = render(
      <BpChartFigureTestApp ariaLabel={mockedAriaLabel} />
    );
    const figcaptionEl = container?.querySelector('figcaption');

    expect(figcaptionEl).not.toBeNull();
    expect(figcaptionEl?.classList).toContain('nhsuk-u-visually-hidden');
    expect(figcaptionEl?.innerHTML).toBe(mockedAriaLabel);
  });

  it('Renders with the expected marker keys', () => {
    const { container } = render(<BpChartFigureTestApp />);
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
        `.nhsuk-bp-legend-key-classification-${key}`
      );
      expect(legendKeyEl).not.toBeNull();
      expect(legendKeyWrapper.innerHTML).toContain(value);
    });

    const legendKeyMarkerWrapperEl = legendKeyWrappersEl[4];
    const legendKeyMarkerEl = legendKeyMarkerWrapperEl?.querySelector(
      `.nhsuk-bp-legend-key-marker`
    );
    expect(legendKeyMarkerEl).not.toBeNull();
  });
});
