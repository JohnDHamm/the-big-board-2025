import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Football from './Football';

const meta = {
  component: Football,
  decorators: [
    (Story) => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Football>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "fillColor": "#552d90",
    "children": <div style={{ fontSize: "4.5rem", color: "white", marginTop: "10px" }}>WR</div>
  },
};