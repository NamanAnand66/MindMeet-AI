import { AlertTriangle } from "lucide-react";

export const ErrorState = ({ message }) => (
  <div className="error-state">
    <AlertTriangle size={18} />
    <span>{message}</span>
  </div>
);
