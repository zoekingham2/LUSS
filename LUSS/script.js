const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("En användare anslöt");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("Servern körs på http://localhost:3000");
});