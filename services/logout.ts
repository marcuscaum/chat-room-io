import axios from "axios";
import Router from "next/router";

import { io } from "socket.io-client";
import { IUser } from "../store/users";

const socket = io("/");

const handleLogout = async (user: IUser) => {
  try {
    await axios.delete("/api/logout");
    socket.emit("user disconnected", user);

    // reload page to check user again
    Router.reload();
  } catch (error) {
    console.error(error);
  }
};

export default handleLogout;
