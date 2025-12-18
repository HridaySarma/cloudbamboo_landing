# Firebase Phone Authentication - Manual Testing Guide

## Overview

This guide provides step-by-step instructions for manually testing the Firebase Phone Authentication feature. All automated tests are passing, and this manual testing will verify the complete user experience across different scenarios and environments.

## Prerequisites

Before starting manual testing, ensure:

1. ✅ All automated tests pass (verified)
2. ✅ Firebase Console is properly configured with Phone Authentication enabled
3. ✅ Test phone numbers are configured in Firebase Console (for development)
4. ✅ Environment variables are set correctly in `.env` file
5. ✅ Development server can be started successfully

## Test Environment Setup

### Development Environment

```bash
# Start the development server
npm run dev

# The application should be accessible at http://localhost:5173
```

### Firebase Console Configuration

Verify in Firebase Console:
- Authentication > Sign-in method > Phone is **Enabled**
- Authentication > Settings > Test phone numbers are configured (optional for dev)
- Example test number: `+1 650-555-3434` with code `123456`

## Test Scenarios

### 1. Complete Authentication Flow ✓

**Objective:** Test the full flow from email authentication through phone verification to dashboard access.

**Steps:**

1. Navigate to `/login`
2. Sign in using email/password or Google OAuth
3. Verify redirect to `/verify` (phone verification page)
4. Enter a valid phone number with country code
   - Example: Country Code: `+91`, Phone: `9876543210`
5. Click "Send OTP" button
6. Observe:
   - Loading state appears
   - reCAPTCHA verification happens (should be invisible)
   - Success message appears
   - UI transitions to OTP input step
7. Check your phone for SMS (or use test phone number code)
8. Enter the 6-digit OTP code
9. Click "Verify" button
10. Observe:
    - Loading state appears
    - Success message appears
    - Redirect to `/dashboard`
11. Verify dashboard shows:
    - User is fully authenticated
    - Phone number is displayed
    - All dashboard features are accessible

**Expected Results:**
- ✅ Smooth transition between steps
- ✅ No console errors
- ✅ Phone number persists in user profile
- ✅ User can access protected routes

---

### 2. Resend OTP Functionality ✓

**Objective:** Test the resend OTP feature with cooldown timer enforcement.

**Steps:**

1. Complete steps 1-6 from Test Scenario 1 (reach OTP input step)
2. Observe the "Resend OTP" button state:
   - Should be **disabled** initially
   - Should show countdown timer (30 seconds)
3. Wait and observe the countdown:
   - Timer should count down: 29, 28, 27... 1, 0
   - Button should remain disabled during countdown
4. After countdown reaches 0:
   - Button should become **enabled**
   - Button text should change to "Resend OTP"
5. Click "Resend OTP" button
6. Observe:
   - New SMS is sent
   - Countdown timer resets to 30 seconds
   - Button becomes disabled again
7. Check phone for new SMS code
8. Enter the new code and verify

**Expected Results:**
- ✅ Cooldown timer enforces 30-second wait
- ✅ Button states change correctly
- ✅ New SMS is received after resend
- ✅ New code works for verification

---

### 3. Change Phone Number During Verification ✓

**Objective:** Test the ability to go back and change the phone number.

**Steps:**

1. Complete steps 1-6 from Test Scenario 1 (reach OTP input step)
2. Click "Change Phone Number" or "Back" button
3. Observe:
   - UI returns to phone input step
   - Previous phone number is cleared (or retained, depending on UX design)
   - OTP inputs are cleared
   - Verification state is reset
4. Enter a **different** phone number
5. Click "Send OTP" again
6. Verify new SMS is sent to the new number
7. Enter OTP and complete verification

**Expected Results:**
- ✅ State is properly cleaned up when going back
- ✅ New phone number can be entered
- ✅ New verification process works correctly
- ✅ No lingering state from previous attempt

---

### 4. Error Scenarios ✓

**Objective:** Test various error conditions and verify appropriate error messages.

#### 4.1 Invalid Phone Number Format

**Steps:**
1. Navigate to phone verification page
2. Try entering invalid phone numbers:
   - Letters: `abcd123456`
   - Too short: `12345`
   - Too long: `123456789012345`
   - Special characters: `+91-9876-543210`
3. Click "Send OTP"

**Expected Results:**
- ✅ Validation error appears before API call
- ✅ User-friendly error message displayed
- ✅ No SMS is sent
- ✅ User can correct and retry

#### 4.2 Wrong OTP Code

**Steps:**
1. Complete phone number entry and receive SMS
2. Enter an **incorrect** 6-digit code (e.g., `000000`)
3. Click "Verify"

**Expected Results:**
- ✅ Error message: "Invalid verification code. Please check and try again."
- ✅ OTP inputs remain editable
- ✅ User can retry without resending SMS
- ✅ After 3 failed attempts, suggest resending code

#### 4.3 Expired OTP Code

**Steps:**
1. Complete phone number entry and receive SMS
2. Wait for 5+ minutes (code expiration time)
3. Enter the expired code
4. Click "Verify"

**Expected Results:**
- ✅ Error message: "Verification code has expired. Please request a new code."
- ✅ Resend button becomes enabled automatically
- ✅ User can request new code

#### 4.4 Network Errors

**Steps:**
1. Open browser DevTools > Network tab
2. Set network to "Offline" mode
3. Try to send OTP or verify code

**Expected Results:**
- ✅ Error message: "Network error. Please check your connection."
- ✅ Retry button or option appears
- ✅ Form state is preserved
- ✅ User can retry when connection is restored

#### 4.5 Rate Limiting

**Steps:**
1. Send OTP multiple times rapidly (5-10 times)
2. Observe Firebase rate limiting

**Expected Results:**
- ✅ Error message: "Too many attempts. Please try again later."
- ✅ Clear guidance on when to retry
- ✅ No application crash

#### 4.6 Phone Number Already in Use

**Steps:**
1. Use a phone number that's already linked to another account
2. Complete verification

**Expected Results:**
- ✅ Error message: "This phone number is already linked to another account."
- ✅ User can try a different number
- ✅ Clear guidance provided

---

### 5. reCAPTCHA Behavior ✓

**Objective:** Test reCAPTCHA verification in different modes.

#### 5.1 Invisible reCAPTCHA (Normal Flow)

**Steps:**
1. Navigate to phone verification page
2. Enter phone number and click "Send OTP"
3. Observe reCAPTCHA behavior

**Expected Results:**
- ✅ reCAPTCHA verification happens automatically
- ✅ No visible reCAPTCHA challenge appears
- ✅ SMS is sent without user interaction
- ✅ Smooth user experience

#### 5.2 reCAPTCHA Challenge (Suspicious Activity)

**Steps:**
1. Simulate suspicious activity (rapid requests, VPN, etc.)
2. Try to send OTP

**Expected Results:**
- ✅ reCAPTCHA challenge appears (image selection)
- ✅ User can complete the challenge
- ✅ After successful challenge, SMS is sent
- ✅ Error handling if challenge fails

#### 5.3 reCAPTCHA Failure

**Steps:**
1. If reCAPTCHA fails or times out
2. Observe error handling

**Expected Results:**
- ✅ Error message: "reCAPTCHA verification failed. Please try again."
- ✅ User can retry
- ✅ reCAPTCHA is reinitialized

---

### 6. Phone Number Persistence Across Sessions ✓

**Objective:** Verify phone number persists after sign out and sign in.

**Steps:**

1. Complete full authentication flow (email + phone)
2. Navigate to dashboard
3. Verify phone number is displayed
4. Sign out of the application
5. Close the browser completely
6. Reopen browser and navigate to the application
7. Sign in with the **same email account**
8. Observe:
   - Should redirect directly to dashboard (skip phone verification)
   - Phone number should still be displayed
   - No need to verify phone again

**Expected Results:**
- ✅ Phone number is stored in Firebase user object
- ✅ No re-verification required on subsequent logins
- ✅ Phone number persists across devices
- ✅ User experience is seamless

---

### 7. Cross-Device Testing ✓

**Objective:** Test phone verification on different devices.

**Devices to Test:**
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- Different screen sizes (responsive design)

**Steps:**

1. Test complete flow on each device
2. Verify UI responsiveness
3. Test touch interactions on mobile
4. Verify SMS delivery on actual mobile devices

**Expected Results:**
- ✅ UI adapts to different screen sizes
- ✅ Touch interactions work smoothly
- ✅ SMS delivery works on mobile devices
- ✅ No layout issues or broken functionality

---

## Production Environment Testing

### Prerequisites

1. Deploy application to production environment
2. Verify Firebase project is configured for production
3. Ensure production environment variables are set
4. Verify SMS quota is sufficient

### Production-Specific Tests

1. **Real Phone Numbers:**
   - Test with actual phone numbers (not test numbers)
   - Verify SMS delivery in different countries
   - Test with various carriers

2. **Performance:**
   - Measure SMS delivery time
   - Verify reCAPTCHA performance
   - Check for any latency issues

3. **Security:**
   - Verify reCAPTCHA is working in production
   - Test rate limiting behavior
   - Verify no sensitive data in console logs

4. **Monitoring:**
   - Check Firebase Console for authentication metrics
   - Monitor error rates
   - Verify logging is working correctly

---

## Test Results Checklist

Use this checklist to track your testing progress:

### Development Environment
- [ ] Complete authentication flow works
- [ ] Resend OTP with cooldown timer works
- [ ] Change phone number functionality works
- [ ] Invalid phone number validation works
- [ ] Wrong OTP error handling works
- [ ] Expired OTP error handling works
- [ ] Network error handling works
- [ ] Rate limiting error handling works
- [ ] Phone already in use error handling works
- [ ] Invisible reCAPTCHA works
- [ ] reCAPTCHA challenge works (if triggered)
- [ ] reCAPTCHA failure handling works
- [ ] Phone persistence across sessions works
- [ ] Desktop browser testing complete
- [ ] Mobile browser testing complete

### Production Environment
- [ ] Real phone number verification works
- [ ] SMS delivery is timely
- [ ] Performance is acceptable
- [ ] Security measures are active
- [ ] Monitoring is working
- [ ] No console errors in production

---

## Known Issues / Notes

Document any issues found during testing:

1. **Issue:** [Description]
   - **Severity:** High / Medium / Low
   - **Steps to Reproduce:** [Steps]
   - **Expected:** [Expected behavior]
   - **Actual:** [Actual behavior]
   - **Status:** Open / In Progress / Resolved

---

## Rollback Plan

If critical issues are found in production:

1. Revert to previous version using Git
2. Disable phone authentication in Firebase Console
3. Notify users of temporary issues
4. Fix issues in development
5. Re-test thoroughly before redeploying

---

## Support Resources

- **Firebase Documentation:** https://firebase.google.com/docs/auth/web/phone-auth
- **Firebase Console:** https://console.firebase.google.com/
- **reCAPTCHA Documentation:** https://developers.google.com/recaptcha/docs/display

---

## Testing Sign-Off

**Tester Name:** ___________________________

**Date:** ___________________________

**Environment:** Development / Production

**Overall Status:** ✅ Pass / ❌ Fail / ⚠️ Pass with Issues

**Notes:**

_______________________________________________________________

_______________________________________________________________

_______________________________________________________________

