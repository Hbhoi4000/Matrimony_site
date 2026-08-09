import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaSyncAlt } from 'react-icons/fa'
import '../css/login.css'
import { loginUser } from '../slice/loging' // Ensure filename matches (e.g. '../slice/loging' or '../slice/login')

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 1. Selector fixed from state.registration to state.login (or state.auth)
  const { loading = false, error = null } = useSelector((state) => state.login || state.auth || {})
  const fullState = useSelector((state) => state);
  console.log('Available Redux state keys:', Object.keys(fullState));
  // Form State
  const [formData, setFormData] = useState({ email: '', password: '', captchaInput: '' })
  const [errors, setErrors] = useState({})

  // CAPTCHA State
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 })

  // Generate new Math CAPTCHA
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptcha({ num1, num2, answer: num1 + num2 })
    setFormData((prev) => ({ ...prev, captchaInput: '' }))
  }

  // Generate CAPTCHA on load
  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}

    // Email / User ID validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email / User ID is required'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    // CAPTCHA validation
    if (!formData.captchaInput.trim()) {
      newErrors.captchaInput = 'Please solve the CAPTCHA'
    } else if (parseInt(formData.captchaInput, 10) !== captcha.answer) {
      newErrors.captchaInput = 'Incorrect CAPTCHA answer'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    try {
      // 2. Dispatch credentials matching username/email keys
      await dispatch(
        loginUser({
          username: formData.email,
          email: formData.email,
          password: formData.password,
        })
      ).unwrap()

      navigate('/')
    } catch (loginError) {
      // Regenerate CAPTCHA on failure
      generateCaptcha()
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h2>Login</h2>

        {error && (
          <p className="form-error-banner">
            {typeof error === 'object' ? error.detail || error.message || JSON.stringify(error) : error}
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Email / User ID */}
          <div className="input-group">
            <label htmlFor="email">
              Email / User ID <span className="required-star">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Enter your email or ID"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">
              Password <span className="required-star">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {/* CAPTCHA Section */}
          <div className="input-group">
            <label htmlFor="captchaInput">
              Security Check <span className="required-star">*</span>
            </label>
            <div className="captcha-container">
              <div className="captcha-box">
                <span>
                  {captcha.num1} + {captcha.num2} = ?
                </span>
                <button
                  type="button"
                  className="captcha-refresh-btn"
                  onClick={generateCaptcha}
                  title="Refresh CAPTCHA"
                >
                  <FaSyncAlt />
                </button>
              </div>
              <input
                id="captchaInput"
                name="captchaInput"
                type="number"
                placeholder="Result"
                value={formData.captchaInput}
                onChange={handleChange}
                className={`captcha-input ${errors.captchaInput ? 'input-error' : ''}`}
              />
            </div>
            {errors.captchaInput && (
              <span className="error-text">{errors.captchaInput}</span>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="form-row-between">
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" id="remember-me" style={{ width: 'auto' }} />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="primary-btn full-width" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-footer-link">
          New member? <Link to="/register">Create profile</Link>
        </p>
      </div>
    </section>
  )
}