'use client'

import BottomTicker from "../ui/bigboard/BottomTicker";
import Navbar from "../ui/bigboard/Navbar";

import { useContext } from "react";
import {
  CurrentPickContext,
  DraftContext,
  UserContext
} from "@/app/contexts";



export default function Layout({ children }: { children: React.ReactNode }) {
  const { draft } = useContext(DraftContext);
  const { currentDraftPick } = useContext(CurrentPickContext);
  const { user } = useContext(UserContext);

  const getCurrentOwnerName = () => {
    const currPickOwner = draft.owners.find(
      (owner) => owner._id === currentDraftPick.ownerId
    );
    return currPickOwner ? currPickOwner.name : '--';
  };

  const isCurrentPick = user && user.name === getCurrentOwnerName();

  return (
    <div className="">
      <Navbar />
      <div>{children}</div>
      <BottomTicker 
        userHasCurrentPick = {isCurrentPick || false}
        ownerOnClockName={getCurrentOwnerName()}
        ticker = "the funny thing about tickers..."
      />
    </div>
  );
}