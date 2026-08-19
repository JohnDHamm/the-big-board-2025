'use client';

import { useCallback, useContext, useEffect, useState } from "react";

import { socket } from './socket';
import { useRouter } from "next/navigation";
import {
  AlertContext,
  CommishModalContext,
  CurrentPickContext,
  DraftContext,
  DraftStatusContext,
  MyTeamContext,
  PickConfirmModalContext,
  PickIsInModalContext,
  PicksContext,
  PlayersContext,
  TeamsContext,
  UserContext
 } from "../contexts";
import { COMMISH_MODAL_INITIAL_VALUE } from "../contexts/CommishModalContext/CommishModalContext";
import { PICKISIN_MODAL_INITIAL_VALUE } from "../contexts/PickIsInModalContext/PickIsInModalContext";
import { PICKCONFIRM_MODAL_INITIAL_VALUE } from "../contexts/PickConfirmModalContext/PickConfirmModalContext";
import { DURATIONS } from "../styles";
import { calcTotalRounds } from "../utils";

const SocketListener = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { alert, setCurrentAlert } = useContext(AlertContext);
  const { setCurrentCommishModal } = useContext(CommishModalContext);
  const { setCurrentDraftPick } = useContext(CurrentPickContext);
  const { draft } = useContext(DraftContext);
  const { draftStatus, setCurrentDraftStatus } =
    useContext(DraftStatusContext);
    const { myTeam, setCurrentMyTeam } = useContext(MyTeamContext);
    const { setCurrentPickIsInModal } = useContext(PickIsInModalContext);
    const { picks, setCurrentPicks } = useContext(PicksContext);
    const { setCurrentPickConfirmModal } = useContext(
      PickConfirmModalContext
    );
    const { players, setCurrentPlayers } = useContext(PlayersContext);
    const { teams } = useContext(TeamsContext);
    const { user } = useContext(UserContext);

  const router = useRouter();

  const [newPick, setNewPick] = useState<DraftSelection>();

  const clearModals = useCallback(() => {
    setCurrentAlert(null);
    setCurrentCommishModal(COMMISH_MODAL_INITIAL_VALUE);
    setCurrentPickIsInModal(PICKISIN_MODAL_INITIAL_VALUE);
    setCurrentPickConfirmModal(PICKCONFIRM_MODAL_INITIAL_VALUE);
    setNewPick(undefined);
  }, [
    setCurrentAlert,
    setCurrentCommishModal,
    setCurrentPickConfirmModal,
    setCurrentPickIsInModal,
  ]);

  const updatePlayer = useCallback(
    (playerId: string, players: Players) => {
      players[playerId].available = false;
      setCurrentPlayers(players);
    },
    [setCurrentPlayers]
  );

  const updatePicks = useCallback(
    (newPick: DraftSelection, picks: DraftPickContext) => {
      picks[newPick.selectionNumber] = newPick;
      setCurrentPicks(picks);

      const numOwners = draft.league.draftOrder.length;
      const numRounds = calcTotalRounds(draft.league.positionSlots);
      const totalPicks = numRounds * numOwners;
      if (newPick.selectionNumber + 1 > totalPicks) {
      } else {
        const updateCurrent: CurrentDraftPick = {
          selectionNumber: newPick.selectionNumber + 1,
          ownerId: picks[newPick.selectionNumber + 1].ownerId,
        };
        setCurrentDraftPick(updateCurrent);
      }
    },
    [setCurrentPicks, setCurrentDraftPick, draft]
  );

  const getOwnerName = useCallback(
    (ownerId: string) => {
      const owner = draft.owners.find((owner) => owner._id === ownerId);
      return owner ? owner.name : '';
    },
    [draft]
  );

  useEffect(() => {
    if (
      newPick &&
      user &&
      players &&
      teams &&
      setCurrentPickIsInModal &&
      updatePlayer &&
      updatePicks
    ) {
      if (user?._id !== newPick.ownerId) {
        const player = players[newPick.playerId];
        const team = teams[player.teamId];
        const newModal: PickIsInModal = {
          visible: true,
          selectionNumber: newPick.selectionNumber,
          ownerName: getOwnerName(newPick.ownerId),
          player: {
            position: player.position,
            firstName: player.firstName,
            lastName: player.lastName,
          },
          team: {
            abbv: team.abbv,
            colors: team.colors,
          },
        };
        setCurrentPickIsInModal(newModal);
      } else {
        const updateTeam: MyTeam = JSON.parse(JSON.stringify(myTeam));
        const newSelection: DraftPick = {
          selectionNumber: newPick.selectionNumber,
          playerId: newPick.playerId,
          ownerId: newPick.ownerId,
        };
        updateTeam.push(newSelection);
        setCurrentMyTeam(updateTeam);
        const totalPicks = Object.keys(picks).length;
        if (newPick.selectionNumber !== totalPicks) {
          setCurrentAlert({
            message: 'Congrats! Your pick is complete.',
            type: 'success',
          });
          setTimeout(() => setCurrentAlert(null), DURATIONS.POPUP_ALERT + 250);
        }
      }
      updatePicks(newPick, JSON.parse(JSON.stringify(picks)));
      updatePlayer(newPick.playerId, JSON.parse(JSON.stringify(players)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getOwnerName,
    newPick,
    setCurrentPickIsInModal,
    teams,
    updatePicks,
    updatePlayer,
    user
  ]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log("SL socket onConnect")
      if (socket.recovered) {
        console.log("SL recovered?", socket.recovered);
        setCurrentAlert({
          message: 'The connection has been recovered!',
          type: 'success',
          sticky: true,
        });
        setTimeout(() => setCurrentAlert(null), DURATIONS.POPUP_ALERT + 250);
      }
    }

    function onDisconnect() {
      console.log("socket onDisconnect")
      setCurrentAlert({
          message: 'Connection lost! Trying to reconnect...',
          type: 'err',
          sticky: true,
        });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on('JoinRoomWelcome', (msg: string) =>
      console.log('SL JoinRoomWelcome', msg)
    );

    socket.on("OwnerHello", (msg: string) =>
      console.log('SL OwnerHello', msg)
    );

    socket.on('DraftStarted', (message: string) => {
      console.log('SL DraftStarted', message);
      const newModal: CommishModal = {
        visible: true,
        status: 'The draft has now started!',
        message,
        hasAction: true,
        actionPrompt: "Let's GO!",
        onActionCall: () => {
          router.push('/bigboard');
          clearModals();
        },
      };
      setCurrentCommishModal(newModal);
      setCurrentDraftStatus("open");
    });

    socket.on('DraftPaused', (message: string) => {
      console.log('SL DraftPaused', message);
      const newModal: CommishModal = {
        visible: true,
        status: 'The draft has been paused!',
        message,
        hasAction: false,
        dismissable: user?.isCommish
      };
      setCurrentCommishModal(newModal);
      setCurrentDraftStatus("paused");
    });
    
    socket.on('DraftReopened', (message: string) => {
      console.log('SL DraftReopened', message);
      const newModal: CommishModal = {
        visible: true,
        status: 'The draft has been reopened! Continue below to restart the app.',
        message,
        hasAction: true,
        actionPrompt: "Continue",
        onActionCall: () => {
          router.push('/bigboard');
          clearModals();
        },
      };
      setCurrentCommishModal(newModal);
      setCurrentDraftStatus("open");
    });
    
    socket.on('DraftStatusChanged', (status: DraftStatus) => {
      console.log('SL DraftStatusChanged', status);
      setCurrentDraftStatus(status);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [
    clearModals,
    router,
    setCurrentCommishModal,
    setCurrentDraftStatus,
    user,
    setCurrentAlert
  ]);

  useEffect(() => {
    socket.on('PickMade', (pick: DraftSelection) => {
      setNewPick(pick);
    });
  }, []);

  useEffect(() => {
    setCurrentAlert(null);
    switch (draftStatus) {
      case 'open':
        setCurrentAlert({
          message: 'The draft is open!',
          type: 'success',
        });
        setTimeout(() => setCurrentAlert(null), DURATIONS.POPUP_ALERT + 250);
        break;
      case 'done':
        setCurrentAlert({
          message: 'The draft is done. Have a great season!',
          type: 'success',
          sticky: true,
        });
        break;
      case 'paused':
        setCurrentAlert({
          message: 'The draft has been paused!',
          type: 'err',
          sticky: true,
        });
        break;
      case 'not started':
        setCurrentAlert({
          message: 'The draft has not started!',
          type: 'warn',
          sticky: true,
        });
        break;
      default:
        setCurrentAlert(null);
    }
  }, [draftStatus, setCurrentAlert]);

  return <div>{children}</div>
};

export default SocketListener;
