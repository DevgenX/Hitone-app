import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import util from "util";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const readFileAsync = util.promisify(fs.readFile);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { audio } = req.body;
      const ffmpeg = createFFmpeg({
        corePath: "/node_modules/@ffmpeg/core/dist/ffmpeg-core.js",
        log: true,
      });
      await ffmpeg.load();

      ffmpeg.FS("writeFile", "input.webm", await fetchFile(audio));

      await ffmpeg.run("-i", "input.webm", "output.mp3");

      const mp3Data = ffmpeg.FS("readFile", "output.mp3");

      res.setHeader("Content-Type", "audio/mp3");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="converted.mp3"'
      );
      res.status(200).send(mp3Data);

      ffmpeg.FS("unlink", "input.webm");
      ffmpeg.FS("unlink", "output.mp3");
    } catch (error) {
      console.error("Error processing audio conversion:", error);
      res.status(500).json({ error: "Error processing audio conversion" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
