'use client';

import { usePlayers } from "@/app/hooks";
import { PlayersContext } from "./PlayersContext";

const PlayersProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const players = usePlayers();

  return (
    <PlayersContext.Provider value={players}>
      {children}
    </PlayersContext.Provider>
  )
};

export default PlayersProvider;
