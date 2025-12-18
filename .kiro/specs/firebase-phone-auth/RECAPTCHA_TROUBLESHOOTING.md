# reCAPTCHA Troubleshooting Guide

## Issue: Application Gets Stuck at reCAPTCHA

If your application is getting stuck when trying to send OTP, follow these steps to diagnose and fix the issue.

## Step 1: Check Browser Console

Open your browser's Developer Tools (F12) and check the Console tab for errors. Look for:

### Common Error Messages:

1. **"reCAPTCHA verification failed"**
   - Cause: reCAPTCHA configuration issue
   - Solution: See Step 2

2. **"auth/captcha-check-failed"**
   - Cause: reCAPTCHA token invalid or expired
   - Solution: The app should auto-reinitialize (check console logs)

3. **"auth/missing-app-credential"**
   - Cause: Firebase project not properly configured
   - Solution: See Step 3

4. **"auth/invalid-phone-number"**
   - Cause: Phone number format issue
   - Solution: Ensure using E.164 format (+[country code][number])

## Step 2: Verify Firebase Console Configuration

### Enable Phone Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **cloudbamboo-digital-core**
3. Navigate to: **Authentication** > **Sign-in method**
4. Find **Phone** in the list
5. Click on it and toggle **Enable**
6. Click **Save**

### ⚠️ CRITICAL: Localhost Issue

**Important:** `localhost` is NOT allowed as an authorized domain for phone authentication!

**This is the most common reason for reCAPTCHA getting stuck.**

Firebase Phone Auth requires authorized domains, but localhost doesn't work. You have 3 options:

1. **Use Test Phone Numbers** (Recommended) - See Step 3 Option A
2. **Use Firebase Emulator** - See LOCALHOST_SETUP.md
3. **Deploy to Firebase Hosting** - Test on real domain

### Add Authorized Domains (For Production)

1. In Firebase Console: **Authentication** > **Settings** > **Authorized domains**
2. Ensure these domains are listed:
   - `cloudbamboo-digital-core.firebaseapp.com`
   - Your production domain (if deployed)
   - **DO NOT add localhost** (it won't work for phone auth)

## Step 3: Configure reCAPTCHA Settings

### Option A: Use Test Phone Numbers (Development Only)

1. In Firebase Console: **Authentication** > **Sign-in method** > **Phone**
2. Scroll to **Phone numbers for testing**
3. Click **Add phone number**
4. Add: `+1 650-555-3434` with code `123456`
5. This bypasses reCAPTCHA for testing

### Option B: Configure reCAPTCHA for Production

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Register your site if not already done
3. Get your reCAPTCHA site key
4. In Firebase Console: **Authentication** > **Settings**
5. Add your reCAPTCHA configuration

## Step 4: Check Network Tab

1. Open Developer Tools > **Network** tab
2. Try sending OTP
3. Look for requests to:
   - `identitytoolkit.googleapis.com`
   - `www.google.com/recaptcha`

### If requests are failing:

- **Status 400**: Check phone number format
- **Status 403**: Check Firebase project permissions
- **Status 429**: Rate limited, wait and try again
- **No requests**: reCAPTCHA not initializing

## Step 5: Verify DOM Element

The reCAPTCHA needs a DOM element to attach to. Check:

1. Open Developer Tools > **Elements** tab
2. Search for `id="recaptcha-container"`
3. It should exist in the DOM
4. It should be visible (not `display: none`)

## Step 6: Clear Browser Cache

Sometimes cached reCAPTCHA scripts cause issues:

1. Open Developer Tools
2. Right-click the refresh button
3. Select **Empty Cache and Hard Reload**
4. Try again

## Step 7: Check Console Logs

With the updated code, you should see these logs:

```
Initializing reCAPTCHA...
reCAPTCHA initialized successfully
Sending OTP to: +919876543210
Formatted phone: +919876543210
Calling sendPhoneVerification...
Firebase: Sending phone verification to +919876543210
Firebase: Phone verification sent successfully
OTP sent successfully, confirmation result received
```

### If you see:

- **"Failed to initialize reCAPTCHA"**: Check Firebase configuration
- **Stuck after "Calling sendPhoneVerification"**: Check Network tab
- **"reCAPTCHA verification failed"**: See Step 2 & 3

## Step 8: Test with Different Phone Number

Try using a test phone number:

1. Use: `+1 650-555-3434` (if configured in Firebase)
2. Code: `123456`
3. This bypasses SMS sending and reCAPTCHA

## Step 9: Check Firebase Quotas

1. Go to Firebase Console > **Authentication** > **Usage**
2. Check if you've exceeded SMS quota
3. Check if there are any errors logged

## Step 10: Verify Environment Variables

Check your `.env` file:

```bash
VITE_FIREBASE_API_KEY=AIzaSyBVWsrWShnUPmswFKIBng4MqRSu5gY4GhY
VITE_FIREBASE_AUTH_DOMAIN=cloudbamboo-digital-core.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cloudbamboo-digital-core
VITE_FIREBASE_STORAGE_BUCKET=cloudbamboo-digital-core.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=746949156954
VITE_FIREBASE_APP_ID=1:746949156954:web:5b5a904a925e134b57f863
```

All values should match your Firebase Console project settings.

## Common Solutions

### Solution 1: Restart Development Server

```bash
# Stop the server (Ctrl+C)
# Clear cache
rm -rf node_modules/.vite
# Restart
npm run dev
```

### Solution 2: Reinitialize Firebase Project

If nothing works, try:

1. Create a new Firebase project
2. Enable Phone Authentication
3. Update `.env` with new credentials
4. Restart development server

### Solution 3: Use Visible reCAPTCHA (Debugging)

Temporarily change to visible reCAPTCHA to see what's happening:

In `src/services/firebase.js`, change:

```javascript
const recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
  size: 'normal', // Changed from 'invisible'
  callback: (response) => {
    console.log('reCAPTCHA verified');
  },
  'expired-callback': () => {
    console.warn('reCAPTCHA expired');
  }
});
```

This will show the reCAPTCHA challenge visibly so you can see if it's working.

## Still Stuck?

If none of the above works, provide these details:

1. **Console logs** (all of them)
2. **Network tab** (failed requests)
3. **Firebase Console** screenshots showing:
   - Phone authentication enabled
   - Authorized domains
4. **Browser and version**
5. **Operating system**

## Quick Checklist

- [ ] Phone Authentication enabled in Firebase Console
- [ ] Authorized domains include localhost
- [ ] Environment variables are correct
- [ ] Development server restarted after changes
- [ ] Browser cache cleared
- [ ] Console shows "reCAPTCHA initialized successfully"
- [ ] No errors in Network tab
- [ ] `recaptcha-container` div exists in DOM

---

**Most Common Issue:** Phone Authentication not enabled in Firebase Console. Check Step 2 first!

