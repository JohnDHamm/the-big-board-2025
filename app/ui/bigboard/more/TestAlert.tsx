'use client';

import React from "react";
import Button from "@/app/ui/home/Button";
import { AlertContext } from "@/app/contexts";
import { DURATIONS } from "@/app/styles";

const TestAlert = () => {
  const { setCurrentAlert } = React.useContext(AlertContext);

  const testAlertMessage = () => {
    const testAlert: Alert = {
      message: "this is a test alert",
      type: "err",
      sticky: false
    }
    console.log('testAlert', testAlert);
    setCurrentAlert(testAlert);
    setTimeout(() => setCurrentAlert(null), DURATIONS.POPUP_ALERT + 250);
  }

  return (
    <div>
      <Button onClick={() => testAlertMessage()}>
        <p>test alert</p>
      </Button>
    </div>
  )
}

export default TestAlert;
