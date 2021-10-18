import { uniqBy } from "lodash";
import { IMessage } from "../store/messages";
import { IUser } from "../store/users";

interface User extends IUser {
  socket: number;
}

let currentUsers: User[] = [];

const addUserToCurrentUsers = (user: User): void => {
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
      addUserToCurrentUsers({ ...user, socket: socket.id });
      io.emit("current users", currentUsers);
    });

    socket.on("get current users", () => {
      io.emit("get current users", currentUsers);
    });

    socket.on("chat message", (message: IMessage) => {
      io.emit("chat message", message);
    });

    socket.on("disconnect", () => {
      const user = currentUsers.find((user) => user.socket === socket.id);
      const newUsers = currentUsers.filter((user) => user.socket !== socket.id);
      currentUsers = newUsers;
      io.emit("current users", currentUsers);

      if (user) {
        socket.broadcast.emit(
          "general message",
          `${user?.email} left the chat.`
        );
      }
    });
  });
};

export default serverEvents;
