import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../slice/loging' // Adjust import path
import "./../css/MyProfile.css";


const MyProfile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth || state.login || {});
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    sex: '',
    age: '',
    education: '',
    address: '',
    is_job: 'No',
    job_name: '',
    job_designation: '',
    maternal_uncle_name: '',
    maternal_uncle_address: '',
    brothers: 0,
    sisters: 0,
    brother_spouse_name: '',
    sister_husband_name: '',
    mother_full_name: '',
    father_full_name: '',
    blood_group: '',
    image_url: '',
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        password: '', // Kept empty for security; enter to change
        sex: user.sex || 'Male',
        age: user.age || '',
        education: user.education || '',
        address: user.address || '',
        is_job: user.is_job || 'No',
        job_name: user.job_name || '',
        job_designation: user.job_designation || '',
        maternal_uncle_name: user.maternal_uncle_name || '',
        maternal_uncle_address: user.maternal_uncle_address || '',
        brothers: user.brothers ?? 0,
        sisters: user.sisters ?? 0,
        brother_spouse_name: user.brother_spouse_name || '',
        sister_husband_name: user.sister_husband_name || '',
        mother_full_name: user.mother_full_name || '',
        father_full_name: user.father_full_name || '',
        blood_group: user.blood_group || '',
        image_url: user.image_url || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clean payload (omit empty optional password if unchanged)
    const payload = { ...formData };
    if (!payload.password) delete payload.password;

    dispatch(updateProfile({ userId: user.id, profileData: payload }))
      .unwrap()
      .then(() => setMessage({ type: 'success', text: 'Profile updated successfully!' }))
      .catch((err) => setMessage({ type: 'error', text: err || 'Failed to update profile' }));
  };

  if (!user) return <p className="loading-text">Please login to view profile.</p>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2>My Profile</h2>
        <p className="subtitle">Update your personal and family details</p>

        {message.text && (
          <div className={`alert-banner ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="profile-form">
          {/* Section: Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Password (Leave blank to keep unchanged)</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
              </div>

              <div className="form-group">
                <label>Gender *</label>
                <select name="sex" value={formData.sex} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label>Age *</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required min="18" />
              </div>

              <div className="form-group">
                <label>Blood Group</label>
                <select name="blood_group" value={formData.blood_group} onChange={handleChange}>
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Profile Image URL</label>
                <input type="url" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://example.com/image.jpg" />
              </div>
            </div>
          </div>

          {/* Section: Education & Employment */}
          <div className="form-section">
            <h3>Education & Employment</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Education</label>
                <input type="text" name="education" value={formData.education} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Are you employed? *</label>
                <select name="is_job" value={formData.is_job} onChange={handleChange} required>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {formData.is_job === 'Yes' && (
                <>
                  <div className="form-group">
                    <label>Company/Job Name</label>
                    <input type="text" name="job_name" value={formData.job_name} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Job Designation</label>
                    <input type="text" name="job_designation" value={formData.job_designation} onChange={handleChange} />
                  </div>
                </>
              )}

              <div className="form-group full-width">
                <label>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Section: Family Information */}
          <div className="form-section">
            <h3>Family Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Father's Full Name *</label>
                <input type="text" name="father_full_name" value={formData.father_full_name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Mother's Full Name *</label>
                <input type="text" name="mother_full_name" value={formData.mother_full_name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Brothers Count</label>
                <input type="number" name="brothers" value={formData.brothers} onChange={handleChange} min="0" />
              </div>

              <div className="form-group">
                <label>Sisters Count</label>
                <input type="number" name="sisters" value={formData.sisters} onChange={handleChange} min="0" />
              </div>

              <div className="form-group">
                <label>Brother's Spouse Name</label>
                <input type="text" name="brother_spouse_name" value={formData.brother_spouse_name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Sister's Husband Name</label>
                <input type="text" name="sister_husband_name" value={formData.sister_husband_name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Maternal Uncle (Mama) Name</label>
                <input type="text" name="maternal_uncle_name" value={formData.maternal_uncle_name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Maternal Uncle Address</label>
                <input type="text" name="maternal_uncle_address" value={formData.maternal_uncle_address} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Saving Changes...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;