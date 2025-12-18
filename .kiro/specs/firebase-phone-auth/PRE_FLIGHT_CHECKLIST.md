# Pre-Flight Checklist - Firebase Phone Auth Testing

## Before You Start Testing

Use this checklist to ensure your environment is properly configured.

## ✅ Development Environment

- [ ] Node.js and npm are installed
- [ ] Dependencies are installed (`npm install`)
- [ ] Development server starts without errors (`npm run dev`)
- [ ] Application loads at http://localhost:5173

## ✅ Firebase Configuration

### Firebase Console Setup

- [ ] Firebase project exists
- [ ] Phone Authentication is **enabled**
  - Go to: Authentication > Sign-in method > Phone
  - Status should be "Enabled"
- [ ] (Optional) Test phone numbers configured for development
  - Go to: Authentication > Sign-in method > Phone > Phone numbers for testing
  - Example: `+1 650-555-3434` → `123456`

### Environment Variables

Check your `.env` file contains:

- [ ] `VITE_FIREBASE_API_KEY`
- [ ] `VITE_FIREBASE_AUTH_DOMAIN`
- [ ] `VITE_FIREBASE_PROJECT_ID`
- [ ] `VITE_FIREBASE_STORAGE_BUCKET`
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `VITE_FIREBASE_APP_ID`

All values should match your Firebase Console project settings.

## ✅ Code Verification

- [ ] All automated tests pass (`npm test`)
  - Expected: 31 tests passed
  - Firebase service tests: ✅
  - PhoneVerification component tests: ✅
  - AuthContext tests: ✅
- [ ] No console errors when loading the application
- [ ] No build errors or warnings

## ✅ Firebase Service Functions

Verify these functions exist in `src/services/firebase.js`:

- [ ] `initializeRecaptcha()`
- [ ] `sendPhoneVerification()`
- [ ] `verifyPhoneCode()`
- [ ] `formatPhoneNumber()`
- [ ] `cleanupRecaptcha()`

## ✅ PhoneVerification Component

Verify the component at `src/components/auth/PhoneVerification.jsx`:

- [ ] Has `recaptcha-container` div element
- [ ] Initializes RecaptchaVerifier on mount
- [ ] Cleans up RecaptchaVerifier on unmount
- [ ] Handles phone number input
- [ ] Handles OTP input (6 digits)
- [ ] Shows resend button with cooldown timer
- [ ] Shows "Change Phone Number" option

## ✅ AuthContext Updates

Verify `src/context/AuthContext.jsx`:

- [ ] Reads `phoneNumber` from Firebase user object
- [ ] Sets `isPhoneVerified` based on `user.phoneNumber`
- [ ] No localStorage-based phone verification logic remains

## ✅ Removed Files

Verify these files are deleted:

- [ ] `src/services/otpService.js` (should NOT exist)
- [ ] No imports of `otpService` in any files

## ✅ Browser Setup

For best testing experience:

- [ ] Use latest version of Chrome, Firefox, or Safari
- [ ] Enable JavaScript
- [ ] Allow pop-ups (for OAuth)
- [ ] Clear browser cache and cookies (optional, for clean test)
- [ ] Open browser DevTools (F12) to monitor console

## ✅ Phone for Testing

- [ ] Have a phone number ready to receive SMS
- [ ] Phone has signal and can receive SMS
- [ ] OR use Firebase test phone numbers (if configured)

## ✅ Documentation Ready

- [ ] Manual Testing Guide is available
- [ ] Quick Start Guide is available
- [ ] Requirements document is available
- [ ] Design document is available

## 🚀 Ready to Test!

If all items above are checked, you're ready to begin manual testing.

**Next Steps:**

1. Start development server: `npm run dev`
2. Open: `.kiro/specs/firebase-phone-auth/QUICK_START.md`
3. Follow: `.kiro/specs/firebase-phone-auth/MANUAL_TESTING_GUIDE.md`

---

## Troubleshooting

### Development Server Won't Start

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Firebase Configuration Issues

1. Verify `.env` file exists and has correct values
2. Check Firebase Console for project settings
3. Ensure Phone Authentication is enabled
4. Restart development server after changing `.env`

### Tests Failing

```bash
# Run tests with verbose output
npm test -- --reporter=verbose

# Run specific test file
npm test -- src/services/firebase.test.js
```

### reCAPTCHA Not Working

1. Check Firebase Console > Authentication > Settings
2. Verify domain is authorized (localhost should work by default)
3. Check browser console for reCAPTCHA errors
4. Try clearing browser cache

### SMS Not Received

1. Check phone number format (E.164: `+[country code][number]`)
2. Verify Firebase project has SMS quota
3. Check Firebase Console > Authentication > Usage for errors
4. Try using a test phone number (if configured)

---

**Last Updated:** December 18, 2024

