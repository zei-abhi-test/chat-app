const express = require('express');
const cors = require('cors');
const { Server } = require("socket.io");
const createServer = require('http').createServer;
const app = express();
const port = 3000


app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors:{
        credentials:false,
        origin:"http://www.localhost:5173",
        methods:['GET','POST']
    }
});

io.on("connection", (socket) => {
  console.log("a user connected",socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected",socket.id);
  });
});

io.listen(5000);

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});