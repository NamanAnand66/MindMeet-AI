import { CheckSquare } from "lucide-react";

export const ActionItemsTable = ({ items = [] }) => (
  <section className="workspace-panel action-panel">
    <header className="panel-heading">
      <div>
        <span className="workspace-kicker">Commitment detection</span>
        <h2>Action items</h2>
      </div>
      <span className="count-chip">{String(items.length).padStart(2, "0")}</span>
    </header>
    <div className="action-list">
      {items.map((item) => (
        <article key={item.id || item.task} className="action-row">
          <CheckSquare size={19} strokeWidth={1.4} />
          <div className="action-task">
            <strong>{item.task}</strong>
            <span>{item.owner} · {item.deadline}</span>
          </div>
          <span className="action-priority">{item.priority}</span>
          <span className="action-status">{item.status}</span>
        </article>
      ))}
      {items.length === 0 ? <p className="empty-copy">No action items detected in this meeting.</p> : null}
    </div>
  </section>
);
