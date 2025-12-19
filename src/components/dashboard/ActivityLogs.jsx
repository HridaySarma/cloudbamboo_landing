import React, { useState, useEffect } from 'react';
import './ActivityLogs.css';

const ActivityLogs = ({ userId }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    person: '',
    type: '',
    dateFrom: '',
    dateTo: '',
  });

  const logsPerPage = 10;

  useEffect(() => {
    fetchLogs();
  }, [userId]);

  const fetchLogs = async () => {
    setLoading(true);
    // TODO: Replace with actual API call
    // const data = await getActivityLogs(userId);
    
    // Mock data for development
    const mockLogs = [
      {
        id: 'log_001',
        type: 'attendance',
        action: 'Check-in',
        person: 'Rajesh Kumar',
        personId: 'emp_001',
        description: 'Checked in at Site A - Morning Shift',
        location: 'Site A, Mumbai',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        metadata: {
          site: 'Site A',
          shift: 'Morning Shift',
          coordinates: '19.0760° N, 72.8777° E',
        },
      },
      {
        id: 'log_002',
        type: 'incident',
        action: 'Incident Reported',
        person: 'Amit Sharma',
        personId: 'emp_002',
        description: 'Suspicious activity reported near Gate 3',
        location: 'Site B, Delhi',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        metadata: {
          severity: 'medium',
          status: 'investigating',
          site: 'Site B',
        },
      },
      {
        id: 'log_003',
        type: 'shift',
        action: 'Shift Started',
        person: 'Priya Patel',
        personId: 'emp_003',
        description: 'Started night shift at Site C',
        location: 'Site C, Bangalore',
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        metadata: {
          shift: 'Night Shift',
          duration: '12 hours',
          site: 'Site C',
        },
      },
      {
        id: 'log_004',
        type: 'qr_scan',
        action: 'QR Code Scanned',
        person: 'Vikram Singh',
        personId: 'emp_004',
        description: 'Scanned checkpoint QR at Building A',
        location: 'Site A, Mumbai',
        timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        metadata: {
          checkpoint: 'Building A - Floor 3',
          qrCode: 'QR_A_003',
          site: 'Site A',
        },
      },
      {
        id: 'log_005',
        type: 'attendance',
        action: 'Check-out',
        person: 'Suresh Reddy',
        personId: 'emp_005',
        description: 'Checked out from Site D - Evening Shift',
        location: 'Site D, Hyderabad',
        timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
        metadata: {
          site: 'Site D',
          shift: 'Evening Shift',
          hoursWorked: '8.5',
        },
      },
      {
        id: 'log_006',
        type: 'sos',
        action: 'SOS Alert',
        person: 'Rahul Verma',
        personId: 'emp_006',
        description: 'Emergency SOS button pressed',
        location: 'Site E, Pune',
        timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
        metadata: {
          severity: 'high',
          status: 'resolved',
          responseTime: '3 minutes',
          site: 'Site E',
        },
      },
      {
        id: 'log_007',
        type: 'leave',
        action: 'Leave Approved',
        person: 'Anjali Desai',
        personId: 'emp_007',
        description: 'Medical leave approved for 2 days',
        location: 'Head Office',
        timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
        metadata: {
          leaveType: 'Medical',
          duration: '2 days',
          approvedBy: 'Manager',
        },
      },
      {
        id: 'log_008',
        type: 'qr_scan',
        action: 'QR Code Scanned',
        person: 'Manoj Kumar',
        personId: 'emp_008',
        description: 'Scanned patrol checkpoint',
        location: 'Site B, Delhi',
        timestamp: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
        metadata: {
          checkpoint: 'Patrol Point 5',
          qrCode: 'QR_B_005',
          site: 'Site B',
        },
      },
    ];

    setLogs(mockLogs);
    setLoading(false);
  };

  const getLogIcon = (type) => {
    const icons = {
      attendance: '👤',
      incident: '⚠️',
      shift: '🕐',
      qr_scan: '📱',
      sos: '🚨',
      leave: '📅',
      report: '📊',
    };
    return icons[type] || '📋';
  };

  const getLogColor = (type) => {
    const colors = {
      attendance: '#4ecdc4',
      incident: '#feca57',
      shift: '#667eea',
      qr_scan: '#48dbfb',
      sos: '#ff6b6b',
      leave: '#a29bfe',
      report: '#00d2d3',
    };
    return colors[type] || '#667eea';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const formatFullTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Filter and search logs
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPerson = !filters.person || log.person.toLowerCase().includes(filters.person.toLowerCase());
    const matchesType = !filters.type || log.type === filters.type;
    
    const logDate = new Date(log.timestamp);
    const matchesDateFrom = !filters.dateFrom || logDate >= new Date(filters.dateFrom);
    const matchesDateTo = !filters.dateTo || logDate <= new Date(filters.dateTo + 'T23:59:59');

    return matchesSearch && matchesPerson && matchesType && matchesDateFrom && matchesDateTo;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setFilters({
      person: '',
      type: '',
      dateFrom: '',
      dateTo: '',
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="activity-logs-card">
        <div className="logs-header">
          <h3>Activity Logs</h3>
        </div>
        <div className="logs-loading">
          <div className="loading-spinner-small"></div>
          <p>Loading activity logs...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="activity-logs-card">
        <div className="logs-header">
          <div>
            <h3>Activity Logs</h3>
            <p className="logs-subtitle">Real-time activity tracking across your agency</p>
          </div>
          <span className="logs-count">{filteredLogs.length} logs</span>
        </div>

        {/* Search and Filters */}
        <div className="logs-controls">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="filter-group">
            <select
              value={filters.type}
              onChange={(e) => {
                setFilters({ ...filters, type: e.target.value });
                setCurrentPage(1);
              }}
              className="filter-select"
            >
              <option value="">All Types</option>
              <option value="attendance">Attendance</option>
              <option value="incident">Incidents</option>
              <option value="shift">Shifts</option>
              <option value="qr_scan">QR Scans</option>
              <option value="sos">SOS Alerts</option>
              <option value="leave">Leave</option>
            </select>

            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => {
                setFilters({ ...filters, dateFrom: e.target.value });
                setCurrentPage(1);
              }}
              className="filter-date"
              placeholder="From"
            />

            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => {
                setFilters({ ...filters, dateTo: e.target.value });
                setCurrentPage(1);
              }}
              className="filter-date"
              placeholder="To"
            />

            {(searchTerm || filters.type || filters.dateFrom || filters.dateTo) && (
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Logs List */}
        <div className="logs-list">
          {paginatedLogs.length === 0 ? (
            <div className="no-logs">
              <span className="no-logs-icon">📭</span>
              <p>No activity logs found</p>
            </div>
          ) : (
            paginatedLogs.map((log) => (
              <div
                key={log.id}
                className="log-item"
                onClick={() => setSelectedLog(log)}
              >
                <div
                  className="log-icon"
                  style={{ background: `${getLogColor(log.type)}20`, color: getLogColor(log.type) }}
                >
                  {getLogIcon(log.type)}
                </div>
                <div className="log-content">
                  <div className="log-header-row">
                    <span className="log-person">{log.person}</span>
                    <span className="log-time">{formatTimestamp(log.timestamp)}</span>
                  </div>
                  <div className="log-action">{log.action}</div>
                  <div className="log-description">{log.description}</div>
                  <div className="log-location">📍 {log.location}</div>
                </div>
                <div className="log-arrow">›</div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="logs-pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ‹ Previous
            </button>
            
            <div className="pagination-pages">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next ›
            </button>
          </div>
        )}
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="log-modal-overlay" onClick={() => setSelectedLog(null)}>
          <div className="log-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedLog(null)}>
              ✕
            </button>

            <div className="modal-header">
              <div
                className="modal-icon"
                style={{ background: `${getLogColor(selectedLog.type)}20`, color: getLogColor(selectedLog.type) }}
              >
                {getLogIcon(selectedLog.type)}
              </div>
              <div>
                <h3>{selectedLog.action}</h3>
                <p className="modal-timestamp">{formatFullTimestamp(selectedLog.timestamp)}</p>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-field">
                <label>Person</label>
                <div className="modal-value">{selectedLog.person}</div>
              </div>

              <div className="modal-field">
                <label>Description</label>
                <div className="modal-value">{selectedLog.description}</div>
              </div>

              <div className="modal-field">
                <label>Location</label>
                <div className="modal-value">📍 {selectedLog.location}</div>
              </div>

              {selectedLog.metadata && (
                <div className="modal-field">
                  <label>Additional Details</label>
                  <div className="modal-metadata">
                    {Object.entries(selectedLog.metadata).map(([key, value]) => (
                      <div key={key} className="metadata-item">
                        <span className="metadata-key">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                        <span className="metadata-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityLogs;
