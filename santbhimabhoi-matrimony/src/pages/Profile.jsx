import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./../css/profile.css";
import { profileApi } from '../api/profiles';

export default function Profile() {

  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const data = await profileApi.getById(id);
        setProfile(data);

      } catch (error) {

        setError(error.message);

      }

    };


    fetchProfile();

  }, [id]);



  if (error) {
    return <div className="loading" role="alert">Unable to load profile: {error}</div>;
  }

  if (!profile) {
    return (
      <div className="loading">
        Loading Profile...
      </div>
    );
  }



  return (

    <section className="profile-page">

      <div className="profile-container">


        {/* Left Image Section */}

        <div className="profile-image-card">

          <img
            src={profile.image_url}
            alt={profile.full_name}
          />


          <div className="profile-name">

            <h1>
              {profile.full_name}
            </h1>

            <p>
              {profile.age} Years • {profile.sex}
            </p>

          </div>

        </div>



        {/* Right Details */}

        <div className="profile-content">


          <h2>
            About Profile
          </h2>


          <div className="info-grid">


            <div>
              <span>Education</span>
              <strong>
                {profile.education}
              </strong>
            </div>


            <div>
              <span>Location</span>
              <strong>
                {profile.address}
              </strong>
            </div>


            <div>
              <span>Blood Group</span>
              <strong>
                {profile.blood_group}
              </strong>
            </div>


            <div>
              <span>Email</span>
              <strong>
                {profile.email}
              </strong>
            </div>


          </div>



          {/* Career */}

          <div className="section-card">

            <h2>
              Professional Details
            </h2>


            <p>
              <b>Working:</b> {profile.is_job}
            </p>


            <p>
              <b>Company:</b> {profile.job_name}
            </p>


            <p>
              <b>Designation:</b> {profile.job_designation}
            </p>


          </div>




          {/* Family */}

          <div className="section-card">

            <h2>
              Family Details
            </h2>


            <p>
              <b>Father:</b>
              {profile.father_full_name}
            </p>


            <p>
              <b>Mother:</b>
              {profile.mother_full_name}
            </p>


            <p>
              <b>Brothers:</b>
              {profile.brothers}
            </p>


            <p>
              <b>Sisters:</b>
              {profile.sisters}
            </p>


          </div>




          {/* Maternal Family */}

          <div className="section-card">

            <h2>
              Maternal Uncle Details
            </h2>


            <p>
              <b>Name:</b>
              {profile.maternal_uncle_name}
            </p>


            <p>
              <b>Address:</b>
              {profile.maternal_uncle_address}
            </p>


          </div>


          <button className="contact-btn">
            Send Interest ❤️
          </button>


        </div>


      </div>


    </section>

  );
}
