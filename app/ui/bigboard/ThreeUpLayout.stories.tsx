import type { Meta, StoryObj } from '@storybook/react-vite';

import ThreeUpLayout from './ThreeUpLayout';

const meta = {
  component: ThreeUpLayout,
} satisfies Meta<typeof ThreeUpLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    left: <div style={{display: "flex", width: "100%", height: "400px", border: "1px solid red", justifyContent: "center", alignItems: "center"}}><p>left</p></div>,
    center: <div style={{display: "flex", width: "100%", height: "400px", border: "1px solid red", justifyContent: "center", alignItems: "center"}}><p>center</p></div>,
    right: <div style={{display: "flex", width: "100%", height: "400px", border: "1px solid red", justifyContent: "center", alignItems: "center"}}><p>right</p></div>,
  },
};