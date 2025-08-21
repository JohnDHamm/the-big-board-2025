'use client';

import { usePicks } from "@/app/hooks";
import { PicksContext } from "./PicksContext";

const PicksProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const picks = usePicks();

  return (
    <PicksContext.Provider value={picks}>
      {children}
    </PicksContext.Provider>
  )
};

export default PicksProvider;
