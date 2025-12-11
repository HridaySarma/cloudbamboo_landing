import React, { useState } from 'react';
import { upgradePlan } from '../../services/api';

const PlanUpgrade = ({ currentPlan, plans, userId }) => {
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSelectPlan = async (planId) => {
    if (planId === currentPlan) return;

    setLoading(planId);
    setError(null);
    setSuccess(null);

    try {
      const result = await upgradePlan(userId, planId, 50); // Default user count
      if (result.success) {
        setSuccess(result.message);
        if (result.redirectUrl) {
          window.location.href = result.redirectUrl;
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to process upgrade request');
    } finally {
      setLoading(null);
    }
  };

  const getPlanOrder = (planId) => {
    const order = { vigilance: 1, sentinel: 2, guardian: 3 };
    return order[planId] || 0;
  };

  const isUpgrade = (planId) => {
    return getPlanOrder(planId) > getPlanOrder(currentPlan);
  };

  const isDowngrade = (planId) => {
    return getPlanOrder(planId) < getPlanOrder(currentPlan);
  };

  return (
    <div className="plan-upgrade">
      <div className="upgrade-header">
        <h2>Choose the Right Plan for Your Business</h2>
        <p>
          Upgrade your plan to unlock more features and capabilities. 
          Contact our team for custom enterprise solutions.
        </p>
      </div>

      {success && (
        <div style={{
          background: 'rgba(78, 205, 196, 0.15)',
          border: '1px solid rgba(78, 205, 196, 0.3)',
          color: '#4ecdc4',
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span>✓</span> {success}
        </div>
      )}

      {error && (
        <div style={{
          background: 'rgba(255, 107, 107, 0.15)',
          border: '1px solid rgba(255, 107, 107, 0.3)',
          color: '#ff6b6b',
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span>⚠</span> {error}
        </div>
      )}

      <div className="plans-comparison">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlan;
          const isPopular = plan.popular;

          return (
            <div 
              key={plan.id} 
              className={`plan-card ${isCurrent ? 'current' : ''} ${isPopular ? 'popular' : ''}`}
            >
              {isPopular && !isCurrent && (
                <span className="popular-badge">Most Popular</span>
              )}
              {isCurrent && (
                <span className="current-badge">Current Plan</span>
              )}

              <div className="plan-card-header">
                <div className="plan-card-icon">{plan.icon}</div>
                <h3 className="plan-card-name">{plan.name}</h3>
                <p className="plan-card-tagline">{plan.tagline}</p>
                <div className="plan-card-price">
                  <span className="price-currency">₹</span>
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-period">/user/month</span>
                </div>
              </div>

              <div className="plan-card-features">
                <ul>
                  {plan.features.slice(0, 7).map((feature, index) => (
                    <li key={index}>
                      <span className="check">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.features.length > 7 && (
                    <li style={{ color: 'rgba(255,255,255,0.4)' }}>
                      <span className="check" style={{ visibility: 'hidden' }}>✓</span>
                      <span>+{plan.features.length - 7} more features</span>
                    </li>
                  )}
                </ul>
              </div>

              <button
                className={`plan-select-btn ${isCurrent ? 'current' : 'primary'}`}
                onClick={() => handleSelectPlan(plan.id)}
                disabled={isCurrent || loading === plan.id}
              >
                {loading === plan.id ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span className="spinner" style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }}></span>
                    Processing...
                  </span>
                ) : isCurrent ? (
                  'Current Plan'
                ) : isUpgrade(plan.id) ? (
                  'Upgrade to ' + plan.name
                ) : isDowngrade(plan.id) ? (
                  'Downgrade to ' + plan.name
                ) : (
                  'Select ' + plan.name
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="upgrade-contact">
        <p>Need a custom plan for your enterprise?</p>
        <a href="mailto:hq@cloudbamboo.in?subject=Enterprise Plan Inquiry">
          Contact our sales team →
        </a>
      </div>

      {/* Volume Discounts Info */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
      }}>
        <h4 style={{ color: '#ffffff', margin: '0 0 1rem 0', fontSize: '1rem' }}>
          Volume Discounts Available
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
        }}>
          {[
            { users: '100+', discount: '5%' },
            { users: '200+', discount: '10%' },
            { users: '500+', discount: '20%' },
            { users: '1000+', discount: '30%' },
          ].map((tier) => (
            <div key={tier.users} style={{
              textAlign: 'center',
              padding: '1rem',
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '12px',
            }}>
              <div style={{ color: '#667eea', fontSize: '1.25rem', fontWeight: 700 }}>
                {tier.discount}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                {tier.users} users
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanUpgrade;

