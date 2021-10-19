import { io } from "socket.io-client";

const socket = io("https://nameless-hollows-68951.herokuapp.com/", {
  transports: ["websocket"],
  upgrade: false,
});

export default socket;
