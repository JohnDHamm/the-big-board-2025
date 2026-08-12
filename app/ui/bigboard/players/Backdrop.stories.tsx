import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Backdrop from './Backdrop';

const meta = {
  component: Backdrop,
  decorators: [
    (Story) => (
      <div style={{ width: "100%" }}>
        <Story />
        <p style={{ fontSize: "2rem" }}>anything behind the Backdrop component will be slightly readable</p>
      </div>
    ),
  ],
} satisfies Meta<typeof Backdrop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: '#BADA55',
  }
};