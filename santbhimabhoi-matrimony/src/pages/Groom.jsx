import { Link } from 'react-router-dom';
import './../css/bride.css';
import { profileApi } from '../api/profiles';
import { useProfileList } from '../hooks/useProfileList';
import { profileRoute } from '../constants/routes';

export default function Groom() {
  const { profiles: grooms, loading, error } = useProfileList(profileApi.getGrooms);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p role="alert">Unable to load grooms: {error}</p>;

  return (
    <section className="listing-page">
      <div className="page-header">
        <p className="section-kicker">Grooms</p>
        <h2>Meet eligible and genuine matches</h2>
      </div>
      <div className="card-grid">
        {grooms.map((groom) => (
          <article key={groom.id} className="profile-card">
            <div className="profile-image-wrap">
              <img src={groom.image_url} alt={groom.full_name} />
              <span className="profile-tag">Groom</span>
            </div>
            <div className="profile-info">
              <h3>{groom.full_name}</h3>
              <p>{groom.age} years • {groom.address}</p>
              <Link to={profileRoute(groom.id)} className="primary-btn small-btn">View Profile</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
