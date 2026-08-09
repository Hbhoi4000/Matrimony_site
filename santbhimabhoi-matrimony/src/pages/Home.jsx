import { Link } from 'react-router-dom'
import brideImage from '../Images/Bride.avif'
import bride2Image from '../Images/Bride2.avif'
import groomImage from '../Images/bride 3.avif'
import '../css/home.css'
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../constants/routes'

const profiles = [
  {
    name: 'Aditi',
    age: 26,
    city: 'Bhubaneswar',
    image: brideImage,
    tag: 'Bride',
  },
  {
    name: 'Rashmi',
    age: 27,
    city: 'Cuttack',
    image: bride2Image,
    tag: 'Bride',
  },
  {
    name: 'Sandeep',
    age: 29,
    city: 'Puri',
    image: groomImage,
    tag: 'Groom',
  },
]

export default function Home() {
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

        <div className="card-grid">
          {profiles.map((profile) => (
            <article className="profile-card" key={profile.name}>
              <div className="profile-image-wrap">
                <img src={profile.image} alt={profile.name} />
                <span className="profile-tag">{profile.tag}</span>
              </div>
              <div className="profile-info">
                <h3>{profile.name}</h3>
                <p>{profile.age} years • {profile.city}</p>
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
