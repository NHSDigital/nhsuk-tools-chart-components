import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BarSliderChart } from '@components/bar-slider/bar-slider-chart';
import { mockBarSliderConfigExample2 } from '@tests/__helpers__/mocks/bar-slider-results';

const meta: Meta<typeof BarSliderChart> = {
  title: 'Charts/BarSlider/Chart',
  component: BarSliderChart,
};

export default meta;

type Story = StoryObj<typeof BarSliderChart>;

/**
 *
 * This component can be found in the `nhsuk-tools-chart-components` repository <a href="https://github.com/NHSDigital/nhsuk-tools-chart-components/tree/main/src/components/bar-slider" target="_blank" rel="noopener noreferrer">here</a>.
 *
 * ## Usage
 *
 * ```jsx
 *  <BarSliderChart
 *     config={mockBarSliderConfigExample2}
 *     value={35.7}
 *     markerText="Your Result:"
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
 * {
 * axis: {
 *   ticks: [
 *     { value: 0, isVisible: false },
 *     { value: 10 },
 *     { value: 40 },
 *     { value: 60 },
 *     { value: 90 },
 *     { value: 100, isVisible: false },
 *   ],
 * },
 * segments: [
 *   {
 *     start: 0,
 *     end: 10,
 *     styleClass: 'bar-slider-cyan',
 *   },
 *   {
 *     start: 10,
 *     end: 40,
 *     styleClass: 'bar-slider-yellow',
 *   },
 *   {
 *     start: 40,
 *     end: 60,
 *     styleClass: 'bar-slider-red',
 *   },
 *   {
 *     start: 60,
 *     end: 90,
 *     styleClass: 'bar-slider-purple',
 *   },
 *   {
 *     start: 90,
 *     end: 100,
 *     styleClass: 'bar-slider-green',
 *   },
 *  ],
 * };

 * ```
 * ### value
 *  The value to render on the chart
 *
 * ### markerText
 * This label is used to identify the marker that represents value on the chart.
 *
 * ## Styling
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
 *
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
 * ## Constraints
 *
 * The `constraints` is an optional property that allows you to define limits for the calculated position.
 *
 * - `constraints`: This optional property allows you to define constraints for the calculated position.
 *  - `max`: This object defines a maximum constraint.
 *  - `value`: The maximum value.
 *  - `position`: The desired position to use when the value to be rendered exceeds the max value of the constraint. This is the position that will be used to render the clamped value on the graph.
 *
 * ```json
 * {
 * axis: {
 *   ticks: [
 *     { value: 0, isVisible: false },
 *     { value: 10 },
 *     { value: 40 },
 *     { value: 60 },
 *     { value: 90 },
 *     { value: 100, isVisible: false },
 *   ],
 * },
 * constraints: {
 *   max: {
 *     value: 0.65,
 *     position: 98,
 *   },
 * },
 * segments: [
 *   {
 *     styleClass: 'bar-slider-cyan',
 *   },
 *   {
 *     styleClass: 'bar-slider-yellow',
 *   },
 *   {
 *     styleClass: 'bar-slider-red',
 *   },
 *   {
 *     styleClass: 'bar-slider-purple',
 *   },
 *   {
 *     styleClass: 'bar-slider-green',
 *   },
 *  ],
 * };
 *```
 */

export const Chart: Story = {
  render: () => (
    <BarSliderChart
      config={mockBarSliderConfigExample2}
      value={35.7}
      markerText="Your Result:"
    />
  ),
};
