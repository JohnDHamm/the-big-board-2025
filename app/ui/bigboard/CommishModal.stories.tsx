import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import CommishModal from './CommishModal';

const meta = {
  component: CommishModal,
} satisfies Meta<typeof CommishModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "message": "This is the urgent message...",
    visible: true,
    status: "status: something changed",
    hasAction: true,
    onActionCall: () => console.log("onActionCall button pressed"),
    actionPrompt: "prompt to action"
  }
};

export const Dismissable: Story = {
  args: {
    "message": "For the commissioner to dismiss...",
    visible: true,
    status: "status: something changed",
    hasAction: true,
    onActionCall: () => console.log("closes modal using context"),
    actionPrompt: "prompt to action",
    dismissable: true
  }
};

export const NoAction: Story = {
  args: {
    "message": "Hold tight, no action needed at this time...",
    visible: true,
    status: "status: under construction",
    hasAction: false,
  }
};

export const NotVisible: Story = {
  args: {
    "message": "You shouldn't be able to see this...",
    visible: false,
    status: "status: something changed",
    onActionCall: () => console.log("onActionCall button pressed")
  }
};