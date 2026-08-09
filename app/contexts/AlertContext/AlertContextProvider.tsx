'use client';

import { useAlert } from "@/app/hooks";
import { AlertContext } from "./AlertContext";

const AlertProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const alert = useAlert();

  return (
    <AlertContext.Provider value={alert}>
      {children}
    </AlertContext.Provider>
  )
};

export default AlertProvider;
