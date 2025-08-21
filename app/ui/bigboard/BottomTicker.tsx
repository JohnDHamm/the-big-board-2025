'use client'

import { JSX, useContext } from "react";
import {
  CurrentPickContext,
  DraftContext,
  UserContext
} from "@/app/contexts";

const BottomTicker = ({
  ticker,
}: {
  ticker?: JSX.Element; 
}) => {
  const { draft } = useContext(DraftContext);
  const { currentDraftPick } = useContext(CurrentPickContext);
  const { user } = useContext(UserContext);

  const getCurrentOwnerName = () => {
    const currPickOwner = draft.owners.find(
      (owner) => owner._id === currentDraftPick.ownerId
    );
    return currPickOwner ? currPickOwner.name : '--';
  };

  return (
    <div className="p-4" style={{height: '60px', width: '100%', position: 'fixed', bottom: 0, left: 0, display: "flex", borderWidth: 2, borderColor: 'red'}}>
      {user && user.name === getCurrentOwnerName() ? (
        <div>
          <p>YOU ARE ON THE CLOCK</p>
        </div>
      ) : (
        <div>
          <p>ON THE CLOCK: {getCurrentOwnerName()}</p>
        </div>
      )}
      {ticker && <div>{ticker}</div>}
    </div>
  )
}

export default BottomTicker;
