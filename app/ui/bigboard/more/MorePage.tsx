'use client';

import React from "react";
import ThreeUpLayout from "../ThreeUpLayout";
import CommishCommands from "./CommishCommands";
import DraftOrderEntry from "./DraftOrderEntry";

const MorePage: React.FC = () => {
  return (
    <div>
      <ThreeUpLayout
      left={<></>}
      center={
        <div style={{ display: "flex", flexDirection: "column"}}>
        <CommishCommands />
        <DraftOrderEntry />
        </div>
      }
      right={<></>}
      />
    </div>
  )
}

export default MorePage;
