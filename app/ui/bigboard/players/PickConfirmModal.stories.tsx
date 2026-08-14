import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PickConfirmModal from './PickConfirmModal';
import { fn } from 'storybook/test';

const meta = {
  component: PickConfirmModal,
  decorators: [
    (Story) => (
      <div style={{ width: "100%" }}>
        <Story />
        <p style={{ fontSize: "2rem" }}>anything behind the modal will be slightly readable</p>
      </div>
    ),
  ],
} satisfies Meta<typeof PickConfirmModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    visible: true,
    player: {
      name: "John Hamm",
      position: "WR"
    },
    team: {
      abbv: 'PIT',
      colors: {
        primary: "#000",
        secondary: "yellow"
      }},
    onCancel: fn(),
    onConfirm: fn(),
  }
};