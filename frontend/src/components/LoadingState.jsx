export const LoadingState = ({ label = "Loading" }) => (
  <div className="workspace-panel loading-state">
    <div className="loading-line" />
    <p>{label}</p>
  </div>
);
