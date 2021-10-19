import type { NextPage } from "next";

import { Paper } from "../components";
import LoginForm from "../components/LoginForm";
import redirectUser from "../utils/redirectUser";

export const getServerSideProps = redirectUser;

const Login: NextPage = () => {
  return (
    <div className="justify-self-center w-96">
      <Paper>
        <LoginForm />
      </Paper>
    </div>
  );
};

export default Login;
