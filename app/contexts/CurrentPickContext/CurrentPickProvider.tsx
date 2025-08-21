'use client';

import { useCurrentPick } from "@/app/hooks";
import { CurrentPickContext } from "./CurrentPickContext";

const CurrentPickProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const currentPick = useCurrentPick();

  return (
    <CurrentPickContext.Provider value={currentPick}>
      {children}
    </CurrentPickContext.Provider>
  )
};

export default CurrentPickProvider;
