'use client';

import { useCallback, useContext, useEffect } from "react";

import { socket } from './socket';
import { useRouter } from "next/navigation";
import { AlertContext, CommishModalContext, DraftStatusContext, UserContext } from "../contexts";
import { COMMISH_MODAL_INITIAL_VALUE } from "../contexts/CommishModalContext/CommishModalContext";
import { DURATIONS } from "../styles";

const SocketListener = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { alert, setCurrentAlert } = useContext(AlertContext);
  const { setCurrentCommishModal } = useContext(CommishModalContext);
  const { draftStatus, setCurrentDraftStatus } =
    useContext(DraftStatusContext);
  const { user } = useContext(UserContext);
  const router = useRouter();

  const clearModals = useCallback(() => {
    // console.log('clearing modals');
    setCurrentAlert(null);
    setCurrentCommishModal(COMMISH_MODAL_INITIAL_VALUE);
    // setCurrentPickIsInModal(PICKISIN_MODAL_INITIAL_VALUE);
    // setCurrentPickConfirmModal(PICKCONFIRM_MODAL_INITIAL_VALUE);
    // setNewPick(undefined);
  }, [
    setCurrentAlert,
    setCurrentCommishModal,
    // setCurrentPickConfirmModal,
    // setCurrentPickIsInModal,
  ]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log("SL socket onConnect")
      console.log("SL recovered?", socket.recovered);
    }

    function onDisconnect() {
      console.log("socket onDisconnect")
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on('JoinRoomWelcome', (msg: string) =>
      console.log('SL JoinRoomWelcome', msg)
    );

    // testing socket to other users
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
    user
  ]);

  useEffect(() => {
    // console.log('draftStatus change', draftStatus);
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
