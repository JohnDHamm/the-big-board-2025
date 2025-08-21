import React from 'react';

export const usePlayers = (): PlayersContextInterface => {
  const [players, setPlayers] = React.useState<Players>({});

  const setCurrentPlayers = React.useCallback(
    (currentPlayers: Players): void => {
      setPlayers(currentPlayers);
    },
    []
  );

  return { players, setCurrentPlayers };
};
