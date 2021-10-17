import { Server } from "socket.io";

const connectToChatRoom = (res: any) => {
  if (!res.socket.server?.io) {
    const io = new Server(res.socket.server);
    io.on("connection", (socket) => {
      socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
      });
    });
    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default connectToChatRoom;
