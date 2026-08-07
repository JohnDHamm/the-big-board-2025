import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import MyPlayerCard from './MyPlayerCard';
import { mockTeamBUF, mockPlayer1 } from '@/app/mock_data';

const meta = {
  component: MyPlayerCard,
} satisfies Meta<typeof MyPlayerCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "player": mockPlayer1,
    "round": 1,
    "team": mockTeamBUF
  }
};