import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import socket from "../services/socketio";

import messagesState, { IMessage } from "../store/messages";
import usersState, { IUser } from "../store/users";

const useSocketEvents = ({ currentUser }: { currentUser: IUser }) => {
  const setMessages = useSetRecoilState(messagesState);
  const setUsers = useSetRecoilState(usersState);

  const addMessage = (message: IMessage) => {
    setMessages((oldMessages) => [...oldMessages, message]);
  };

  const setCurrentUsers = (users: IUser[]) => {
    const usersList = users.filter(({ email }) => {
      return email !== currentUser.email;
    });

    setUsers(usersList);
  };

  const generalMessage = (message: string) =>
    addMessage({
      content: message,
      type: "broadcast",
    });

  useEffect(() => {
    socket.emit("user connected", currentUser);

    socket.on("chat message", addMessage);
    socket.on("current users", setCurrentUsers);
    socket.on("general message", generalMessage);
    socket.on("disconnect", () => socket.removeAllListeners());

    return () => {
      socket.off("chat message", addMessage);
      socket.off("current users", setCurrentUsers);
      socket.off("general message", generalMessage);
    };
  }, [socket]);
};

export default useSocketEvents;
