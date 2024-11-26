import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WhtrChartFigure } from '@components/whtr/whtr-figure-chart';
import {
  mockedWtRatioValue,
  mockedWtrClassificationBounds,
} from '@tests/__helpers__/mocks/whtr-results';

const meta: Meta<typeof WhtrChartFigure> = {
  title: 'Charts/Waist to height/Figure',
  component: WhtrChartFigure,
};

export default meta;

type Story = StoryObj<typeof WhtrChartFigure>;

/**
 *
 * This component can be found in the `nhsuk-tools-chart-components` repository <a href="https://github.com/NHSDigital/nhsuk-tools-chart-components/tree/main/src/components/whtr" target="_blank" rel="noopener noreferrer">here</a>.
 *
 * Display a visual representation of a Waist to height ratio calculation, including a chart, markers, and labels.
 *
 * ## Usage
 *
 * ```jsx
 *  <WhtrChartFigure
 *       ariaLabel="Your ratio is shown on a chart here. A full description can be found in the text below it"
 *       classificationBounds={classificationBounds}
 *       ratio={0.64}
 *       ratioMarkerText="Your ratio:"
 *       legendKeys={{
 *         low: 'Lower risk range',
 *         increased: 'Increased risk range',
 *         high: 'Higher risk range',
 *       }}
 *   />
 * ```
 *
 * ## Properties
 *
 * ### classificationBounds
 * Defines the boundaries for different risk classifications.
 *
 * This property provides a structured way to define the ranges for different risk classifications, including both the numerical value and the corresponding weight value for each segment to be displayed
 *
 * The data is an object with the following properties:
 *
 * - `lower`: A number representing the lower bound of the chart.
 *
 * - `upper`: An object containing the upper bounds for different risk classifications.
 *
 *  - `value:`: A number representing the upper bound of the risk segment.
 *
 *  - `weight` Determines the relative size of each segment within the chart in percentage between 0 and 100. A higher percentage value results in a larger segment on the chart. For example, a segment with a width of 50% will take up half of the available space.
 *
 * ```json
 * {
 *  lower: 0.4,
 *   upper: {
 *   [RiskClassifications.Low]: {
 *     value: 0.5,
 *     weight: 38,
 *   },
 *   [RiskClassifications.Increased]: {
 *     value: 0.6,
 *     weight: 38,
 *   },
 *   [RiskClassifications.High]: {
 *     value: 0.65,
 *     weight: 24,
 *   },
 * }
 * ```
 * ### ariaLabel
 * This property provides a textual description of the figure for screen readers.
 *
 * ### ratio
 * Represents the Waist to height ratio value.
 *
 * ### ratioMarkerText
 * This label is used to identify the marker that represents the Waist to height ratio calculation on the chart.
 *
 * ### legendKeys
 * Defines the labels for different risk classifications.
 *
 * This property maps risk classifications to their corresponding labels, which will be displayed in the chart's legend.
 *
 */

export const Figure: Story = {
  render: () => (
    <WhtrChartFigure
      ariaLabel="Your ratio is shown on a chart here. A full description can be found in the text below it"
      classificationBounds={mockedWtrClassificationBounds}
      ratio={mockedWtRatioValue}
      ratioMarkerText="Your ratio:"
      legendKeys={{
        low: 'Lower risk range',
        increased: 'Increased risk range',
        high: 'Higher risk range',
      }}
    />
  ),
};
