import { Mic, Radio, Square } from "lucide-react";
import { useState } from "react";
import { ErrorState } from "../components/ErrorState";
import { TranscriptPanel } from "../components/TranscriptPanel";
import { useLiveMeeting } from "../hooks/useLiveMeeting";

export const LiveMeetingPage = () => {
  const [title, setTitle] = useState("");
  const {
    meeting,
    segments,
    status,
    error,
    start,
    stop,
    liveMeetingEnabled,
    transcriptionMode
  } = useLiveMeeting();
  const recording = ["starting", "recording"].includes(status);

  return (
    <div className="live-page">
      <header className="page-heading">
        <div>
          <span className="workspace-kicker">Real-time diarization</span>
          <h1 className="workspace-title">Live meeting</h1>
          <p className="workspace-description">Capture decisions and commitments as the conversation unfolds.</p>
        </div>
        <div className={`live-indicator ${recording ? "is-recording" : ""}`}>
          <i />
          {recording ? "Recording" : "Standby"}
        </div>
      </header>

      <div className="live-layout">
        <section className="workspace-panel live-control-panel">
          <div className="live-symbol"><Radio size={34} strokeWidth={1.2} /></div>
          <h2>Session control</h2>
          <p>Microphone audio streams securely to the live transcription engine.</p>

          {error ? <ErrorState message={error} /> : null}

          <label className="field-group">
            <span>Meeting title</span>
            <input
              className="workspace-input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Live product standup"
            />
          </label>

          <div className="live-actions">
            <button className="workspace-button" onClick={() => start(title)} disabled={recording || !liveMeetingEnabled}>
              <Mic size={18} /> Start
            </button>
            <button className="workspace-button secondary" onClick={stop} disabled={!recording}>
              <Square size={17} /> Stop
            </button>
          </div>

          <div className="session-status">
            <span>Status</span>
            <strong>{status}</strong>
            {transcriptionMode ? <small>{transcriptionMode}</small> : null}
            {meeting?.id ? <small>{meeting.id}</small> : null}
          </div>
        </section>
        <TranscriptPanel segments={segments} />
      </div>
    </div>
  );
};
