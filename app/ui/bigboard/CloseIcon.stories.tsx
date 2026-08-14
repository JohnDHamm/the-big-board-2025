import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import CloseIcon from './CloseIcon';
import { COLORS } from '@/app/styles';

const meta = {
  component: CloseIcon,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '30px',
          backgroundColor: 'lightgrey',
          padding: '0.25rem ',
        }}
      >
        <Story/>
      </div>
    )
  ]
} satisfies Meta<typeof CloseIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: COLORS.PRIMARY_GREEN
  }
};