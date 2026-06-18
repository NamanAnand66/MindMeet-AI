import { Activity, BarChart3, Clock3 } from "lucide-react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Link } from "react-router-dom";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { StatCard } from "../components/StatCard";
import { useAsync } from "../hooks/useAsync";
import { getAnalytics } from "../services/api";
import { formatDate, formatSeconds } from "../utils/format";

const colors = ["#f4f4f0", "#a5a5a0", "#737370", "#d5d5d0", "#555552"];

export const DashboardPage = () => {
  const { data, loading, error } = useAsync(getAnalytics, []);

  if (loading) return <LoadingState label="Loading intelligence dashboard" />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="dashboard-page">
      <header className="page-heading">
        <div>
          <span className="workspace-kicker">Workspace overview</span>
          <h1 className="workspace-title">Meeting intelligence</h1>
        </div>
        <Link to="/upload" className="workspace-button">
          New analysis
        </Link>
      </header>

      <div className="stats-grid">
        <StatCard index="01" label="Meetings" value={data.meetingCount} detail="Completed archives" />
        <StatCard index="02" label="Duration" value={formatSeconds(data.totalDurationSeconds)} detail="Recorded intelligence" />
        <StatCard index="03" label="Action completion" value={`${data.actionCompletionRate}%`} detail="Commitments resolved" />
      </div>

      <div className="dashboard-grid">
        <section className="workspace-panel chart-panel">
          <header className="panel-heading">
            <div>
              <span className="workspace-kicker">Voice distribution</span>
              <h2>Speaking time</h2>
            </div>
            <Activity size={20} />
          </header>
          <div className="chart-area">
            {data.speakingTime.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.speakingTime} dataKey="seconds" nameKey="speaker" innerRadius={64} outerRadius={96}>
                    {data.speakingTime.map((_, index) => (
                      <Cell key={index} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#151515", border: "1px solid #383838", borderRadius: 4 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : <p className="empty-copy">Speaking-time distribution will appear after your first processed meeting.</p>}
          </div>
        </section>

        <section className="workspace-panel chart-panel">
          <header className="panel-heading">
            <div>
              <span className="workspace-kicker">Conversation signals</span>
              <h2>Recurring topics</h2>
            </div>
            <BarChart3 size={20} />
          </header>
          <div className="chart-area">
            {data.recurringTopics.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.recurringTopics}>
                  <XAxis dataKey="topic" tick={{ fill: "#8d8d89", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#8d8d89", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#151515", border: "1px solid #383838", borderRadius: 4 }} />
                  <Bar dataKey="count" fill="#deded9" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <p className="empty-copy">Topic frequency will build as your archive grows.</p>}
          </div>
        </section>
      </div>

      <section className="workspace-panel recent-panel">
        <header className="panel-heading">
          <div>
            <span className="workspace-kicker">Archive</span>
            <h2>Recent meetings</h2>
          </div>
          <Clock3 size={20} />
        </header>
        <div className="recent-list">
          {data.recentMeetings.map((meeting) => (
            <Link key={meeting.id} to={`/meetings/${meeting.id}`} className="recent-row">
              <div>
                <strong>{meeting.title}</strong>
                <span>{formatDate(meeting.created_at)}</span>
              </div>
              <span>{meeting.status}</span>
            </Link>
          ))}
          {data.recentMeetings.length === 0 ? <p className="empty-copy">No completed meetings yet.</p> : null}
        </div>
      </section>
    </div>
  );
};
