import {
  Archive,
  BarChart3,
  FileAudio,
  HelpCircle,
  Menu,
  MessageSquare,
  Mic,
  Sparkles,
  X
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/upload", label: "Upload", icon: FileAudio },
  { to: "/live", label: "Live meeting", icon: Mic },
  { to: "/chat", label: "Ask archive", icon: MessageSquare }
];

export const AppShell = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-frame">
      <header className="app-mobile-header">
        <div className="app-wordmark">
          <span>Mind Meet</span>
          <small>AI ACTIVE</small>
        </div>
        <button type="button" onClick={() => setOpen((current) => !current)} aria-label="Toggle navigation">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <aside className={`app-sidebar ${open ? "is-open" : ""}`}>
        <div className="app-brand">
          <span>Mind</span>
          <span>Meet AI</span>
          <small>INTELLIGENCE ONLINE</small>
        </div>

        <NavLink to="/upload" className="new-session" onClick={() => setOpen(false)}>
          <Sparkles size={17} />
          New session
        </NavLink>

        <nav className="app-navigation" aria-label="Application navigation">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `app-nav-link ${isActive ? "is-active" : ""}`}
            >
              <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="app-sidebar-footer">
          <div>
            <Archive size={18} />
            <span>Knowledge secured</span>
          </div>
          <div>
            <HelpCircle size={18} />
            <span>Support</span>
          </div>
        </div>
      </aside>

      {open ? <button className="app-sidebar-scrim" aria-label="Close navigation" onClick={() => setOpen(false)} /> : null}

      <main className="app-main">
        <div className="app-status-bar">
          <span><i /> System online</span>
          <span>Mind Meet intelligence workspace</span>
        </div>
        <div className="app-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
