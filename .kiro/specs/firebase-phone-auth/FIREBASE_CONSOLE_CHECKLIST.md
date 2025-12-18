# Firebase Console Configuration Checklist

## ⚠️ CRITICAL: This is likely why your OTP is not being received!

Based on the Firebase documentation, here are the **required** Firebase Console configurations:

---

## 1. Enable Phone Number Sign-In Method

### Steps:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **cloudbamboo-digital-core**
3. Navigate to **Authentication** → **Sign-in method**
4. Find **Phone** in the list of providers
5. Click on **Phone** and enable it
6. Click **Save**

**Status:** ☐ Not Verified

---

## 2. Add Authorized Domains (MOST IMPORTANT!)

### Why This Matters:
> "On the same page, if the domain that will host your app isn't listed in the OAuth redirect domains section, add your domain."

Firebase will **block** phone auth requests from unauthorized domains!

### Steps:
1. In Firebase Console → **Authentication** → **Settings** tab
2. Scroll to **Authorized domains** section
3. Check if your domains are listed:
   - ☐ `localhost` (for local development)
   - ☐ Your production domain (e.g., `yourdomain.com`)
   - ☐ Your staging domain (if any)

### To Add a Domain:
1. Click **Add domain**
2. Enter your domain (e.g., `yourdomain.com`)
3. Click **Add**

**Current Status:** ☐ Not Verified

---

## 3. Optional: Set SMS Region Policy

### Why:
Helps protect against SMS abuse and can improve delivery rates.

### Steps:
1. In Firebase Console → **Authentication** → **Settings** tab
2. Find **SMS region policy** section
3. Choose:
   - **Allow all regions** (default)
   - **Allow specific regions** (recommended for production)
   - **Block specific regions**

For India-based app, consider:
- Allow: India (IN), USA (US), UK (GB), UAE (AE), etc.

**Status:** ☐ Optional - Not Required for Testing

---

## 4. Check Phone Auth Quotas

### Default Limits:
- **10 SMS per phone number per day** (for testing)
- **100 SMS per project per day** (free tier)

### If You're Hitting Limits:
1. Use **test phone numbers** (see below)
2. Upgrade to Blaze plan for higher quotas
3. Check usage in Firebase Console → **Authentication** → **Usage**

**Status:** ☐ Check if testing with real numbers

---

## 5. Set Up Test Phone Numbers (Recommended for Development)

### Why:
- No SMS quota consumption
- No actual SMS sent
- Instant verification
- No throttling

### Steps:
1. In Firebase Console → **Authentication** → **Sign-in method**
2. Scroll to **Phone numbers for testing**
3. Click **Add phone number**
4. Enter:
   - Phone number: `+1 650-555-3434` (example)
   - Verification code: `123456` (any 6-digit code)
5. Click **Add**

### Recommended Test Numbers:
```
+1 650-555-1234 → 123456
+91 98765-43210 → 654321
```

**Status:** ☐ Not Set Up

---

## 6. Verify reCAPTCHA Configuration

### Check:
1. In Firebase Console → **Authentication** → **Settings**
2. Scroll to **reCAPTCHA enforcement**
3. Ensure it's enabled (default)

### Domain Verification:
reCAPTCHA must be able to verify your domain. This is automatically handled by Firebase, but requires:
- ✅ Domain is in **Authorized domains** list
- ✅ App is served over HTTPS (production) or localhost (development)

**Status:** ☐ Not Verified

---

## 7. Check Firebase Project Settings

### Verify:
1. Firebase Console → **Project Settings** (gear icon)
2. **General** tab
3. Confirm your app is registered:
   - App ID: `1:746949156954:web:5b5a904a925e134b57f863`
   - Auth domain: `cloudbamboo-digital-core.firebaseapp.com`

**Status:** ✅ Verified (from .env file)

---

## Common Issues & Solutions

### Issue 1: "reCAPTCHA verification failed"
**Cause:** Domain not authorized
**Solution:** Add your domain to Authorized domains (Step 2)

### Issue 2: "SMS not sent" / "quota-exceeded"
**Cause:** Hit daily SMS limit
**Solution:** Use test phone numbers (Step 5)

### Issue 3: "auth/invalid-phone-number"
**Cause:** Phone number format incorrect
**Solution:** Ensure E.164 format: `+[country code][number]`
- ✅ Correct: `+919876543210`
- ❌ Wrong: `9876543210`, `+91 98765 43210`

### Issue 4: OTP not received on real phone
**Possible causes:**
1. Domain not authorized (most common)
2. SMS quota exceeded
3. Phone number blocked/invalid
4. Network issues
5. SMS region policy blocking the country

---

## Testing Checklist

### Before Testing:
- [ ] Phone auth enabled in Firebase Console
- [ ] Your domain added to Authorized domains
- [ ] Test phone numbers configured (optional but recommended)
- [ ] Code updated with latest changes

### Test with Test Phone Number:
1. [ ] Use test number: `+1 650-555-3434`
2. [ ] Enter test code: `123456`
3. [ ] Should sign in immediately without SMS

### Test with Real Phone Number:
1. [ ] Use your real phone number
2. [ ] Check SMS arrives within 30 seconds
3. [ ] Enter received code
4. [ ] Should sign in successfully

---

## Next Steps

1. **Immediately check Step 2** (Authorized domains) - this is the most common issue
2. Set up test phone numbers for development (Step 5)
3. Test with test phone number first
4. Then test with real phone number
5. Monitor Firebase Console → Authentication → Usage for any errors

---

## Need Help?

If OTP still not received after checking all items:

1. Check browser console for errors
2. Check Firebase Console → Authentication → Usage for error logs
3. Verify phone number format is E.164
4. Try with a test phone number first
5. Check if SMS region policy is blocking your country
