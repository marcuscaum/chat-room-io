import withSession, { NextIronHandler } from "../hocs/withSession";
import connectToChatRoom from "./connectToChatRoom";

const getUser: NextIronHandler = async ({ req, res }) => {
  const user = req.session.get("user");

  // connect to the chat room or start a new one if there is no one
  connectToChatRoom(res);

  if (!user && !req.url?.includes("/login")) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  if (!user && req.url?.includes("/login")) {
    return {
      props: {},
    };
  }

  // if session exists redirect to chat
  if (user && req.url?.includes("/login")) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};

export default withSession(getUser);
