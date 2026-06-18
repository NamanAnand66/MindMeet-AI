import { Calendar, Clock3, FileText, Sparkles } from "lucide-react";
import { useParams } from "react-router-dom";
import { ActionItemsTable } from "../components/ActionItemsTable";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { TranscriptPanel } from "../components/TranscriptPanel";
import { useAsync } from "../hooks/useAsync";
import { getMeeting } from "../services/api";
import { formatDate, formatSeconds } from "../utils/format";

const SummaryList = ({ title, items = [] }) => (
  <div className="summary-block">
    <h3>{title}</h3>
    <ul>
      {items.length ? items.map((item) => <li key={item}>{item}</li>) : <li>Not mentioned</li>}
    </ul>
  </div>
);

export const MeetingDetailsPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useAsync(() => getMeeting(id), [id]);

  if (loading) return <LoadingState label="Loading meeting intelligence" />;
  if (error) return <ErrorState message={error} />;

  const summary = data.summaries?.[0]?.content ?? {};
  const transcriptSegments = data.transcripts?.[0]?.segments ?? [];

  return (
    <div className="meeting-page">
      <section className="workspace-panel meeting-hero">
        <div>
          <span className="workspace-kicker">{data.source} intelligence</span>
          <h1>{data.title}</h1>
        </div>
        <div className="meeting-meta">
          <span><Sparkles size={14} /> {data.status}</span>
          <span><Clock3 size={14} /> {formatSeconds(data.duration_seconds)}</span>
          <span><Calendar size={14} /> {formatDate(data.created_at)}</span>
        </div>
      </section>

      <div className="meeting-layout">
        <TranscriptPanel segments={transcriptSegments} />
        <section className="workspace-panel summary-panel">
          <header className="panel-heading">
            <div>
              <span className="workspace-kicker">Generated intelligence</span>
              <h2>Executive summary</h2>
            </div>
            <FileText size={20} />
          </header>
          <div className="summary-grid">
            <SummaryList title="Key decisions" items={summary.keyDecisions} />
            <SummaryList title="Discussion points" items={summary.discussionPoints} />
            <SummaryList title="Blockers" items={summary.blockers} />
            <SummaryList title="Next steps" items={summary.nextSteps} />
          </div>
        </section>
      </div>

      <ActionItemsTable items={data.action_items ?? []} />
    </div>
  );
};
