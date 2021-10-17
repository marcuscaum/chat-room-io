import { TextField, Button } from "../components";
import useLoginForm from "../hooks/useLoginForm";
export interface IUser {
  name?: string;
  email: string;
  avatar: string;
}
export interface ILoginForm {
  user?: IUser;
}

const LoginForm: React.FC<ILoginForm> = () => {
  const { errors, register, handleSubmit } = useLoginForm();

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
      <Button fullWidth onClick={handleSubmit} type="button">
        Enter
      </Button>
    </div>
  );
};

export default LoginForm;
