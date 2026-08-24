import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import OwnerBlock from './OwnerBlock';

const meta = {
  component: OwnerBlock,
  decorators: [
    (Story) => (
      <div style={{border: '1px solid lightgrey', width: '480px'}}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof OwnerBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "name": "username",
    "imgUrl": "https://picsum.photos/30",
  },
};