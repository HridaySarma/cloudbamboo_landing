# PayU Hosted Checkout Integration Guide

## Overview

This guide provides step-by-step instructions for setting up and testing the PayU hosted checkout integration in the WatchPoint subscription platform.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [PayU Account Setup](#payu-account-setup)
4. [Backend Service Requirements](#backend-service-requirements)
5. [Testing with PayU Test Environment](#testing-with-payu-test-environment)
6. [Production Deployment](#production-deployment)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher) installed
- A PayU merchant account (test or production)
- A backend service capable of generating and verifying SHA-512 hashes
- Access to your Firebase project for authentication

## Environment Setup

### 1. Copy Environment Template

```bash
cp .env.example .env
```

### 2. Configure Environment Variables

Edit the `.env` file and add your credentials:

```env
# Firebase Configuration (already configured)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# PayU Configuration
VITE_PAYU_MERCHANT_KEY=your_merchant_key
VITE_PAYU_URL=https://test.payu.in/_payment
VITE_PAYU_SUCCESS_URL=http://localhost:5173/payment/success
VITE_PAYU_FAILURE_URL=http://localhost:5173/payment/failure

# Backend API
VITE_BACKEND_URL=http://localhost:3000
```

### Environment Variable Details

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_PAYU_MERCHANT_KEY` | Your PayU merchant key | `gtKFFx` (test) |
| `VITE_PAYU_URL` | PayU payment endpoint | `https://test.payu.in/_payment` (test)<br>`https://secure.payu.in/_payment` (prod) |
| `VITE_PAYU_SUCCESS_URL` | Success redirect URL | `http://localhost:5173/payment/success` |
| `VITE_PAYU_FAILURE_URL` | Failure redirect URL | `http://localhost:5173/payment/failure` |
| `VITE_BACKEND_URL` | Your backend API URL | `http://localhost:3000` |

## PayU Account Setup

### 1. Create PayU Account

**For Testing:**
- Visit [PayU Test Dashboard](https://test.payu.in)
- Sign up for a test merchant account
- Note your test merchant key and salt

**For Production:**
- Contact PayU sales team
- Complete KYC verification
- Receive production credentials

### 2. Configure PayU Dashboard

1. Log in to PayU dashboard
2. Navigate to **Settings** > **Integration**
3. Add your success and failure URLs:
   - Success URL: `https://yourdomain.com/payment/success`
   - Failure URL: `https://yourdomain.com/payment/failure`
4. Enable desired payment methods (Credit Card, Debit Card, UPI, Net Banking)
5. Configure webhook URL (optional but recommended)

### 3. Obtain Credentials

From the PayU dashboard:
- Copy your **Merchant Key**
- Copy your **Salt** (keep this secure, never expose in frontend)

## Backend Service Requirements

The frontend requires a backend service with two endpoints:

### 1. Hash Generation Endpoint

**Endpoint:** `POST /api/payment/generate-hash`

**Request Body:**
```json
{
  "key": "merchant_key",
  "txnid": "TXN1234567890ABC",
  "amount": "1180.00",
  "productinfo": "Pro Plan - 50 users",
  "firstname": "John",
  "email": "john@example.com",
  "phone": "9876543210",
  "udf1": "Pro",
  "udf2": "50",
  "udf3": "user_uid_123",
  "udf4": "",
  "udf5": ""
}
```

**Response:**
```json
{
  "hash": "generated_sha512_hash_here"
}
```

**Hash Generation Logic:**
```javascript
// Node.js example
const crypto = require('crypto');

function generateHash(params, salt) {
  const hashString = `${params.key}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|${params.udf1}|${params.udf2}|${params.udf3}|${params.udf4}|${params.udf5}||||||${salt}`;
  
  return crypto
    .createHash('sha512')
    .update(hashString)
    .digest('hex')
    .toLowerCase();
}
```

### 2. Hash Verification Endpoint

**Endpoint:** `POST /api/payment/verify-hash`

**Request Body:**
```json
{
  "key": "merchant_key",
  "txnid": "TXN1234567890ABC",
  "amount": "1180.00",
  "productinfo": "Pro Plan - 50 users",
  "firstname": "John",
  "email": "john@example.com",
  "status": "success",
  "udf1": "Pro",
  "udf2": "50",
  "udf3": "user_uid_123",
  "udf4": "",
  "udf5": "",
  "hash": "response_hash_from_payu"
}
```

**Response:**
```json
{
  "valid": true
}
```

**Hash Verification Logic:**
```javascript
// Node.js example
function verifyHash(params, salt) {
  const hashString = `${salt}|${params.status}||||||${params.udf5}|${params.udf4}|${params.udf3}|${params.udf2}|${params.udf1}|${params.email}|${params.firstname}|${params.productinfo}|${params.amount}|${params.txnid}|${params.key}`;
  
  const calculatedHash = crypto
    .createHash('sha512')
    .update(hashString)
    .digest('hex')
    .toLowerCase();
  
  return calculatedHash === params.hash.toLowerCase();
}
```

## Testing with PayU Test Environment

### 1. Start Development Server

```bash
npm run dev
```

### 2. Test Payment Flow

1. Navigate to `http://localhost:5173`
2. Log in with your Firebase account
3. Go to Dashboard
4. Select a subscription plan
5. Click "Upgrade Plan" or "Subscribe"
6. Review checkout details
7. Agree to terms and click "Pay Now"
8. You'll be redirected to PayU test payment page

### 3. Test Cards

PayU provides test cards for different scenarios:

**Successful Payment:**
- Card Number: `5123456789012346`
- CVV: `123`
- Expiry: Any future date
- Name: Any name

**Failed Payment:**
- Card Number: `4111111111111111`
- CVV: `123`
- Expiry: Any future date
- Name: Any name

**Test UPI:**
- UPI ID: `success@payu`
- Status: Success

### 4. Verify Success Flow

After successful payment:
1. You should be redirected to `/payment/success`
2. Transaction details should be displayed
3. Hash verification should succeed
4. Transaction should be logged in console

### 5. Verify Failure Flow

After failed payment:
1. You should be redirected to `/payment/failure`
2. Error message should be displayed
3. Transaction ID should be shown
4. Retry option should be available

## Production Deployment

### 1. Update Environment Variables

Update your production `.env` file:

```env
# Use production PayU URL
VITE_PAYU_URL=https://secure.payu.in/_payment

# Use production domain URLs
VITE_PAYU_SUCCESS_URL=https://yourdomain.com/payment/success
VITE_PAYU_FAILURE_URL=https://yourdomain.com/payment/failure

# Use production backend URL
VITE_BACKEND_URL=https://api.yourdomain.com

# Use production PayU credentials
VITE_PAYU_MERCHANT_KEY=your_production_key
```

### 2. Build for Production

```bash
npm run build
```

### 3. Deploy

Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

### 4. Configure PayU Dashboard

1. Log in to production PayU dashboard
2. Update success/failure URLs to production URLs
3. Test with real payment methods
4. Monitor transactions

### 5. Pre-Launch Checklist

- [ ] All environment variables configured correctly
- [ ] Backend hash service is deployed and accessible
- [ ] Success/failure URLs are publicly accessible
- [ ] PayU dashboard configured with correct URLs
- [ ] SSL certificate installed (HTTPS required)
- [ ] Test complete payment flow in production
- [ ] Error logging and monitoring set up
- [ ] Customer support contact information updated

## Troubleshooting

### Issue: "Payment system is not configured"

**Cause:** Missing environment variables

**Solution:**
1. Check `.env` file exists
2. Verify all `VITE_PAYU_*` variables are set
3. Restart development server after changes

### Issue: "Hash generation failed"

**Cause:** Backend service unavailable or incorrect

**Solution:**
1. Verify `VITE_BACKEND_URL` is correct
2. Check backend service is running
3. Test hash endpoint directly with curl:
```bash
curl -X POST http://localhost:3000/api/payment/generate-hash \
  -H "Content-Type: application/json" \
  -d '{"key":"test","txnid":"TXN123","amount":"100.00",...}'
```

### Issue: "Payment verification failed"

**Cause:** Hash mismatch or incorrect salt

**Solution:**
1. Verify backend is using correct salt
2. Check hash generation sequence is correct
3. Ensure hash is lowercase
4. Verify all parameters match exactly

### Issue: Redirect not working

**Cause:** Incorrect success/failure URLs

**Solution:**
1. Check URLs in `.env` match your domain
2. Verify URLs are publicly accessible
3. Update PayU dashboard with correct URLs
4. Ensure URLs use HTTPS in production

### Issue: "Unable to connect to payment service"

**Cause:** Network or CORS issues

**Solution:**
1. Check backend CORS configuration
2. Verify backend allows requests from your domain
3. Check network tab in browser dev tools
4. Ensure backend is accessible from frontend

## Security Best Practices

1. **Never expose salt in frontend code**
   - Salt should only exist in backend
   - Use environment variables for backend

2. **Always verify response hash**
   - Don't trust payment status without verification
   - Use backend service for verification

3. **Use HTTPS in production**
   - Required by PayU
   - Protects sensitive data

4. **Validate all inputs**
   - Sanitize user inputs before sending to PayU
   - Validate amounts and transaction IDs

5. **Log all transactions**
   - Keep audit trail of all payment attempts
   - Monitor for suspicious activity

6. **Implement rate limiting**
   - Prevent abuse of payment endpoints
   - Limit failed payment attempts

## Support

### PayU Support
- Email: support@payu.in
- Phone: +91-120-4606060
- Documentation: https://docs.payu.in

### WatchPoint Support
- Email: support@watchpoint.com
- Documentation: See project README.md

## Additional Resources

- [PayU Integration Documentation](https://docs.payu.in/docs/getting-started)
- [PayU Test Cards](https://docs.payu.in/docs/test-cards)
- [PayU API Reference](https://docs.payu.in/api-reference)
- [SHA-512 Hash Calculator](https://emn178.github.io/online-tools/sha512.html)
