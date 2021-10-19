import axios from "axios";
import Router from "next/router";
import { IUser } from "../store/users";
import socket from "./socketio";

const handleLogin = async ({ email }: IUser, setError: any) => {
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
