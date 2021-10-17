import type { NextPage } from "next";

import { Paper } from "../components";
import LoginForm from "../components/LoginForm";
import getUser from "../utils/getUser";

export const getServerSideProps = getUser;

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
