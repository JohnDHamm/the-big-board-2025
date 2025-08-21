'use client';

import { useDraftStatus } from "@/app/hooks";
import { DraftStatusContext } from "./DraftStatusContext";

const DraftStatusProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const players = useDraftStatus();

  return (
    <DraftStatusContext.Provider value={players}>
      {children}
    </DraftStatusContext.Provider>
  )
};

export default DraftStatusProvider;
