import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PickIsInModal from './PickIsInModal';

const meta = {
  component: PickIsInModal,
} satisfies Meta<typeof PickIsInModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    visible: true,
    player: {
      firstName: "John",
      lastName: "Hamm",
      position: "WR"
    },
    team: {
      abbv: 'PIT',
      colors: {
        primary: "#000",
        secondary: "yellow"
      }},
    ownerName: "Homer",
    selectionNumber: 42
  }
};