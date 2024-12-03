import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BarSliderChartFigure } from '@components/bar-slider/bar-slider-figure-chart';
import { mockBarSliderConfigExample1 } from '@tests/__helpers__/mocks/bar-slider-results';

const meta: Meta<typeof BarSliderChartFigure> = {
  title: 'Charts/BarSlider/Figure',
  component: BarSliderChartFigure,
};

export default meta;

type Story = StoryObj<typeof BarSliderChartFigure>;
/**
 *
 * This component can be found in the `nhsuk-tools-chart-components` repository <a href="https://github.com/NHSDigital/nhsuk-tools-chart-components/tree/main/src/components/bar-slider" target="_blank" rel="noopener noreferrer">here</a>.
 *
 * ## Usage
 *
 * ```jsx
 * <BarSliderChartFigure
 *     ariaLabel="Your result is shown on a chart here. A full description can be found in the text below it."
 *     config={mockBarSliderConfigExample1}
 *     value={0.63}
 *     markerText="Your result:"
 *   />
 * ```
 * ## Properties
 *
 * ### config
 * Defines the configuration data for the chart. This configuration defines the appearance and behavior of the bar slider.
 *
 *
 * - `axis`:
 *  - `ticks`: An array of objects, each representing a tick on the axis.
 *    - `value`: The position of the tick.
 *    - `isVisible`: (Optional) Boolean indicating whether the tick is visible (defaults to `true`)
 * - `segments`: An array of objects, each representing a segment on the slider.
 *  - `start`: (Optional) The starting value of the segment. If not provided, the value is calculated based on the position of the previous segment or the first axis tick.
 *  - `end`:  (Optional) The ending value of the segment. If not provided, the value is calculated based on the position of the next segment or the last axis tick.
 *  - `weight`: (Optional) The weight of the segment. If not provided, the weight is calculated based on the proportional length of the segment.
 *  - `styleClass`: The CSS class applied to the segment.
 *  - `legend`:  (Optional) The label for the segment, displayed in a legend.
 *
 *
 * ```json
 *  {
 * axis: {
 *   ticks: [
 *     { value: 0.4, isVisible: false },
 *     { value: 0.5, isVisible: true },
 *     { value: 0.6, isVisible: true },
 *     { value: 0.65, isVisible: false },
 *   ],
 * },
 * segments: [
 *   {
 *     styleClass: 'bar-slider-cyan',
 *     weight: 38,
 *     legend: 'Item 1 range',
 *   },
 *   {
 *     styleClass: 'bar-slider-yellow',
 *     weight: 38,
 *     legend: 'Item 2 range',
 *   },
 *   {
 *     styleClass: 'bar-slider-red',
 *     weight: 24,
 *     legend: 'Item 3 range',
 *   },
 *  ],
 * };
 * ```
 * ### ariaLabel
 * This property provides a textual description of the figure for screen readers.
 *
 * ### value
 *  The value to render on the chart
 *
 * ### markerText
 * This label is used to identify the marker that represents value on the chart.
 *
 * ## Styling
 *
 * ### Segment CSS Styles
 *
 * The `styleClass` property defines the CSS class applied to the segment. This class is used to style the segment's color, shape, and other visual properties.
 *
 * - `%bar-slider-region`: This mixin defines the base style for all bar slider segments. It sets the position, outline, and height of the segment. The height is responsive, adjusting for desktop and mobile views.
 *
 * #### Segment-Specific Styles:
 *
 * - `.bar-slider-cyan`: This class extends the base style and adds specific styling for the cyan segment. It includes background color, border, and other visual properties.
 * - `.bar-slider-yellow`: This class extends the base style and adds specific styling for the yellow segment.
 * - `.bar-slider-red`: This class extends the base style and adds specific styling for the red segment.
 *
 * **Note:** The z-index property is used to control the layering of segments. Higher z-index values appear on top of lower ones.
 *
 * ```scss
 *  %bar-slider-region {
 *   position: absolute;
 *   bottom: 0%;
 *   outline: $bar-slider-graph-outline;
 *   height: $bar-slider-graph-height-desktop;
 *
 *   @include for-mobile {
 *     height: $bar-slider-graph-height-mobile;
 *   }
 * }
 * ```
 * ```css
 * .bar-slider-cyan {
 *   @extend %bar-slider-region;
 *   @extend %bar-slider-cyan;
 *   z-index: 4;
 * }
 *
 * .bar-slider-yellow {
 *   @extend %bar-slider-region;
 *   @extend %bar-slider-yellow;
 *   z-index: 3;
 * }
 *
 * .bar-slider-red {
 *   @extend %bar-slider-region;
 *   @extend %bar-slider-red;
 *   z-index: 2;
 * }
 * ```
 * ### Legend Key Styling
 *
 * To ensure the legend key matches the color of its corresponding segment, you need to apply a specific CSS class to each legend key element.
 * 
 * - `.nhsuk-bar-slider-legend-key-bar-slider-cyan`: This is the specific class for the cyan segment's legend key.
 * - `@extend %bar-slider-cyan;`: This line inherits the styles defined in the `%bar-slider-cyan` mixin, which includes the background color and other visual properties of the cyan segment.
 * - `@extend .nhsuk-bar-slider-legend-key;`: This line inherits the base styles for legend keys, such as size, shape, and margin.
 *
 * #### **Important:**
 * Ensure that the class names for the legend keys follow the same pattern: `nhsuk-bar-slider-legend-key-{segment-class-name}`.
 *
 * ```css
 * .nhsuk-bar-slider-legend-key-bar-slider-cyan {
 *   @extend %bar-slider-cyan;
 *   @extend .nhsuk-bar-slider-legend-key;
 * }
 *
 * .nhsuk-bar-slider-legend-key-bar-slider-yellow {
 *   @extend %bar-slider-yellow;
 *   @extend .nhsuk-bar-slider-legend-key;
 * }
 *
 * .nhsuk-bar-slider-legend-key-bar-slider-red {
 *   @extend %bar-slider-red;
 *   @extend .nhsuk-bar-slider-legend-key;
 * }
 *
 * .nhsuk-bar-slider-legend-key {
 *   border-bottom: 2px solid white;
 *   margin-bottom: 2px;
 * }
 * .nhsuk-bar-slider-legend-marker {
 *   margin-bottom: 2px;
 * }
 * ```

 */

export const Figure: Story = {
  render: () => (
    <BarSliderChartFigure
      ariaLabel="Your result is shown on a chart here. A full description can be found in the text below it."
      config={mockBarSliderConfigExample1}
      value={0.63}
      markerText="Your result:"
    />
  ),
};
