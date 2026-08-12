'use client'

import BottomTicker from "../ui/bigboard/BottomTicker";
import Navbar from "../ui/bigboard/Navbar";
import Alert from "../ui/bigboard/Alert";

import { useContext } from "react";
import {
  AlertContext,
  CommishModalContext,
  CurrentPickContext,
  DraftContext,
  PickConfirmModalContext,
  UserContext
} from "@/app/contexts";
import { usePathname } from "next/navigation";
import CommishModal from "../ui/bigboard/CommishModal";
import PickConfirmModal from "../ui/bigboard/players/PickConfirmModal";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { alert } = useContext(AlertContext);
  const { commishModal } = useContext(CommishModalContext);
  const { draft } = useContext(DraftContext);
  const { modal } = useContext(PickConfirmModalContext);
  const { currentDraftPick } = useContext(CurrentPickContext);
  const { user } = useContext(UserContext);
  const pathname = usePathname();

  const getCurrentOwnerName = () => {
    const currPickOwner = draft.owners.find(
      (owner) => owner._id === currentDraftPick.ownerId
    );
    return currPickOwner ? currPickOwner.name : '--';
  };

  const isCurrentPick = user && user.name === getCurrentOwnerName();

  return (
    <div className="">
      {alert && (
        <Alert
          message={alert?.message}
          type={alert?.type}
          sticky={alert?.sticky}
        />
      )}
      <CommishModal {...commishModal} />
      <PickConfirmModal {...modal}/>
      <Navbar disabled={pathname ==='/bigboard'}/>
      <div>{children}</div>
      <BottomTicker 
        userHasCurrentPick = {isCurrentPick || false}
        ownerOnClockName={getCurrentOwnerName()}
        ticker = "the funny thing about tickers..."
      />
    </div>
  );
}