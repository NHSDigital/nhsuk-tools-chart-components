import { ChartLegend, ChartLegendProps } from '@components/chart-legend';
import { render } from '@testing-library/react';
import React from 'react';

describe('Chart Legend', () => {
  const mockLegendKeys = [
    {
      text: 'Key One',
      wrapperClassName: 'legend-wrapper',
    },
    {
      text: 'Key Two',
      className: 'key-two-class',
    },
    {
      text: 'Key Three',
      element: <span>Key three element</span>,
    },
  ];

  it('renders content as expected', () => {
    const legendProps: ChartLegendProps = {
      legendKeys: mockLegendKeys,
    };

    const { container } = render(<ChartLegend {...legendProps} />);

    expect(container).toMatchSnapshot();
  });

  it(' the chart legend should not contain the card border', () => {
    const legendProps: ChartLegendProps = {
      borderWrapper: false,
      legendKeys: mockLegendKeys,
    };
    const { container } = render(<ChartLegend {...legendProps} />);
    expect(container.querySelector('nhsuk-card')).toBeNull();
    expect(container.querySelector('nhsuk-chart-legend-card')).toBeNull();
  });

  it(' the chart legend should contain the card border', () => {
    const legendProps: ChartLegendProps = {
      borderWrapper: true,
      legendKeys: mockLegendKeys,
    };
    const { container } = render(<ChartLegend {...legendProps} />);
    expect(container.querySelector('nhsuk-card')).toBeDefined();
    expect(container.querySelector('nhsuk-chart-legend-card')).toBeDefined();
  });
});
