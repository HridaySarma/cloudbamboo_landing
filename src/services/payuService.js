/**
 * PayU Payment Gateway Service
 * Handles communication with PayU hosted checkout and backend hash service
 */

/**
 * Generate unique transaction ID
 * @returns {string} - Unique transaction ID with format "TXN" + timestamp + random string
 */
export const generateTransactionId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11).toUpperCase();
  return `TXN${timestamp}${random}`;
};

/**
 * Request hash generation from backend
 * @param {Object} params - PayU parameters
 * @returns {Promise<string>} - Generated hash
 */
export const generatePayUHash = async (params) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  if (!backendUrl) {
    throw new Error('Backend URL not configured');
  }
  
  try {
    const response = await fetch(`${backendUrl}/api/payment/generate-hash`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });
    
    if (!response.ok) {
      throw new Error('Hash generation failed');
    }
    
    const data = await response.json();
    return data.hash;
  } catch (error) {
    console.error('Error generating hash:', error);
    throw error;
  }
};

/**
 * Verify response hash from backend
 * @param {Object} responseData - PayU response data
 * @returns {Promise<boolean>} - Hash verification result
 */
export const verifyPayUHash = async (responseData) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  if (!backendUrl) {
    throw new Error('Backend URL not configured');
  }
  
  try {
    const response = await fetch(`${backendUrl}/api/payment/verify-hash`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseData)
    });
    
    if (!response.ok) {
      throw new Error('Hash verification failed');
    }
    
    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error('Error verifying hash:', error);
    throw error;
  }
};

/**
 * Submit form to PayU
 * @param {Object} params - PayU parameters including hash
 */
export const submitToPayU = (params) => {
  const payuUrl = import.meta.env.VITE_PAYU_URL || 'https://test.payu.in/_payment';
  
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = payuUrl;
  
  // Add all parameters as hidden inputs
  Object.keys(params).forEach(key => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = params[key];
    form.appendChild(input);
  });
  
  document.body.appendChild(form);
  form.submit();
};

/**
 * Validate PayU configuration
 * @returns {Object} - Validation result with missing fields
 */
export const validatePayUConfig = () => {
  const requiredEnvVars = [
    'VITE_PAYU_MERCHANT_KEY',
    'VITE_PAYU_SUCCESS_URL',
    'VITE_PAYU_FAILURE_URL',
    'VITE_BACKEND_URL'
  ];
  
  const missing = requiredEnvVars.filter(
    varName => !import.meta.env[varName]
  );
  
  return {
    valid: missing.length === 0,
    missing
  };
};
