import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { FloatingCard } from "./FloatingCard";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=85",
    alt: "A collaborative team in a bright studio",
    className: "photo-one",
    label: "Ideas, captured"
  },
  {
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=85",
    alt: "Colleagues gathered around a meeting table",
    className: "photo-two"
  },
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85",
    alt: "Modern creative office interior",
    className: "photo-three",
    label: "Context, preserved"
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=85",
    alt: "Team discussing work around a table",
    className: "photo-four"
  },
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85",
    alt: "Premium collaborative workspace",
    className: "photo-five",
    label: "Every voice matters"
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=85",
    alt: "People collaborating in a workshop",
    className: "photo-six"
  }
];

export const Hero = () => (
  <section className="landing-hero" id="product">
    <div className="landing-grain" aria-hidden="true" />

    <div className="floating-gallery">
      {photos.map((photo) => (
        <FloatingCard key={photo.className} {...photo} />
      ))}
    </div>

    <span className="hero-accent" aria-hidden="true">
      mm
    </span>

    <div className="hero-content">
      <p className="hero-kicker">Meeting intelligence for thoughtful teams</p>
      <h1>
        Mind Meet
        <span>AI</span>
      </h1>
      <p className="hero-description">
        Turn every conversation into clear decisions, accountable next steps, and knowledge your team can
        actually find again.
      </p>
      <Link to="/dashboard" className="hero-cta">
        Try now
        <ArrowUpRight size={20} strokeWidth={1.8} />
      </Link>
    </div>

    <div className="hero-scroll">
      <span>Discover</span>
      <ChevronDown size={16} />
    </div>

    <div className="hero-progress" aria-hidden="true">
      <span className="active" />
      <i />
      <span />
      <span />
    </div>
  </section>
);
