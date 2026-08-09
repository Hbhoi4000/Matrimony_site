import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // 1. Added useNavigate here
import { sendOTP, verifyOTP, resetOtpState } from "../slice/forgotPasswordSlice";
import "../css/login.css";

const RESEND_INTERVAL = 60; // 60 seconds countdown

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 2. Initialized navigate hook here

  // Local form state
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  // Redux state
  const { loading, error, otpSent, otpVerified } = useSelector(
    (state) => state.forgotPassword
  );

  // 3. Added redirection effect when OTP is verified
  useEffect(() => {
    if (otpVerified) {
      navigate("/reset-password");
    }
  }, [otpVerified, navigate]);

  // Effect to manage the 60-second countdown
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle step 1: Request OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email || loading) return;

    dispatch(sendOTP({ email })).then((action) => {
      // Start 60-second timer on successful request
      if (sendOTP.fulfilled.match(action)) {
        setTimer(RESEND_INTERVAL);
      }
    });
  };

  // Handle step 2: Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp || loading) return;
    dispatch(verifyOTP({ profileData: { email, otp } }));
  };

  // Reset to email step
  const handleResetStep = () => {
    dispatch(resetOtpState());
    setOtp("");
    setTimer(0);
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Trouble logging in?</p>
        <h2>Forgot Password</h2>

        <p className="auth-subtitle">
          {!otpSent
            ? "Enter your email address to receive an OTP verification code."
            : `We sent a verification code to ${email}. Enter it below.`}
        </p>

        {/* Global Error Banner */}
        {error && <div className="auth-alert error-alert">{error}</div>}

        {/* Success Banner when Verified */}
        {otpVerified && (
          <div className="auth-alert success-alert">
            OTP Verified successfully! Redirecting...
          </div>
        )}

        {!otpSent ? (
          /* STEP 1: Send OTP Form */
          <form className="auth-form" onSubmit={handleSendOtp}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="primary-btn full-width"
              disabled={loading || !email}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          /* STEP 2: Verify OTP Form */
          <form className="auth-form" onSubmit={handleVerifyOtp}>
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="otp">Enter Verification Code (OTP)</label>
                <button
                  type="button"
                  className="text-btn"
                  onClick={handleResetStep}
                >
                  Change Email
                </button>
              </div>
              <input
                id="otp"
                type="text"
                maxLength="6"
                placeholder="6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                disabled={loading || otpVerified}
                className="otp-input"
              />
            </div>

            <button
              type="submit"
              className="primary-btn full-width"
              disabled={loading || !otp || otpVerified}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {/* Resend OTP Section with Timer */}
            <div className="resend-container">
              <span>Didn't receive code?</span>
              {timer > 0 ? (
                <span className="timer-text">Resend in {timer}s</span>
              ) : (
                <button
                  type="button"
                  className="text-btn resend-btn"
                  onClick={handleSendOtp}
                  disabled={loading || otpVerified}
                >
                  Resend OTP
                </button>
              )}
            </div>
          </form>
        )}

        <p className="auth-footer-link">
          Back to <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}