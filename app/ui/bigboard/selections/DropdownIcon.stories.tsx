import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import DropdownIcon from './DropdownIcon';

const meta = {
  component: DropdownIcon,
  decorators: [
    (Story) => (
      <div style={{ width: "30px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

export const CustomColors: Story = {
  args: {
    fillColor: "yellow",
    strokeColor: "black"
  }
};