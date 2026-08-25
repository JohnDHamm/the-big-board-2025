'use client';

import React from 'react';

declare global {
  interface DraftStatusContextInterface {
    draftStatus: DraftStatus;
    setCurrentDraftStatus: (draftStatus: DraftStatus) => void;
  }
}

export const DRAFT_STATUS_DEFAULT_VALUE: DraftStatusContextInterface = {
  draftStatus: 'not started',
  setCurrentDraftStatus: () => '',
};

export const DraftStatusContext = React.createContext<DraftStatusContextInterface>(
  DRAFT_STATUS_DEFAULT_VALUE
);
