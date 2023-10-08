import { ScriptContent } from "@/components/CreateScript";

const API_KEY: string = "";

export const convertToSupportedFormat = async (
  webmBlob: Blob
): Promise<Blob> => {
  const FFmpeg = await import("@ffmpeg/ffmpeg");
  const ffmpeg = FFmpeg.createFFmpeg({ log: false });
  await ffmpeg.load();

  const inputName = "input.webm";
  const outputName = `output.mp3`;

  ffmpeg.FS(
    "writeFile",
    inputName,
    new Uint8Array(await webmBlob.arrayBuffer())
  );

  await ffmpeg.run("-i", inputName, outputName);

  const outputData = ffmpeg.FS("readFile", outputName);
  const outputBlob = new Blob([outputData.buffer], {
    type: `audio/mp3`,
  });

  return outputBlob;
};

const generateMessages = (formData: ScriptContent) => {
  const userMessage = {
    role: "user",
    content: `I'm ${formData.name} and I want to create a short speech about ${formData.purpose} with specific content of ${formData.content} in a given situation of ${formData.situation} with a maximum of ${formData.length} words. Make it as accurate as possible and provide the best speech for me.`,
  };

  const messages = [
    {
      role: "system",
      content: `You are an experienced speech writer that can write for any situation. Write a speech based on the user's request. If the user didn't give a detailed explanation, you can mention his name ${formData.name} and ask for a more detailed input like the ${formData.content} and ${formData.situation}`,
    },
    userMessage,
  ];

  return messages;
};

export const generateScript = async (prompt: ScriptContent) => {
  const messages = generateMessages(prompt);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 200,
      temperature: 0.5,
    }),
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} - ${response.statusText}`);
  }

  const responseData = await response.json();

  if (responseData && responseData.choices && responseData.choices[0].message) {
    return responseData.choices[0].message.content;
  }
};

export const sendAudioToWhisper = async (audioFile: Blob) => {
  console.log(audioFile);
  try {
    const formData = new FormData();
    formData.append("audio", audioFile, "recorded-audio.webm");

    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error sending audio to Whisper:", error);
  }
};
