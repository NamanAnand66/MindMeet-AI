import { FileAudio, UploadCloud } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorState } from "../components/ErrorState";
import { uploadRecording } from "../services/api";
import { getApiErrorMessage } from "../utils/apiError";

export const UploadPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("idle");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    setProgress(0);
    setPhase("uploading");
    try {
      const meeting = await uploadRecording({
        title,
        file,
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;
          const nextProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(nextProgress);
          if (nextProgress >= 100) setPhase("processing");
        }
      });
      navigate(`/meetings/${meeting.id}`);
    } catch (uploadError) {
      setError(getApiErrorMessage(uploadError, "Unable to process this recording."));
      setPhase("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <header className="page-heading">
        <div>
          <span className="workspace-kicker">Batch intelligence</span>
          <h1 className="workspace-title">Analyze a recording</h1>
          <p className="workspace-description">Transform an existing conversation into structured knowledge.</p>
        </div>
        <FileAudio size={28} strokeWidth={1.3} />
      </header>

      <form onSubmit={submit} className="workspace-panel upload-panel">
        {error ? <ErrorState message={error} /> : null}

        <label className="field-group">
          <span>Meeting title</span>
          <input
            className="workspace-input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Sprint planning, customer call, design review"
          />
        </label>

        <label className={`upload-dropzone ${file ? "has-file" : ""}`}>
          <UploadCloud size={34} strokeWidth={1.3} />
          <strong>{file ? file.name : "Choose your recording"}</strong>
          <span>MP3, WAV, or M4A · up to 50 MB</span>
          <input
            className="sr-only"
            type="file"
            accept=".mp3,.wav,.m4a,audio/*"
            required
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
        </label>

        <div className="upload-footer">
          <div className="upload-progress-copy">
            <p>
              {phase === "uploading"
                ? `Uploading recording · ${progress}%`
                : phase === "processing"
                  ? "Transcribing and generating intelligence. Keep this tab open."
                  : "Securely stored, transcribed, summarized, and indexed."}
            </p>
            {loading ? <div className="upload-progress-track"><span style={{ width: `${Math.max(progress, 4)}%` }} /></div> : null}
          </div>
          <button className="workspace-button" disabled={!file || loading}>
            {phase === "uploading"
              ? `Uploading ${progress}%`
              : phase === "processing"
                ? "Processing meeting..."
                : "Generate intelligence"}
          </button>
        </div>
      </form>
    </div>
  );
};
