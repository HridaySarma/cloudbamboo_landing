import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { upgradePlan } from '../../services/api';
import './PlanUpgrade.css';

const PlanUpgrade = ({ currentPlan, plans, userId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userCount, setUserCount] = useState(50);

  const handleSelectPlan = async (planId) => {
    if (planId === currentPlan) return;

    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    const pricing = calculatePrice(plan);

    // Navigate to checkout page with plan data
    navigate('/checkout', {
      state: {
        plan,
        userCount,
        pricing
      }
    });
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

  const calculateDiscount = (users) => {
    if (users >= 1000) return 30;
    if (users >= 500) return 20;
    if (users >= 200) return 10;
    if (users >= 100) return 5;
    return 0;
  };

  const calculatePrice = (plan) => {
    const basePrice = plan.price * userCount;
    const discount = calculateDiscount(userCount);
    const discountAmount = (basePrice * discount) / 100;
    return {
      base: basePrice,
      discount: discountAmount,
      final: basePrice - discountAmount,
      percentage: discount,
    };
  };

  return (
    <div className="plan-upgrade-premium">
      <div className="upgrade-hero">
        <div className="upgrade-hero-content">
          <h1 className="upgrade-hero-title">
            Choose Your <span className="gradient-text">Perfect Plan</span>
          </h1>
          <p className="upgrade-hero-subtitle">
            Scale your security operations with flexible pricing designed for businesses of all sizes
          </p>
        </div>

        {/* God-Tier User Count Selector */}
        <div className="user-count-selector-godlike">
          <div className="selector-glow-effect"></div>
          
          <div className="selector-header">
            <div className="selector-icon-animated">
              <span className="icon-layer">👥</span>
              <span className="icon-pulse"></span>
            </div>
            <div className="selector-title-group">
              <h3 className="selector-title">Team Size</h3>
              <p className="selector-subtitle">Adjust to see your pricing</p>
            </div>
          </div>

          <div className="user-count-controls">
            {/* Main Counter */}
            <div className="main-counter">
              <button
                className="counter-btn decrement"
                onClick={() => setUserCount(Math.max(1, userCount - 10))}
                onMouseDown={(e) => e.currentTarget.classList.add('pressed')}
                onMouseUp={(e) => e.currentTarget.classList.remove('pressed')}
              >
                <span className="btn-icon-large">−</span>
                <span className="btn-label">-10</span>
              </button>

              <div className="counter-display">
                <div className="counter-value-wrapper">
                  <input
                    type="number"
                    value={userCount}
                    onChange={(e) => setUserCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="counter-input"
                    min="1"
                  />
                  <div className="counter-label">users</div>
                </div>
                
                {/* Progress Bar */}
                <div className="discount-progress-bar">
                  <div className="progress-track">
                    {[
                      { value: 100, position: 10 },
                      { value: 200, position: 20 },
                      { value: 500, position: 50 },
                      { value: 1000, position: 100 },
                    ].map((milestone) => (
                      <div
                        key={milestone.value}
                        className={`progress-milestone ${
                          userCount >= milestone.value ? 'reached' : ''
                        }`}
                        style={{ left: `${milestone.position}%` }}
                      >
                        <div className="milestone-marker"></div>
                        <div className="milestone-label">{milestone.value}</div>
                      </div>
                    ))}
                    <div
                      className="progress-fill"
                      style={{
                        width: `${Math.min(100, (userCount / 1000) * 100)}%`,
                      }}
                    >
                      <div className="progress-glow"></div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="counter-btn increment"
                onClick={() => setUserCount(userCount + 10)}
                onMouseDown={(e) => e.currentTarget.classList.add('pressed')}
                onMouseUp={(e) => e.currentTarget.classList.remove('pressed')}
              >
                <span className="btn-icon-large">+</span>
                <span className="btn-label">+10</span>
              </button>
            </div>

            {/* Slider */}
            <div className="slider-container">
              <input
                type="range"
                min="1"
                max="1000"
                value={userCount}
                onChange={(e) => setUserCount(parseInt(e.target.value))}
                className="user-count-slider"
                style={{
                  background: `linear-gradient(to right, 
                    #667eea 0%, 
                    #667eea ${(userCount / 1000) * 100}%, 
                    rgba(255,255,255,0.1) ${(userCount / 1000) * 100}%, 
                    rgba(255,255,255,0.1) 100%)`,
                }}
              />
              <div className="slider-labels">
                <span>1</span>
                <span>1000+</span>
              </div>
            </div>
          </div>

          {/* Discount Status */}
          {calculateDiscount(userCount) > 0 ? (
            <div className="discount-status active">
              <div className="status-icon-wrapper">
                <span className="status-icon">🎉</span>
                <div className="icon-sparkles">
                  <span className="sparkle">✨</span>
                  <span className="sparkle">✨</span>
                  <span className="sparkle">✨</span>
                </div>
              </div>
              <div className="status-content">
                <div className="status-title">
                  {calculateDiscount(userCount)}% Volume Discount Active!
                </div>
                <div className="status-subtitle">
                  You're saving big on your subscription
                </div>
              </div>
              <div className="status-badge">
                -{calculateDiscount(userCount)}%
              </div>
            </div>
          ) : (
            <div className="discount-status inactive">
              <div className="status-icon-wrapper">
                <span className="status-icon">💡</span>
              </div>
              <div className="status-content">
                <div className="status-title">
                  Add {100 - userCount} more users for 5% discount
                </div>
                <div className="status-subtitle">
                  Unlock volume pricing at 100+ users
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {success && (
        <div className="alert-success">
          <span className="alert-icon">✓</span>
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="alert-error">
          <span className="alert-icon">⚠</span>
          <span>{error}</span>
        </div>
      )}

      <div className="plans-grid-premium">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlan;
          const isPopular = plan.popular;
          const pricing = calculatePrice(plan);

          return (
            <div 
              key={plan.id} 
              className={`plan-card-premium ${isCurrent ? 'current-plan' : ''} ${isPopular ? 'popular-plan' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {isPopular && !isCurrent && (
                <div className="plan-badge popular">
                  <span className="badge-icon">⭐</span>
                  Most Popular
                </div>
              )}
              {isCurrent && (
                <div className="plan-badge current">
                  <span className="badge-icon">✓</span>
                  Your Plan
                </div>
              )}

              <div className="plan-card-header-premium">
                <div className="plan-icon-large">{plan.icon}</div>
                <h3 className="plan-name-large">{plan.name}</h3>
                <p className="plan-tagline-large">{plan.tagline}</p>
              </div>

              <div className="plan-pricing-section">
                <div className="pricing-row">
                  <span className="pricing-label">Per user</span>
                  <div className="pricing-value">
                    <span className="currency">₹</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period">/month</span>
                  </div>
                </div>

                <div className="pricing-divider"></div>

                <div className="pricing-total">
                  <div className="total-row">
                    <span className="total-label">Total for {userCount} users</span>
                    {pricing.percentage > 0 && (
                      <span className="total-original">₹{pricing.base.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="total-amount">
                    ₹{pricing.final.toLocaleString()}
                    <span className="total-period">/month</span>
                  </div>
                  {pricing.percentage > 0 && (
                    <div className="savings-badge">
                      Save ₹{pricing.discount.toLocaleString()}/month ({pricing.percentage}% off)
                    </div>
                  )}
                </div>
              </div>

              <button
                className={`plan-cta-btn ${isCurrent ? 'current-btn' : isPopular ? 'popular-btn' : 'default-btn'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPlan(plan.id);
                }}
                disabled={isCurrent || loading === plan.id}
              >
                {loading === plan.id ? (
                  <span className="btn-loading">
                    <span className="spinner-small"></span>
                    Processing...
                  </span>
                ) : isCurrent ? (
                  <>
                    <span className="btn-icon">✓</span>
                    Current Plan
                  </>
                ) : isUpgrade(plan.id) ? (
                  <>
                    <span className="btn-icon">⬆</span>
                    Upgrade to {plan.name}
                  </>
                ) : (
                  <>
                    <span className="btn-icon">→</span>
                    Select {plan.name}
                  </>
                )}
              </button>

              <div className="plan-features-premium">
                <div className="features-header">What's Included</div>
                <ul className="features-list-premium">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="feature-item-premium">
                      <span className="feature-check">✓</span>
                      <span className="feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Volume Discounts Section */}
      <div className="volume-discounts-section">
        <div className="section-header">
          <h3 className="section-title">
            <span className="section-icon">💰</span>
            Volume Discounts
          </h3>
          <p className="section-subtitle">Save more as you scale your team</p>
        </div>
        <div className="discounts-grid">
          {[
            { users: '100+', discount: '5%', icon: '📊' },
            { users: '200+', discount: '10%', icon: '📈' },
            { users: '500+', discount: '20%', icon: '🚀' },
            { users: '1000+', discount: '30%', icon: '⭐' },
          ].map((tier) => (
            <div 
              key={tier.users} 
              className={`discount-card ${userCount >= parseInt(tier.users) ? 'active' : ''}`}
            >
              <div className="discount-icon">{tier.icon}</div>
              <div className="discount-percentage">{tier.discount}</div>
              <div className="discount-users">{tier.users} users</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise Section */}
      <div className="enterprise-section">
        <div className="enterprise-card">
          <div className="enterprise-icon">🏢</div>
          <div className="enterprise-content">
            <h3 className="enterprise-title">Need a Custom Enterprise Solution?</h3>
            <p className="enterprise-description">
              Get dedicated support, custom integrations, and tailored pricing for teams of 1000+ users
            </p>
            <div className="enterprise-features">
              <span className="enterprise-feature">✓ Dedicated Account Manager</span>
              <span className="enterprise-feature">✓ Custom Integrations</span>
              <span className="enterprise-feature">✓ Priority Support</span>
              <span className="enterprise-feature">✓ Custom SLA</span>
            </div>
          </div>
          <a 
            href="mailto:hq@cloudbamboo.in?subject=Enterprise Plan Inquiry" 
            className="enterprise-cta"
          >
            <span>Contact Sales</span>
            <span className="cta-arrow">→</span>
          </a>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="trust-section">
        <div className="trust-item">
          <div className="trust-icon">🔒</div>
          <div className="trust-text">
            <strong>Secure Payments</strong>
            <span>Bank-grade encryption</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">↩️</div>
          <div className="trust-text">
            <strong>Flexible Billing</strong>
            <span>Cancel anytime</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">💬</div>
          <div className="trust-text">
            <strong>24/7 Support</strong>
            <span>Always here to help</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanUpgrade;

