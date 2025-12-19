import React from 'react';

const UserStats = ({ stats }) => {
  if (!stats) {
    return (
      <div className="stats-card">
        <div className="stats-header">
          <h3>Usage Statistics</h3>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '2rem 0' }}>
          No statistics available
        </p>
      </div>
    );
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="stats-card">
      <div className="stats-header">
        <h3>Usage Statistics</h3>
        <span className="stats-updated">
          Updated {formatTime(stats.lastUpdated)}
        </span>
      </div>

      <div className="stats-grid-enhanced">
        <div className="stat-item-enhanced">
          <div className="stat-icon-large">👥</div>
          <div className="stat-details">
            <div className="stat-value-large">
              {stats.activeUsers} <span className="stat-divider">/</span> {stats.totalUsers}
            </div>
            <div className="stat-label-enhanced">Active Users</div>
            <div className="stat-progress-bar">
              <div 
                className="stat-progress-fill" 
                style={{ width: `${(stats.activeUsers / stats.totalUsers) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="stat-item-enhanced">
          <div className="stat-icon-large qr">📱</div>
          <div className="stat-details">
            <div className="stat-value-large">{stats.activeQRCodes}</div>
            <div className="stat-label-enhanced">Active QR Codes</div>
            <div className="stat-sublabel">
              {stats.totalQRCodes} total deployed
            </div>
          </div>
        </div>

        <div className="stat-item-enhanced">
          <div className="stat-icon-large shift">🕐</div>
          <div className="stat-details">
            <div className="stat-value-large">{stats.activeShifts}</div>
            <div className="stat-label-enhanced">Active Shifts</div>
            <div className="stat-sublabel">
              {stats.totalShifts} scheduled today
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;

