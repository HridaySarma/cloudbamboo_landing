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

  const totalAttendance = stats.attendanceToday.present + stats.attendanceToday.absent + 
                          stats.attendanceToday.late + stats.attendanceToday.onLeave;

  const getPercentage = (value) => {
    if (totalAttendance === 0) return 0;
    return Math.round((value / totalAttendance) * 100);
  };

  return (
    <div className="stats-card">
      <div className="stats-header">
        <h3>Usage Statistics</h3>
        <span className="stats-updated">
          Updated {formatTime(stats.lastUpdated)}
        </span>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-icon">👥</div>
          <div className="stat-value">
            {stats.activeUsers}
            <span className="stat-trend positive">
              ↑ {stats.trends?.usersChange || 0}%
            </span>
          </div>
          <div className="stat-label">Active Users</div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">🏢</div>
          <div className="stat-value">{stats.totalClients}</div>
          <div className="stat-label">Total Clients</div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">📍</div>
          <div className="stat-value">{stats.totalSites}</div>
          <div className="stat-label">Total Sites</div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{stats.reportsGenerated}</div>
          <div className="stat-label">Reports Generated</div>
        </div>
      </div>

      <div className="attendance-breakdown">
        <h4>Today's Attendance</h4>
        <div className="attendance-bars">
          <div className="attendance-bar">
            <span className="bar-label">Present</span>
            <div className="bar-track">
              <div 
                className="bar-fill present" 
                style={{ width: `${getPercentage(stats.attendanceToday.present)}%` }}
              />
            </div>
            <span className="bar-value">{stats.attendanceToday.present}</span>
          </div>

          <div className="attendance-bar">
            <span className="bar-label">Absent</span>
            <div className="bar-track">
              <div 
                className="bar-fill absent" 
                style={{ width: `${getPercentage(stats.attendanceToday.absent)}%` }}
              />
            </div>
            <span className="bar-value">{stats.attendanceToday.absent}</span>
          </div>

          <div className="attendance-bar">
            <span className="bar-label">Late</span>
            <div className="bar-track">
              <div 
                className="bar-fill late" 
                style={{ width: `${getPercentage(stats.attendanceToday.late)}%` }}
              />
            </div>
            <span className="bar-value">{stats.attendanceToday.late}</span>
          </div>

          <div className="attendance-bar">
            <span className="bar-label">On Leave</span>
            <div className="bar-track">
              <div 
                className="bar-fill leave" 
                style={{ width: `${getPercentage(stats.attendanceToday.onLeave)}%` }}
              />
            </div>
            <span className="bar-value">{stats.attendanceToday.onLeave}</span>
          </div>
        </div>
      </div>

      {stats.incidentsThisMonth > 0 && (
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          background: 'rgba(255, 107, 107, 0.1)', 
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <div>
            <div style={{ color: '#ff6b6b', fontWeight: 600 }}>
              {stats.incidentsThisMonth} Incidents This Month
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
              {stats.trends?.incidentChange < 0 
                ? `${Math.abs(stats.trends.incidentChange)}% decrease from last month` 
                : `${stats.trends?.incidentChange || 0}% increase from last month`
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStats;

