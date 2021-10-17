import withSession, { NextIronHandler } from "../hocs/withSession";
import connectToChatRoom from "./connectToChatRoom";

const getUser: NextIronHandler = async ({ req, res }) => {
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

  // connect to the chat room or start a new one if there is no one
  await connectToChatRoom(res);

  return {
    props: { user: req.session.get("user") },
  };
};

export default withSession(getUser);
