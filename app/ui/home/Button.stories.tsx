import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Button from './Button';

const meta = {
  component: Button,
  decorators: [
    (Story) => (
      <div style={{ width: "400px", flex: 1 }}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Story/>
        </div>
      </div>
    )
  ]
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: fn(),
    children: "sign in",
  },
};

export const Disabled: Story = {
  args: {
    onClick: fn(),
    children: "sign in",
    disabled: true
  },
};

export const Alternate: Story = {
  args: {
    onClick: fn(),
    children: "sign in",
    alternate: true
  },
};