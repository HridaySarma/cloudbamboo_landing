/**
 * API Service for backend communication
 * 
 * This file contains placeholder API calls that should be connected
 * to your actual backend service.
 * 
 * Environment Variables:
 * - VITE_API_BASE_URL: Your backend API base URL
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.watchpoint.in';

/**
 * Make an authenticated API request
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<object>}
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get auth token from Firebase user
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(user.token && { Authorization: `Bearer ${user.token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP error ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// ============================================
// USER PROFILE APIs
// ============================================

/**
 * Get user profile from backend
 * @param {string} userId - Firebase user ID
 * @returns {Promise<object>}
 */
export const getUserProfile = async (userId) => {
  // TODO: Replace with actual API call
  // return apiRequest(`/users/${userId}`);
  
  // Mock response for development
  return {
    id: userId,
    email: 'user@example.com',
    displayName: 'John Doe',
    phone: '+919876543210',
    company: 'ABC Security Services',
    role: 'admin',
    createdAt: '2024-01-15T10:30:00Z',
  };
};

/**
 * Update user profile
 * @param {string} userId - Firebase user ID
 * @param {object} data - Profile data to update
 * @returns {Promise<object>}
 */
export const updateUserProfile = async (userId, data) => {
  // TODO: Replace with actual API call
  // return apiRequest(`/users/${userId}`, {
  //   method: 'PUT',
  //   body: JSON.stringify(data),
  // });
  
  console.log('Update profile:', userId, data);
  return { success: true, message: 'Profile updated successfully' };
};

// ============================================
// SUBSCRIPTION APIs
// ============================================

/**
 * Get user's current subscription
 * @param {string} userId - Firebase user ID
 * @returns {Promise<object>}
 */
export const getSubscription = async (userId) => {
  // TODO: Replace with actual API call
  // return apiRequest(`/subscriptions/${userId}`);
  
  // Mock response for development
  return {
    id: 'sub_123456',
    userId: userId,
    plan: 'Vigilance',
    planId: 'vigilance',
    status: 'active', // active, expired, cancelled, trial
    pricePerUser: 99,
    totalUsers: 50,
    billingCycle: 'monthly',
    currentPeriodStart: '2024-12-01T00:00:00Z',
    currentPeriodEnd: '2025-01-01T00:00:00Z',
    createdAt: '2024-06-15T10:30:00Z',
    features: [
      'Staff Onboarding',
      'Attendance Tracking',
      'Scheduling & Assignments',
      'Client Management',
      'Basic Analytics & Reports',
      'User Roles & Permissions',
      'Document Management',
      'Shift Management',
      'Leave Management',
      'Mobile App Access',
      'Geo-fencing',
      'Incident Reporting',
    ],
  };
};

/**
 * Get available subscription plans
 * @returns {Promise<array>}
 */
export const getPlans = async () => {
  // TODO: Replace with actual API call
  // return apiRequest('/plans');
  
  return [
    {
      id: 'vigilance',
      name: 'Vigilance',
      tagline: 'Essential Management & Tracking',
      price: 99,
      icon: '🛡️',
      color: '#667eea',
      features: [
        'Staff Onboarding',
        'Attendance Tracking',
        'Scheduling & Assignments',
        'Client Management',
        'Basic Analytics & Reports',
        'User Roles & Permissions',
        'Document Management',
        'Shift Management',
        'Leave Management',
        'Resignation Management',
        'Mobile App Access',
        'Geo-fencing',
        'Incident Reporting',
        'Photo Uploads',
      ],
      discounts: [
        { users: 100, percent: 5 },
        { users: 200, percent: 10 },
        { users: 500, percent: 20 },
        { users: 1000, percent: 30 },
      ],
    },
    {
      id: 'sentinel',
      name: 'Sentinel',
      tagline: 'Advanced Operations & Finance',
      price: 199,
      icon: '💳',
      color: '#4ecdc4',
      features: [
        'All Vigilance Features',
        'Notifications',
        'Payroll Automation',
        'Invoicing',
        'Advance Salary Management',
        'Tax Calculations',
        'Financial Dashboards',
      ],
      discounts: [
        { users: 100, percent: 5 },
        { users: 200, percent: 10 },
        { users: 500, percent: 20 },
        { users: 1000, percent: 30 },
      ],
    },
    {
      id: 'guardian',
      name: 'Guardian',
      tagline: 'Live Intelligence & Emergency Response',
      price: 399,
      icon: '🚨',
      color: '#ff6b6b',
      popular: true,
      features: [
        'All Sentinel Features',
        'Live Tracking (GPS)',
        'Live Reports & Dashboards',
        'In-app Chat & Messaging',
        'Emergency Services (SOS, Panic Button)',
        'Real-time Alerts',
        'Video Uploads',
      ],
      discounts: [
        { users: 100, percent: 5 },
        { users: 200, percent: 10 },
        { users: 500, percent: 20 },
        { users: 1000, percent: 30 },
      ],
    },
  ];
};

/**
 * Upgrade or change subscription plan
 * @param {string} userId - Firebase user ID
 * @param {string} planId - New plan ID
 * @param {number} userCount - Number of users
 * @returns {Promise<object>}
 */
export const upgradePlan = async (userId, planId, userCount) => {
  // TODO: Replace with actual API call
  // return apiRequest('/subscriptions/upgrade', {
  //   method: 'POST',
  //   body: JSON.stringify({ userId, planId, userCount }),
  // });
  
  console.log('Upgrade plan:', { userId, planId, userCount });
  return {
    success: true,
    message: 'Plan upgrade request submitted. Our team will contact you shortly.',
    redirectUrl: null, // Payment gateway URL if applicable
  };
};

/**
 * Cancel subscription
 * @param {string} userId - Firebase user ID
 * @param {string} reason - Cancellation reason
 * @returns {Promise<object>}
 */
export const cancelSubscription = async (userId, reason) => {
  // TODO: Replace with actual API call
  // return apiRequest(`/subscriptions/${userId}/cancel`, {
  //   method: 'POST',
  //   body: JSON.stringify({ reason }),
  // });
  
  console.log('Cancel subscription:', { userId, reason });
  return {
    success: true,
    message: 'Subscription cancellation scheduled at the end of the current billing period.',
  };
};

// ============================================
// USAGE STATS APIs
// ============================================

/**
 * Get usage statistics for the dashboard
 * @param {string} userId - Firebase user ID
 * @returns {Promise<object>}
 */
export const getUsageStats = async (userId) => {
  // TODO: Replace with actual API call
  // return apiRequest(`/stats/${userId}`);
  
  // Mock response for development
  return {
    totalUsers: 50,
    activeUsers: 45,
    activeQRCodes: 28,
    totalQRCodes: 35,
    activeShifts: 12,
    totalShifts: 15,
    totalClients: 12,
    totalSites: 28,
    attendanceToday: {
      present: 42,
      absent: 3,
      late: 3,
      onLeave: 0,
    },
    incidentsThisMonth: 5,
    reportsGenerated: 156,
    lastUpdated: new Date().toISOString(),
    trends: {
      usersChange: 8, // percentage
      attendanceRate: 93.5, // percentage
      incidentChange: -12, // percentage (negative is good)
    },
  };
};

/**
 * Get billing history
 * @param {string} userId - Firebase user ID
 * @returns {Promise<array>}
 */
export const getBillingHistory = async (userId) => {
  // TODO: Replace with actual API call
  // return apiRequest(`/billing/${userId}/history`);
  
  return [
    {
      id: 'inv_001',
      date: '2024-12-01',
      amount: 4950,
      status: 'paid',
      description: 'Vigilance Plan - 50 users',
      invoiceUrl: '#',
    },
    {
      id: 'inv_002',
      date: '2024-11-01',
      amount: 4950,
      status: 'paid',
      description: 'Vigilance Plan - 50 users',
      invoiceUrl: '#',
    },
    {
      id: 'inv_003',
      date: '2024-10-01',
      amount: 4455,
      status: 'paid',
      description: 'Vigilance Plan - 45 users',
      invoiceUrl: '#',
    },
  ];
};

// ============================================
// NOTIFICATION PREFERENCES
// ============================================

/**
 * Get notification preferences
 * @param {string} userId - Firebase user ID
 * @returns {Promise<object>}
 */
export const getNotificationPreferences = async (userId) => {
  // TODO: Replace with actual API call
  return {
    email: {
      billing: true,
      reports: true,
      alerts: true,
      marketing: false,
    },
    sms: {
      alerts: true,
      billing: false,
    },
    push: {
      incidents: true,
      attendance: true,
    },
  };
};

/**
 * Update notification preferences
 * @param {string} userId - Firebase user ID
 * @param {object} preferences - New preferences
 * @returns {Promise<object>}
 */
export const updateNotificationPreferences = async (userId, preferences) => {
  // TODO: Replace with actual API call
  console.log('Update preferences:', preferences);
  return { success: true };
};

