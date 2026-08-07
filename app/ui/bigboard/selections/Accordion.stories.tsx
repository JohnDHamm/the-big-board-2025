import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Accordion from './Accordion';

const meta = {
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "label": "click this label to expand",
    "children": (
      <div>
        <p>child 1</p>
        <p>child 2</p>
        <p>child 3</p>
      </div>
    )
  },
};