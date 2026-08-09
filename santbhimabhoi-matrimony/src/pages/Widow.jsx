import { Link } from 'react-router-dom';
import './../css/bride.css';
import { profileApi } from '../api/profiles';
import { useProfileList } from '../hooks/useProfileList';
import { profileRoute } from '../constants/routes';

export default function Widow() {
  const { profiles: widowProfiles, loading, error } = useProfileList(profileApi.getWidowProfiles);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p role="alert">Unable to load widow profiles: {error}</p>;

  return (
    <section className="listing-page">
      <div className="page-header">
        <p className="section-kicker">Widow Profiles</p>
        <h2>Find a Compatible Life Partner</h2>
      </div>
      <div className="card-grid">
        {widowProfiles.map((profile) => (
          <article key={profile.id} className="profile-card">
            <div className="profile-image-wrap">
              <img src={profile.image_url} alt={profile.full_name} />
              <span className="profile-tag">Widow</span>
            </div>
            <div className="profile-info">
              <h3>{profile.full_name}</h3>
              <p>{profile.education}</p>
              <p>{profile.address}</p>
              <Link to={profileRoute(profile.id)} className="primary-btn small-btn">View Profile</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
