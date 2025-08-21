'use client';

import React from 'react';

export const useTeams = (): TeamsContextInterface => {
  const [teams, setTeams] = React.useState<Teams>({});

  const setCurrentTeams = React.useCallback(
    (currentTeams: Teams): void => {
      setTeams(currentTeams);
    },
    []
  );

  return { teams, setCurrentTeams };
};
