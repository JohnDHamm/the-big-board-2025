'use client';

import { useUser } from "@/app/hooks";
import { UserContext } from "@/app/contexts";

const UserProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const user = useUser();

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
};

export default UserProvider;
