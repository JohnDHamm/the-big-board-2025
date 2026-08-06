import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PlayerCard from './PlayerCard';
import { mockPlayer1, mockUnavailablePlayer1, mockTeamBUF } from '@/app/mock_data';

const meta = {
  component: PlayerCard,
} satisfies Meta<typeof PlayerCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "player": mockPlayer1,
    "team": mockTeamBUF,
    "rank": 42,
    "selectable": true
  }
};

export const UnavailablePlayer: Story = {
  args: {
    "player": mockUnavailablePlayer1,
    "team": mockTeamBUF,
    "rank": 42,
    "selectable": true
  }
};
