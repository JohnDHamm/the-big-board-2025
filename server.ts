import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("______new client connected", socket.id);

    if (socket.recovered) {
    // recovery was successful: socket.id, socket.rooms and socket.data were restored
      console.log('_________socket recovered!!!!!!!!!!');
    } else {
      // new or unrecoverable session
    }

    socket.on("JoinRoom", (room) => {
      console.log("__________joining room:", room)
      socket.join(room)

      io.to(room).emit("JoinRoomWelcome", "welcome to " + room)
    })

    // testing socket to other users
    socket.on("Hello", (name, room) => {
      console.log('_____________hello from:', name);
      io.to(room).emit('OwnerHello', `${name} says hello!`);
    })

    socket.on("StartDraft", (message, room) => {
      console.log('______________draft started', message);
      io.to(room).emit("DraftStarted", message);
    })
    
    socket.on("PauseDraft", (message, room) => {
      console.log('______________draft paused', message);
      io.to(room).emit("DraftPaused", message);
    })
    
    socket.on("ReopenDraft", (message, room) => {
      console.log('______________draft reopened', message);
      io.to(room).emit("DraftReopened", message);
    })

    socket.on("ChangeDraftStatus", (status, room) => {
      console.log('______________draft status changed', status);
      io.to(room).emit("DraftStatusChanged", status);
    })

    socket.on("MakePick", (newPick, room) => {
      console.log('______________make new pick', newPick);
      io.to(room).emit("PickMade", newPick);
    })
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
