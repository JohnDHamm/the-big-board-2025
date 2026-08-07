import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import DraftRoundTitleBar from './DraftRoundTitleBar';

const meta = {
  component: DraftRoundTitleBar,
} satisfies Meta<typeof DraftRoundTitleBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "roundNum": 2,
    "totalRounds": 6,
    "onRoundChange": fn()
  },
};
export const FirstRound: Story = {
  args: {
    "roundNum": 1,
    "totalRounds": 6,
    "onRoundChange": fn()
  },
};
export const LastRound: Story = {
  args: {
    "roundNum": 6,
    "totalRounds": 6,
    "onRoundChange": fn()
  },
};