import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import HidePlayersToggle from './HidePlayersToggle';

const meta = {
  component: HidePlayersToggle,
} satisfies Meta<typeof HidePlayersToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "active": true,
    "onToggle": fn()
  },
};