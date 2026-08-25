import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UserContext, DraftStatusContext } from "@/app/contexts";
import { ClerkProvider } from '@clerk/nextjs'

import Navbar from './Navbar';

const mockUserContext = {
  user: {
    _id: "sfsf",
    userId: "skfhsf",
    name: "John",
    leagueId: "sfsgs",
    isCommish: false
  },
  setCurrentUser: () => null
}

const mockCommissionerContext = {
  user: {
    _id: "sfsf",
    userId: "skfhsf",
    name: "John",
    leagueId: "sfsgs",
    isCommish: true
  },
  setCurrentUser: () => null
}

const meta = {
  component: Navbar,
  parameters: {
    nextjs: {
      appDirectory: true, // Enables App Router mocking context
      navigation: {
        pathname: '/bigboard/players',
        // query: { user: '123' },
      },
    },
  },
  decorators: [
    (Story) => (
      <ClerkProvider>
        <Story />
      </ClerkProvider>
    )
  ]
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <UserContext
          value={mockUserContext}
          >
          <DraftStatusContext
            value={{
              draftStatus: "open",
              setCurrentDraftStatus: () => null
            }}>
            <Story />
          </DraftStatusContext>
        </UserContext>
    )
  ]
};

export const Commissioner: Story = {
  decorators: [
    (Story) => (
      <UserContext
          value={mockCommissionerContext}
          >
          <DraftStatusContext
            value={{
              draftStatus: "open",
              setCurrentDraftStatus: () => null
            }}>
            <Story />
          </DraftStatusContext>
        </UserContext>
    )
  ]
};

export const DraftNotStarted: Story = {
  decorators: [
    (Story) => (
      <UserContext
          value={mockCommissionerContext}
          >
          <DraftStatusContext
            value={{
              draftStatus: "not started",
              setCurrentDraftStatus: () => null
            }}>
            <Story />
          </DraftStatusContext>
        </UserContext>
    )
  ]
};

export const Disabled: Story = {
  args: { disabled: true }
};
