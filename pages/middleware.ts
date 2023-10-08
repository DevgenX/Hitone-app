import { NextApiRequest, NextApiResponse } from "next";

export default function customMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
}
