import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import withSession from "../../hocs/withSession";

type NextIronRequest = NextApiRequest & { session: Session };

async function handler(
  req: NextIronRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { user } = req.body.params;

    req.session.set("user", user);

    await req.session.save();

    res.send("Logged in");
  } catch (error) {
    res.status(500).json(error);
  }
}

export default withSession(handler);
