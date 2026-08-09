import { Link } from 'react-router-dom';
import './../css/bride.css';
import { profileApi } from '../api/profiles';
import { useProfileList } from '../hooks/useProfileList';
import { profileRoute } from '../constants/routes';

export default function Bride() {
  const { profiles: brides, loading, error } = useProfileList(profileApi.getBrides);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p role="alert">Unable to load brides: {error}</p>;

  return (
    <section className="listing-page">
      <div className="page-header">
        <p className="section-kicker">Brides</p>
        <h2>Find a Beautiful Life Partner</h2>
      </div>
      <div className="card-grid">
        {brides.map((bride) => (
          <article key={bride.id} className="profile-card">
            <div className="profile-image-wrap">
              <img src={bride.image_url} alt={bride.full_name} />
              <span className="profile-tag">Bride</span>
            </div>
            <div className="profile-info">
              <h3>{bride.full_name}</h3>
              <p>{bride.education}</p>
              <p>{bride.address}</p>
              <Link to={profileRoute(bride.id)} className="primary-btn small-btn">View Profile</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
