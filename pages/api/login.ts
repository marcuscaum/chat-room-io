import axios from "axios";
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
    const { data: avatar } = await axios.get(
      `https://avatars.dicebear.com/api/jdenticon/${user.email}.svg`
    );

    req.session.set("user", {
      ...user,
      avatar,
    });

    await req.session.save();

    res.send("Logged in");
  } catch (error) {
    res.status(500).json(error);
  }
}

export default withSession(handler);
