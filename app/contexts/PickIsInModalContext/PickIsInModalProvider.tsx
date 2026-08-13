'use client';

import { usePickIsInModal } from "@/app/hooks";
import { PickIsInModalContext } from "./PickIsInModalContext";

const PickIsInModalModalProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const pickIsInModal = usePickIsInModal();

  return (
    <PickIsInModalContext.Provider value={pickIsInModal}>
      {children}
    </PickIsInModalContext.Provider>
  )
};

export default PickIsInModalModalProvider;
