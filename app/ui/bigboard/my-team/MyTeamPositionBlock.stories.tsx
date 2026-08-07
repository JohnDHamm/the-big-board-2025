import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import MyTeamPositionBlock from './MyTeamPositionBlock';
import { mockPlayer2, mockTeamARI } from '@/app/mock_data';

const revMockPlayer2: MyPlayer = {
  playerInfo: mockPlayer2,
  roundSelectionNum: 1,
  team: mockTeamARI
}


const meta = {
  component: MyTeamPositionBlock,
} satisfies Meta<typeof MyTeamPositionBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "position": "WR",
    "totalSlots": 1,
    "players": [ revMockPlayer2 ]
  },
};