import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Alert from './Alert';

const meta = {
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    "message": "Success message",
    "type": "success",
    "sticky": false
  },
};

export const Warn: Story = {
  args: {
    "message": "Warn message",
    "type": "warn",
    "sticky": false
  },

};

export const Error: Story = {
  args: {
    "message": "Err message",
    "type": "err",
    "sticky": false
  },
};

export const Sticky: Story = {
  args: {
    "message": "Sticky message",
    "type": "success",
    "sticky": true
  },
};