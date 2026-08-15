import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import bride2Image from '../Images/Bride2.avif'
import '../css/home.css'
import { profileApi } from '../api/profiles'
import { LOGIN_ROUTE, REGISTER_ROUTE, profileRoute } from '../constants/routes'

export default function Home() {
  const [profiles, setProfiles] = useState([])
  const [counts, setCounts] = useState(null)
  const [loadingProfiles, setLoadingProfiles] = useState(true)
  const [profilesError, setProfilesError] = useState(null)

  useEffect(() => {
    let isCurrent = true

    async function loadHomeData() {
      try {
        const [profileData, countData] = await Promise.all([
          profileApi.getAll(),
          profileApi.getCounts(),
        ])

        if (!isCurrent) return
        setProfiles(Array.isArray(profileData) ? profileData.slice(0, 3) : [])
        setCounts(countData)
      } catch (error) {
        if (isCurrent) setProfilesError(error.message || 'Unable to load profiles.')
      } finally {
        if (isCurrent) setLoadingProfiles(false)
      }
    }

    loadHomeData()
    return () => { isCurrent = false }
  }, [])

  return (
    <>
      <section className="hero-banner">
        <div className="hero-copy">
          <p className="eyebrow">Trusted community matchmaking</p>
          <h1>Find your forever with faith, values, and love.</h1>
          <p className="hero-text">
            Discover beautifully matched profiles from the Sant Bhima Bhoi community.
            Meet families, build trust, and begin your journey toward a meaningful marriage.
          </p>

          <div className="hero-actions">
            <Link to={REGISTER_ROUTE} className="primary-btn">Register Now</Link>
            <Link to={LOGIN_ROUTE} className="secondary-btn">Login</Link>
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
          <div className="stat-number">{counts?.total_brides ?? '—'}</div>
          <span>Brides</span>
        </div>
        <div className="stat-item">
          <div className="stat-number">{counts?.total_grooms ?? '—'}</div>
          <span>Grooms</span>
        </div>
        <div className="stat-item">
          <div className="stat-number">{counts?.total_window_profiles ?? '—'}</div>
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

        <div className="card-grid">
          {loadingProfiles ? <p className="loading-text">Loading profiles...</p> : null}
          {profilesError ? <p role="alert">Unable to load featured profiles: {profilesError}</p> : null}
          {!loadingProfiles && !profilesError && profiles.length === 0 ? <p>No profiles are available yet.</p> : null}
          {profiles.map((profile) => (
            <article className="profile-card" key={profile.id}>
              <div className="profile-image-wrap">
                {profile.image_url ? <img src={profile.image_url} alt={profile.full_name} /> : <div>Photo unavailable</div>}
                <span className="profile-tag">
                  {profile.sex === 'Female' ? 'Bride' : profile.sex === 'Male' ? 'Groom' : profile.sex}
                </span>
              </div>
              <div className="profile-info">
                <h3>{profile.full_name}</h3>
                <p>{profile.age} years • {profile.address || 'Location not listed'}</p>
                <Link to={profileRoute(profile.id)} className="primary-btn small-btn">View Profile</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <div className="section-heading centered">
          <p className="section-kicker">Success stories</p>
          <h2 className="section-title">Families who found their forever</h2>
        </div>

        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>“The platform helped us connect with a respectful family and the process was smooth, transparent, and full of warmth.”</p>
            <strong>— Niharika & Ashok</strong>
          </div>

          <div className="testimonial-card">
            <p>“We appreciated the community-first approach and the easy communication process. It felt safe and genuine from the beginning.”</p>
            <strong>— Supriya & Debashis</strong>
          </div>

          <div className="testimonial-card">
            <p>“The profile quality and family guidance were excellent. We found a perfect match with shared values and understanding.”</p>
            <strong>— Manisha & Ranjan</strong>
          </div>
        </div>
      </section>
    </>
  )
}
