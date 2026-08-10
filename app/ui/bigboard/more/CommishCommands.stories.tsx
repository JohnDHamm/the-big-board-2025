import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import CommishCommands from './CommishCommands';

const meta = {
  component: CommishCommands,
  decorators: [
    (Story) => (
      <div style={{ width: "400px", flex: 1 }}>
        <div style={{ width: "100%"}}>
          <Story/>
        </div>
      </div>
    )
  ]
} satisfies Meta<typeof CommishCommands>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};