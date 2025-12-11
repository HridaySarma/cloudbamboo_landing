import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { sendOTP, verifyOTP, resendOTP, getOTPExpiryTime } from '../../services/otpService';
import logoImage from '../../assets/logo_modern.png';
import './PhoneVerification.css';

const PhoneVerification = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isPartiallyAuthenticated, setPhoneVerified, signOut } = useAuth();
  
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('91');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [debugOTP, setDebugOTP] = useState(null);
  
  const otpInputRefs = useRef([]);

  // Redirect logic
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else if (!isPartiallyAuthenticated && !user) {
      navigate('/login');
    }
  }, [isAuthenticated, isPartiallyAuthenticated, user, navigate]);

  // Resend timer countdown
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhone(value);
      setError('');
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await sendOTP(phone, countryCode);
      if (result.success) {
        setStep('otp');
        setResendTimer(30);
        setSuccess(result.message);
        // For development/testing
        if (result.debugOTP) {
          setDebugOTP(result.debugOTP);
        }
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      otpInputRefs.current[5]?.focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = verifyOTP(phone, countryCode, otpValue);
      if (result.success) {
        setSuccess(result.message);
        setPhoneVerified(`+${countryCode}${phone}`);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setError(result.message);
        // Clear OTP on error
        setOtp(['', '', '', '', '', '']);
        otpInputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    setError('');
    setOtp(['', '', '', '', '', '']);

    try {
      const result = await resendOTP(phone, countryCode);
      if (result.success) {
        setResendTimer(30);
        setSuccess('New OTP sent successfully!');
        if (result.debugOTP) {
          setDebugOTP(result.debugOTP);
        }
        setTimeout(() => setSuccess(''), 3000);
        otpInputRefs.current[0]?.focus();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp(['', '', '', '', '', '']);
    setError('');
    setSuccess('');
    setDebugOTP(null);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const countryCodes = [
    { code: '91', country: 'India', flag: '🇮🇳' },
    { code: '1', country: 'USA', flag: '🇺🇸' },
    { code: '44', country: 'UK', flag: '🇬🇧' },
    { code: '971', country: 'UAE', flag: '🇦🇪' },
    { code: '65', country: 'Singapore', flag: '🇸🇬' },
    { code: '61', country: 'Australia', flag: '🇦🇺' },
  ];

  return (
    <div className="verify-page">
      <div className="verify-background">
        <div className="verify-gradient-orb orb-1"></div>
        <div className="verify-gradient-orb orb-2"></div>
      </div>

      <div className="verify-container">
        <div className="verify-card">
          <div className="verify-header">
            <Link to="/" className="verify-logo-link">
              <img src={logoImage} alt="CloudBamboo" className="verify-logo" />
            </Link>
            
            {user && (
              <div className="user-info">
                <span className="user-greeting">Welcome, {user.displayName || user.email}</span>
              </div>
            )}

            <h1 className="verify-title">
              {step === 'phone' ? 'Verify Your Phone' : 'Enter OTP'}
            </h1>
            <p className="verify-subtitle">
              {step === 'phone'
                ? 'Enter your phone number to receive a verification code'
                : `We've sent a 6-digit code to +${countryCode} ${phone}`
              }
            </p>
          </div>

          {error && <div className="verify-error">{error}</div>}
          {success && <div className="verify-success">{success}</div>}
          
          {/* Debug OTP display for development */}
          {debugOTP && import.meta.env.DEV && (
            <div className="verify-debug">
              <strong>Debug OTP:</strong> {debugOTP}
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="verify-form">
              <div className="phone-input-group">
                <div className="country-select-wrapper">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="country-select"
                    disabled={loading}
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} +{c.code}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="phone-input"
                  placeholder="Enter phone number"
                  disabled={loading}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="verify-btn verify-btn-primary"
                disabled={loading || phone.length !== 10}
              >
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    Sending OTP...
                  </span>
                ) : (
                  'Send OTP'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="verify-form">
              <div className="otp-input-group" onPaste={handleOtpPaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="otp-input"
                    disabled={loading}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="verify-btn verify-btn-primary"
                disabled={loading || otp.join('').length !== 6}
              >
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    Verifying...
                  </span>
                ) : (
                  'Verify OTP'
                )}
              </button>

              <div className="resend-section">
                <p className="resend-text">
                  Didn't receive the code?{' '}
                  {resendTimer > 0 ? (
                    <span className="resend-timer">Resend in {resendTimer}s</span>
                  ) : (
                    <button
                      type="button"
                      className="resend-btn"
                      onClick={handleResendOTP}
                      disabled={loading}
                    >
                      Resend OTP
                    </button>
                  )}
                </p>
              </div>

              <button
                type="button"
                className="verify-btn verify-btn-text"
                onClick={handleBackToPhone}
                disabled={loading}
              >
                ← Change Phone Number
              </button>
            </form>
          )}

          <div className="verify-footer">
            <button
              type="button"
              className="logout-link"
              onClick={handleLogout}
            >
              Sign out and use different account
            </button>
          </div>
        </div>

        <div className="verify-info">
          <div className="info-box">
            <div className="info-icon-large">🔒</div>
            <h3>Secure Verification</h3>
            <p>
              We use OTP verification to ensure your account security. 
              Your phone number will be used for important notifications 
              and account recovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;

