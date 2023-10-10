import { NextApiRequest, NextApiResponse } from "next";

import { generateScript } from "@/utils/stream";
import { ScriptContent } from "@/components/CreateScript";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { prompt } = req.body;

    const stream = await generateScript(prompt);

    return res.status(200).json(stream);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export default handler;
