import { useEffect } from "react";
import { io } from "socket.io-client";

export const socket = io();

const useChatRoom = () => {
  useEffect(() => {
    socket.on("chat message", function (msg) {
      console.log(msg);
    });
  }, []);
};

export default useChatRoom;
