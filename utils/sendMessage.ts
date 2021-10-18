import { io } from "socket.io-client";
import { IMessage } from "../store/messages";

const socket = io("/");

const sendMessage = (message: IMessage) => {
  socket.emit("chat message", message);
};

export default sendMessage;
