import { Server } from "socket.io";
import serverEvents from "./serverEvents";

const connectToChatRoom = (res: any) => {
  if (res.socket.server?.io) {
    return console.log("socket.io already running");
  }

  const io = new Server(res.socket.server);
  serverEvents(io);

  res.socket.server.io = io;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default connectToChatRoom;
