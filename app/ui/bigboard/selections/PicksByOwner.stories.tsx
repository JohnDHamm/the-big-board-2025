import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PicksByOwner from './PicksByOwner';

const meta = {
  component: PicksByOwner,
  decorators: [
    (Story) => (
      <div style={{ width: "260px"}}>
        <Story />
      </div>
    ),
  ]
} satisfies Meta<typeof PicksByOwner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ownerPicks: {
      "Fred": [
        {
          selectionNumber: 1,
          name: "Bubby Brister",
          position: "QB",
          teamAbbv: "PIT"
        },
        {
          selectionNumber: 4,
          name: "Tom Dempsey",
          position: "K",
          teamAbbv: "BUF"
        }
      ],
      "Tia": [
        {
          selectionNumber: 2,
          name: "Fred Jones",
          position: "WR",
          teamAbbv: "LAR"
        },
      ],
      "Peter": []
    }
  }
};