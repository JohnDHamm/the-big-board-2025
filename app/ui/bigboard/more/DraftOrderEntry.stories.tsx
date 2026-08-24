import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import DraftOrderEntry from './DraftOrderEntry';

const meta = {
  component: DraftOrderEntry,
  decorators: [
    (Story) => (
      <div style={{ width: "400px", flex: 1 }}>
        <div style={{ width: "100%"}}>
          <Story/>
        </div>
      </div>
    )
  ]
} satisfies Meta<typeof DraftOrderEntry>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};