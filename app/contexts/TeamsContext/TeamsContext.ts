'use client';

import React from 'react';

declare global {
  interface Teams {
    [key: string]: Team;
  }

  interface TeamsContextInterface {
    teams: Teams;
    setCurrentTeams: (teams: Teams) => void;
  }
}

export const TEAMS_DEFAULT_VALUE: TeamsContextInterface = {
  teams: {},
  setCurrentTeams: () => {},
};

export const TeamsContext = React.createContext<TeamsContextInterface>(
  TEAMS_DEFAULT_VALUE
);
