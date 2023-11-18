const express = require("express");

const socketIo = require("socket.io");

const app = express();

app.use(express.static("client"));

const server = app.listen(9000, () => {
  console.log("9000 server is running");
});

const socketIoWithServer = socketIo(server);
socketIoWithServer.on("connection", (socketIo) => {
  console.log("connected - " + socketIo.id);

  // create event
  socketIo.on("chatwithserver", () => {
    console.log("called from client");
  });

  socketIo.on("chatwithserverWithMessage", (data) => {
    console.log("called from client for message", data);

// send msg all use write below code
    socketIoWithServer.sockets.emit("chatwithserverWithMessage", data);
  });
});
