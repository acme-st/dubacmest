import { NextApiRequest, NextApiResponse } from "next";
import { addLink, getLinksForProject } from "@/lib/api/links";
import { Session, withUserAuth } from "@/lib/auth";

// This is a special route for retrieving and creating custom acme.st links.

export default withUserAuth(
  async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    // GET /api/links – get all acme.st links created by the user
    if (req.method === "GET") {
      const { status, sort } = req.query as {
        status?: string;
        sort?: "createdAt" | "clicks";
      };
      const response = await getLinksForProject({
        domain: "acme.st",
        status,
        sort,
        userId: session.user.id,
      });
      return res.status(200).json(response);

      // POST /api/links – create a new link
    } else if (req.method === "POST") {
      let { key, url } = req.body;
      if (!key || !url) {
        return res.status(400).json({ error: "Missing key or url" });
      }
      const response = await addLink({
        ...req.body,
        domain: "acme.st",
        userId: session.user.id,
      });

      if (response === null) {
        return res.status(400).json({ error: "Key already exists" });
      }
      return res.status(200).json(response);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
    }
  },
);
