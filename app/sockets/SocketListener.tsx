'use client';

import { useEffect } from "react";
import { socket } from './socket';

const SocketListener = ({
  children,
}: {
  children: React.ReactNode
}) => {
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log("socket onConnect")
      console.log("recovered?", socket.recovered);
    }

    function onDisconnect() {
      console.log("socket onDisconnect")
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on('JoinRoomWelcome', (msg: string) =>
      console.log('JoinRoomWelcome', msg)
    );

    // testing socket to other users
    socket.on("OwnerHello", (msg: string) =>
      console.log('OwnerHello', msg)
    );

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return <div>{children}</div>
};

export default SocketListener;
