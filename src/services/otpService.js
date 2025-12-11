/**
 * OTP Service using AuthKey.io SMS API
 * 
 * Environment Variables Required:
 * - VITE_AUTHKEY_API_KEY: Your AuthKey.io API key
 * - VITE_AUTHKEY_SENDER_ID: Your registered sender ID
 */

const AUTHKEY_API_KEY = import.meta.env.VITE_AUTHKEY_API_KEY;
const AUTHKEY_SENDER_ID = import.meta.env.VITE_AUTHKEY_SENDER_ID || 'WCHPNT';

// Store OTPs temporarily (in production, this should be handled server-side)
const otpStore = new Map();

/**
 * Generate a random 6-digit OTP
 * @returns {string}
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP via AuthKey.io SMS API
 * @param {string} phone - Phone number without country code
 * @param {string} countryCode - Country code (e.g., '91' for India)
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const sendOTP = async (phone, countryCode = '91') => {
  try {
    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with expiry (5 minutes)
    const expiryTime = Date.now() + 5 * 60 * 1000;
    const phoneKey = `${countryCode}${phone}`;
    otpStore.set(phoneKey, { otp, expiryTime, attempts: 0 });

    // Construct SMS message
    const smsMessage = `Your WatchPoint verification code is ${otp}. Valid for 5 minutes. Do not share this code with anyone.`;
    
    // AuthKey.io API URL
    const apiUrl = `https://console.authkey.io/request?authkey=${AUTHKEY_API_KEY}&mobile=${phone}&country_code=${countryCode}&sms=${encodeURIComponent(smsMessage)}&sender=${AUTHKEY_SENDER_ID}`;

    // Make API call
    const response = await fetch(apiUrl, {
      method: 'GET',
    });

    const data = await response.text();
    
    // Check if the request was successful
    // AuthKey.io typically returns a JSON response or a success message
    if (response.ok) {
      console.log('OTP sent successfully:', data);
      return {
        success: true,
        message: 'OTP sent successfully to your phone number.',
      };
    } else {
      console.error('Failed to send OTP:', data);
      // Still return success for demo/development if API key is not configured
      if (!AUTHKEY_API_KEY) {
        console.warn('AuthKey API key not configured. OTP for testing:', otp);
        return {
          success: true,
          message: 'OTP sent successfully (demo mode).',
          // In development, you might want to return the OTP for testing
          ...(import.meta.env.DEV && { debugOTP: otp }),
        };
      }
      throw new Error('Failed to send OTP. Please try again.');
    }
  } catch (error) {
    console.error('OTP send error:', error);
    
    // For development/demo purposes, still allow OTP flow
    if (!AUTHKEY_API_KEY || import.meta.env.DEV) {
      const otp = generateOTP();
      const phoneKey = `${countryCode}${phone}`;
      const expiryTime = Date.now() + 5 * 60 * 1000;
      otpStore.set(phoneKey, { otp, expiryTime, attempts: 0 });
      
      console.warn('Running in demo mode. OTP:', otp);
      return {
        success: true,
        message: 'OTP sent successfully (demo mode).',
        ...(import.meta.env.DEV && { debugOTP: otp }),
      };
    }
    
    throw new Error(error.message || 'Failed to send OTP. Please try again.');
  }
};

/**
 * Verify the OTP entered by user
 * @param {string} phone - Phone number without country code
 * @param {string} countryCode - Country code
 * @param {string} userOTP - OTP entered by user
 * @returns {{success: boolean, message: string}}
 */
export const verifyOTP = (phone, countryCode = '91', userOTP) => {
  const phoneKey = `${countryCode}${phone}`;
  const storedData = otpStore.get(phoneKey);

  if (!storedData) {
    return {
      success: false,
      message: 'OTP expired or not found. Please request a new OTP.',
    };
  }

  // Check expiry
  if (Date.now() > storedData.expiryTime) {
    otpStore.delete(phoneKey);
    return {
      success: false,
      message: 'OTP has expired. Please request a new OTP.',
    };
  }

  // Check attempts (max 3)
  if (storedData.attempts >= 3) {
    otpStore.delete(phoneKey);
    return {
      success: false,
      message: 'Too many failed attempts. Please request a new OTP.',
    };
  }

  // Verify OTP
  if (storedData.otp === userOTP) {
    otpStore.delete(phoneKey);
    return {
      success: true,
      message: 'Phone number verified successfully!',
    };
  }

  // Increment attempts
  storedData.attempts += 1;
  otpStore.set(phoneKey, storedData);

  return {
    success: false,
    message: `Invalid OTP. ${3 - storedData.attempts} attempts remaining.`,
  };
};

/**
 * Resend OTP to the same phone number
 * @param {string} phone - Phone number without country code
 * @param {string} countryCode - Country code
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const resendOTP = async (phone, countryCode = '91') => {
  // Clear any existing OTP
  const phoneKey = `${countryCode}${phone}`;
  otpStore.delete(phoneKey);
  
  // Send new OTP
  return sendOTP(phone, countryCode);
};

/**
 * Check if an OTP exists and is still valid for a phone number
 * @param {string} phone - Phone number without country code
 * @param {string} countryCode - Country code
 * @returns {boolean}
 */
export const hasValidOTP = (phone, countryCode = '91') => {
  const phoneKey = `${countryCode}${phone}`;
  const storedData = otpStore.get(phoneKey);
  
  if (!storedData) return false;
  if (Date.now() > storedData.expiryTime) {
    otpStore.delete(phoneKey);
    return false;
  }
  
  return true;
};

/**
 * Get remaining time for OTP expiry
 * @param {string} phone - Phone number without country code
 * @param {string} countryCode - Country code
 * @returns {number} Remaining seconds, or 0 if expired/not found
 */
export const getOTPExpiryTime = (phone, countryCode = '91') => {
  const phoneKey = `${countryCode}${phone}`;
  const storedData = otpStore.get(phoneKey);
  
  if (!storedData) return 0;
  
  const remaining = Math.max(0, Math.floor((storedData.expiryTime - Date.now()) / 1000));
  return remaining;
};

