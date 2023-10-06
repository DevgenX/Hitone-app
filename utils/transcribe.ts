export const sendAudioToWhisper = async (audioFile: Blob) => {
  try {
    const formData = new FormData();
    formData.append("audio", audioFile);

    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer YOUR_WHISPER_API_KEY",
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Whisper API response:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending audio to Whisper:", error);
  }
};
