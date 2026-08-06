import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import HighestAvailablePlayers from './HighestAvailablePlayers';

const meta = {
  component: HighestAvailablePlayers,
} satisfies Meta<typeof HighestAvailablePlayers>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "players": [
      {
        name: "Dan Reed",
        position: "QB",
        rank: 1,
        teamAbbv: "PIT"
      },
      {
        name: "Brad Ewald",
        position: "WR",
        rank: 7,
        teamAbbv: "TEN"
      },
      {
        name: "Phil Mahla",
        position: "RB",
        rank: 34,
        teamAbbv: "BUF"

      }]
  },
};