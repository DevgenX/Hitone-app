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
      content: `You are an experienced speech writer that can write for any situation. Write a speech based on the user's request.`,
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
      model: "gpt-4",
      messages,
      max_tokens: 200,
      temperature: 0.5,
    }),
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} - ${response.statusText}`);
  }

  const responseData = await response.json();

  console.log(responseData);

  if (responseData && responseData.choices && responseData.choices[0].message) {
    return responseData.choices[0].message.content;
  }
};
