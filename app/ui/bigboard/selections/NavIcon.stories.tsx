import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import NavIcon from './NavIcon';

const meta = {
  component: NavIcon,
  decorators: [
    (Story) => (
      <div style={{ width: "33px", paddingTop: "0.25rem", backgroundColor: "#bada55" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColor: Story = {
  args: {
    color: "purple"
  }
};