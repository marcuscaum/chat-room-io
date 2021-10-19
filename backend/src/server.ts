import { createServer } from "http";
import lodash from "lodash";
import { Server, Socket } from "socket.io";

const { uniqBy } = lodash;

interface IUser {
  email: string;
  socket: string;
}

interface IMessage {
  content: string;
  email?: IUser["email"];
  type?: "broadcast";
}

const addUserToCurrentUsers = (user: IUser): void => {
  const newUsers = uniqBy([...currentUsers, user], "email");
  currentUsers = newUsers;
};
const removeUserFromCurrentUsers = (user: IUser): void => {
  const newUsers = currentUsers.filter(({ email }) => email !== user.email);
  currentUsers = newUsers;
};

const isUserConnected = (user: IUser): boolean =>
  currentUsers.some(({ email }) => user.email === email);

/**---------------------------------------------- */

let currentUsers: IUser[] = [];

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  const userDisconnected = (user: IUser) => {
    socket.broadcast.emit("general message", `${user.email} left the chat.`);
    removeUserFromCurrentUsers(user);
    io.emit("current users", currentUsers);
  };

  const userConnected = (user: IUser) => {
    if (!isUserConnected(user)) {
      socket.broadcast.emit(
        "general message",
        `${user.email} joined the chat.`
      );
    }
    socket.emit("general message", "Welcome to the chat!");
    addUserToCurrentUsers({ ...user, socket: socket.id });
    io.emit("current users", currentUsers);
  };

  const getCurrentUsers = () => {
    io.emit("get current users", currentUsers);
  };

  const chatMessage = (message: IMessage) => {
    io.emit("chat message", message);
  };

  const disconnect = () => {
    // handle window close
    const user = currentUsers.find((user) => user.socket === socket.id);
    const newUsers = currentUsers.filter((user) => user.socket !== socket.id);
    currentUsers = newUsers;
    io.emit("current users", currentUsers);

    if (user) {
      socket.broadcast.emit("general message", `${user?.email} left the chat.`);
    }
  };

  socket.on("user disconnected", userDisconnected);
  socket.on("user connected", userConnected);
  socket.on("get current users", getCurrentUsers);
  socket.on("chat message", chatMessage);
  socket.on("disconnect", disconnect);
});

const port: number = parseInt(<string>process.env.PORT, 10) || 4000;
httpServer.listen(port);
