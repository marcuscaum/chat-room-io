import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Socket } from "socket.io-client";

import messagesState, { IMessage } from "../store/messages";
import usersState, { IUser } from "../store/users";

const useChatRoom = ({
  currentUser,
  socket,
}: {
  currentUser: IUser;
  socket: Socket;
}) => {
  const setMessages = useSetRecoilState(messagesState);
  const setUsers = useSetRecoilState(usersState);

  const addMessage = (message: IMessage) => {
    const newMessage = {
      content: message.content,
      email: currentUser.email,
      type: message.type,
    };

    setMessages((oldMessages) => [...oldMessages, newMessage]);
  };

  const setCurrentUsers = (users: IUser[]) => {
    const usersList = users.filter(({ email }) => {
      return email !== currentUser.email;
    });

    setUsers(usersList);
  };

  useEffect(() => {
    socket.emit("user connected", currentUser);

    socket.on("chat message", addMessage);
    socket.on("current users", setCurrentUsers);
    socket.on("general message", (message) =>
      addMessage({
        content: message,
        type: "broadcast",
      })
    );
  }, [socket]);
};

export default useChatRoom;
