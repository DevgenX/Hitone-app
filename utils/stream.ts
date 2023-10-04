import { ScriptContent } from "@/components/CreateScript";

export const generateScript = async (apiKey: string, prompt: ScriptContent) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a very experienced and famous script writer, write a script based on user input and make it very professional and accurate to what the user input.",
        },
        { role: "user", content: prompt.value },
      ],
      max_tokens: 120,
      temperature: 0.0,
      stream: true,
    }),
  });

  if (!response.ok) {
    return;
  }

  const responseData = await response.json();

  if (responseData && responseData.choices && responseData.choices[0].message) {
    return responseData.choices[0].message.content;
  }
};
