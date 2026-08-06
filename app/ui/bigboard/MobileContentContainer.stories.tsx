import type { Meta, StoryObj } from '@storybook/react-vite';

import MobileContentContainer from './MobileContentContainer';

const meta = {
  component: MobileContentContainer,
} satisfies Meta<typeof MobileContentContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div style={{display: "flex", width: "100%", height: "400px", border: "1px solid red", justifyContent: "center", alignItems: "center"}}><p>children</p></div>
  },
};