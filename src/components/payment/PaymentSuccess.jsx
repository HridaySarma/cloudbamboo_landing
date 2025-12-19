import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyPayUHash } from '../../services/payuService';
import { parseQueryParams, logPaymentEvent, logPaymentError } from '../../utils/paymentHelpers';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Parse response parameters from URL
        const params = parseQueryParams(location.search);
        
        if (!params.txnid || !params.status) {
          setError('Invalid payment response');
          setVerifying(false);
          return;
        }

        logPaymentEvent('PAYMENT_RESPONSE_RECEIVED', {
          txnid: params.txnid,
          status: params.status,
          mihpayid: params.mihpayid
        });

        // Verify hash with backend
        const isValid = await verifyPayUHash(params);
        
        if (isValid) {
          setVerified(true);
          setTransactionData({
            txnid: params.txnid,
            mihpayid: params.mihpayid,
            amount: params.amount,
            status: params.status,
            mode: params.mode,
            productinfo: params.productinfo,
            firstname: params.firstname,
            email: params.email,
            bankcode: params.bankcode,
            bank_ref_num: params.bank_ref_num,
            field9: params.field9 // Payment message
          });
          
          logPaymentEvent('PAYMENT_VERIFIED', {
            txnid: params.txnid,
            mihpayid: params.mihpayid
          });
        } else {
          setError('Payment verification failed. Please contact support.');
          logPaymentError('VERIFICATION_FAILED', new Error('Hash mismatch'), {
            txnid: params.txnid
          });
        }
      } catch (err) {
        setError('Unable to verify payment. Please contact support.');
        logPaymentError('VERIFICATION_ERROR', err, {});
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [location.search]);

  const getPaymentModeDisplay = (mode) => {
    const modes = {
      'CC': 'Credit Card',
      'DC': 'Debit Card',
      'NB': 'Net Banking',
      'UPI': 'UPI',
      'CASH': 'Cash Card',
      'EMI': 'EMI'
    };
    return modes[mode] || mode || 'Unknown';
  };

  if (verifying) {
    return (
      <div className="payment-result-page">
        <div className="result-container">
          <div className="verifying-card">
            <div className="spinner-large"></div>
            <h2>Verifying Payment...</h2>
            <p>Please wait while we confirm your transaction</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !verified) {
    return (
      <div className="payment-result-page">
        <div className="result-container">
          <div className="result-card error-result">
            <div className="result-icon error-icon">⚠️</div>
            <h1>Verification Failed</h1>
            <p className="result-message">{error || 'Unable to verify payment'}</p>
            <div className="result-actions">
              <button 
                className="btn-primary" 
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => navigate('/support')}
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-result-page">
      {/* Animated Background */}
      <div className="result-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="success-particles"></div>
      </div>

      <div className="result-container">
        <div className="result-card success-result">
          {/* Success Animation */}
          <div className="success-animation">
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="result-title">Payment Successful!</h1>
          <p className="result-subtitle">
            Your subscription has been activated successfully
          </p>

          {/* Transaction Details */}
          <div className="transaction-details-card">
            <h3>Transaction Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Transaction ID</span>
                <span className="detail-value transaction-id">
                  {transactionData.txnid}
                </span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">PayU Payment ID</span>
                <span className="detail-value">
                  {transactionData.mihpayid}
                </span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Amount Paid</span>
                <span className="detail-value amount">
                  ₹{parseFloat(transactionData.amount).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Payment Method</span>
                <span className="detail-value">
                  {getPaymentModeDisplay(transactionData.mode)}
                </span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Plan</span>
                <span className="detail-value">
                  {transactionData.productinfo}
                </span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className="detail-value status-badge success">
                  {transactionData.status}
                </span>
              </div>

              {transactionData.bank_ref_num && (
                <div className="detail-item full-width">
                  <span className="detail-label">Bank Reference Number</span>
                  <span className="detail-value">
                    {transactionData.bank_ref_num}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="next-steps-card">
            <h4>What's Next?</h4>
            <ul className="steps-list">
              <li>
                <span className="step-icon">📧</span>
                <span>A confirmation email has been sent to {transactionData.email}</span>
              </li>
              <li>
                <span className="step-icon">🎉</span>
                <span>Your subscription is now active and ready to use</span>
              </li>
              <li>
                <span className="step-icon">📊</span>
                <span>Access your dashboard to manage your subscription</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="result-actions">
            <button 
              className="btn-primary" 
              onClick={() => navigate('/dashboard')}
            >
              <span className="btn-icon">🏠</span>
              <span>Go to Dashboard</span>
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => window.print()}
            >
              <span className="btn-icon">🖨️</span>
              <span>Print Receipt</span>
            </button>
          </div>

          {/* Support Info */}
          <div className="support-info">
            <p>
              Need help? Contact our support team at{' '}
              <a href="mailto:support@watchpoint.com">support@watchpoint.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
