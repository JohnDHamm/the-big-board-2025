'use client';

import React from "react";
import ThreeUpLayout from "../ThreeUpLayout";
import CommishCommands from "./CommishCommands";

const MorePage: React.FC = () => {
  return (
    <div>
      <ThreeUpLayout
      left={<></>}
      center={
        <CommishCommands />
      }
      right={<></>}
      />
    </div>
  )
}

export default MorePage;
