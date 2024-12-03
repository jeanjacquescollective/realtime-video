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
    socket.broadcast.emit("video", { data, username, userId: socket.id });
  });

  socket.on("message", ({message, username}) => {
    io.emit("message", {message, username, userId: socket.id});
  });


  socket.on("newUser", ({ username }) => {
    console.log(`New user connected: ${username}`);
    socket.username = username;
    io.emit("newUser", { username, userId: socket.id });
  });

  socket.on("usernameChanged", (newUsername) => {
    console.log(`Username changed to ${newUsername}`);
    const oldUsername = socket.username;
    socket.username = newUsername;
    io.emit("usernameChanged", { username: newUsername, userId: socket.id });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected" + socket.username + " " + socket.id);
    io.emit("userDisconnected", { username: socket.username, userId: socket.id });
  });
});

server.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
