import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./../css/bride.css";
import {useDispatch,useSelector} from "react-redux";

import {fetchBrides} from "../slice/BrideSlice";

export default function Bride() {
  // const [brides, setBrides] = useState([]);
  // const [loading, setLoading] = useState(true);

  // // API Call
  // const fetchBrides = useCallback(async () => {
  //   try {
  //     setLoading(true);

  //     const response = await fetch(
  //       "http://127.0.0.1:8000/profiles/brides"
  //     );

  //     const data = await response.json();

  //     console.log(data);

  //     setBrides(data);
  //   } catch (error) {
  //     console.error("Error fetching brides:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);
  const dispatch = useDispatch();


  // Get data from Redux store
  const {brides,loading}=useSelector(
      state=>state.bride
  );



  // Runs only once when component loads
  useEffect(()=>{

    dispatch(fetchBrides());
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
        {brides.map((bride) => (
          <article key={bride.id} className="profile-card">
            <div className="profile-image-wrap">
              <img
                src={bride.image_url}
                alt={bride.name}
              />

              <span className="profile-tag">
                Bride
              </span>
            </div>

            <div className="profile-info">
              <h3>{bride.name}</h3>

              <p>{bride.education}</p>

              <p>{bride.city}</p>

              <Link
                to={`/profile/${bride.id}`}
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