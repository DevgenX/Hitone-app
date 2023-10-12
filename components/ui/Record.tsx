import React, { useState, useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { LiveAudioVisualizer } from "react-audio-visualize";

import { sendAudioToWhisper } from "@/utils/stream";

import Icons from "./Icons";

import Analytics from "./AnalyticsComponent";

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
  const [analytics, setAnalytics] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

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
    setShowFeedback(true);
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

      const data = await response.json();

      if (!data) {
        return;
      }
      setAnalytics(data);
    } catch (error) {
      console.error("Error generating script:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-slate-500">
      {analytics ? (
        <Analytics analytics={analytics} />
      ) : (
        <>
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
                    {isPaused ? (
                      <Icons name="resume" />
                    ) : (
                      <Icons name="pause" />
                    )}
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

          {showFeedback && (
            <div className="flex flex-col">
              <div className="p-2">
                <button
                  className={
                    isLoading ? "cursor-not-allowed" : "cursor-pointer"
                  }
                  onClick={handleGenerateFeedback}
                  disabled={isLoading}
                >
                  {isLoading ? "Generating feedback..." : "Get feedback"}
                </button>
              </div>
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
        </>
      )}
    </div>
  );
};

export default Record;
