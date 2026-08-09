import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./../css/register.css";

import { registerUser } from "../slice/Registration";

export default function Register() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.registration);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    sex: "",
    age: "",
    education: "",
    address: "",
    is_job: "",
    job_name: "",
    job_designation: "",
    maternal_uncle_name: "",
    maternal_uncle_address: "",
    brothers: 0,
    sisters: 0,
    brother_spouse_name: "",
    sister_husband_name: "",
    mother_full_name: "",
    father_full_name: "",
    blood_group: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));

    // Clear field error on change
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters";
    }

    if (!formData.sex) {
      newErrors.sex = "Select gender";
    }

    if (!formData.age || formData.age < 18) {
      newErrors.age = "Age should be at least 18";
    }

    if (!formData.education.trim()) {
      newErrors.education = "Education is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.father_full_name.trim()) {
      newErrors.father_full_name = "Father name is required";
    }

    if (!formData.mother_full_name.trim()) {
      newErrors.mother_full_name = "Mother name is required";
    }

    if (!formData.image) {
      newErrors.image = "Profile photo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));

    if (errors.image) {
      setErrors((prevErrors) => ({ ...prevErrors, image: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });

    dispatch(registerUser(payload));
  };

  return (
    <section className="register-page">
      <div className="register-container">
        <div className="register-header">
          <p>Create Profile</p>
          <h1>Find Your Life Partner</h1>
          <span>Join Sant Bhima Bhoi Matrimony</span>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* Personal Details */}
          <div className="form-section">
            <h2>👤 Personal Information</h2>
            <div className="form-grid">
              
              <div className="input-group">
                <label className="input-label">
                  Full Name <span className="required-star">*</span>
                </label>
                <input
                  name="full_name"
                  placeholder="Enter full name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className={errors.full_name ? "input-error" : ""}
                />
                {errors.full_name && (
                  <span className="error-text">{errors.full_name}</span>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">
                  Email <span className="required-star">*</span>
                </label>
                <input
                  name="email"
                  placeholder="Enter email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">
                  Password <span className="required-star">*</span>
                </label>
                <input
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "input-error" : ""}
                />
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">
                  Gender <span className="required-star">*</span>
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className={errors.sex ? "input-error" : ""}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.sex && (
                  <span className="error-text">{errors.sex}</span>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">
                  Age <span className="required-star">*</span>
                </label>
                <input
                  name="age"
                  placeholder="Enter age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  className={errors.age ? "input-error" : ""}
                />
                {errors.age && (
                  <span className="error-text">{errors.age}</span>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">Blood Group</label>
                <input
                  name="blood_group"
                  placeholder="e.g. O+, A+"
                  value={formData.blood_group}
                  onChange={handleChange}
                />
              </div>

            </div>
          </div>

          {/* Education & Address */}
          <div className="form-section">
            <h2>🎓 Education & Address</h2>
            <div className="form-grid">

              <div className="input-group">
                <label className="input-label">
                  Education <span className="required-star">*</span>
                </label>
                <input
                  name="education"
                  placeholder="Highest degree"
                  value={formData.education}
                  onChange={handleChange}
                  className={errors.education ? "input-error" : ""}
                />
                {errors.education && (
                  <span className="error-text">{errors.education}</span>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">
                  Address <span className="required-star">*</span>
                </label>
                <input
                  name="address"
                  placeholder="Full address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? "input-error" : ""}
                />
                {errors.address && (
                  <span className="error-text">{errors.address}</span>
                )}
              </div>

            </div>
          </div>

          {/* Job */}
          <div className="form-section">
            <h2>💼 Professional Details</h2>
            <div className="form-grid">

              <div className="input-group">
                <label className="input-label">Working Status</label>
                <select
                  name="is_job"
                  value={formData.is_job}
                  onChange={handleChange}
                >
                  <option value="">Are you working?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Company Name</label>
                <input
                  name="job_name"
                  placeholder="Company / Organization"
                  value={formData.job_name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Designation</label>
                <input
                  name="job_designation"
                  placeholder="Job role"
                  value={formData.job_designation}
                  onChange={handleChange}
                />
              </div>

            </div>
          </div>

          {/* Family */}
          <div className="form-section">
            <h2>👨‍👩‍👧 Family Information</h2>
            <div className="form-grid">

              <div className="input-group">
                <label className="input-label">
                  Father's Name <span className="required-star">*</span>
                </label>
                <input
                  name="father_full_name"
                  placeholder="Father's full name"
                  value={formData.father_full_name}
                  onChange={handleChange}
                  className={errors.father_full_name ? "input-error" : ""}
                />
                {errors.father_full_name && (
                  <span className="error-text">{errors.father_full_name}</span>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">
                  Mother's Name <span className="required-star">*</span>
                </label>
                <input
                  name="mother_full_name"
                  placeholder="Mother's full name"
                  value={formData.mother_full_name}
                  onChange={handleChange}
                  className={errors.mother_full_name ? "input-error" : ""}
                />
                {errors.mother_full_name && (
                  <span className="error-text">{errors.mother_full_name}</span>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">No. of Brothers</label>
                <input
                  name="brothers"
                  type="number"
                  placeholder="0"
                  value={formData.brothers}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">No. of Sisters</label>
                <input
                  name="sisters"
                  type="number"
                  placeholder="0"
                  value={formData.sisters}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Brother's Spouse Name</label>
                <input
                  name="brother_spouse_name"
                  placeholder="Spouse name"
                  value={formData.brother_spouse_name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Sister's Husband Name</label>
                <input
                  name="sister_husband_name"
                  placeholder="Husband name"
                  value={formData.sister_husband_name}
                  onChange={handleChange}
                />
              </div>

            </div>
          </div>

          {/* Maternal */}
          <div className="form-section">
            <h2>🏠 Maternal Family Details</h2>
            <div className="form-grid">

              <div className="input-group">
                <label className="input-label">Maternal Uncle Name</label>
                <input
                  name="maternal_uncle_name"
                  placeholder="Uncle's name"
                  value={formData.maternal_uncle_name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Maternal Uncle Address</label>
                <input
                  name="maternal_uncle_address"
                  placeholder="Uncle's address"
                  value={formData.maternal_uncle_address}
                  onChange={handleChange}
                />
              </div>

            </div>
          </div>

          {/* Image */}
          <div className="form-section">
            <h2>📸 Profile Photo</h2>
            <div className="input-group">
              <label className="input-label">
                Upload Photo <span className="required-star">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={errors.image ? "input-error" : ""}
              />
              {errors.image && (
                <span className="error-text">{errors.image}</span>
              )}

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="preview-image"
                />
              )}
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">Profile created successfully!</p>}

          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Profile"}
          </button>
        </form>

        <p className="login-link">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}