const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.username = "Anonymous";

  socket.on("video", ({ data, username }) => {
    // console.log("video", data);
    socket.broadcast.emit("video", { data, username });
  });

  socket.on("newUser", ({ username }) => {
    console.log(`New user connected: ${username}`);
    socket.username = username;
    io.emit("newUser", { username });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    io.emit("userDisconnected", { username: socket.username });
  });
});

server.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
