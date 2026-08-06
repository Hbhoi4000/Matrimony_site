import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./../css/bride.css";
import {useDispatch,useSelector} from "react-redux";

import {fetchWindowProfiles} from "../slice/WindowSlice";

export default function Window() {
 
  const dispatch = useDispatch();


  // Get data from Redux store
  const {windowProfiles,loading}=useSelector(
      state=>state.window
  );



  // Runs only once when component loads
  useEffect(()=>{

    dispatch(fetchWindowProfiles());
  },[dispatch]);


  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="listing-page">
      <div className="page-header">
        <p className="section-kicker">Brides</p>
        <h2>Find a Beautiful Life Partner</h2>
      </div>

      <div className="card-grid">
        {windowProfiles.map((profile) => (
          <article key={profile.id} className="profile-card">
            <div className="profile-image-wrap">
              <img
                src={profile.image_url}
                alt={profile.name}
              />

              <span className="profile-tag">
                Window
              </span>
            </div>

            <div className="profile-info">
              <h3>{profile.name}</h3>

              <p>{profile.education}</p>

              <p>{profile.city}</p>

              <Link
                to={`/profile/${profile.id}`}
                className="primary-btn small-btn"
              >
                View Profile
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}