import { useNavigate } from "react-router-dom";
import "./../css/about.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <section className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <span className="section-kicker">About Us</span>
        <h1>Sant Bhima Bhoi Matrimony</h1>
        <p className="hero-text">
          Bringing families together through trust, tradition, and meaningful relationships.
        </p>
      </div>

      {/* Story & Mission Section */}
      <div className="about-container">
        <div className="about-card">
          <div className="card-badge">Our Journey</div>
          <h2>Our Story</h2>
          <p>
            Sant Bhima Bhoi Matrimony is a dedicated platform created to help
            members of the Sant Bhima Bhoi community find compatible life
            partners. Our goal is to make the matchmaking process simple,
            secure, and transparent while respecting our traditions and values.
          </p>
        </div>

        <div className="about-card">
          <div className="card-badge">Our Purpose</div>
          <h2>Our Mission</h2>
          <p>
            We believe every individual deserves a trusted platform where
            families can connect confidently. Our mission is to strengthen our
            community by helping people build lifelong relationships grounded in mutual respect.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-section">
        <span className="section-kicker center">Features</span>
        <h2>Why Choose Us?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon">❤️</div>
            <h3>Trusted Profiles</h3>
            <p>Verified members and secure profile management for absolute safety.</p>
          </div>

          <div className="feature-card">
            <div className="icon">👨‍👩‍👧</div>
            <h3>Family Values</h3>
            <p>Connect with families sharing similar traditions and cultural values.</p>
          </div>

          <div className="feature-card">
            <div className="icon">🔒</div>
            <h3>Privacy First</h3>
            <p>Your personal information and contacts remain 100% safe and controlled.</p>
          </div>

          <div className="feature-card">
            <div className="icon">💍</div>
            <h3>Easy Matchmaking</h3>
            <p>Filter, search, and find your ideal life partner with ease and speed.</p>
          </div>
        </div>
      </div>

      {/* Vision Card */}
      <div className="vision-section">
        <div className="vision-card">
          <h2>Our Vision</h2>
          <p>
            To become the most trusted matrimony platform for the Sant Bhima
            Bhoi community by connecting people with honesty, transparency,
            and modern technology while preserving our rich culture and traditions.
          </p>
        </div>
      </div>

      {/* Call to Action Bar */}
      <div className="about-cta">
        <h2>Ready to Find Your Life Partner?</h2>
        <p>Join hundreds of families finding meaningful connections today.</p>
        <button className="cta-btn" onClick={() => navigate("/search")}>
          Browse Profiles
        </button>
      </div>
    </section>
  );
}