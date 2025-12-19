import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubscriptionCard.css';

const SubscriptionCard = ({ subscription, detailed = false, onUpgrade }) => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(subscription?.totalUsers || 1);
  const [showUserModal, setShowUserModal] = useState(false);

  if (!subscription) {
    return (
      <div className="subscription-card-v2">
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No Active Subscription</h3>
          <p>Choose a plan to unlock powerful features</p>
          <button className="cta-button primary" onClick={onUpgrade}>
            <span>Browse Plans</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDaysRemaining = () => {
    const end = new Date(subscription.currentPeriodEnd);
    const now = new Date();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const getPlanConfig = () => {
    const configs = {
      vigilance: { icon: '🛡️', color: '#667eea', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      sentinel: { icon: '💳', color: '#4ecdc4', gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)' },
      guardian: { icon: '🚨', color: '#ff6b6b', gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)' },
    };
    return configs[subscription.planId] || { icon: '📋', color: '#667eea', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' };
  };

  const planConfig = getPlanConfig();
  const totalAmount = subscription.pricePerUser * subscription.totalUsers;
  const daysLeft = getDaysRemaining();
  const progressPercent = Math.max(0, Math.min(100, (daysLeft / 30) * 100));

  const handleUserUpdate = () => {
    setShowUserModal(true);
  };

  const handleUserChange = (delta) => {
    const newCount = Math.max(1, userCount + delta);
    setUserCount(newCount);
  };

  const handleConfirmUserChange = () => {
    if (userCount > subscription.totalUsers) {
      // Navigate to checkout for immediate payment
      const plan = {
        id: subscription.planId,
        name: subscription.plan,
        price: subscription.pricePerUser,
        tagline: subscription.tagline || 'Subscription Plan',
        features: subscription.features || []
      };

      const pricing = {
        base: subscription.pricePerUser * userCount,
        discount: 0,
        percentage: 0,
        final: subscription.pricePerUser * userCount
      };

      navigate('/checkout', {
        state: {
          plan,
          userCount,
          pricing
        }
      });
    } else {
      // Schedule for next billing cycle
      console.log('Scheduling user count change to:', userCount);
      alert(`User count will be updated to ${userCount} from next billing cycle. New monthly cost: ₹${(subscription.pricePerUser * userCount).toLocaleString()}`);
      setShowUserModal(false);
    }
  };

  return (
    <>
      <div className={`subscription-card-v2 ${detailed ? 'detailed' : ''}`}>
        {/* Header with Plan Badge */}
        <div className="sub-header">
          <div className="plan-badge-v2" style={{ background: planConfig.gradient }}>
            <span className="badge-icon">{planConfig.icon}</span>
            <div className="badge-content">
              <span className="badge-label">Current Plan</span>
              <h2 className="badge-title">{subscription.plan}</h2>
            </div>
          </div>
          <div className={`status-pill ${subscription.status}`}>
            <span className="pulse-dot"></span>
            {subscription.status}
          </div>
        </div>

        {/* Billing Summary */}
        <div className="billing-summary">
          <div className="cost-display">
            <span className="cost-label">Monthly Total</span>
            <div className="cost-amount">
              <span className="currency">₹</span>
              <span className="amount">{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="billing-grid">
            <div className="billing-metric">
              <div className="metric-icon">👥</div>
              <div className="metric-content">
                <span className="metric-value">{subscription.totalUsers}</span>
                <span className="metric-label">Active Users</span>
              </div>
              <button className="metric-action" onClick={handleUserUpdate} title="Manage users">
                <span>⚙️</span>
              </button>
            </div>

            <div className="billing-metric">
              <div className="metric-icon">💰</div>
              <div className="metric-content">
                <span className="metric-value">₹{subscription.pricePerUser}</span>
                <span className="metric-label">Per User</span>
              </div>
            </div>
          </div>
        </div>

        {/* Renewal Info */}
        <div className="renewal-section">
          <div className="renewal-header">
            <div className="renewal-info">
              <span className="renewal-label">Next Renewal</span>
              <span className="renewal-date">{formatDate(subscription.currentPeriodEnd)}</span>
            </div>
            <div className="days-remaining">
              <span className="days-count">{daysLeft}</span>
              <span className="days-label">days left</span>
            </div>
          </div>
          <div className="renewal-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercent}%`, background: planConfig.gradient }}
              ></div>
            </div>
          </div>
        </div>

        {/* User Count Adjuster (Detailed View) */}
        {detailed && (
          <div className="user-adjuster-section">
            <div className="adjuster-header">
              <h4 className="adjuster-title">👥 Adjust User Count</h4>
              <p className="adjuster-subtitle">Scale your team size up or down</p>
            </div>
            
            <div className="user-adjuster-controls">
              <button 
                className="adjuster-btn decrement"
                onClick={() => handleUserChange(-1)}
                disabled={userCount <= 1}
              >
                <span className="btn-icon">−</span>
              </button>
              
              <div className="adjuster-display">
                <input
                  type="number"
                  value={userCount}
                  onChange={(e) => setUserCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="adjuster-input"
                  min="1"
                />
              </div>
              
              <button 
                className="adjuster-btn increment"
                onClick={() => handleUserChange(1)}
              >
                <span className="btn-icon">+</span>
              </button>
            </div>
            <span className="adjuster-label">users</span>

            <div className="cost-comparison">
              <div className="comparison-row current">
                <span className="comparison-label">Current</span>
                <span className="comparison-value">
                  {subscription.totalUsers} users × ₹{subscription.pricePerUser} = ₹{(subscription.totalUsers * subscription.pricePerUser).toLocaleString()}
                </span>
              </div>
              
              {userCount !== subscription.totalUsers && (
                <>
                  <div className="comparison-arrow">→</div>
                  <div className="comparison-row new">
                    <span className="comparison-label">New</span>
                    <span className="comparison-value highlight">
                      {userCount} users × ₹{subscription.pricePerUser} = ₹{(userCount * subscription.pricePerUser).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="cost-difference">
                    {userCount > subscription.totalUsers ? (
                      <span className="diff-increase">
                        +₹{((userCount - subscription.totalUsers) * subscription.pricePerUser).toLocaleString()} additional per month
                      </span>
                    ) : (
                      <span className="diff-decrease">
                        −₹{((subscription.totalUsers - userCount) * subscription.pricePerUser).toLocaleString()} savings per month
                      </span>
                    )}
                  </div>

                  {userCount > subscription.totalUsers ? (
                    <>
                      <div className="payment-notice increase">
                        <span className="notice-icon">⚡</span>
                        <span className="notice-text">Pay only for the additional {userCount - subscription.totalUsers} user{userCount - subscription.totalUsers > 1 ? 's' : ''}</span>
                      </div>
                      <button className="pay-now-btn increase" onClick={handleConfirmUserChange}>
                        <span className="btn-icon">💳</span>
                        <span>Pay Now</span>
                        <span className="btn-amount">₹{((userCount - subscription.totalUsers) * subscription.pricePerUser).toLocaleString()}</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="payment-notice decrease">
                        <span className="notice-icon">📅</span>
                        <span className="notice-text">Changes will apply from next billing cycle</span>
                      </div>
                      <div className="decrease-actions">
                        <button className="schedule-btn" onClick={handleConfirmUserChange}>
                          <span className="btn-icon">✓</span>
                          <span>Confirm Change</span>
                          <span className="btn-detail">Next cycle</span>
                        </button>
                        <button className="pay-next-month-btn" onClick={handleConfirmUserChange}>
                          <span className="btn-icon">💳</span>
                          <span>Pay for Next Month</span>
                          <span className="btn-amount">₹{(userCount * subscription.pricePerUser).toLocaleString()}</span>
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Features (Detailed View) */}
        {detailed && subscription.features && (
          <div className="features-showcase">
            <h4 className="features-title">✨ Included Features</h4>
            <div className="features-grid">
              {subscription.features.map((feature, index) => (
                <div key={index} className="feature-tag">
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="sub-actions">
          {subscription.planId !== 'guardian' && (
            <button className="cta-button primary" onClick={onUpgrade}>
              <span>Upgrade Plan</span>
              <span className="arrow">↗</span>
            </button>
          )}
          <a 
            href="mailto:support@cloudbamboo.in?subject=Subscription Support"
            className="cta-button secondary"
          >
            <span>Contact Support</span>
          </a>
        </div>
      </div>

      {/* User Management Modal */}
      {showUserModal && (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="user-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Manage Users</h3>
              <button className="modal-close" onClick={() => setShowUserModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="user-counter">
                <button 
                  className="counter-btn" 
                  onClick={() => handleUserChange(-1)}
                  disabled={userCount <= 1}
                >
                  −
                </button>
                <div className="counter-display">
                  <span className="counter-value">{userCount}</span>
                  <span className="counter-label">Users</span>
                </div>
                <button 
                  className="counter-btn" 
                  onClick={() => handleUserChange(1)}
                >
                  +
                </button>
              </div>

              <div className="cost-preview">
                <div className="preview-row">
                  <span>Price per user</span>
                  <span>₹{subscription.pricePerUser}</span>
                </div>
                <div className="preview-row">
                  <span>Number of users</span>
                  <span>× {userCount}</span>
                </div>
                <div className="preview-divider"></div>
                <div className="preview-row total">
                  <span>New monthly cost</span>
                  <span className="total-amount">₹{(subscription.pricePerUser * userCount).toLocaleString()}</span>
                </div>
                {userCount !== subscription.totalUsers && (
                  <div className="preview-change">
                    {userCount > subscription.totalUsers ? (
                      <span className="change-increase">
                        +₹{((userCount - subscription.totalUsers) * subscription.pricePerUser).toLocaleString()} increase
                      </span>
                    ) : (
                      <span className="change-decrease">
                        −₹{((subscription.totalUsers - userCount) * subscription.pricePerUser).toLocaleString()} decrease
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-btn cancel" onClick={() => setShowUserModal(false)}>
                Cancel
              </button>
              <button 
                className="modal-btn confirm" 
                onClick={handleConfirmUserChange}
                disabled={userCount === subscription.totalUsers}
              >
                Confirm Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionCard;

