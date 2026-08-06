import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./../css/bride.css";
import {useDispatch,useSelector} from "react-redux";

import {fetchGrooms} from "../slice/GroomSlice";

export default function Groom() {

  const dispatch = useDispatch();


  // Get data from Redux store
  const {grooms,loading}=useSelector(
      state=>state.groom
  );



  // Runs only once when component loads
  useEffect(()=>{

    dispatch(fetchGrooms());
  },[dispatch]);


  if (loading) {
    return <h2>Loading...</h2>;
  }

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
              <Link to={`/profile/${groom.id}`} className="primary-btn small-btn">View Profile</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
