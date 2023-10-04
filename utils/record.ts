import RecordRTC from "recordrtc";

let mediaRecorder: any;

export const startRecording = async () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Your browser does not support audio recording.");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new RecordRTC(stream, {
      type: "audio",
      recorderType: RecordRTC.StereoAudioRecorder,
      mimeType: "audio/wav",
    });

    mediaRecorder.startRecording();
    return true;
  } catch (error) {
    return false;
  }
};

export const stopRecording = async () => {
  if (mediaRecorder) {
    await mediaRecorder.stopRecording();
    let blob = await mediaRecorder.getBlob();
    return { stopped: true, audioBlob: blob };
  }

  return { stopped: false };
};
