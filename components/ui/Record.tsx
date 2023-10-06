import { FC, useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { sendAudioToWhisper } from "@/utils/stream";
import styles from "../../styles/RecordingModal.module.css";

interface RecordProps {}

const Record: FC<RecordProps> = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob>();
  const [transcript, setTranscript] = useState<string>("");

  const blobToAudioFile = (blob: Blob) => {
    const audioFile = new File([blob], "recorded-audio.webm", {
      type: "audio/webm",
    });
    return audioFile;
  };

  const onRecordingComplete = async (blob: Blob) => {
    const audioFile = blobToAudioFile(blob);
    setAudioBlob(audioFile);

    console.log(blob);

    // await sendAudioToWhisper(blob);
  };

  return (
    <div className="text-center">
      <div className="flex justify-center p-3">
        <AudioRecorder
          onRecordingComplete={(blob) => {
            onRecordingComplete(blob);
          }}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          downloadOnSavePress={false}
          downloadFileExtension="webm"
          showVisualizer={true}
          classes={{
            AudioRecorderClass: styles["play-button"],
            AudioRecorderStartSaveClass: styles["custom-start-save-button"],
            AudioRecorderTimerClass: styles["custom-timer"],
            AudioRecorderStatusClass: styles["custom-status"],
            AudioRecorderPauseResumeClass: styles["custom-pause-resume-button"],
            AudioRecorderDiscardClass: styles["custom-discard-button"],
          }}
        />
      </div>
      {audioBlob && (
        <div>
          <p>Performing analytics on recording...</p>
          <audio src={URL.createObjectURL(audioBlob)} controls />
        </div>
      )}
    </div>
  );
};

export default Record;
