import axios from "axios";
import cheerio from "cheerio";
import { NextApiResponse } from "next";
import withSession, { NextIronRequest } from "../../hocs/withSession";

export interface IURLPreview {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
}

async function handler(
  req: NextIronRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { url } = req.query;
    const { data } = await axios.get(url as string);

    if (!data) return;

    if (data) {
      const $ = cheerio.load(data as Buffer);
      const title = $('meta[property="og:title"]').attr("content");
      const description = $('meta[property="og:description"]').attr("content");
      const image = $('meta[property="og:image"]').attr("content");
      const siteName = $('meta[property="og:site_name"]').attr("content");

      res.status(200).json({
        title,
        description,
        image,
        siteName,
      } as IURLPreview);
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

export default withSession(handler);
