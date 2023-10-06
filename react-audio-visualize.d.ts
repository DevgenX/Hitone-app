// react-audio-visualize.d.ts

declare module "react-audio-visualize" {
  import React from "react";

  interface LiveAudioVisualizerProps {
    mediaRecorder: MediaRecorder | undefined;
    width?: number;
    height?: number;
    barWidth?: number;
    fftSize?: number;
    gap?: number;
    maxDecibels?: number;
    minDecibels?: number;
    smoothingTimeConstant?: number;
  }

  export const LiveAudioVisualizer: React.FC<LiveAudioVisualizerProps>;
}
