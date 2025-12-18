# Firebase Phone Auth - Quick Start Guide

## 🚀 Ready to Test!

All automated tests are passing ✅. You're ready to begin manual testing.

## Start Testing in 3 Steps

### 1. Start the Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

### 2. Open the Manual Testing Guide

Open `.kiro/specs/firebase-phone-auth/MANUAL_TESTING_GUIDE.md` for detailed test scenarios.

### 3. Begin Testing

Start with **Test Scenario 1: Complete Authentication Flow**

## Quick Test Flow

1. Navigate to `/login`
2. Sign in with email/password or Google
3. You'll be redirected to `/verify`
4. Enter phone number (e.g., `+91 9876543210`)
5. Click "Send OTP"
6. Enter the 6-digit code from SMS
7. Click "Verify"
8. You should land on `/dashboard` ✅

## Using Test Phone Numbers (Development)

If configured in Firebase Console, you can use test phone numbers:

- **Phone:** `+1 650-555-3434`
- **Code:** `123456`

This skips actual SMS sending during development.

## Firebase Console Access

Check authentication status and logs:
- **Console:** https://console.firebase.google.com/
- **Project:** [Your Project Name]
- **Section:** Authentication > Users

## Test Status

- ✅ All automated tests passing
- ✅ Unit tests: 31/31 passed
- ✅ Property-based tests: All passed
- ✅ Firebase service tests: All passed
- ✅ PhoneVerification component tests: All passed
- ✅ AuthContext tests: All passed

## What to Test

Focus on these key areas:

1. **Happy Path:** Complete flow works smoothly
2. **Error Handling:** Invalid inputs show proper errors
3. **Resend OTP:** Cooldown timer works correctly
4. **Persistence:** Phone number persists after sign out/in
5. **reCAPTCHA:** Invisible verification works

## Need Help?

- **Full Testing Guide:** `.kiro/specs/firebase-phone-auth/MANUAL_TESTING_GUIDE.md`
- **Requirements:** `.kiro/specs/firebase-phone-auth/requirements.md`
- **Design Doc:** `.kiro/specs/firebase-phone-auth/design.md`
- **Firebase Docs:** https://firebase.google.com/docs/auth/web/phone-auth

## Reporting Issues

If you find issues during testing:

1. Note the test scenario number
2. Document steps to reproduce
3. Include error messages from console
4. Take screenshots if helpful
5. Add to "Known Issues" section in MANUAL_TESTING_GUIDE.md

---

**Happy Testing! 🎉**

