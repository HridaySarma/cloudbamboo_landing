import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute - Guards routes that require authentication
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - Component to render if authenticated
 * @param {boolean} props.requirePhoneVerification - Whether phone verification is required (default: true)
 */
const ProtectedRoute = ({ children, requirePhoneVerification = true }) => {
  const { user, loading, isPhoneVerified } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
        color: '#ffffff',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid rgba(102, 126, 234, 0.2)',
            borderTopColor: '#667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem',
          }}></div>
          <p>Loading...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Not logged in - redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but phone not verified - redirect to verification
  if (requirePhoneVerification && !isPhoneVerified) {
    return <Navigate to="/verify" state={{ from: location }} replace />;
  }

  return children;
};

/**
 * PublicRoute - Guards routes that should only be accessible when NOT authenticated
 * Redirects authenticated users to dashboard
 */
export const PublicRoute = ({ children }) => {
  const { user, loading, isPhoneVerified } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
        color: '#ffffff',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid rgba(102, 126, 234, 0.2)',
            borderTopColor: '#667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem',
          }}></div>
          <p>Loading...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Fully authenticated - redirect to dashboard
  if (user && isPhoneVerified) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  // Partially authenticated (needs phone verification)
  if (user && !isPhoneVerified) {
    return <Navigate to="/verify" replace />;
  }

  return children;
};

/**
 * PhoneVerificationRoute - Special route for phone verification page
 * Only accessible when logged in but phone not yet verified
 */
export const PhoneVerificationRoute = ({ children }) => {
  const { user, loading, isPhoneVerified } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
        color: '#ffffff',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid rgba(102, 126, 234, 0.2)',
            borderTopColor: '#667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem',
          }}></div>
          <p>Loading...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Not logged in - redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Already verified - redirect to dashboard
  if (isPhoneVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;

