import { Server } from "socket.io";
import { NextIronRequest } from "../../hocs/withSession";
import serverEvents from "../../utils/serverEvents";

async function handler(req: NextIronRequest, res: any): Promise<void> {
  if (!res.socket?.server.io) {
    console.log("Starting socket.io");

    const io = new Server(res.socket.server);

    serverEvents(io);

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
