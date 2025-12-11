import React from 'react';

const SubscriptionCard = ({ subscription, detailed = false, onUpgrade }) => {
  if (!subscription) {
    return (
      <div className="subscription-card">
        <div className="card-header">
          <div className="plan-info">
            <div className="plan-icon" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              ❓
            </div>
            <div>
              <h3 className="plan-name">No Active Plan</h3>
              <span className="plan-tagline">Subscribe to get started</span>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button className="upgrade-btn" onClick={onUpgrade}>
            Choose a Plan
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

  const getPlanIcon = () => {
    switch (subscription.planId) {
      case 'vigilance': return '🛡️';
      case 'sentinel': return '💳';
      case 'guardian': return '🚨';
      default: return '📋';
    }
  };

  const totalAmount = subscription.pricePerUser * subscription.totalUsers;

  return (
    <div className={`subscription-card ${detailed ? 'detailed' : ''}`}>
      <div className="card-header">
        <div className="plan-info">
          <div className={`plan-icon ${subscription.planId}`}>
            {getPlanIcon()}
          </div>
          <div>
            <h3 className="plan-name">{subscription.plan}</h3>
            <span className="plan-tagline">
              {subscription.planId === 'vigilance' && 'Essential Management & Tracking'}
              {subscription.planId === 'sentinel' && 'Advanced Operations & Finance'}
              {subscription.planId === 'guardian' && 'Live Intelligence & Emergency Response'}
            </span>
          </div>
        </div>
        <span className={`status-badge ${subscription.status}`}>
          {subscription.status}
        </span>
      </div>

      <div className="billing-info">
        <div className="billing-item">
          <span className="billing-label">Monthly Cost</span>
          <span className="billing-value price">₹{totalAmount.toLocaleString()}</span>
        </div>
        <div className="billing-item">
          <span className="billing-label">Users</span>
          <span className="billing-value">{subscription.totalUsers}</span>
        </div>
        <div className="billing-item">
          <span className="billing-label">Price/User</span>
          <span className="billing-value">₹{subscription.pricePerUser}</span>
        </div>
        <div className="billing-item">
          <span className="billing-label">Renews On</span>
          <span className="billing-value">
            {formatDate(subscription.currentPeriodEnd)}
            <br />
            <small style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
              ({getDaysRemaining()} days left)
            </small>
          </span>
        </div>
      </div>

      {detailed && subscription.features && (
        <div className="features-section">
          <h4>Included Features</h4>
          <div className="features-list">
            {subscription.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-check">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card-footer">
        {subscription.planId !== 'guardian' && (
          <button className="upgrade-btn" onClick={onUpgrade}>
            Upgrade Plan
          </button>
        )}
        <a 
          href="mailto:support@cloudbamboo.in?subject=Subscription Support"
          className="manage-btn"
          style={{ textDecoration: 'none', textAlign: 'center' }}
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default SubscriptionCard;

