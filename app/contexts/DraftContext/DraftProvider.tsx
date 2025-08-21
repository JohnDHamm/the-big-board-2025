'use client';

import { useDraft } from "@/app/hooks";
import { DraftContext } from "./DraftContext";

const DraftProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const draft = useDraft();

  return (
    <DraftContext.Provider value={draft}>
      {children}
    </DraftContext.Provider>
  )
};

export default DraftProvider;
