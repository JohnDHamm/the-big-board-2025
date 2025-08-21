'use client';

import React from "react";

declare global {
  interface Players {
    [key: string]: PlayerInfo;
  }

  interface PlayersContextInterface {
    players: Players;
    setCurrentPlayers: (players: Players) => void;
  }
}

export const PLAYERS_DEFAULT_VALUE: PlayersContextInterface = {
  players: {},
  setCurrentPlayers: () => {},
};

export const PlayersContext = React.createContext<PlayersContextInterface>(
  PLAYERS_DEFAULT_VALUE
);
