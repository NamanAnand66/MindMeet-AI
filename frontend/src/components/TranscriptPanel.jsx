import { AudioLines } from "lucide-react";

export const TranscriptPanel = ({ segments = [] }) => (
  <section className="workspace-panel transcript-panel">
    <header className="panel-heading">
      <div>
        <span className="workspace-kicker">Live intelligence</span>
        <h2>Transcript</h2>
      </div>
      <AudioLines size={20} />
    </header>
    <div className="scrollbar-soft transcript-list">
      {segments.length === 0 ? (
        <div className="transcript-empty">
          <AudioLines size={30} strokeWidth={1.2} />
          <p>Transcript segments will appear here.</p>
        </div>
      ) : (
        segments.map((segment) => (
          <article key={segment.id} className="transcript-entry">
            <time>{segment.timestamp}</time>
            <div>
              <p className="speaker-label">{segment.speaker}</p>
              <p>{segment.text}</p>
            </div>
          </article>
        ))
      )}
    </div>
  </section>
);
