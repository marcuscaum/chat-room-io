import withSession, { NextIronHandler } from "../hocs/withSession";

const getUser: NextIronHandler = async ({ req }) => {
  const user = req.session.get("user");

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user: req.session.get("user") },
  };
};

export default withSession(getUser);
