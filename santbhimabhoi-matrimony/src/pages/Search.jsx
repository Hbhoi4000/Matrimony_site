import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "./../css/search.css";

export default function Search() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sex: "",
    ageMin: "22",
    ageMax: "30",
    city: "",
    religion: "",
    caste: "",
    occupation: "",
    premium: false,
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/profiles`);
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const age = Number(profile.age || profile.age_years || 0);
      const minAge = Number(filters.ageMin);
      const maxAge = Number(filters.ageMax);

      if (filters.sex && profile.sex !== filters.sex) {
        return false;
      }

      if (filters.city && !profile.address?.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }

      if (filters.religion && !profile.religion?.toLowerCase().includes(filters.religion.toLowerCase())) {
        return false;
      }

      if (filters.caste && !profile.caste?.toLowerCase().includes(filters.caste.toLowerCase())) {
        return false;
      }

      if (filters.occupation && !profile.job_designation?.toLowerCase().includes(filters.occupation.toLowerCase()) && !profile.job_name?.toLowerCase().includes(filters.occupation.toLowerCase())) {
        return false;
      }

      if (filters.premium && !profile.is_premium && !profile.premium) {
        return false;
      }

      if (!Number.isNaN(minAge) && age < minAge) {
        return false;
      }
      if (!Number.isNaN(maxAge) && age > maxAge) {
        return false;
      }

      return true;
    });
  }, [profiles, filters]);

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      sex: "",
      ageMin: "22",
      ageMax: "30",
      city: "",
      religion: "",
      caste: "",
      occupation: "",
      premium: false,
    });
  };

  return (
    <section className="search-page">
      <div className="search-hero">
        <div>
          <p className="section-kicker">Search matches</p>
          <h1>Find the perfect partner with smart filters</h1>
          <p className="search-intro">
            Use the filters to narrow down profiles by age, city, religion,
            occupation, and premium membership.
          </p>
        </div>
      </div>

      <div className="search-grid">
        <aside className="search-sidebar">
          <div className="sidebar-title">
            <h2>Filter matches</h2>
            <span>{filteredProfiles.length} profiles</span>
          </div>

          <div className="filter-block">
            <label htmlFor="sex">I am looking for</label>
            <select name="sex" id="sex" value={filters.sex} onChange={handleFilterChange}>
              <option value="">Any</option>
              <option value="Female">Bride</option>
              <option value="Male">Groom</option>
              <option value="Widow">Widow</option>
            </select>
          </div>

          <div className="filter-block range-block">
            <div>
              <label htmlFor="ageMin">Age from</label>
              <input
                type="number"
                name="ageMin"
                id="ageMin"
                value={filters.ageMin}
                min="18"
                max="60"
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label htmlFor="ageMax">Age to</label>
              <input
                type="number"
                name="ageMax"
                id="ageMax"
                value={filters.ageMax}
                min="18"
                max="60"
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="filter-block">
            <label htmlFor="city">City</label>
            <input
              name="city"
              id="city"
              value={filters.city}
              placeholder="Enter city"
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-block">
            <label htmlFor="religion">Religion</label>
            <input
              name="religion"
              id="religion"
              value={filters.religion}
              placeholder="Enter religion"
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-block">
            <label htmlFor="caste">Caste</label>
            <input
              name="caste"
              id="caste"
              value={filters.caste}
              placeholder="Enter caste"
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-block">
            <label htmlFor="occupation">Occupation</label>
            <input
              name="occupation"
              id="occupation"
              value={filters.occupation}
              placeholder="e.g. Engineer, Teacher"
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-block toggle-block">
            <span>Premium profiles only</span>
            <label className="switch">
              <input
                type="checkbox"
                name="premium"
                checked={filters.premium}
                onChange={handleFilterChange}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="sidebar-actions">
            <button type="button" className="filter-btn" onClick={resetFilters}>
              Reset filters
            </button>
          </div>
        </aside>

        <div className="search-results">
          {loading ? (
            <div className="loading-text">Loading profiles…</div>
          ) : filteredProfiles.length === 0 ? (
            <div className="empty-state">
              No profiles match your filter. Adjust the filters and try again.
            </div>
          ) : (
            <div className="card-grid search-card-grid">
              {filteredProfiles.map((profile) => {
                const age = Number(profile.age || profile.age_years || 0);
                return (
                  <article key={profile.id} className="search-card">
                    <div className="search-card-image">
                      <img src={profile.image_url || "/images/profile.jpg"} alt={profile.full_name || profile.name} />
                      <span className="profile-status">{profile.sex === "Female" ? "Bride" : profile.sex === "Male" ? "Groom" : profile.sex || "Profile"}</span>
                    </div>
                    <div className="search-card-body">
                      <div className="card-top">
                        <div>
                          <h3>{profile.full_name || profile.name}</h3>
                          <p>{age > 0 ? `${age} yrs` : "Age not listed"} · {profile.address || "Location not listed"}</p>
                        </div>
                        {profile.premium || profile.is_premium ? <span className="premium-pill">Premium</span> : null}
                      </div>

                      <p className="card-meta">{profile.education || profile.job_designation || "Education not listed"}</p>
                      <p className="card-meta">{profile.job_name ? `${profile.job_name}${profile.job_designation ? ` • ${profile.job_designation}` : ""}` : "Occupation not listed"}</p>

                      <div className="card-actions">
                        <Link to={`/profile/${profile.id}`} className="primary-btn small-btn">
                          View Profile
                        </Link>
                        <button type="button" className="secondary-btn small-btn">
                          Send Interest
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
