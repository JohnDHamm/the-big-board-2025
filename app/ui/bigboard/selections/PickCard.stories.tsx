import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PickCard from './PickCard';
import { mockPlayer1, mockTeamBUF } from '@/app/mock_data';

const meta = {
  component: PickCard,
  decorators: [
    (Story) => (
      <div style={{ width: "400px"}}>
        <Story />
      </div>
    ),
  ]
} satisfies Meta<typeof PickCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "selectionNumber": 1,
    "ownerName": "Dennis",
    "player": mockPlayer1,
    "team": mockTeamBUF
  },
};

export const PickNotMade: Story = {
  args: {
    "selectionNumber": 2,
    "ownerName": "Steve",
    "player": undefined,
    "team": undefined
  },
};