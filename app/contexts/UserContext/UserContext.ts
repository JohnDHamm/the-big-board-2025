'use client';

import React from 'react';

declare global {
  interface UserContextInterface {
    user: User;
    setCurrentUser: (user: User) => void;
  }
}

export const tempUser: User = {
  _id: "1",
  name: 'Johnny',
  leagueId: 'test league',
  isCommish: true,
  accessToken: 'token',
}

export const USER_DEFAULT_VALUE: UserContextInterface = {
  user: null,
  setCurrentUser: () => {},
};

export const UserContext = React.createContext<UserContextInterface>(
  USER_DEFAULT_VALUE
);
