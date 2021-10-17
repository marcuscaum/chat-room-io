import axios from "axios";
import Router from "next/router";

export interface IHandleLogin {
  name: string;
  email: string;
}

const handleLogin = async ({ name, email }: IHandleLogin) => {
  try {
    await axios.post("/api/login", {
      params: {
        user: {
          name,
          email,
        },
      },
    });

    Router.push("/");
  } catch (error) {
    console.error(error);
  }
};

export default handleLogin;
