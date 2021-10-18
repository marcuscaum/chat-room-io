import axios from "axios";
import Router from "next/router";
import { io } from "socket.io-client";
import { IUser } from "../store/users";

const socket = io();

const handleLogin = async ({ email }: IUser, setError: any) => {
  // start socket io
  await fetch("/api/socketio");

  socket.once("get current users", async (currentUsers) => {
    try {
      const foundUser = currentUsers.find(
        (user: IUser) => user.email === email
      );
      if (foundUser) {
        return setError("email", {
          message: "Email already taken!",
        });
      }
      await axios.post("/api/login", {
        params: {
          user: {
            email,
          },
        },
      });

      Router.push("/");
    } catch (error) {
      console.error(error);
    }
  });

  socket.emit("get current users");
};

export default handleLogin;
