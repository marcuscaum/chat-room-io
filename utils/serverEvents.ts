import { uniqBy } from "lodash";
import Server from "next/dist/server/next-server";
import { IMessage } from "../store/messages";
import { IUser } from "../store/users";

let currentUsers: IUser[] = [];

const addUserToCurrentUsers = (user: IUser): void => {
  const newUsers = uniqBy([...currentUsers, user], "email");
  currentUsers = newUsers;
};
const removeUserFromCurrentUsers = (user: IUser): void => {
  const newUsers = currentUsers.filter(({ email }) => email !== user.email);
  currentUsers = newUsers;
};
const isUserConnected = (user: IUser): boolean => {
  return currentUsers.some(({ email }) => user.email === email);
};

const serverEvents = (io: any) => {
  io.on("connection", (socket: any) => {
    socket.emit("general message", "Welcome to the chat!");

    socket.on("user disconnected", (user: IUser) => {
      socket.broadcast.emit("general message", `${user.email} left the chat.`);
      removeUserFromCurrentUsers(user);
      io.emit("current users", currentUsers);
    });

    socket.on("user connected", (user: IUser) => {
      if (!isUserConnected(user)) {
        socket.broadcast.emit(
          "general message",
          `${user.email} joined the chat.`
        );
      }
      addUserToCurrentUsers(user);
      io.emit("current users", currentUsers);
    });

    socket.on("get current users", () => {
      io.emit("get current users", currentUsers);
    });

    socket.on("chat message", (message: IMessage) => {
      io.emit("chat message", message);
    });
  });
};

export default serverEvents;
