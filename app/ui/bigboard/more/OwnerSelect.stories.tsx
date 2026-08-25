import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import OwnerSelect from './OwnerSelect';

const mockOptions: OwnerSelectOption[] = [
  {
    _id: "slfkvsfvnsfvgs",
    name: "first",
    imageUrl: "https:/",
  },
    {
    _id: "asrgargar",
    name: "second",
    imageUrl: "https:/",
  }
]

const meta = {
  component: OwnerSelect,
} satisfies Meta<typeof OwnerSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "options": mockOptions,
    "onSelect": fn()
  },
};