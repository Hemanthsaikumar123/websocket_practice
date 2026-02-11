const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("join",(username)=>{
    socket.username = username;
    console.log("User joined: " + username);
  })

  socket.on("chat message", (msg) => {
    io.emit("chat message", {
      username: socket.username,
      message: msg,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.username);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});













// const express = require('express');
// const http = require('http');
// const app = express();
// const server = http.createServer(app);
// const path = require('path');
// const { Server } = require('socket.io');
// const io = new Server(server);

// io.on('connection', (socket) => {
//   console.log('a user connected', socket.id);  
// });

// app.use(express.static(path.join(__dirname, 'public')));


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// server.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });