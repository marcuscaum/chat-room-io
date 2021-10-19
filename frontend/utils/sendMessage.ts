import socket from "../services/socketio";
import { IMessage } from "../store/messages";

const sendMessage = (message: IMessage) => {
  socket.emit("chat message", message);
};

export default sendMessage;
