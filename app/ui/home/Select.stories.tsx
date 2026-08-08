import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Select from './Select';

const meta = {
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "options": [
      "option 1",
      "option 2"
    ],
    "onSelect": fn()
  },
};