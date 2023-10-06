import React, { useState, useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { LiveAudioVisualizer } from "react-audio-visualize";

import { sendAudioToWhisper } from "@/utils/stream";

import Icons from "./Icons";

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
  const [audioBlob, setAudioBlob] = useState<Blob>();

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
    // Do something with recordingBlob when recording is complete
    if (recordingBlob) {
      // You can send the recordingBlob to your backend or perform other actions here

      setAudioBlob(recordingBlob);
    }
  }, [recordingBlob]);

  return (
    <div className="border border-slate-00">
      <div>
        <h1 className="m-5 min-w-[300px]">Start Recording</h1>
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
      <div className="flex justify-center mt-20 p-5">
        {audioBlob && (
          <div>
            <audio src={URL.createObjectURL(audioBlob)} controls />
          </div>
        )}
      </div>
    </div>
  );
};

export default Record;
