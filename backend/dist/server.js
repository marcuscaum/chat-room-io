import { createServer } from "http";
import lodash from "lodash";
import { Server } from "socket.io";
const { uniqBy } = lodash;
const addUserToCurrentUsers = (user) => {
    const newUsers = uniqBy([...currentUsers, user], "email");
    currentUsers = newUsers;
};
const removeUserFromCurrentUsers = (user) => {
    const newUsers = currentUsers.filter(({ email }) => email !== user.email);
    currentUsers = newUsers;
};
const isUserConnected = (user) => currentUsers.some(({ email }) => user.email === email);
/**---------------------------------------------- */
let currentUsers = [];
const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});
console.log("Server starting...");
io.on("connection", (socket) => {
    console.log("Server started.", socket.id);
    const userDisconnected = (user) => {
        socket.broadcast.emit("general message", `${user.email} left the chat.`);
        removeUserFromCurrentUsers(user);
        io.emit("current users", currentUsers);
    };
    const userConnected = (user) => {
        if (!isUserConnected(user)) {
            socket.broadcast.emit("general message", `${user.email} joined the chat.`);
        }
        socket.emit("general message", "Welcome to the chat!");
        addUserToCurrentUsers(Object.assign(Object.assign({}, user), { socket: socket.id }));
        io.emit("current users", currentUsers);
    };
    const getCurrentUsers = () => {
        io.emit("get current users", currentUsers);
    };
    const chatMessage = (message) => {
        io.emit("chat message", message);
    };
    const disconnect = () => {
        // handle window close
        const user = currentUsers.find((user) => user.socket === socket.id);
        const newUsers = currentUsers.filter((user) => user.socket !== socket.id);
        currentUsers = newUsers;
        io.emit("current users", currentUsers);
        if (user) {
            socket.broadcast.emit("general message", `${user === null || user === void 0 ? void 0 : user.email} left the chat.`);
        }
    };
    socket.on("user disconnected", userDisconnected);
    socket.on("user connected", userConnected);
    socket.on("get current users", getCurrentUsers);
    socket.on("chat message", chatMessage);
    socket.on("disconnect", disconnect);
});
const port = parseInt(process.env.PORT, 10) || 4000;
httpServer.listen(port);
//# sourceMappingURL=server.js.map