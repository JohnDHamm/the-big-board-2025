// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from '@storybook/react-vite';

import BottomTicker from './BottomTicker';

const meta = {
  component: BottomTicker,
} satisfies Meta<typeof BottomTicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CurrentPick: Story = {
  args: {
    userHasCurrentPick: true,
    ownerOnClockName: "Sylvester",
    ticker: "thufferin' thuccotath",
  },
};

export const NotCurrentPick: Story = {
  args: {
    userHasCurrentPick: false,
    ownerOnClockName: "Tweety",
    ticker: 'I tawt I taw a puddy tat!',
  },
};