'use client';

import React from 'react';

declare global {
  interface CommishModal {
    visible: boolean;
    status: string;
    message: string;
    hasAction?: boolean,
    onActionCall?: () => void;
    actionPrompt?: string;
    dismissable?: boolean;
  }

  interface CommishModalContextInterface {
    commishModal: CommishModal;
    setCurrentCommishModal: (modalInfo: CommishModal) => void;
  }
}

export const COMMISH_MODAL_INITIAL_VALUE: CommishModal = {
  visible: false,
  status: '',
  message: '',
  hasAction: false,
  onActionCall: () => null,
  actionPrompt: '',
  dismissable: false
};

export const COMMISH_MODAL_DEFAULT_VALUE: CommishModalContextInterface = {
  commishModal: COMMISH_MODAL_INITIAL_VALUE,
  setCurrentCommishModal: () => {},
};

export const CommishModalContext = React.createContext<
  CommishModalContextInterface
>(COMMISH_MODAL_DEFAULT_VALUE);
