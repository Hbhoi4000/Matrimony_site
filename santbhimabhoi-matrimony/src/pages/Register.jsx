import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./../css/register.css";

import { registerUser } from "../slice/Registration";

export default function Register() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.registration);

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
    image_url: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      age: Number(formData.age),
      brothers: Number(formData.brothers || 0),
      sisters: Number(formData.sisters || 0),
    };

    dispatch(registerUser(payload));
  };



  return (

    <section className="register-page">


      <div className="register-container">


        <div className="register-header">

          <p>
            Create Profile
          </p>

          <h1>
            Find Your Life Partner
          </h1>

          <span>
            Join Sant Bhima Bhoi Matrimony
          </span>

        </div>



        <form
          className="register-form"
          onSubmit={handleSubmit}
        >



          {/* Personal Details */}

          <div className="form-section">

            <h2>👤 Personal Information</h2>


            <div className="form-grid">


              <input
                name="full_name"
                placeholder="Full Name"
                onChange={handleChange}
              />


              <input
                name="email"
                placeholder="Email"
                type="email"
                onChange={handleChange}
              />


              <input
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
              />



              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
              >

                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

              </select>


              <input
                name="age"
                placeholder="Age"
                type="number"
                onChange={handleChange}
              />


              <input
                name="blood_group"
                placeholder="Blood Group"
                onChange={handleChange}
              />


            </div>

          </div>





          {/* Education */}

          <div className="form-section">

            <h2>🎓 Education & Address</h2>


            <div className="form-grid">


              <input
                name="education"
                placeholder="Education"
                onChange={handleChange}
              />


              <input
                name="address"
                placeholder="Address"
                onChange={handleChange}
              />


            </div>

          </div>





          {/* Job */}

          <div className="form-section">

            <h2>💼 Professional Details</h2>


            <div className="form-grid">


              <select
                name="is_job"
                value={formData.is_job}
                onChange={handleChange}
              >

                <option value="">
                  Are you working?
                </option>

                <option value="Yes">
                  Yes
                </option>

                <option value="No">
                  No
                </option>

              </select>



              <input
                name="job_name"
                placeholder="Company Name"
                onChange={handleChange}
              />


              <input
                name="job_designation"
                placeholder="Designation"
                onChange={handleChange}
              />


            </div>


          </div>





          {/* Family */}

          <div className="form-section">

            <h2>👨‍👩‍👧 Family Information</h2>


            <div className="form-grid">


              <input
                name="father_full_name"
                placeholder="Father Name"
                onChange={handleChange}
              />


              <input
                name="mother_full_name"
                placeholder="Mother Name"
                onChange={handleChange}
              />



              <input
                name="brothers"
                type="number"
                placeholder="No. of Brothers"
                onChange={handleChange}
              />


              <input
                name="sisters"
                type="number"
                placeholder="No. of Sisters"
                onChange={handleChange}
              />


              <input
                name="brother_spouse_name"
                placeholder="Brother Spouse Name"
                onChange={handleChange}
              />


              <input
                name="sister_husband_name"
                placeholder="Sister Husband Name"
                onChange={handleChange}
              />



            </div>


          </div>






          {/* Maternal */}

          <div className="form-section">


            <h2>
              🏠 Maternal Family Details
            </h2>


            <div className="form-grid">


              <input
                name="maternal_uncle_name"
                placeholder="Maternal Uncle Name"
                onChange={handleChange}
              />


              <input
                name="maternal_uncle_address"
                placeholder="Maternal Uncle Address"
                onChange={handleChange}
              />


            </div>


          </div>





          {/* Image */}

          <div className="form-section">


            <h2>
              📸 Profile Photo
            </h2>


            <input

              name="image_url"

              placeholder="Image URL"

              onChange={handleChange}

            />


          </div>





          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">Profile created successfully!</p>}

          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Profile"}
          </button>

        </form>



        <p className="login-link">

          Already registered?

          <Link to="/login">
            Login
          </Link>


        </p>


      </div>


    </section>


  )

}