import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { label: "Product", href: "#product" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "About", href: "#about" }
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="landing-nav">
      <Link to="/" className="landing-logo" aria-label="Mind Meet AI home">
        Mind Meet
      </Link>

      <nav className="landing-nav-links" aria-label="Landing navigation">
        {links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
        <Link to="/dashboard" className="landing-nav-cta">
          Try now
        </Link>
      </nav>

      <button
        className="landing-menu-button"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open ? (
        <nav className="landing-mobile-menu" aria-label="Mobile landing navigation">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <Link to="/dashboard" onClick={() => setOpen(false)}>
            Try now
          </Link>
        </nav>
      ) : null}
    </header>
  );
};
