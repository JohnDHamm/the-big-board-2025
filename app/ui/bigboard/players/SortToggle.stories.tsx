import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SortToggle from './SortToggle';

const meta = {
  component: SortToggle,
} satisfies Meta<typeof SortToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "onSortToggle": fn(),
    "sortTypes": [
      'RANK', 'A-Z', 'TEAM'
    ],
    "selectedSortType": "RANK"
  },
};