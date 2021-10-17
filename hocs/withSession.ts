import { NextApiRequest, NextApiResponse } from "next";
import { Session, withIronSession } from "next-iron-session";

interface INextIronHandler {
  req: NextIronRequest;
  res: NextApiResponse;
}

export type NextIronRequest = NextApiRequest & { session: Session };
export type NextIronHandler = ({
  req,
  res,
}: INextIronHandler) => void | Promise<void> | {};
export type NextAxiosHandler = (
  req: NextIronRequest,
  res: NextApiResponse
) => void | Promise<void> | {};

const withSession = (handler: NextIronHandler | NextAxiosHandler) =>
  withIronSession(handler, {
    password: "TCtKTmUrQgve0a5es8CoYoa6WgDGPji0",
    cookieName: "chat-room-io",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });

export default withSession;
