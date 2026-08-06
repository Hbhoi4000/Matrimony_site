import { Link } from 'react-router-dom'
import '../css/login.css'

export default function Login() {
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