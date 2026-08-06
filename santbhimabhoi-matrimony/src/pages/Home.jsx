import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import bride2Image from '../Images/Bride2.avif'
import { API_BASE_URL } from '../config'
import '../css/home.css'

export default function Home() {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentProfiles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/profiles`)

        if (!response.ok) {
          throw new Error('Failed to load profiles')
        }

        const data = await response.json()

        const recentProfiles = [...data]
          .sort((a, b) => Number(b.id) - Number(a.id))
          .slice(0, 3)

        setProfiles(recentProfiles)
      } catch (error) {
        console.error('Error loading recent profiles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentProfiles()
  }, [])

  const { user } = useSelector((state) => state.registration);
  const firstName = user?.full_name?.split(" ")[0] || "";

  return (
    <>
      <section className="hero-banner">
        <div className="hero-copy">
          <p className="eyebrow">
            {user ? `Welcome back, ${firstName}` : "Trusted community matchmaking"}
          </p>
          <h1>
            {user
              ? `Hello ${firstName}, discover your next match.`
              : "Find your forever with faith, values, and love."}
          </h1>
          <p className="hero-text">
            {user
              ? "Explore exclusive matches, send interest, and manage your profile from your dashboard."
              : "Discover beautifully matched profiles from the Sant Bhima Bhoi community. Meet families, build trust, and begin your journey toward a meaningful marriage."}
          </p>

          <div className="hero-actions">
            {user ? (
              <>
                <Link to="/search" className="primary-btn">Search Matches</Link>
                <Link to={`/profile/${user.id}`} className="secondary-btn">My Profile</Link>
              </>
            ) : (
              <>
                <Link to="/register" className="primary-btn">Register Now</Link>
                <Link to="/login" className="secondary-btn">Login</Link>
              </>
            )}
          </div>
        </div>

        <div className="hero-visual">
          <img src={bride2Image} alt="Wedding couple portrait" />
          <div className="floating-badge">
            <strong>5000+</strong>
            <span>happy families</span>
          </div>
        </div>
      </section>

      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-number">120+</div>
          <span>Brides</span>
        </div>
        <div className="stat-item">
          <div className="stat-number">150+</div>
          <span>Grooms</span>
        </div>
        <div className="stat-item">
          <div className="stat-number">40+</div>
          <span>Widow marriage</span>
        </div>
      </div>

      <section className="community-intro">
        <p className="section-kicker">Our community</p>
        <h2 className="section-title">A respectful, modern matrimony platform</h2>
        <p>
          We bring together families and individuals seeking compatibility, tradition,
          and long-term happiness within the Sant Bhima Bhoi community.
        </p>
      </section>

      <section className="profile-section" id="profiles">
        <div className="section-heading">
          <p className="section-kicker">Featured profiles</p>
          <h2 className="section-title">Latest matches</h2>
        </div>

        {loading ? (
          <div className="loading-text">Loading recent profiles...</div>
        ) : (
          <div className="card-grid">
            {profiles.map((profile) => (
              <article className="profile-card" key={profile.id}>
                <div className="profile-image-wrap">
                  <img src={profile.image_url || bride2Image} alt={profile.full_name} />
                  <span className="profile-tag">{profile.sex === 'Female' ? 'Bride' : 'Groom'}</span>
                </div>
                <div className="profile-info">
                  <h3>{profile.full_name}</h3>
                  <p>{profile.age} years • {profile.address || 'Location not added'}</p>
                  <Link to={`/profile/${profile.id}`} className="primary-btn small-btn">View Profile</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="testimonials">
        <div className="section-heading centered">
          <p className="section-kicker">Success stories</p>
          <h2 className="section-title">Families who found their forever</h2>
        </div>

        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>
              “The platform helped us connect with a respectful family and the process was smooth,
              transparent, and full of warmth.”
            </p>
            <strong>— Niharika & Ashok</strong>
          </div>

          <div className="testimonial-card">
            <p>
              “We appreciated the community-first approach and the easy communication process.
              It felt safe and genuine from the beginning.”
            </p>
            <strong>— Supriya & Debashis</strong>
          </div>

          <div className="testimonial-card">
            <p>
              “The profile quality and family guidance were excellent. We found a perfect match with
              shared values and understanding.”
            </p>
            <strong>— Manisha & Ranjan</strong>
          </div>
        </div>
      </section>
    </>
  )
}