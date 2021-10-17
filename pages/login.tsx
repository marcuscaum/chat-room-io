import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { NextPage } from "next";

import { Paper } from "../components";
import loginSchema from "../schemas/login";
import LoginForm from "../components/LoginForm";

interface IHandleLogin {
  name: string;
  email: string;
}

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="justify-self-center w-96">
      <Paper>
        <LoginForm />
      </Paper>
    </div>
  );
};

export default Login;
