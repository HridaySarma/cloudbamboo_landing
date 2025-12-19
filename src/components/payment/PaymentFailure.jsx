import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { parseQueryParams, logPaymentEvent } from '../../utils/paymentHelpers';
import './PaymentFailure.css';

const PaymentFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [failureData, setFailureData] = useState(null);

  useEffect(() => {
    // Parse failure parameters from URL
    const params = parseQueryParams(location.search);
    
    if (params.txnid) {
      setFailureData({
        txnid: params.txnid,
        status: params.status || 'failed',
        error: params.error || 'UNKNOWN',
        errorMessage: params.error_Message || 'Payment failed',
        amount: params.amount,
        productinfo: params.productinfo,
        firstname: params.firstname,
        email: params.email
      });
      
      logPaymentEvent('PAYMENT_FAILED', {
        txnid: params.txnid,
        error: params.error,
        errorMessage: params.error_Message
      });
    }
  }, [location.search]);

  const getErrorMessage = (error, errorMessage) => {
    // Map common error codes to user-friendly messages
    const errorMap = {
      'E000': 'Payment was cancelled',
      'E001': 'Insufficient funds',
      'E002': 'Card declined by bank',
      'E003': 'Invalid card details',
      'E004': 'Transaction timeout',
      'E005': 'Bank server error',
      'UNKNOWN': 'Payment could not be processed'
    };
    
    return errorMap[error] || errorMessage || 'Payment failed';
  };

  const getErrorIcon = (error) => {
    if (error === 'E000') return '🚫'; // Cancelled
    if (error === 'E001') return '💰'; // Insufficient funds
    if (error === 'E002' || error === 'E003') return '💳'; // Card issues
    return '⚠️'; // Generic error
  };

  const handleRetry = () => {
    // Navigate back to checkout with the same data
    navigate(-1);
  };

  const handleBackToPlans = () => {
    navigate('/dashboard');
  };

  if (!failureData) {
    return (
      <div className="payment-result-page">
        <div className="result-container">
          <div className="result-card">
            <div className="spinner-large"></div>
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-result-page failure-page">
      {/* Animated Background */}
      <div className="result-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="result-container">
        <div className="result-card failure-result">
          {/* Failure Icon */}
          <div className="failure-animation">
            <div className="failure-circle">
              <div className="failure-icon">
                {getErrorIcon(failureData.error)}
              </div>
            </div>
          </div>

          {/* Failure Message */}
          <h1 className="result-title">Payment Failed</h1>
          <p className="result-subtitle">
            {getErrorMessage(failureData.error, failureData.errorMessage)}
          </p>

          {/* Transaction Details */}
          <div className="transaction-details-card">
            <h3>Transaction Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Transaction ID</span>
                <span className="detail-value transaction-id">
                  {failureData.txnid}
                </span>
              </div>
              
              {failureData.amount && (
                <div className="detail-item">
                  <span className="detail-label">Amount</span>
                  <span className="detail-value">
                    ₹{parseFloat(failureData.amount).toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </div>
              )}
              
              {failureData.productinfo && (
                <div className="detail-item full-width">
                  <span className="detail-label">Plan</span>
                  <span className="detail-value">
                    {failureData.productinfo}
                  </span>
                </div>
              )}
              
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className="detail-value status-badge failed">
                  {failureData.status}
                </span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Error Code</span>
                <span className="detail-value error-code">
                  {failureData.error}
                </span>
              </div>
            </div>
          </div>

          {/* Help Card */}
          <div className="help-card">
            <h4>What can you do?</h4>
            <ul className="help-list">
              <li>
                <span className="help-icon">🔄</span>
                <span>Try again with a different payment method</span>
              </li>
              <li>
                <span className="help-icon">💳</span>
                <span>Check your card details and available balance</span>
              </li>
              <li>
                <span className="help-icon">🏦</span>
                <span>Contact your bank if the issue persists</span>
              </li>
              <li>
                <span className="help-icon">📞</span>
                <span>Reach out to our support team for assistance</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="result-actions">
            <button 
              className="btn-primary" 
              onClick={handleRetry}
            >
              <span className="btn-icon">🔄</span>
              <span>Retry Payment</span>
            </button>
            <button 
              className="btn-secondary" 
              onClick={handleBackToPlans}
            >
              <span className="btn-icon">🏠</span>
              <span>Back to Dashboard</span>
            </button>
          </div>

          {/* Support Info */}
          <div className="support-info">
            <p>
              Need help? Contact our support team at{' '}
              <a href="mailto:support@watchpoint.com">support@watchpoint.com</a>
              {' '}or call <a href="tel:+911234567890">+91 123 456 7890</a>
            </p>
            <p className="reference-note">
              Please quote Transaction ID: <strong>{failureData.txnid}</strong> when contacting support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
