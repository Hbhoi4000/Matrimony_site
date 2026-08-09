import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecentProfiles } from "../slice/profileSlice";
import { fetchTestimonials, addTestimonial } from "../slice/testimonialSlice";
import bride2Image from "../Images/Bride2.avif";
import "../css/home.css";

export default function Home() {
  const dispatch = useDispatch();

  // --- Selectors from Redux Store ---
  const { recentProfiles: profiles, loading: loadingProfiles } = useSelector(
    (state) => state.profiles
  );
  const { items: testimonials, loading: loadingTestimonials, submitting } = useSelector(
    (state) => state.testimonials
  );
  const reduxUser = useSelector((state) => state.login?.user);

  const user = reduxUser?.user || reduxUser;
  const firstName = user?.full_name ? user.full_name.split(" ")[0] : "";

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    quote: "",
    couple_name: "",
    marriage_date: "",
  });

  // Fetch profiles & testimonials on component mount via Redux
  useEffect(() => {
    dispatch(fetchRecentProfiles());
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const result = await dispatch(addTestimonial(formData));

    if (addTestimonial.fulfilled.match(result)) {
      setFormData({ quote: "", couple_name: "", marriage_date: "" });
      setIsModalOpen(false);
      alert("Thank you! Your story has been submitted.");
    } else {
      alert("Error posting story. Please try again.");
    }
  };

  return (
    <div className="home-container">
      {/* --- HERO SECTION --- */}
      <section className="hero-banner">
        <div className="hero-copy">
          <p className="eyebrow">
            {user ? `Welcome back, ${firstName}` : "Trusted Community Matchmaking"}
          </p>
          <h1>
            {user
              ? `Hello ${firstName}, discover your perfect match today.`
              : "Find your forever with faith, values, and love."}
          </h1>
          <p className="hero-text">
            {user
              ? "Explore exclusive verified matches, send expressions of interest, and connect directly from your personal dashboard."
              : "Discover beautifully matched profiles from the Sant Bhima Bhoi community. Meet families, build trust, and begin your journey toward a blissful marriage."}
          </p>

          <div className="hero-actions">
            {user ? (
              <>
                <Link to="/search" className="btn btn-primary">
                  Search Matches
                </Link>
                <Link to={`/profile/${user?.id}`} className="btn btn-secondary">
                  My Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary">
                  Register Free
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="hero-visual">
          <div className="image-frame">
            <img src={bride2Image} alt="Wedding Couple" />
          </div>
          <div className="floating-badge">
            <strong>5000+</strong>
            <span>Happy Families Connected</span>
          </div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="stats-bar-wrapper">
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number">120+</div>
            <span className="stat-label">Brides</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">150+</div>
            <span className="stat-label">Grooms</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">40+</div>
            <span className="stat-label">Widow Remarriages</span>
          </div>
        </div>
      </section>

      {/* --- COMMUNITY INTRO --- */}
      <section className="community-intro">
        <p className="section-kicker">Our Blessed Community</p>
        <h2 className="section-title">A Respectful, Modern Matrimony Platform</h2>
        <div className="title-underline"></div>
        <p className="community-desc">
          We bring together families and individuals seeking true compatibility, rich cultural traditions,
          and long-term happiness within the Sant Bhima Bhoi community.
        </p>
      </section>

      {/* --- RECENT PROFILES FROM REDUX --- */}
      <section className="profile-section" id="profiles">
        <div className="section-heading">
          <p className="section-kicker">Featured Profiles</p>
          <h2 className="section-title">Recent Matches</h2>
          <div className="title-underline"></div>
        </div>

        {loadingProfiles ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading curated profiles...</p>
          </div>
        ) : (
          <div className="card-grid">
            {profiles.map((profile) => (
              <article className="profile-card" key={profile.id}>
                <div className="profile-image-wrap">
                  <img
                    src={profile.image_url || bride2Image}
                    alt={profile.full_name || "Profile"}
                  />
                  <span
                    className={`profile-tag ${
                      profile.sex?.toLowerCase() === "female" ? "tag-bride" : "tag-groom"
                    }`}
                  >
                    {profile.sex === "Female" ? "Bride" : "Groom"}
                  </span>
                </div>
                <div className="profile-info">
                  <h3>{profile.full_name}</h3>
                  <p className="profile-meta">
                    {profile.age ? `${profile.age} yrs` : "Age N/A"} •{" "}
                    {profile.address || "Location not specified"}
                  </p>
                  <Link to={`/profile/${profile.id}`} className="btn btn-outline btn-full">
                    View Full Profile
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* --- TESTIMONIALS FROM REDUX --- */}
      <section className="testimonials">
        <div className="section-heading centered">
          <p className="section-kicker">Blessed Connections</p>
          <h2 className="section-title">Families Who Found Their Forever</h2>
          <div className="title-underline centered-line"></div>
          <button
            className="btn btn-primary share-story-btn"
            onClick={() => setIsModalOpen(true)}
          >
            + Share Your Success Story
          </button>
        </div>

        {loadingTestimonials ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading success stories...</p>
          </div>
        ) : (
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <div className="testimonial-card" key={item.id || item._id}>
                <div className="quote-icon">“</div>
                <p className="testimonial-quote">{item.quote}</p>
                <div className="testimonial-author">
                  <strong>{item.couple_name}</strong>
                  <span>{item.marriage_date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- MODAL FORM --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h3>Share Your Matrimony Experience</h3>
            <p className="modal-subtitle">Inspire other families in our community</p>

            <form onSubmit={handleSubmitComment} className="comment-form">
              <div className="form-group">
                <label>Couple Names</label>
                <input
                  type="text"
                  name="couple_name"
                  placeholder="e.g. Niharika & Ashok"
                  value={formData.couple_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Marriage Month & Year</label>
                <input
                  type="text"
                  name="marriage_date"
                  placeholder="e.g. Married Oct 2024"
                  value={formData.marriage_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Your Message / Review</label>
                <textarea
                  name="quote"
                  rows="4"
                  placeholder="Share your matchmaking experience..."
                  value={formData.quote}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Success Story"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}