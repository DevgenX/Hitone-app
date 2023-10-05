import { FC, useState } from "react";

import transcribeAudioToText from "../utils/transcribe";
import { startRecording, stopRecording } from "@/utils/record";

interface RecordContent {}

const Record: FC<RecordContent> = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob>();
  const [transcript, setTranscript] = useState<string>("");

  const apiKey = process.env.OPENAI_API_KEY;
  const apiEndPoint = process.env.END_POINT;

  const handleStartRecording = async () => {
    const isRecordStarted = await startRecording();

    if (isRecordStarted) {
      setRecording(true);
    }
  };

  const handleStopRecording = async () => {
    const { stopped, audioBlob } = await stopRecording();

    if (stopped) {
      setRecording(false);
      setAudioBlob(audioBlob);
    }

    if (audioBlob && apiKey && apiEndPoint) {
      const getTranscriptedData = await transcribeAudioToText(
        audioBlob,
        apiKey,
        apiEndPoint
      );

      if (getTranscriptedData) {
        setTranscript(getTranscriptedData);
      }
    }
  };

  return (
    <div>
      <h2>Audio Recording</h2>
      {recording ? (
        <button onClick={handleStopRecording}>Stop Recording</button>
      ) : (
        <button onClick={handleStartRecording}>Start Recording</button>
      )}
      {audioBlob && (
        <div>
          <p>Performing analytics on recording...</p>
        </div>
      )}
    </div>
  );
};

export default Record;
