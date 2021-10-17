import withSession, { NextIronHandler } from "../hocs/withSession";

const getUser: NextIronHandler = async ({ req }) => {
  const user = req.session.get("user");
  console.log(req.url);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // if session exists redirect to chat
  if (req.url === "/login") {
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
