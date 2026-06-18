import { useEffect, useRef, useState } from "react";
import { createMeetingSocket } from "../services/socket";

export const useLiveMeeting = () => {
  const socketRef = useRef(null);
  const recorderRef = useRef(null);
  const [meeting, setMeeting] = useState(null);
  const [segments, setSegments] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const socket = createMeetingSocket();
    socketRef.current = socket;

    socket.on("live_meeting_started", ({ meeting: liveMeeting }) => {
      setMeeting(liveMeeting);
      setStatus("recording");
      if (recorderRef.current?.state === "inactive") {
        recorderRef.current.start(250);
      }
    });
    socket.on("live_transcript", ({ segment }) => {
      setSegments((current) => (segment.isFinal ? [...current, segment] : current));
    });
    socket.on("live_meeting_ended", ({ meeting: completedMeeting }) => {
      setMeeting(completedMeeting);
      setStatus("completed");
    });
    socket.on("live_error", ({ message }) => {
      recorderRef.current?.stop?.();
      recorderRef.current?.stream?.getTracks()?.forEach((track) => track.stop());
      setError(message);
      setStatus("error");
    });

    return () => {
      recorderRef.current?.stream?.getTracks()?.forEach((track) => track.stop());
      socket.disconnect();
    };
  }, []);

  const start = async (title) => {
    setError("");
    setSegments([]);
    setStatus("starting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const supportedMimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";
      const recorder = new MediaRecorder(stream, { mimeType: supportedMimeType });
      recorderRef.current = recorder;

      recorder.ondataavailable = async (event) => {
        if (event.data.size > 0 && socketRef.current?.connected) {
          socketRef.current.emit("audio_chunk", await event.data.arrayBuffer());
        }
      };
      recorder.onstop = () => {
        socketRef.current?.emit("end_live_meeting");
      };

      socketRef.current.connect();
      socketRef.current.emit("start_live_meeting", { title });
    } catch (startError) {
      const permissionDenied = startError?.name === "NotAllowedError";
      setError(
        permissionDenied
          ? "Microphone permission was denied. Allow microphone access in your browser and try again."
          : startError.message || "Unable to start the live meeting."
      );
      setStatus("error");
    }
  };

  const stop = () => {
    recorderRef.current?.stop();
    recorderRef.current?.stream?.getTracks()?.forEach((track) => track.stop());
    setStatus("finalizing");
  };

  return { meeting, segments, status, error, start, stop };
};
