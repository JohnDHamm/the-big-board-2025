import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PicksByPosition from './PicksByPosition';

const meta = {
  component: PicksByPosition,
} satisfies Meta<typeof PicksByPosition>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    picks: [
      [ "WR", "QB", "QB", "RB" ],
      [ "K", "D", "TE", null ],
      [ null, null, null, null]
    ]
  }
};