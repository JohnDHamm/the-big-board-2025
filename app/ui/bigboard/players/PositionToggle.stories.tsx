import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PositionToggle from './PositionToggle';

const meta = {
  component: PositionToggle,
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PositionToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "onPositionsToggle": fn(),
    "positions": ['QB', 'RB', 'WR', 'TE', 'D', 'K'],
    "selectedPositions": ['QB', 'D']
  },
};