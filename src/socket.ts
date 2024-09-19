import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";


const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  // ...
});

export default httpServer;