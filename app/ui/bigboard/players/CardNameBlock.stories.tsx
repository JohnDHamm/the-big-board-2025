import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import CardNameBlock from './CardNameBlock';

const meta = {
  component: CardNameBlock,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#00338D" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CardNameBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "firstName": "Keon",
    "lastName": "Coleman"
  },
};