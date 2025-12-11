import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getSubscription, getUsageStats, getPlans } from '../../services/api';
import SubscriptionCard from './SubscriptionCard';
import UserStats from './UserStats';
import PlanUpgrade from './PlanUpgrade';
import logoImage from '../../assets/logo_modern.png';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, phoneNumber, signOut } = useAuth();
  
  const [subscription, setSubscription] = useState(null);
  const [stats, setStats] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) return;
      
      setLoading(true);
      setError(null);

      try {
        const [subData, statsData, plansData] = await Promise.all([
          getSubscription(user.uid),
          getUsageStats(user.uid),
          getPlans(),
        ]);
        
        setSubscription(subData);
        setStats(statsData);
        setPlans(plansData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.uid]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <img src={logoImage} alt="WatchPoint" />
          </Link>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Overview</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'subscription' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscription')}
          >
            <span className="nav-icon">💳</span>
            <span className="nav-text">Subscription</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'plans' ? 'active' : ''}`}
            onClick={() => setActiveTab('plans')}
          >
            <span className="nav-icon">⚡</span>
            <span className="nav-text">Upgrade Plan</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="user-avatar" />
            ) : (
              <div className="user-avatar-placeholder">
                {user?.displayName?.[0] || user?.email?.[0] || '?'}
              </div>
            )}
            <div className="user-details">
              <span className="user-name">{user?.displayName || 'User'}</span>
              <span className="user-email">{user?.email}</span>
            </div>
          </div>
          <button className="signout-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <h1 className="page-title">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'subscription' && 'Subscription Details'}
              {activeTab === 'plans' && 'Upgrade Your Plan'}
            </h1>
            <p className="page-subtitle">
              Welcome back, {user?.displayName?.split(' ')[0] || 'there'}!
              {phoneNumber && <span className="phone-badge"> • {phoneNumber}</span>}
            </p>
          </div>
          <div className="header-right">
            <Link to="/" className="back-to-site">
              ← Back to Website
            </Link>
          </div>
        </header>

        {error && (
          <div className="dashboard-error">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <>
              <div className="overview-grid">
                <SubscriptionCard 
                  subscription={subscription} 
                  onUpgrade={() => setActiveTab('plans')}
                />
                <UserStats stats={stats} />
              </div>
              
              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                  <a 
                    href="https://app.watchpoint.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-card"
                  >
                    <span className="action-icon">🚀</span>
                    <span className="action-title">Open WatchPoint App</span>
                    <span className="action-desc">Access the full platform</span>
                  </a>
                  <button 
                    className="action-card"
                    onClick={() => setActiveTab('plans')}
                  >
                    <span className="action-icon">⬆️</span>
                    <span className="action-title">Upgrade Plan</span>
                    <span className="action-desc">Get more features</span>
                  </button>
                  <a 
                    href="mailto:support@cloudbamboo.in" 
                    className="action-card"
                  >
                    <span className="action-icon">💬</span>
                    <span className="action-title">Contact Support</span>
                    <span className="action-desc">Get help from our team</span>
                  </a>
                </div>
              </div>
            </>
          )}

          {activeTab === 'subscription' && (
            <div className="subscription-detail">
              <SubscriptionCard 
                subscription={subscription} 
                detailed={true}
                onUpgrade={() => setActiveTab('plans')}
              />
            </div>
          )}

          {activeTab === 'plans' && (
            <PlanUpgrade 
              currentPlan={subscription?.planId}
              plans={plans}
              userId={user?.uid}
            />
          )}
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="mobile-nav">
        <button
          className={`mobile-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <span className="nav-icon">📊</span>
          <span>Overview</span>
        </button>
        <button
          className={`mobile-nav-item ${activeTab === 'subscription' ? 'active' : ''}`}
          onClick={() => setActiveTab('subscription')}
        >
          <span className="nav-icon">💳</span>
          <span>Plan</span>
        </button>
        <button
          className={`mobile-nav-item ${activeTab === 'plans' ? 'active' : ''}`}
          onClick={() => setActiveTab('plans')}
        >
          <span className="nav-icon">⚡</span>
          <span>Upgrade</span>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;

