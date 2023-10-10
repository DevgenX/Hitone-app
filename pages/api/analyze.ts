import { NextApiRequest, NextApiResponse } from "next";

import { rateSpeech } from "@/utils/stream";

const feedbackHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { prompt } = req.body;

    const stream = await rateSpeech(prompt);

    return res.status(200).json(stream);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export default feedbackHandler;
