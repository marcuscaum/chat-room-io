import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Router from "next/router";
import { useForm } from "react-hook-form";

import loginSchema from "../schemas/login";

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

const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return {
    errors,
    register,
    handleSubmit: handleSubmit(handleLogin),
  };
};

export default useLoginForm;
