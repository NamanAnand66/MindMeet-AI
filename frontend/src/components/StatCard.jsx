export const StatCard = ({ label, value, detail, index = "01" }) => (
  <section className="workspace-panel stat-card">
    <div className="stat-card-topline">
      <span>{label}</span>
      <i>{index}</i>
    </div>
    <p className="stat-value">{value}</p>
    {detail ? <p className="stat-detail">{detail}</p> : null}
  </section>
);
