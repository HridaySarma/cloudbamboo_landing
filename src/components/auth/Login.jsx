import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword, isConfigured } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import logoImage from '../../assets/logo_modern.png';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isPartiallyAuthenticated } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const firebaseConfigured = isConfigured();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else if (isPartiallyAuthenticated) {
      navigate('/verify');
    }
  }, [isAuthenticated, isPartiallyAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      navigate('/verify');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        await signUpWithEmail(formData.email, formData.password);
      } else {
        await signInWithEmail(formData.email, formData.password);
      }
      navigate('/verify');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!formData.email) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    try {
      await resetPassword(formData.email);
      setSuccess('Password reset email sent! Check your inbox.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isForgotPassword) {
    return (
      <div className="login-page">
        <div className="login-background">
          <div className="animated-gradient"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
        </div>
        
        <div className="login-container">
          <div className={`login-card ${mounted ? 'mounted' : ''}`}>
            <div className="login-header">
              <Link to="/" className="login-logo-link">
                <div className="logo-wrapper">
                  <img src={logoImage} alt="CloudBamboo" className="login-logo" />
                  <div className="logo-glow"></div>
                </div>
              </Link>
              <h1 className="login-title">
                <span className="title-gradient">Reset Password</span>
              </h1>
              <p className="login-subtitle">
                Enter your email to receive a password reset link
              </p>
            </div>

            <form onSubmit={handleForgotPassword} className="login-form">
              {error && <div className="login-error">{error}</div>}
              {success && <div className="login-success">{success}</div>}

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <svg className="label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="login-btn login-btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    Sending...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              <button
                type="button"
                className="login-btn login-btn-text"
                onClick={() => {
                  setIsForgotPassword(false);
                  setError('');
                  setSuccess('');
                }}
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="animated-gradient"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
        <div className="grid-overlay"></div>
      </div>
      
      <div className="login-container">
        {/* Left Side - Login Form */}
        <div className={`login-card ${mounted ? 'mounted' : ''}`}>
          <div className="login-header">
            <Link to="/" className="login-logo-link">
              <div className="logo-wrapper">
                <img src={logoImage} alt="Company Logo" className="login-logo" />
                <div className="logo-glow"></div>
              </div>
            </Link>
            <h1 className="login-title">
              <span className="title-gradient">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </span>
            </h1>
            <p className="login-subtitle">
              {isSignUp
                ? 'Sign up to get started with WatchPoint'
                : 'Sign in to access your WatchPoint dashboard'
              }
            </p>
          </div>

          {!firebaseConfigured && (
            <div className="login-error" style={{ background: 'rgba(254, 202, 87, 0.15)', borderColor: 'rgba(254, 202, 87, 0.3)', color: '#feca57' }}>
              <strong>Setup Required:</strong> Firebase is not configured. Create a <code>.env</code> file with your Firebase credentials. 
              <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" style={{ color: '#feca57', marginLeft: '4px' }}>
                Get credentials →
              </a>
            </div>
          )}

          {error && <div className="login-error">{error}</div>}

          {/* Google Sign In */}
          <button
            type="button"
            className="login-btn login-btn-google"
            onClick={handleGoogleSignIn}
            disabled={loading || !firebaseConfigured}
          >
            <svg className="google-icon" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="login-divider">
            <span>or</span>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <svg className="label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <svg className="label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password
              </label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  minLength={6}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  <svg className="label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Confirm your password"
                    required
                    disabled={loading}
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {!isSignUp && (
              <button
                type="button"
                className="forgot-password-link"
                onClick={() => setIsForgotPassword(true)}
              >
                Forgot password?
              </button>
            )}

            <button
              type="submit"
              className="login-btn login-btn-primary"
              disabled={loading || !firebaseConfigured}
            >
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  {isSignUp ? 'Creating account...' : 'Signing in...'}
                </span>
              ) : (
                <>
                  <svg className="login-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                className="toggle-auth-mode"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setFormData({ email: '', password: '', confirmPassword: '' });
                }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>

        {/* Right Side - Branding Visual */}
        <div className={`login-visual-panel ${mounted ? 'mounted' : ''}`}>
          <div className="visual-background">
            <div className="visual-gradient"></div>
            <div className="visual-pattern"></div>
            <div className="visual-orbs">
              <div className="orb orb-1"></div>
              <div className="orb orb-2"></div>
              <div className="orb orb-3"></div>
            </div>
          </div>
          <div className="visual-content">
            <h2 className="visual-title">
              <span className="title-line">WatchPoint</span>
            </h2>
            <p className="visual-tagline">Workforce Management System</p>
            <p className="visual-description">
              Streamline your workforce operations with intelligent tracking, 
              real-time insights, and powerful management tools designed for modern teams.
            </p>
            <div className="visual-features">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Real-time Tracking</h3>
                  <p className="feature-text">Monitor workforce activity instantly</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Secure & Encrypted</h3>
                  <p className="feature-text">Enterprise-grade data protection</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Advanced Analytics</h3>
                  <p className="feature-text">Data-driven workforce insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

