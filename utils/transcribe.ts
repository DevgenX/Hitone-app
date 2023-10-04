export default async function transcribeAudioToText(
  audioBlob: Blob,
  apiKey: string,
  apiEndpoint: string
) {
  try {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.mp4");

    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (response.ok) {
      // Parse the response JSON to get the transcription
      const data = await response.json();
      const transcription = data.text;

      return transcription;
    } else {
      throw new Error(
        `Whisper ASR API Error: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    let errorMessage = "Failed to do something exceptional";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(errorMessage);
  }
}
