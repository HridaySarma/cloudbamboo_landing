/**
 * Payment Helper Utilities
 * Utility functions for payment processing and parameter preparation
 */

/**
 * Prepare PayU parameters from checkout data
 * @param {Object} checkoutData - Checkout information
 * @param {Object} checkoutData.plan - Plan details
 * @param {number} checkoutData.userCount - Number of users
 * @param {number} checkoutData.total - Total amount
 * @param {Object} checkoutData.user - User information
 * @param {string} txnid - Transaction ID
 * @returns {Object} - PayU parameters
 */
export const preparePayUParams = (checkoutData, txnid) => {
  const { plan, userCount, total, user } = checkoutData;
  
  // Extract user information
  const firstname = user?.displayName?.split(' ')[0] || 'User';
  const email = user?.email || '';
  const phone = user?.phoneNumber || '';
  const userId = user?.uid || '';
  
  // Prepare product info
  const productinfo = `${plan.name} Plan - ${userCount} users`;
  
  return {
    key: import.meta.env.VITE_PAYU_MERCHANT_KEY,
    txnid,
    amount: formatAmount(total),
    productinfo,
    firstname,
    email,
    phone,
    surl: import.meta.env.VITE_PAYU_SUCCESS_URL,
    furl: import.meta.env.VITE_PAYU_FAILURE_URL,
    udf1: plan.name || '',
    udf2: userCount.toString() || '',
    udf3: userId || '',
    udf4: '',
    udf5: ''
  };
};

/**
 * Format amount to 2 decimal places
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted amount
 */
export const formatAmount = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount) || !isFinite(amount)) {
    throw new Error('Invalid amount: must be a finite number');
  }
  
  if (amount < 0) {
    throw new Error('Invalid amount: must be non-negative');
  }
  
  return amount.toFixed(2);
};

/**
 * Calculate order totals
 * @param {Object} pricing - Pricing details
 * @param {number} pricing.pricePerUser - Price per user
 * @param {number} pricing.userCount - Number of users
 * @param {number} pricing.discountPercent - Discount percentage (0-100)
 * @returns {Object} - Calculated totals
 */
export const calculateOrderTotals = (pricing) => {
  const { pricePerUser, userCount, discountPercent = 0 } = pricing;
  
  // Validate inputs
  if (typeof pricePerUser !== 'number' || pricePerUser < 0) {
    throw new Error('Invalid pricePerUser');
  }
  
  if (typeof userCount !== 'number' || userCount < 1) {
    throw new Error('Invalid userCount');
  }
  
  if (typeof discountPercent !== 'number' || discountPercent < 0 || discountPercent > 100) {
    throw new Error('Invalid discountPercent');
  }
  
  // Calculate subtotal
  const subtotal = pricePerUser * userCount;
  
  // Calculate discount
  const discount = (subtotal * discountPercent) / 100;
  
  // Calculate amount after discount
  const afterDiscount = subtotal - discount;
  
  // Calculate GST (18%)
  const gst = afterDiscount * 0.18;
  
  // Calculate total
  const total = afterDiscount + gst;
  
  return {
    subtotal,
    discount,
    discountPercent,
    afterDiscount,
    gst,
    total
  };
};

/**
 * Validate checkout data completeness
 * @param {Object} checkoutData - Checkout data to validate
 * @returns {Object} - Validation result
 */
export const validateCheckoutData = (checkoutData) => {
  const errors = [];
  
  if (!checkoutData) {
    return { valid: false, errors: ['Checkout data is missing'] };
  }
  
  // Validate plan
  if (!checkoutData.plan || !checkoutData.plan.name) {
    errors.push('Plan information is missing');
  }
  
  // Validate user count
  if (!checkoutData.userCount || checkoutData.userCount < 1) {
    errors.push('User count must be at least 1');
  }
  
  // Validate total
  if (typeof checkoutData.total !== 'number' || checkoutData.total <= 0) {
    errors.push('Invalid total amount');
  }
  
  // Validate user
  if (!checkoutData.user) {
    errors.push('User information is missing');
  } else {
    if (!checkoutData.user.email) {
      errors.push('User email is required');
    }
    // User must have at least uid (displayName is optional)
    if (!checkoutData.user.uid) {
      errors.push('User ID is required');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Extract query parameters from URL
 * @param {string} search - URL search string (e.g., window.location.search)
 * @returns {Object} - Parsed query parameters
 */
export const parseQueryParams = (search) => {
  const params = new URLSearchParams(search);
  const result = {};
  
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  
  return result;
};

/**
 * Error messages for payment flow
 */
export const ERROR_MESSAGES = {
  CONFIG_MISSING: 'Payment system is not configured. Please contact support.',
  TERMS_NOT_AGREED: 'Please agree to the terms and conditions to proceed.',
  USER_INFO_MISSING: 'Please complete your profile before making a payment.',
  BACKEND_UNAVAILABLE: 'Unable to connect to payment service. Please try again.',
  HASH_GENERATION_FAILED: 'Payment initialization failed. Please contact support.',
  NETWORK_TIMEOUT: 'Request timed out. Please check your connection and try again.',
  HASH_VERIFICATION_FAILED: 'Payment verification failed. Please contact support.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again or contact support.',
  INVALID_CHECKOUT_DATA: 'Invalid checkout information. Please try again.'
};

/**
 * Log payment error with context
 * @param {string} errorType - Type of error
 * @param {Error} error - Error object
 * @param {Object} context - Additional context
 */
export const logPaymentError = (errorType, error, context = {}) => {
  console.error('[Payment Error]', {
    timestamp: new Date().toISOString(),
    type: errorType,
    message: error.message,
    txnid: context.txnid,
    userId: context.userId,
    stack: error.stack
  });
};

/**
 * Log payment event
 * @param {string} event - Event name
 * @param {Object} data - Event data
 */
export const logPaymentEvent = (event, data = {}) => {
  console.log('[Payment Event]', {
    timestamp: new Date().toISOString(),
    event,
    ...data
  });
};
