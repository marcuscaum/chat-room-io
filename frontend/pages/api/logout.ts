import { NextApiResponse } from "next";
import withSession, { NextIronRequest } from "../../hocs/withSession";

async function handler(
  req: NextIronRequest,
  res: NextApiResponse
): Promise<void> {
  req.session.destroy();
  res.json({ success: true });
}

export default withSession(handler);
