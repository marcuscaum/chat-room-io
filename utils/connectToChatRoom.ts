import { uniqBy } from "lodash";
import { Server } from "socket.io";
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

const connectToChatRoom = (res: any) => {
  if (res.socket.server?.io) {
    return console.log("socket.io already running");
  }

  const io = new Server(res.socket.server);

  io.on("connection", (socket) => {
    socket.emit("general message", "Welcome to ChatRoomIO!");

    socket.on("user disconnected", (user: IUser) => {
      socket.broadcast.emit("general message", `${user.email} left the chat.`);
      removeUserFromCurrentUsers(user);
      io.emit("current users", currentUsers);
    });

    socket.on("user connected", (user: IUser) => {
      socket.broadcast.emit(
        "general message",
        `${user.email} joined the chat.`
      );

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

  res.socket.server.io = io;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default connectToChatRoom;
