import { ScriptContent } from "@/components/CreateScript";

const API_KEY: string = "INPUT API KEY";

const generateMessages = (formData: ScriptContent) => {
  const userMessage = {
    role: "user",
    content: `I'm ${formData.name} and I want to create a short speech about ${formData.purpose} with specific content of ${formData.content} in a given situation of ${formData.situation} with a maximum of ${formData.length} words. Make it as accurate as possible and provide the best speech for me.`,
  };

  const messages = [
    {
      role: "system",
      content: `You are a professional script or speech writer that can accurately generate a speech based on the given prompt. If you think the details are not enough, you can ask the user to provide a more descriptive text so you can generate accurate speech based on their needs.`,
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

export const rateSpeech = async (prompt: string | null) => {
  const userMessage = [
    {
      role: "user",
      content: prompt,
    },
    {
      role: "system",
      content: `You are an experienced speech analyst providing detailed feedback on the user's speech. Rate the user's speech skills up to 100 and calculate an average score. Provide specific feedback on the following aspects:\n
      1. Clarity and articulation\n
      2. Feedback and analysis in your response\n
      3. Structure and organization\n
      4. Engagement with the audience\n
      5.Fillers and repetitive words\n
      6. Make suggestions for improvements.\n
      Address the user directly using "you" and "your" in your feedback. Additionally, consider commenting on filler words and repetitive language to help the user improve.\n
      Speech Analysis:\n
      - Clarity and articulation: [score]/100\n
      - Include feedback and analysis in your response: [score]/100\n
      - Structure and organization: [score]/100\n
      - Engagement with the audience: [score]/100\n
      - Point out Fillers and repetitive words: [score]/100\n
      - Make suggestions for improvements: [score]/100\n
      Average Rating: [average score]/100\n
      Feedback:\n`,
    },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: userMessage,
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
  try {
    const formData = new FormData();
    formData.append("file", audioFile, "recorded-audio.webm");
    formData.append("model", "whisper-1");
    formData.append("language", "en");

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

    return responseData.text;
  } catch (error) {
    console.error("Error sending audio to Whisper:", error);
  }
};
