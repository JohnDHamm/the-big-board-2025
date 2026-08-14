'use client';

import { usePickConfirmModal } from "@/app/hooks";
import { PickConfirmModalContext } from "./PickConfirmModalContext";

const PickConfirmModalProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const pickConfirmModal = usePickConfirmModal();

  return (
    <PickConfirmModalContext.Provider value={pickConfirmModal}>
      {children}
    </PickConfirmModalContext.Provider>
  )
};

export default PickConfirmModalProvider;
