import { TextField, Button } from ".";
import useLoginForm from "../hooks/useLoginForm";
import { IUser } from "../store/users";
export interface ILoginForm {
  user?: IUser;
}

const LoginForm: React.FC<ILoginForm> = () => {
  const { errors, register, handleSubmit } = useLoginForm();

  return (
    <div className="p-10">
      <div className="text-lg mb-4 text-gray-400 text-center">
        Enter chat room:
      </div>
      <TextField
        type="email"
        placeholder="What is your email?"
        fullWidth
        error={errors?.email?.message}
        {...register("email")}
      />
      <Button
        disabled={Boolean(errors?.email?.message)}
        fullWidth
        onClick={handleSubmit}
        type="button"
      >
        Enter
      </Button>
    </div>
  );
};

export default LoginForm;
