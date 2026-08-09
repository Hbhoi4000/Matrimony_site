import { useNavigate } from "react-router-dom";
import { FaUserCheck, FaRing, FaShieldAlt, FaHeart } from "react-icons/fa";
import "../css/landing.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">#1 Matrimony for Sant Bhima Bhoi Community</span>
          <h1>Where Traditional Values Meet Modern Connections</h1>
          <p>
            Connect with millions of verified profiles and find your perfect life partner in a safe & private environment.
          </p>

          {/* Search Box Card */}
          <div className="quick-search-card">
            <div className="search-group">
              <label>I'm looking for a</label>
              <select className="search-input">
                <option value="bride">Woman (Bride)</option>
                <option value="groom">Man (Groom)</option>
              </select>
            </div>

            <div className="search-group">
              <label>Aged Between</label>
              <div className="age-range">
                <select className="search-input">
                  <option>20</option>
                  <option selected>21</option>
                  <option>22</option>
                  <option>23</option>
                </select>
                <span>to</span>
                <select className="search-input">
                  <option>28</option>
                  <option selected>30</option>
                  <option>32</option>
                  <option>35</option>
                </select>
              </div>
            </div>

            <button className="btn-search-hero" onClick={() => navigate("/register")}>
              Find Matches
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <div className="trust-bar">
        <div className="trust-item">
          <FaShieldAlt className="trust-icon" /> 100% Privacy Protection
        </div>
        <div className="trust-item">
          <FaUserCheck className="trust-icon" /> Govt ID Verified Members
        </div>
        <div className="trust-item">
          <FaRing className="trust-icon" /> 10,000+ Happy Marriages
        </div>
      </div>

      {/* Feature Highlights */}
      <section className="features-container">
        <div className="section-title">
          <h2>Why Choose Bhoi Milan Matrimony?</h2>
          <p>Designed to help you find your soulmate with complete peace of mind.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="icon-wrapper">
              <FaUserCheck />
            </div>
            <h3>Verified Profiles</h3>
            <p>Every profile undergoes strict phone and background verification process.</p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper">
              <FaShieldAlt />
            </div>
            <h3>Control Your Privacy</h3>
            <p>Manage who views your profile photos, contact details, and interests.</p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper">
              <FaHeart />
            </div>
            <h3>Smart Matchmaking</h3>
            <p>Advanced filters based on community, education, occupation, and family values.</p>
          </div>
        </div>
      </section>

      {/* CTA Footer Card */}
      <section className="cta-banner">
        <div className="cta-box">
          <h2>Your Journey to Togetherness Begins Here</h2>
          <p>Create a free profile today and start browsing matches in your community.</p>
          <div className="cta-buttons">
            <button className="btn-cta-primary" onClick={() => navigate("/register")}>
              Register Free Now
            </button>
            <button className="btn-cta-secondary" onClick={() => navigate("/login")}>
              Login to Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}