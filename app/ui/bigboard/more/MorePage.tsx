'use client';

import React from "react";
import ThreeUpLayout from "../ThreeUpLayout";
import TestAlert from "./TestAlert";

const MorePage: React.FC = () => {
  return (
    <div>
      <ThreeUpLayout
      left={<></>}
      center={
        <div>
          <h1>more (commish only)</h1>
          <TestAlert />
        </div>
      }
      right={<></>}
      />
    </div>
  )
}

export default MorePage;
