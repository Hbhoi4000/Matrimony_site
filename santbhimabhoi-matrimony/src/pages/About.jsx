import "./../css/about.css";

export default function About() {
  return (
    <section className="about-page">

      {/* Hero */}
      <div className="about-hero">
        <p className="section-kicker">About Us</p>
        <h1>Sant Bhima Bhoi Matrimony</h1>
        <p className="hero-text">
          Bringing families together through trust, tradition, and meaningful
          relationships.
        </p>
      </div>

      {/* Story */}
      <div className="about-container">

        <div className="about-card">
          <h2>Our Story</h2>
          <p>
            Sant Bhima Bhoi Matrimony is a dedicated platform created to help
            members of the Sant Bhima Bhoi community find compatible life
            partners. Our goal is to make the matchmaking process simple,
            secure, and transparent while respecting our traditions and values.
          </p>
        </div>

        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            We believe every individual deserves a trusted platform where
            families can connect confidently. Our mission is to strengthen our
            community by helping people build lifelong relationships.
          </p>
        </div>

      </div>

      {/* Features */}
      <div className="features-section">

        <h2>Why Choose Us?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="icon">❤️</div>
            <h3>Trusted Profiles</h3>
            <p>Verified members and secure profile management.</p>
          </div>

          <div className="feature-card">
            <div className="icon">👨‍👩‍👧</div>
            <h3>Family Values</h3>
            <p>Connect with families sharing similar traditions.</p>
          </div>

          <div className="feature-card">
            <div className="icon">🔒</div>
            <h3>Privacy First</h3>
            <p>Your personal information remains safe and secure.</p>
          </div>

          <div className="feature-card">
            <div className="icon">💍</div>
            <h3>Easy Matchmaking</h3>
            <p>Find your perfect life partner with ease.</p>
          </div>

        </div>

      </div>

      {/* Vision */}
      <div className="vision-card">
        <h2>Our Vision</h2>

        <p>
          To become the most trusted matrimony platform for the Sant Bhima
          Bhoi community by connecting people with honesty, transparency,
          and modern technology while preserving our culture and traditions.
        </p>
      </div>

    </section>
  );
}