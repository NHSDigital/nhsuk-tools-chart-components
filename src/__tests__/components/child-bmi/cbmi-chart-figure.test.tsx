import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import React from 'react';
import {
  BaseClassificationBounds,
  CentileValue,
  ChildBmiLegendKeys,
} from '@custom-types/bmi.types';
import {
  mockedCentileValue,
  mockedChildBmiClassificationBounds,
} from '@tests/__helpers__/mocks/cbmi-results';
import { ChildBmiChartFigure } from '@components/child-bmi/cbmi-figure-chart';

const mockedAriaLabel = 'Child body mass index figure description';

const mockedLegendKeys: ChildBmiLegendKeys = {
  underweight: 'Underweight range',
  healthy: 'Healthy range',
  overweight: 'Overweight range',
};

function ChildBmiChartFigureTestApp({
  classificationBounds = mockedChildBmiClassificationBounds,
  centile = mockedCentileValue,
  markerText = '',
  ariaLabel = mockedAriaLabel,
  legendKeys = mockedLegendKeys,
}: Readonly<{
  classificationBounds?: BaseClassificationBounds;
  centile?: CentileValue;
  markerText?: string;
  ariaLabel?: string;
  legendKeys?: ChildBmiLegendKeys;
  borderWrapper?: boolean;
}>): JSX.Element {
  return (
    <ChildBmiChartFigure
      classificationBounds={classificationBounds}
      centile={centile}
      centileMarkerText={markerText}
      ariaLabel={ariaLabel}
      legendKeys={legendKeys}
    />
  );
}

describe('The Child body mass index chart figure component', () => {
  it('Renders with the expected content', () => {
    const { container } = render(<ChildBmiChartFigureTestApp />);
    expect(container).toMatchSnapshot();
  });

  it('Renders a figcaption with aria label', () => {
    const { container } = render(
      <ChildBmiChartFigureTestApp ariaLabel={mockedAriaLabel} />
    );
    const figcaptionEl = container?.querySelector('figcaption');

    expect(figcaptionEl).not.toBeNull();
    expect(figcaptionEl?.classList).toContain('nhsuk-u-visually-hidden');
    expect(figcaptionEl?.innerHTML).toBe(mockedAriaLabel);
  });

  it('Renders with the expected marker keys', () => {
    const { container } = render(<ChildBmiChartFigureTestApp />);

    // its borderless component, card should not be rendered
    const legendCardEl = container?.querySelector('.nhsuk-chart-legend-card');
    expect(legendCardEl).toBeNull();

    const legendKeyWrappersEl = container?.querySelectorAll(
      '.nhsuk-chart-legend-key-wrapper'
    );
    expect(legendKeyWrappersEl).not.toBeNull();
    expect(legendKeyWrappersEl?.length).toBe(3);

    Object.entries(mockedLegendKeys).forEach(([key, value], index) => {
      const legendKeyWrapper = legendKeyWrappersEl![index];
      const legendKeyEl = legendKeyWrapper?.querySelector(
        `.nhsuk-cbmi-legend-key-classification-${key}`
      );
      expect(legendKeyEl).not.toBeNull();
      expect(legendKeyWrapper.innerHTML).toContain(value);
    });
  });
});
