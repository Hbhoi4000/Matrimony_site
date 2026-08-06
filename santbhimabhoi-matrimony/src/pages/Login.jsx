import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import '../css/login.css'
import { loginUser } from '../slice/Registration'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.registration)
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await dispatch(loginUser(formData)).unwrap()
      navigate('/')
    } catch (loginError) {
      // error is handled by Redux state
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h2>Login</h2>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter your password" />
          </div>

          {/* New row using your .form-row-between class */}
          <div className="form-row-between">
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" id="remember-me" style={{ width: 'auto' }} />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="primary-btn full-width">Login</button>
        </form>

        <p className="auth-footer-link">
          New member? <Link to="/">Explore profiles</Link>
        </p>
      </div>
    </section>
  )
}