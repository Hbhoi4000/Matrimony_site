import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword, resetOtpState } from "../slice/forgotPasswordSlice";
import "../css/login.css";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { loading, error, passwordResetSuccess, email } = useSelector(
    (state) => state.forgotPassword
  );

  // If password reset is successful, navigate to login after a brief pause
  useEffect(() => {
    if (passwordResetSuccess) {
      const timer = setTimeout(() => {
        dispatch(resetOtpState());
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [passwordResetSuccess, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    setPasswordError("");
    dispatch(resetPassword({ email, newPassword: password }));
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Set New Password</p>
        <h2>Reset Password</h2>

        <p className="auth-subtitle">
          Enter your new password below to complete the reset process.
        </p>

        {error && <div className="auth-alert error-alert">{error}</div>}
        {passwordError && (
          <div className="auth-alert error-alert">{passwordError}</div>
        )}

        {passwordResetSuccess && (
          <div className="auth-alert success-alert">
            Password reset successful! Redirecting to login...
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading || passwordResetSuccess}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading || passwordResetSuccess}
            />
          </div>

          <button
            type="submit"
            className="primary-btn full-width"
            disabled={loading || !password || !confirmPassword || passwordResetSuccess}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="auth-footer-link">
          Back to <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}