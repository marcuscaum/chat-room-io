import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import loginSchema from "../schemas/login";
import handleLogin from "../services/login";
import { IUser } from "../store/users";

const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  return {
    errors,
    register,
    handleSubmit: handleSubmit((data) => handleLogin(data as IUser, setError)),
  };
};

export default useLoginForm;
