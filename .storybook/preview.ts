import './storybook.scss';
import type { Preview } from '@storybook/react';
import '../src/components/styles/index.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    options: {
      storySort: {
        order: ['Welcome', 'Charts'],
      },
    },
  },
};
export default preview;
