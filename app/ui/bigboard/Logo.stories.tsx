import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Logo from './Logo';

const meta = {
  component: Logo,
  decorators: [
    (Story) => (
      <div style={{ width: "400px", flex: 1 }}>
        <Story/>
      </div>
    )
  ]
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};