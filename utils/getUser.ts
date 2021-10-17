import withSession, { NextIronHandler } from "../hocs/withSession";

const getUser: NextIronHandler = async ({ req }) => {
  const user = req.session.get("user");

  if (!user && req.url !== "/login") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (!user && req.url === "/login") {
    return {
      props: {},
    };
  }

  // if session exists redirect to chat
  if (user && req.url === "/login") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { user: req.session.get("user") },
  };
};

export default withSession(getUser);
