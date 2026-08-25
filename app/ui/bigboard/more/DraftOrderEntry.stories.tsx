import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ClerkProvider } from '@clerk/nextjs'
import { DraftStatusContext, DraftContext } from "@/app/contexts";

import DraftOrderEntry from './DraftOrderEntry';

const mockDraftContext: DraftContextInterface = {
  draft: {
    league: {
      _id: "sflkshflksfng",
      name: "slkgnfsdgs",
      draftOrder: [],
      orgId: "",
      scoringType: "non-ppr",
      positionSlots: []
    },
    owners: [
      {
        _id: "fasdfs",
        name: "hammertime",
        leagueId: "test",
        userId: "oneUser"
      },
      {
        _id: "fasdfs",
        name: "david",
        leagueId: "test",
        userId: "twoUser"
      },
      {
        _id: "fasdfs",
        name: "jennifer",
        leagueId: "test",
        userId: "threeUser"
      }
    ],
  },
  setCurrentDraft: () => null
}

const mockDraftStatusContext: DraftStatusContextInterface = {
  draftStatus: "not started",
  setCurrentDraftStatus: () => null
}

const meta = {
  component: DraftOrderEntry,
  decorators: [
    (Story) => (
      <ClerkProvider>
        <DraftContext value={mockDraftContext}>
          <DraftStatusContext value={mockDraftStatusContext}>
          <div style={{ width: "400px", flex: 1 }}>
            <div style={{ width: "100%"}}>
              <Story/>
            </div>
          </div>
          </DraftStatusContext>
        </DraftContext>
      </ClerkProvider>
    )
  ]
} satisfies Meta<typeof DraftOrderEntry>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};