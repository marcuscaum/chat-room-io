import type { NextPage } from "next";

import { LoginForm, Paper } from "../components";
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
