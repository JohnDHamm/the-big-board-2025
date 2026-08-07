import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import EmptySlotCard from './EmptySlotCard';

const meta = {
  component: EmptySlotCard,
} satisfies Meta<typeof EmptySlotCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};