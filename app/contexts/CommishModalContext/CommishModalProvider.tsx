'use client';

import { useCommishModal } from "@/app/hooks";
import { CommishModalContext } from "./CommishModalContext";

const CommishModalProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const commishModal = useCommishModal();

  return (
    <CommishModalContext.Provider value={commishModal}>
      {children}
    </CommishModalContext.Provider>
  )
};

export default CommishModalProvider;
