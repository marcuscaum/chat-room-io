import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Router from "next/router";
import { useForm } from "react-hook-form";

import { TextField, Button } from "../components";
import loginSchema from "../schemas/login";

interface IHandleLogin {
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

    Router.push("/chat-room");
  } catch (error) {
    console.error(error);
  }
};

const LoginForm: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="p-10">
      <TextField
        label="(optional)"
        placeholder="What is your name?"
        fullWidth
        {...register("name")}
      />
      <TextField
        type="email"
        placeholder="Enter your email"
        fullWidth
        error={errors?.email?.message}
        {...register("email")}
      />
      <Button fullWidth onClick={handleSubmit(handleLogin)} type="button">
        Enter
      </Button>
    </div>
  );
};

export default LoginForm;
