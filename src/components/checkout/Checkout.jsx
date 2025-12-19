import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  generateTransactionId, 
  generatePayUHash, 
  submitToPayU, 
  validatePayUConfig 
} from '../../services/payuService';
import { 
  preparePayUParams, 
  calculateOrderTotals, 
  validateCheckoutData,
  ERROR_MESSAGES,
  logPaymentError,
  logPaymentEvent
} from '../../utils/paymentHelpers';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Get checkout data from navigation state
  const checkoutData = location.state || {};
  const { plan, userCount = 50, pricing } = checkoutData;

  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(''); // 'processing', 'redirecting'
  const [transactionId, setTransactionId] = useState(''); // Will be generated on payment

  // Redirect if no plan data or user not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!plan) {
      navigate('/dashboard');
    }
  }, [plan, user, navigate]);

  if (!plan || !user) return null;

  // Calculate transaction details using helper
  const totals = calculateOrderTotals({
    pricePerUser: plan.price,
    userCount,
    discountPercent: pricing?.percentage || 0
  });
  
  const { subtotal, discount, discountPercent, gst, total } = totals;
  const tax = Math.round(gst); // For display

  const handlePayment = async () => {
    try {
      // Clear previous errors
      setError(null);
      
      // Validate terms agreement
      if (!agreed) {
        setError(ERROR_MESSAGES.TERMS_NOT_AGREED);
        return;
      }

      // Validate PayU configuration
      const configValidation = validatePayUConfig();
      if (!configValidation.valid) {
        setError(ERROR_MESSAGES.CONFIG_MISSING);
        logPaymentError('CONFIG_ERROR', new Error('Missing env vars'), {
          missing: configValidation.missing,
          userId: user?.uid
        });
        return;
      }

      // Validate checkout data
      const dataValidation = validateCheckoutData({
        plan,
        userCount,
        total,
        user
      });
      
      if (!dataValidation.valid) {
        const errorMsg = `${ERROR_MESSAGES.INVALID_CHECKOUT_DATA}: ${dataValidation.errors.join(', ')}`;
        setError(errorMsg);
        logPaymentError('VALIDATION_ERROR', new Error('Invalid checkout data'), {
          errors: dataValidation.errors,
          userId: user?.uid,
          checkoutData: { plan: plan?.name, userCount, total, userEmail: user?.email }
        });
        return;
      }

      setLoading(true);
      setPaymentStatus('processing');

      // Generate unique transaction ID
      const txnid = generateTransactionId();
      setTransactionId(txnid); // Store for display
      
      logPaymentEvent('PAYMENT_INITIATED', {
        txnid,
        amount: total,
        plan: plan.name,
        userCount,
        userId: user?.uid
      });

      // Prepare PayU parameters
      const payuParams = preparePayUParams({
        plan,
        userCount,
        total,
        user
      }, txnid);

      // Request hash from backend
      let hash;
      try {
        hash = await generatePayUHash(payuParams);
        logPaymentEvent('HASH_GENERATED', { txnid });
      } catch (hashError) {
        setError(ERROR_MESSAGES.HASH_GENERATION_FAILED);
        logPaymentError('HASH_ERROR', hashError, {
          txnid,
          userId: user?.uid
        });
        setLoading(false);
        setPaymentStatus('');
        return;
      }

      // Add hash to parameters
      const finalParams = {
        ...payuParams,
        hash
      };

      setPaymentStatus('redirecting');
      
      logPaymentEvent('REDIRECTING_TO_PAYU', { txnid });

      // Submit form to PayU
      submitToPayU(finalParams);

    } catch (err) {
      setError(ERROR_MESSAGES.UNKNOWN_ERROR);
      logPaymentError('PAYMENT_ERROR', err, {
        userId: user?.uid
      });
      setLoading(false);
      setPaymentStatus('');
    }
  };

  const getPlanIcon = (planName) => {
    const icons = {
      'Vigilance': '🛡️',
      'Sentinel': '💳',
      'Guardian': '🚨'
    };
    return icons[planName] || '📦';
  };

  const getPlanColor = (planName) => {
    const colors = {
      'Vigilance': '#667eea',
      'Sentinel': '#4ecdc4',
      'Guardian': '#ff6b6b'
    };
    return colors[planName] || '#667eea';
  };

  return (
    <div className="checkout-page">
      {/* Animated Background */}
      <div className="checkout-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-pattern"></div>
      </div>

      {/* Header */}
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <span className="back-icon">←</span>
          <span>Back</span>
        </button>
        <div className="header-title">
          <h1>Secure Checkout</h1>
          <p>Complete your subscription purchase</p>
        </div>
        <div className="security-badge">
          <span className="badge-icon">🔒</span>
          <span>Secure Payment</span>
        </div>
      </div>

      <div className="checkout-container">
        {/* Main Content */}
        <div className="checkout-content">
          
          {/* User Information Card */}
          <div className="checkout-card user-info-card">
            <div className="card-header">
              <div className="header-icon">👤</div>
              <h2>Account Information</h2>
            </div>
            <div className="card-body">
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Name</span>
                  <span className="info-value">{user?.displayName || 'User'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{user?.email || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{user?.phoneNumber || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">User ID</span>
                  <span className="info-value user-id">{user?.uid?.substring(0, 12)}...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Information Card */}
          <div className="checkout-card plan-info-card">
            <div className="card-header">
              <div className="header-icon">{getPlanIcon(plan.name)}</div>
              <div className="header-text">
                <h2>{plan.name} Plan</h2>
                <p className="header-subtitle">{plan.tagline}</p>
              </div>
            </div>
            <div className="card-body">
              <div className="plan-showcase" style={{ '--plan-color': getPlanColor(plan.name) }}>
                <div className="plan-details">
                  <div className="detail-row">
                    <span className="detail-label">Price per user</span>
                    <span className="detail-value">₹{plan.price}/month</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Number of users</span>
                    <span className="detail-value">{userCount} users</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Billing cycle</span>
                    <span className="detail-value">Monthly</span>
                  </div>
                </div>

                {plan.features && plan.features.length > 0 && (
                  <div className="plan-features-preview">
                    <h4>Key Features</h4>
                    <ul>
                      {plan.features.slice(0, 5).map((feature, index) => (
                        <li key={index}>
                          <span className="feature-check">✓</span>
                          <span>{typeof feature === 'string' ? feature : feature.name}</span>
                        </li>
                      ))}
                      {plan.features.length > 5 && (
                        <li className="more-features">
                          <span>+ {plan.features.length - 5} more features</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Transaction Information Card */}
          <div className="checkout-card transaction-info-card">
            <div className="card-header">
              <div className="header-icon">📋</div>
              <h2>Transaction Details</h2>
            </div>
            <div className="card-body">
              <div className="transaction-details">
                <div className="transaction-row">
                  <span className="transaction-label">Transaction ID</span>
                  <span className="transaction-value transaction-id">
                    {transactionId || 'Will be generated on payment'}
                  </span>
                </div>
                <div className="transaction-row">
                  <span className="transaction-label">Date</span>
                  <span className="transaction-value">{new Date().toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <div className="transaction-row">
                  <span className="transaction-label">Time</span>
                  <span className="transaction-value">{new Date().toLocaleTimeString('en-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</span>
                </div>
                <div className="transaction-row">
                  <span className="transaction-label">Payment Method</span>
                  <span className="transaction-value">
                    <span className="payment-badge">To be selected</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="checkout-card error-card">
              <div className="error-content">
                <span className="error-icon">⚠️</span>
                <span className="error-message">{error}</span>
              </div>
              <button 
                className="error-dismiss" 
                onClick={() => setError(null)}
                aria-label="Dismiss error"
              >
                ×
              </button>
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="checkout-card terms-card">
            <label className="terms-checkbox">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              <span className="terms-text">
                I agree to the <a href="/terms-and-conditions" target="_blank">Terms and Conditions</a> and <a href="/privacy-policy" target="_blank">Privacy Policy</a>
              </span>
            </label>
          </div>
        </div>

        {/* Sidebar - Order Summary */}
        <div className="checkout-sidebar">
          <div className="order-summary-card">
            <div className="summary-header">
              <h3>Order Summary</h3>
            </div>
            
            <div className="summary-body">
              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">₹{subtotal.toLocaleString()}</span>
              </div>
              
              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span className="summary-label">
                    Discount ({discountPercent}%)
                    <span className="discount-badge">SAVE</span>
                  </span>
                  <span className="summary-value discount-value">-₹{discount.toLocaleString()}</span>
                </div>
              )}
              
              <div className="summary-row">
                <span className="summary-label">GST (18%)</span>
                <span className="summary-value">₹{tax.toLocaleString()}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total-row">
                <span className="summary-label">Total Amount</span>
                <span className="summary-value total-value">₹{total.toLocaleString()}</span>
              </div>

              <div className="billing-info">
                <div className="billing-row">
                  <span className="billing-icon">📅</span>
                  <span className="billing-text">Billed monthly</span>
                </div>
                <div className="billing-row">
                  <span className="billing-icon">🔄</span>
                  <span className="billing-text">Cancel anytime</span>
                </div>
                <div className="billing-row">
                  <span className="billing-icon">💳</span>
                  <span className="billing-text">Secure payment</span>
                </div>
              </div>
            </div>

            <div className="summary-footer">
              <button 
                className="pay-now-button" 
                onClick={handlePayment}
                disabled={loading || !agreed}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    <span>
                      {paymentStatus === 'redirecting' 
                        ? 'Redirecting to payment gateway...' 
                        : 'Processing...'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="btn-icon">💳</span>
                    <span>Pay Now</span>
                    <span className="btn-amount">₹{total.toLocaleString()}</span>
                  </>
                )}
              </button>
              
              <div className="security-info">
                <span className="security-icon">🔒</span>
                <span className="security-text">Your payment information is secure and encrypted</span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span className="trust-text">256-bit SSL Encryption</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span className="trust-text">PCI DSS Compliant</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span className="trust-text">Money-back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
