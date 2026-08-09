import { Link } from 'react-router-dom'
import '../css/login.css'

export default function ForgotPassword() {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Trouble logging in?</p>
        <h2>Forgot Password</h2>
        
        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
          Enter your email and we'll send you a link to reset your password.
        </p>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" placeholder="Enter your email" required />
          </div>

          <button type="submit" className="primary-btn full-width">Send Reset Link</button>
        </form>

        <p className="auth-footer-link">
          Back to <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  )
}
