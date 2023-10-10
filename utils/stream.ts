import { ScriptContent } from "@/components/CreateScript";

const API_KEY: string = "";

const generateMessages = (formData: ScriptContent) => {
  const userMessage = {
    role: "user",
    content: `I'm ${formData.name} and I want to create a short speech about ${formData.purpose} with specific content of ${formData.content} in a given situation of ${formData.situation} with a maximum of ${formData.length} words. Make it as accurate as possible and provide the best speech for me.`,
  };

  const messages = [
    {
      role: "system",
      content: `You are an experienced speech writer that can write for any situation. Write a speech based on the user's request. If the user didn't give a detailed explanation, you can mention his name ${formData.name} and ask for a more detailed input like the ${formData.content} and ${formData.situation}. If the input are empty, you can ask the user to give a more descriptive input so that you can generate a more accurate and tailored speech for the user`,
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
      content: `You are an experienced speech writer that can analyze speech and provide accurate feedback. 
      Rate the user skills up to 100 and give an average out of 100 for all the ratings and provide bulleted feedback. Make it 2nd person view by pointing out directly to the user using "you, your, yours.". But if the content you received has a length of less than 20 words, then you can say that the user should record a more detailed speech so you can provide accurate feedback. You should also consider criticizing if the user uses too much fillers and repetitive when it comes to words. `,
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
    console.log(responseData.choices[0].message.content);
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
