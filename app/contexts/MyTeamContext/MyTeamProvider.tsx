'use client';

import { useMyTeam } from "@/app/hooks";
import { MyTeamContext } from "./MyTeamContext";

const MyTeamProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const myTeam = useMyTeam();

  return (
    <MyTeamContext.Provider value={myTeam}>
      {children}
    </MyTeamContext.Provider>
  )
};

export default MyTeamProvider;
