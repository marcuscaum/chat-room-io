import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Router from "next/router";
import { useForm } from "react-hook-form";

import loginSchema from "../schemas/login";
import handleLogin from "../services/login";

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
