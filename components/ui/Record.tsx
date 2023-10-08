import React, { useState, useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { LiveAudioVisualizer } from "react-audio-visualize";

import { sendAudioToWhisper } from "@/utils/stream";
import { convertToSupportedFormat } from "@/utils/stream";

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
  const [transcriptedData, setTranscriptedData] = useState<string | null>(null);
  const [mp3File, setMp3File] = useState<Blob | null>(null);

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

  // const getTranscriptedData = async (blob: Blob) => {
  //   const formData = new FormData();
  //   formData.append("audio", blob, "recorded-audio.webm");

  //   try {
  //     const response = await fetch("/api/convert-audio", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       // Check if the response is an audio file
  //       const contentType = response.headers.get("Content-Type");
  //       if (contentType && contentType.startsWith("audio/")) {
  //         const mp3Data = await response.blob();
  //         setMp3File(mp3Data);
  //       } else {
  //         console.log("Received unexpected response:", contentType);
  //       }
  //     } else {
  //       console.log("Request failed with status:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const getConvertedBlobToMp3 = async (blob: Blob) => {
    const mp3File = await convertToSupportedFormat(blob);
    setMp3File(mp3File);
  };

  useEffect(() => {
    // Do something with recordingBlob when recording is complete
    if (recordingBlob) {
      setAudioBlob(recordingBlob);
      sendAudioToWhisper(recordingBlob);
      // getConvertedBlobToMp3(recordingBlob);

      // const convertAndSend = async () => {
      //   try {
      //     setAudioBlob(recordingBlob);
      //     // const convertedBlobToMp3 = await convertToSupportedFormat(
      //     //   recordingBlob
      //     // );
      //     // const getTranscriptData = await sendAudioToWhisper(
      //     //   convertedBlobToMp3
      //     // );
      //     // if (getTranscriptData) {
      //     //   setTranscriptedData(getTranscriptData);
      //     // }
      //   } catch (error) {
      //     console.log(
      //       "Error converting and sending audio to whisper API",
      //       error
      //     );
      //   }
      // };
      // convertAndSend();
    }
  }, [recordingBlob, audioBlob]);

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
