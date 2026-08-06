import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import MyDraftNeeds from './MyDraftNeeds';

const meta = {
  component: MyDraftNeeds,
} satisfies Meta<typeof MyDraftNeeds>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    myPositionNeeds:{
      "QB": 1,
      "RB": 2,
      "WR": 3,
      "TE": 2,
      "D": 2,
      "K": 0
    }
  }
};