'use client';

import { useTeams } from "@/app/hooks";
import { TeamsContext } from "@/app/contexts";

const TeamsProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const teams = useTeams();

  return (
    <TeamsContext.Provider value={teams}>
      {children}
    </TeamsContext.Provider>
  )
};

export default TeamsProvider;
