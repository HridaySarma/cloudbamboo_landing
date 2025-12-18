# OTP Not Received - Troubleshooting Guide

## Quick Diagnosis

### Step 1: Check Browser Console
Open browser DevTools (F12) and look for errors. Common errors:

#### Error: "auth/billing-not-enabled" ⚠️ MOST COMMON
**Root Cause:** Phone auth requires Firebase Blaze (pay-as-you-go) plan
**Fix:** 
1. **Quick fix (free):** Use test phone numbers - see `BILLING_REQUIREMENT.md`
2. **Production fix:** Upgrade to Blaze plan (first 10,000 verifications free)
3. Test numbers work on free Spark plan without any billing

#### Error: "reCAPTCHA verification failed"
**Root Cause:** Your domain is not authorized in Firebase Console
**Fix:** 
1. Go to Firebase Console → Authentication → Settings
2. Add your domain to "Authorized domains"
3. For local dev, ensure `localhost` is in the list

#### Error: "auth/quota-exceeded"
**Root Cause:** You've exceeded the SMS quota (10 per phone/day on Blaze plan)
**Fix:**
1. Use test phone numbers instead (see below)
2. Wait 24 hours
3. Increase quota limits

#### Error: "auth/invalid-phone-number"
**Root Cause:** Phone number format is incorrect
**Fix:** Ensure E.164 format: `+[country][number]`
- ✅ `+919876543210`
- ❌ `9876543210`

---

## Step 2: Verify Firebase Console Settings

### Critical Settings to Check:

1. **Phone Auth Enabled?**
   - Firebase Console → Authentication → Sign-in method
   - Phone provider should be **Enabled**

2. **Domain Authorized?** (MOST COMMON ISSUE)
   - Firebase Console → Authentication → Settings
   - Check "Authorized domains" section
   - Must include:
     - `localhost` (for development)
     - Your production domain

3. **SMS Region Policy**
   - Firebase Console → Authentication → Settings
   - Check if your country is blocked
   - For India: Ensure India (IN) is allowed

---

## Step 3: Test with Test Phone Numbers

Instead of using real phone numbers, use Firebase test numbers:

### Setup:
1. Firebase Console → Authentication → Sign-in method
2. Scroll to "Phone numbers for testing"
3. Add test number:
   ```
   Phone: +1 650-555-3434
   Code: 123456
   ```

### Benefits:
- ✅ No SMS sent (instant verification)
- ✅ No quota consumption
- ✅ No throttling
- ✅ Works offline

### Test:
1. Enter test phone number: `+1 650-555-3434`
2. Click "Send OTP"
3. Enter test code: `123456`
4. Should sign in immediately

---

## Step 4: Check Code Implementation

### Verify reCAPTCHA Container Exists:
```jsx
<div id="recaptcha-container"></div>
```

### Verify Phone Number Format:
```javascript
// Correct format
const phone = formatPhoneNumber('9876543210', '91');
// Result: '+919876543210'
```

### Check RecaptchaVerifier Initialization:
```javascript
const verifier = initializeRecaptcha('recaptcha-container');
// Should not throw errors
```

---

## Step 5: Network & Environment Checks

### Check Network Tab:
1. Open DevTools → Network tab
2. Look for requests to:
   - `identitytoolkit.googleapis.com`
   - `www.google.com/recaptcha`

### Verify Environment Variables:
```bash
# Check .env file
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
```

### Check Firebase Initialization:
```javascript
// In browser console
console.log(auth);
// Should show Firebase Auth instance
```

---

## Common Scenarios & Solutions

### Scenario 1: Works on localhost, fails on production
**Cause:** Production domain not authorized
**Solution:** Add production domain to Firebase Console → Authorized domains

### Scenario 2: Worked yesterday, not working today
**Cause:** SMS quota exceeded
**Solution:** 
- Check Firebase Console → Authentication → Usage
- Use test phone numbers
- Wait 24 hours

### Scenario 3: reCAPTCHA shows but OTP not received
**Cause:** Phone number issue or SMS delivery problem
**Solution:**
- Verify phone number format (E.164)
- Check SMS region policy
- Try different phone number
- Use test phone number

### Scenario 4: "reCAPTCHA expired" error
**Cause:** User took too long to submit
**Solution:** Code now auto-resets reCAPTCHA (after latest update)

---

## Testing Workflow

### 1. Test with Test Phone Number (Recommended First)
```
Phone: +1 650-555-3434
Code: 123456
```
**Expected:** Instant verification, no SMS

### 2. Test with Real Phone Number
```
Phone: +91 [your number]
```
**Expected:** SMS received within 30 seconds

### 3. Check Firebase Console Logs
- Firebase Console → Authentication → Usage
- Look for errors or blocked requests

---

## Still Not Working?

### Debug Checklist:
- [ ] Phone auth enabled in Firebase Console
- [ ] Domain in Authorized domains list
- [ ] Using correct phone format (+[country][number])
- [ ] Not exceeding SMS quota
- [ ] reCAPTCHA container exists in DOM
- [ ] No console errors
- [ ] Firebase config correct in .env
- [ ] Test phone number works

### Get More Info:
1. Check browser console for detailed errors
2. Check Network tab for failed requests
3. Check Firebase Console → Authentication → Usage
4. Try with test phone number first

### Contact Support:
If all checks pass but still not working:
1. Screenshot of browser console errors
2. Screenshot of Firebase Console settings
3. Phone number format being used
4. Country/region you're testing from

---

## Quick Fix Commands

### Restart Development Server:
```bash
npm run dev
```

### Clear Browser Cache:
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

### Check Firebase Status:
Visit: https://status.firebase.google.com/

---

## Updated Code Features

The latest code update includes:

✅ Automatic language detection for SMS
✅ Pre-rendering reCAPTCHA to catch errors early
✅ Automatic reCAPTCHA reset on errors
✅ Better error messages with Firebase Console hints
✅ Improved reCAPTCHA lifecycle management

Make sure you're using the latest code!
