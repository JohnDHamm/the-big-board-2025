'use client';

import React from "react";
import Button from "@/app/ui/home/Button";
import { CommishModalContext } from "@/app/contexts";
import { DURATIONS } from "@/app/styles";
import { COMMISH_MODAL_INITIAL_VALUE } from "@/app/contexts/CommishModalContext/CommishModalContext";

const TestCommishModal = () => {
  const { setCurrentCommishModal } = React.useContext(CommishModalContext);

  const testCommishModal = () => {
    const commishModal: CommishModal = {
      message: "this is a test message form the commish",
      visible: true,
      onActionCall: () => console.log("you pressed it!"),
      status: "The status has changed!"
    }
    console.log('commishModal', commishModal);
    setCurrentCommishModal(commishModal);
    setTimeout(() => setCurrentCommishModal(COMMISH_MODAL_INITIAL_VALUE), DURATIONS.POPUP_ALERT + 250);
  }

  return (
    <div style={{ margin: "2rem"}}>
      <Button onClick={() => testCommishModal()}>
        <p>test commish modal</p>
      </Button>
    </div>
  )
}

export default TestCommishModal;
