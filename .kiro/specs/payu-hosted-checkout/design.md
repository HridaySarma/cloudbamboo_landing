# Design Document - PayU Hosted Checkout Integration

## Overview

This design outlines the frontend implementation for integrating PayU's hosted checkout solution into the WatchPoint subscription platform. The solution follows a redirect-based payment flow where users are redirected from our checkout page to PayU's hosted payment page, complete the transaction, and are redirected back to our success or failure pages.

The frontend is responsible for:
1. Collecting and preparing transaction parameters
2. Requesting hash generation from the backend service
3. Submitting a form to redirect users to PayU
4. Handling payment responses and verifying hash integrity
5. Displaying appropriate success/failure messages

The backend hash generation service is out of scope for this design and will be implemented separately.

## Architecture

### High-Level Flow

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐      ┌──────────────┐
│   Checkout  │─────>│   Backend    │─────>│    PayU     │─────>│   Response   │
│     Page    │      │ Hash Service │      │   Hosted    │      │   Handler    │
└─────────────┘      └──────────────┘      └─────────────┘      └──────────────┘
      │                     │                      │                     │
      │ 1. Prepare params   │                      │                     │
      │────────────────────>│                      │                     │
      │                     │                      │                     │
      │ 2. Generate hash    │                      │                     │
      │<────────────────────│                      │                     │
      │                     │                      │                     │
      │ 3. POST form        │                      │                     │
      │─────────────────────────────────────────>│                     │
      │                     │                      │                     │
      │                     │ 4. Process payment   │                     │
      │                     │                      │                     │
      │                     │ 5. POST response     │                     │
      │                     │                      │────────────────────>│
      │                     │                      │                     │
      │                     │ 6. Verify hash       │                     │
      │                     │<─────────────────────────────────────────│
      │                     │                      │                     │
      │                     │ 7. Display result    │                     │
      │                     │                      │                     │
```

### Component Architecture

```
src/
├── components/
│   ├── checkout/
│   │   ├── Checkout.jsx (Enhanced)
│   │   └── Checkout.css
│   └── payment/
│       ├── PaymentSuccess.jsx (New)
│       ├── PaymentFailure.jsx (New)
│       ├── PaymentSuccess.css (New)
│       └── PaymentFailure.css (New)
├── services/
│   └── payuService.js (New)
├── utils/
│   └── paymentHelpers.js (New)
└── main.jsx (Updated routes)
```

## Components and Interfaces

### 1. Enhanced Checkout Component

**File:** `src/components/checkout/Checkout.jsx`

**Responsibilities:**
- Display order summary and user information
- Validate user agreement to terms
- Collect transaction parameters
- Request hash from backend service
- Create and submit hidden form to PayU
- Handle loading states and errors

**Key Functions:**

```javascript
// Generate unique transaction ID
const generateTransactionId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9).toUpperCase();
  return `TXN${timestamp}${random}`;
};

// Prepare PayU parameters
const preparePayUParams = () => {
  return {
    key: import.meta.env.VITE_PAYU_MERCHANT_KEY,
    txnid: generateTransactionId(),
    amount: total.toFixed(2),
    productinfo: `${plan.name} Plan - ${userCount} users`,
    firstname: user?.displayName?.split(' ')[0] || 'User',
    email: user?.email,
    phone: user?.phoneNumber || '',
    surl: import.meta.env.VITE_PAYU_SUCCESS_URL,
    furl: import.meta.env.VITE_PAYU_FAILURE_URL,
    udf1: plan.name,
    udf2: userCount.toString(),
    udf3: user?.uid || '',
    udf4: '',
    udf5: ''
  };
};

// Handle payment initiation
const handlePayment = async () => {
  // 1. Validate terms agreement
  // 2. Prepare parameters
  // 3. Request hash from backend
  // 4. Create and submit form
  // 5. Handle errors
};
```

**State Management:**
```javascript
const [loading, setLoading] = useState(false);
const [agreed, setAgreed] = useState(false);
const [error, setError] = useState(null);
const [paymentInitiated, setPaymentInitiated] = useState(false);
```

### 2. PayU Service

**File:** `src/services/payuService.js`

**Responsibilities:**
- Communicate with backend hash service
- Create and submit PayU form
- Validate environment configuration

**Interface:**

```javascript
/**
 * Request hash generation from backend
 * @param {Object} params - PayU parameters
 * @returns {Promise<string>} - Generated hash
 */
export const generatePayUHash = async (params) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
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
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = import.meta.env.VITE_PAYU_URL || 'https://test.payu.in/_payment';
  
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
```

### 3. Payment Success Component

**File:** `src/components/payment/PaymentSuccess.jsx`

**Responsibilities:**
- Receive PayU response via URL parameters
- Verify response hash with backend
- Display success message and transaction details
- Provide navigation to dashboard

**Key Features:**
- Extract response parameters from URL
- Display transaction ID, amount, and payment method
- Show success animation
- Provide "Go to Dashboard" button
- Log transaction details

**State Management:**
```javascript
const [verifying, setVerifying] = useState(true);
const [verified, setVerified] = useState(false);
const [transactionData, setTransactionData] = useState(null);
const [error, setError] = useState(null);
```

### 4. Payment Failure Component

**File:** `src/components/payment/PaymentFailure.jsx`

**Responsibilities:**
- Receive PayU failure response
- Display failure reason
- Provide retry and navigation options

**Key Features:**
- Extract failure details from URL
- Display user-friendly error message
- Show "Retry Payment" button
- Show "Back to Plans" button
- Log failure details

## Data Models

### Transaction Parameters

```typescript
interface PayUTransactionParams {
  // Mandatory fields
  key: string;              // Merchant key from env
  txnid: string;            // Unique transaction ID
  amount: string;           // Transaction amount (2 decimal places)
  productinfo: string;      // Product description
  firstname: string;        // Customer first name
  email: string;            // Customer email
  phone: string;            // Customer phone
  surl: string;             // Success URL
  furl: string;             // Failure URL
  hash: string;             // SHA-512 hash
  
  // Optional fields
  lastname?: string;        // Customer last name
  address1?: string;        // Billing address line 1
  address2?: string;        // Billing address line 2
  city?: string;            // City
  state?: string;           // State
  country?: string;         // Country
  zipcode?: string;         // Zip code
  udf1?: string;            // User defined field 1 (plan name)
  udf2?: string;            // User defined field 2 (user count)
  udf3?: string;            // User defined field 3 (user ID)
  udf4?: string;            // User defined field 4
  udf5?: string;            // User defined field 5
}
```

### PayU Response Data

```typescript
interface PayUSuccessResponse {
  mihpayid: string;         // PayU transaction ID
  mode: string;             // Payment mode (CC, DC, NB, UPI, etc.)
  status: string;           // Transaction status (success, failure, pending)
  unmappedstatus: string;   // Detailed status
  key: string;              // Merchant key
  txnid: string;            // Transaction ID
  amount: string;           // Transaction amount
  productinfo: string;      // Product description
  firstname: string;        // Customer first name
  email: string;            // Customer email
  phone: string;            // Customer phone
  udf1: string;             // User defined field 1
  udf2: string;             // User defined field 2
  udf3: string;             // User defined field 3
  udf4: string;             // User defined field 4
  udf5: string;             // User defined field 5
  hash: string;             // Response hash for verification
  PG_TYPE: string;          // Payment gateway type
  bankcode: string;         // Bank code
  bank_ref_num: string;     // Bank reference number
  field1?: string;          // Additional field 1
  field9?: string;          // Additional field 9 (message)
}

interface PayUFailureResponse {
  key: string;              // Merchant key
  txnid: string;            // Transaction ID
  amount: string;           // Transaction amount
  productinfo: string;      // Product description
  firstname: string;        // Customer first name
  email: string;            // Customer email
  phone: string;            // Customer phone
  status: string;           // Transaction status (failure)
  error: string;            // Error code
  error_Message: string;    // Error message
  hash: string;             // Response hash
}
```

### Environment Configuration

```typescript
interface PayUConfig {
  VITE_PAYU_MERCHANT_KEY: string;     // PayU merchant key
  VITE_PAYU_SALT: string;             // PayU salt (not exposed to frontend)
  VITE_PAYU_URL: string;              // PayU endpoint URL
  VITE_PAYU_SUCCESS_URL: string;      // Success redirect URL
  VITE_PAYU_FAILURE_URL: string;      // Failure redirect URL
  VITE_BACKEND_URL: string;           // Backend service URL
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Transaction ID Uniqueness
*For any* two payment initiation requests, the generated transaction IDs should be unique and never collide.
**Validates: Requirements 1.2**

### Property 2: Parameter Completeness
*For any* payment initiation, all mandatory PayU parameters (key, txnid, amount, productinfo, firstname, email, phone, surl, furl, hash) should be present and non-empty.
**Validates: Requirements 1.1, 4.1**

### Property 3: Hash Request Format
*For any* hash generation request sent to the backend, the parameters should be in the exact order: key, txnid, amount, productinfo, firstname, email, udf1, udf2, udf3, udf4, udf5.
**Validates: Requirements 4.2**

### Property 4: Form Submission Integrity
*For any* successful hash generation, the form submitted to PayU should contain all parameters that were used to generate the hash without modification.
**Validates: Requirements 1.5, 4.4**

### Property 5: Environment Validation
*For any* payment initiation attempt, if required environment variables are missing, the system should prevent payment and display an error message.
**Validates: Requirements 5.5**

### Property 6: Response Hash Verification
*For any* PayU response received, the system should verify the hash before trusting the transaction status.
**Validates: Requirements 3.4, 4.5**

### Property 7: Loading State Consistency
*For any* payment flow, when loading is true, the pay button should be disabled and display a loading indicator.
**Validates: Requirements 6.1, 6.2**

### Property 8: Error Recovery
*For any* error during payment initiation, the system should reset to a state where the user can retry payment.
**Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5**

### Property 9: Navigation Guard
*For any* checkout page load without plan data, the system should redirect to the dashboard.
**Validates: Requirements 10.2**

### Property 10: Amount Calculation Consistency
*For any* order summary, the total amount displayed should equal subtotal minus discount plus GST, and this same amount should be sent to PayU.
**Validates: Requirements 8.3, 8.4**

## Error Handling

### Error Categories

1. **Configuration Errors**
   - Missing environment variables
   - Invalid environment values
   - Action: Display error message, prevent payment, log error

2. **Validation Errors**
   - Terms not agreed
   - Missing user information
   - Invalid plan data
   - Action: Display validation message, prevent payment

3. **Network Errors**
   - Backend service unavailable
   - Request timeout
   - Connection failure
   - Action: Display user-friendly message, enable retry, log error

4. **Hash Generation Errors**
   - Backend returns error
   - Invalid response format
   - Action: Display error message, enable retry, log error

5. **Hash Verification Errors**
   - Hash mismatch
   - Verification service unavailable
   - Action: Display security warning, prevent trust, log error

### Error Messages

```javascript
const ERROR_MESSAGES = {
  CONFIG_MISSING: 'Payment system is not configured. Please contact support.',
  TERMS_NOT_AGREED: 'Please agree to the terms and conditions to proceed.',
  USER_INFO_MISSING: 'Please complete your profile before making a payment.',
  BACKEND_UNAVAILABLE: 'Unable to connect to payment service. Please try again.',
  HASH_GENERATION_FAILED: 'Payment initialization failed. Please contact support.',
  NETWORK_TIMEOUT: 'Request timed out. Please check your connection and try again.',
  HASH_VERIFICATION_FAILED: 'Payment verification failed. Please contact support.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again or contact support.'
};
```

### Error Logging

All errors should be logged with the following information:
- Timestamp
- Error type
- Error message
- Transaction ID (if available)
- User ID
- Stack trace (for debugging)

```javascript
const logPaymentError = (errorType, error, context = {}) => {
  console.error('[Payment Error]', {
    timestamp: new Date().toISOString(),
    type: errorType,
    message: error.message,
    txnid: context.txnid,
    userId: context.userId,
    stack: error.stack
  });
};
```

## Testing Strategy

### Unit Testing

Unit tests will verify individual functions and components in isolation:

1. **Transaction ID Generation**
   - Test uniqueness across multiple calls
   - Test format (starts with "TXN", contains timestamp and random string)

2. **Parameter Preparation**
   - Test all mandatory fields are included
   - Test UDF fields default to empty strings
   - Test amount formatting (2 decimal places)

3. **Environment Validation**
   - Test detection of missing variables
   - Test validation passes with all variables present

4. **Error Message Display**
   - Test correct error message for each error type
   - Test error state resets after retry

5. **Form Creation**
   - Test form has correct action URL
   - Test all parameters are added as hidden inputs
   - Test form is appended to document body

### Property-Based Testing

Property-based tests will verify universal properties across many inputs using the `fast-check` library (already in package.json). Each test will run a minimum of 100 iterations.

1. **Property Test: Transaction ID Uniqueness**
   - **Feature: payu-hosted-checkout, Property 1: Transaction ID Uniqueness**
   - Generate multiple transaction IDs and verify no duplicates

2. **Property Test: Parameter Completeness**
   - **Feature: payu-hosted-checkout, Property 2: Parameter Completeness**
   - Generate random valid checkout data and verify all mandatory parameters are present

3. **Property Test: Hash Request Format**
   - **Feature: payu-hosted-checkout, Property 3: Hash Request Format**
   - Generate random parameters and verify they are ordered correctly for hash generation

4. **Property Test: Form Submission Integrity**
   - **Feature: payu-hosted-checkout, Property 4: Form Submission Integrity**
   - Generate random parameters with hash and verify form contains exact same values

5. **Property Test: Environment Validation**
   - **Feature: payu-hosted-checkout, Property 5: Environment Validation**
   - Generate random combinations of missing env vars and verify validation fails appropriately

6. **Property Test: Amount Calculation Consistency**
   - **Feature: payu-hosted-checkout, Property 10: Amount Calculation Consistency**
   - Generate random pricing data and verify total calculation matches PayU amount

### Integration Testing

Integration tests will verify the complete payment flow:

1. **Checkout to PayU Flow**
   - Mock backend hash service
   - Verify form submission with correct parameters
   - Verify redirect to PayU URL

2. **Success Response Handling**
   - Mock PayU success response
   - Verify hash verification call
   - Verify success page display

3. **Failure Response Handling**
   - Mock PayU failure response
   - Verify failure page display
   - Verify retry functionality

### Manual Testing Checklist

1. **Happy Path**
   - Complete checkout with valid data
   - Verify redirect to PayU
   - Complete payment on PayU test environment
   - Verify success page displays correct details

2. **Error Scenarios**
   - Test with missing environment variables
   - Test with backend service down
   - Test with invalid user data
   - Test payment failure on PayU

3. **Edge Cases**
   - Test with very long product names
   - Test with special characters in user data
   - Test with minimum and maximum amounts
   - Test with slow network connection

## Security Considerations

1. **Hash Generation**
   - Never generate hash on frontend
   - Always use backend service for hash generation
   - Never expose salt in frontend code

2. **Hash Verification**
   - Always verify response hash before trusting status
   - Use backend service for verification
   - Reject responses with invalid hash

3. **Data Transmission**
   - Use HTTPS for all communications
   - Never log sensitive data (hash, salt)
   - Sanitize user inputs before sending to backend

4. **Environment Variables**
   - Store sensitive config in environment variables
   - Never commit .env file to version control
   - Use different keys for test and production

5. **Error Messages**
   - Don't expose internal error details to users
   - Log detailed errors server-side only
   - Use generic messages for security errors

## Deployment Considerations

### Environment Variables

**Development (.env.local):**
```
VITE_PAYU_MERCHANT_KEY=test_merchant_key
VITE_PAYU_URL=https://test.payu.in/_payment
VITE_PAYU_SUCCESS_URL=http://localhost:5173/payment/success
VITE_PAYU_FAILURE_URL=http://localhost:5173/payment/failure
VITE_BACKEND_URL=http://localhost:3000
```

**Production (.env.production):**
```
VITE_PAYU_MERCHANT_KEY=prod_merchant_key
VITE_PAYU_URL=https://secure.payu.in/_payment
VITE_PAYU_SUCCESS_URL=https://yourdomain.com/payment/success
VITE_PAYU_FAILURE_URL=https://yourdomain.com/payment/failure
VITE_BACKEND_URL=https://api.yourdomain.com
```

### Pre-Deployment Checklist

1. Verify all environment variables are set
2. Test payment flow in staging environment
3. Verify success/failure URLs are publicly accessible
4. Test hash generation and verification with backend
5. Verify error handling for all scenarios
6. Test with PayU test credentials
7. Review security measures
8. Set up monitoring and logging

### Post-Deployment Verification

1. Test complete payment flow in production
2. Verify success/failure redirects work correctly
3. Monitor error logs for issues
4. Verify hash verification is working
5. Test with real PayU credentials
6. Monitor transaction logs

## Future Enhancements

1. **Payment Method Selection**
   - Allow users to pre-select payment method
   - Use `enforced_payment` parameter

2. **Saved Payment Methods**
   - Store payment preferences
   - Quick checkout for returning customers

3. **Payment Analytics**
   - Track conversion rates
   - Monitor payment failures
   - Analyze payment method preferences

4. **Retry Logic**
   - Automatic retry for transient failures
   - Exponential backoff for network errors

5. **Webhook Integration**
   - Implement server-to-server webhook handler
   - More reliable than browser redirects
   - Better for reconciliation

6. **Multi-Currency Support**
   - Support payments in different currencies
   - Dynamic currency conversion

7. **Subscription Management**
   - Recurring payment setup
   - Subscription cancellation
   - Plan upgrades/downgrades
