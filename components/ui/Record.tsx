import React, { useState, useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { LiveAudioVisualizer } from "react-audio-visualize";

import { sendAudioToWhisper } from "@/utils/stream";
import Analytics from "./Analytics";
import Icons from "./Icons";
import Loading from "./Loading";

const Record = () => {
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();

  const [isStarted, setIsStarted] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcriptedData, setTranscriptedData] = useState<string | null>(null);
  const [result, setResults] = useState<string>("");
  const [recordAgain, setIsRecordAgain] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStartRecording = () => {
    startRecording();
    setIsStarted(true);
  };

  const handlePauseResume = () => {
    togglePauseResume();
  };

  const handleStopRecording = () => {
    stopRecording();
    setIsStarted(false);
  };

  useEffect(() => {
    if (recordingBlob) {
      setAudioBlob(recordingBlob);
    }
  }, [recordingBlob]);

  useEffect(() => {
    if (audioBlob) {
      const convertAndSend = async () => {
        const transcripted = await sendAudioToWhisper(audioBlob);
        setTranscriptedData(transcripted);
      };
      convertAndSend();
    }
  }, [audioBlob]);

  const handleGenerateFeedback = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: transcriptedData }),
      });
      if (!response.ok) {
        setIsLoading(false);
        throw new Error(response.statusText);
      }
      setIsLoading(false);

      const data = await response.json();

      if (!data) {
        return;
      }

      setTranscriptedData(data);
    } catch (error) {
      console.error("Error generating script:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecordAgain = () => {
    setIsRecordAgain(true);
    setAudioBlob(null);
    setIsStarted(true);
  };

  return (
    <div className="border border-slate-00">
      <div className="p-5">
        {isRecording ? (
          isPaused ? (
            "Recording is paused"
          ) : (
            "You are recording"
          )
        ) : (
          <h1>Start Recording</h1>
        )}
      </div>

      {isStarted ? (
        <div className="flex flex-col justify-center items-center mt-20">
          {mediaRecorder && (
            <LiveAudioVisualizer
              mediaRecorder={mediaRecorder}
              barWidth={2}
              gap={2}
              width={140}
              height={40}
              fftSize={512}
              maxDecibels={-10}
              minDecibels={-80}
              smoothingTimeConstant={0.4}
            />
          )}
          <p>Recording Time: {recordingTime} seconds</p>
          <div className="flex mt-5">
            <div className="mr-5">
              <button onClick={handlePauseResume}>
                {isPaused ? <Icons name="resume" /> : <Icons name="pause" />}
              </button>
            </div>
            <div>
              <button onClick={handleStopRecording}>
                <Icons name="stop" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button className="mt-20" onClick={handleStartRecording}>
          <Icons name="mic" />
        </button>
      )}

      {(audioBlob || !recordAgain) && (
        <div className="flex flex-col">
          <div className="p-2">
            <button className="" onClick={handleGenerateFeedback}>
              Get feedback
            </button>
          </div>
          <button className="" onClick={handleRecordAgain}>
            Record again
          </button>
        </div>
      )}

      <div className="flex justify-center mt-20 p-5">
        {audioBlob && (
          <div>
            <audio
              src={URL.createObjectURL(audioBlob)}
              controls
              className="m-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Record;
