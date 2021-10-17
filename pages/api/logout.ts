import { NextApiResponse } from "next";
import withSession, {
  NextIronHandler,
  NextIronRequest,
} from "../../hocs/withSession";

async function handler(
  req: NextIronRequest,
  res: NextApiResponse
): Promise<void> {
  req.session.destroy();
  res.json({ isLoggedIn: false });
}

export default withSession(handler);
