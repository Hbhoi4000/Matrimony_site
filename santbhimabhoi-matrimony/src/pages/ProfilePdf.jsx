import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileById } from "../slice/profileSlice";
import { FaDownload, FaArrowLeft } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import "../css/profilePdf.css";

export default function ProfilePdf() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pdfRef = useRef();

  const { selectedProfile: profile, loading, error } = useSelector(
    (state) => state.profiles
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProfileById(id));
    }
  }, [dispatch, id]);

  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 0,
      filename: `${profile?.full_name || "Profile"}_Biodata.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  if (loading) return <div className="loading">Loading Biodata PDF...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;
  if (!profile) return <div className="not-found">Profile not found.</div>;

  return (
    <div className="pdf-page-container">
      {/* Top Action Bar */}
      <div className="pdf-actions-bar">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Profile
        </button>
        <button className="btn-download" onClick={handleDownloadPDF}>
          <FaDownload /> Download PDF
        </button>
      </div>

      {/* Single Page PDF Template */}
      <div className="pdf-paper" ref={pdfRef}>
        <div className="pdf-header">
          <h1>Marriage Biodata</h1>
          <p>Bhoi Milan Matrimony</p>
        </div>

        {/* Parallel Grid: Image & Personal info on Left, Family & Work on Right */}
        <div className="pdf-grid-body">
          {/* Left Column: Photo & Personal Info */}
          <div className="pdf-col-left">
            <div className="pdf-photo-wrapper">
              <img
                src={profile.image_url || "/images/profile.jpg"}
                alt={profile.full_name}
                className="pdf-photo-full"
              />
            </div>

            <div className="pdf-section">
              <h3 className="pdf-section-title">Personal Details</h3>
              <table className="pdf-table">
                <tbody>
                  <tr>
                    <td><strong>Name:</strong></td>
                    <td>{profile.full_name}</td>
                  </tr>
                  <tr>
                    <td><strong>Age/Sex:</strong></td>
                    <td>{profile.age} Yrs / {profile.sex}</td>
                  </tr>
                  <tr>
                    <td><strong>Blood Group:</strong></td>
                    <td>{profile.blood_group || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pdf-section">
              <h3 className="pdf-section-title">Contact Details</h3>
              <table className="pdf-table">
                <tbody>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>{profile.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Address:</strong></td>
                    <td>{profile.address || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Work & Family */}
          <div className="pdf-col-right">
            <div className="pdf-section">
              <h3 className="pdf-section-title">Education & Work</h3>
              <table className="pdf-table">
                <tbody>
                  <tr>
                    <td><strong>Education:</strong></td>
                    <td>{profile.education || "N/A"}</td>
                  </tr>
                  <tr>
                    <td><strong>Job Status:</strong></td>
                    <td>{profile.is_job}</td>
                  </tr>
                  <tr>
                    <td><strong>Company:</strong></td>
                    <td>{profile.job_name || "N/A"}</td>
                  </tr>
                  <tr>
                    <td><strong>Designation:</strong></td>
                    <td>{profile.job_designation || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pdf-section">
              <h3 className="pdf-section-title">Family Details</h3>
              <table className="pdf-table">
                <tbody>
                  <tr>
                    <td><strong>Father:</strong></td>
                    <td>{profile.father_full_name}</td>
                  </tr>
                  <tr>
                    <td><strong>Mother:</strong></td>
                    <td>{profile.mother_full_name}</td>
                  </tr>
                  <tr>
                    <td><strong>Brothers:</strong></td>
                    <td>{profile.brothers ?? 0}</td>
                  </tr>
                  {profile.brother_spouse_name && (
                    <tr>
                      <td><strong>Brother's Spouse:</strong></td>
                      <td>{profile.brother_spouse_name}</td>
                    </tr>
                  )}
                  <tr>
                    <td><strong>Sisters:</strong></td>
                    <td>{profile.sisters ?? 0}</td>
                  </tr>
                  {profile.sister_husband_name && (
                    <tr>
                      <td><strong>Sister's Husband:</strong></td>
                      <td>{profile.sister_husband_name}</td>
                    </tr>
                  )}
                  <tr>
                    <td><strong>Mama Name:</strong></td>
                    <td>{profile.maternal_uncle_name || "N/A"}</td>
                  </tr>
                  <tr>
                    <td><strong>Mama Address:</strong></td>
                    <td>{profile.maternal_uncle_address || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer strictly at bottom of the page */}
        <div className="pdf-footer">
          Generated via Bhoi Milan Matrimonial Portal
        </div>
      </div>
    </div>
  );
}