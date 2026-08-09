import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileById, clearSelectedProfile } from "../slice/profileSlice";
import { sendInterest, resetInterestStatus } from "../slice/interestSlice";
import "./../css/profile.css";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selected Profile
  const { selectedProfile: profile, loading, error } = useSelector(
    (state) => state.profiles
  );

  // Logged-in User
  const reduxUser = useSelector((state) => state.login?.user);
  const loggedInUser = reduxUser?.user || reduxUser;

  // Interest state
  const { loading: sendingInterest, sentSuccess } = useSelector(
    (state) => state.interest
  );

  // Check if current profile belongs to the logged-in user
  const isSelfProfile = loggedInUser && String(loggedInUser.id) === String(id);

  useEffect(() => {
    if (id) {
      dispatch(fetchProfileById(id));
    }
    return () => {
      dispatch(clearSelectedProfile());
      dispatch(resetInterestStatus());
    };
  }, [dispatch, id]);

  const handleSendInterest = async () => {
    if (!loggedInUser) {
      alert("Please login to send interest!");
      navigate("/login");
      return;
    }

    const result = await dispatch(
      sendInterest({
        senderId: loggedInUser.id,
        receiverId: profile.id,
      })
    );

    if (sendInterest.fulfilled.match(result)) {
      alert("Interest sent successfully! ❤️");
    } else {
      alert("Failed to send interest. Please try again.");
    }
  };

  if (loading) return <div className="loading">Loading Profile...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;
  if (!profile) return <div className="not-found">Profile not found.</div>;

  return (
    <section className="profile-page">
      <div className="profile-container">
        {/* Left Image Section */}
        <div className="profile-image-card">
          <img src={profile.image_url || "/images/profile.jpg"} alt={profile.full_name || "Profile"} />
          <div className="profile-name">
            <h1>{profile.full_name}</h1>
            <p>
              {profile.age} Years • {profile.sex}
            </p>
          </div>
        </div>

        {/* Right Details */}
        <div className="profile-content">
          {/* Download PDF button - Available only if logged in */}
          {loggedInUser && (
            <button
              className="download-pdf-btn"
              onClick={() => navigate(`/profile-pdf/${id}`)}
            >
              📄 Download PDF
            </button>
          )}

          <h2>About Profile</h2>

          {/* Basic & Personal Info */}
          <div className="info-grid">
            <div>
              <span>Age & Gender</span>
              <strong>{profile.age} Yrs / {profile.sex}</strong>
            </div>
            <div>
              <span>Blood Group</span>
              <strong>{profile.blood_group || "N/A"}</strong>
            </div>
          </div>

          {/* Education & Occupation Details */}
          <div className="section-card">
            <h2>Education & Work Details</h2>
            <p><b>Education:</b> {profile.education || "N/A"}</p>
            <p><b>Working Status:</b> {profile.is_job}</p>
            <p><b>Company Name:</b> {profile.job_name || "N/A"}</p>
            <p><b>Designation:</b> {profile.job_designation || "N/A"}</p>
          </div>

          {/* Family Details */}
          <div className="section-card">
            <h2>Family Details</h2>
            <p><b>Father Name:</b> {profile.father_full_name}</p>
            <p><b>Mother Name:</b> {profile.mother_full_name}</p>
            <p><b>Brothers:</b> {profile.brothers ?? 0}</p>
            {profile.brother_spouse_name && (
              <p><b>Brother's Spouse Name:</b> {profile.brother_spouse_name}</p>
            )}
            <p><b>Sisters:</b> {profile.sisters ?? 0}</p>
            {profile.sister_husband_name && (
              <p><b>Sister's Husband Name:</b> {profile.sister_husband_name}</p>
            )}
            <p><b>Maternal Uncle (Mama) Name:</b> {profile.maternal_uncle_name || "N/A"}</p>
            <p><b>Maternal Uncle Address:</b> {profile.maternal_uncle_address || "N/A"}</p>
          </div>

          {/* Contact Information */}
          <div className="section-card">
            <h2>Contact Information</h2>
            <p><b>Email:</b> {profile.email}</p>
            <p><b>Address:</b> {profile.address || "N/A"}</p>
          </div>

          {/* Send Interest Button */}
          {!isSelfProfile && (
            <button
              className="contact-btn"
              onClick={handleSendInterest}
              disabled={sendingInterest || sentSuccess}
            >
              {sendingInterest
                ? "Sending..."
                : sentSuccess
                ? "Interest Sent ❤️"
                : "Send Interest ❤️"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}