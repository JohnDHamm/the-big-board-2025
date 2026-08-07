import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Navbar from './Navbar';

const meta = {
  component: Navbar,
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true }
};

//TODO: add context for pathname to test current path highlighted name