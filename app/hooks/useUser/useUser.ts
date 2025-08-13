'use client';

import React from 'react';
import { tempUser } from '@/app/contexts/UserContext/UserContext';

export const useUser = (): UserContextInterface => {
  const [user, setUser] = React.useState<User>(tempUser);

  const setCurrentUser = React.useCallback((currentUser: User): void => {
    setUser(currentUser);
  }, []);

  return { user, setCurrentUser };
};
