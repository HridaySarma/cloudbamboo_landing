# SMS Not Received - Troubleshooting Guide

## Issue

Firebase Phone Auth shows "OTP sent successfully" but SMS is not received on the phone.

## Common Causes

### 1. Firebase Project Not Upgraded (Most Common)

**Symptom:** Code works, no errors, but SMS never arrives

**Cause:** Firebase Spark (free) plan has very limited SMS quota or may not send SMS at all

**Solution:** Upgrade to Blaze (pay-as-you-go) plan

**Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **cloudbamboo-digital-core**
3. Click on **Upgrade** in the left sidebar (or top banner)
4. Select **Blaze Plan** (pay-as-you-go)
5. Add billing information
6. Confirm upgrade

**Cost:** 
- SMS costs vary by country
- India: ~$0.01 per SMS
- USA: ~$0.01 per SMS
- You only pay for what you use

### 2. SMS Quota Exceeded

**Check Usage:**
1. Firebase Console → **Authentication** → **Usage**
2. Look for SMS quota limits
3. Check if quota is exceeded

**Solution:**
- Upgrade plan
- Request quota increase
- Wait for quota reset (monthly)

### 3. Phone Number Issues

**Common Problems:**

#### Invalid Format
- ❌ `6000280524` (missing country code)
- ❌ `+91 6000280524` (space in number)
- ✅ `+916000280524` (correct E.164 format)

Your number looks correct: `+916000280524`

#### Number Blocked
- Some carriers block automated SMS
- Try different phone number
- Try different carrier

#### DND (Do Not Disturb) Enabled
- In India, DND can block promotional SMS
- Firebase SMS might be classified as promotional
- Try number without DND

### 4. Country/Region Restrictions

**Check if India is allowed:**
1. Firebase Console → **Authentication** → **Sign-in method** → **Phone**
2. Check **SMS region policy**
3. Ensure India is not blocked

**Solution:**
- Remove any region restrictions
- Or explicitly allow India

### 5. Vercel Domain Not Authorized

**Issue:** Your site is on Vercel, but domain might not be authorized

**Check:**
1. Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Ensure your Vercel domain is listed:
   - `your-app.vercel.app`
   - `cloudbamboo.in` (if custom domain)

**Add Vercel Domain:**
1. Click **Add domain**
2. Enter your Vercel URL (e.g., `cloudbamboo-xyz.vercel.app`)
3. Save

### 6. Firebase Project Configuration

**Verify Phone Auth is Fully Enabled:**
1. Firebase Console → **Authentication** → **Sign-in method**
2. Phone should show **Enabled**
3. Click on Phone to see details
4. Check for any warnings or errors

### 7. Carrier/Network Issues

**Temporary Issues:**
- SMS gateway delays (can take 5-10 minutes)
- Carrier network issues
- International SMS routing delays

**Solution:**
- Wait 10-15 minutes
- Try again
- Try different phone number

## Immediate Solutions

### Solution 1: Use Test Phone Numbers (Recommended for Testing)

This bypasses SMS entirely:

1. Firebase Console → **Authentication** → **Sign-in method** → **Phone**
2. Scroll to **Phone numbers for testing**
3. Click **Add phone number**
4. Add: `+916000280524` → Code: `123456`
5. Save

Now when you use this number:
- No SMS will be sent
- Use code `123456` to verify
- Works instantly
- No costs

### Solution 2: Upgrade to Blaze Plan

This is required for production use:

1. Firebase Console → **Upgrade to Blaze**
2. Add billing information
3. Set budget alerts (recommended)
4. Try sending SMS again

### Solution 3: Check Firebase Console Logs

1. Firebase Console → **Authentication** → **Usage**
2. Look for error messages
3. Check SMS delivery status

## Debugging Steps

### Step 1: Check Firebase Console

```
Firebase Console → Authentication → Usage
```

Look for:
- SMS sent count
- Error messages
- Quota status

### Step 2: Check Browser Console

You should see:
```
Firebase: Phone verification sent successfully
OTP sent successfully, confirmation result received
```

This means Firebase accepted the request.

### Step 3: Wait and Check

- Wait 5-10 minutes (sometimes SMS is delayed)
- Check spam/blocked messages
- Try different phone

### Step 4: Verify Billing

```
Firebase Console → Settings → Usage and billing
```

Check:
- Current plan (Spark or Blaze)
- Billing status
- Any payment issues

## Most Likely Cause

Based on your logs showing successful verification but no SMS:

**You're on the Spark (free) plan which has very limited or no SMS capability.**

**Solution: Upgrade to Blaze plan**

## Testing Without SMS

While you set up billing, use test phone numbers:

```javascript
// In Firebase Console, add test numbers:
+916000280524 → 123456
+919999999999 → 123456

// Use these in your app
// Enter the test number
// Use code 123456
// Verification works without SMS
```

## Vercel-Specific Configuration

Since you're hosting on Vercel:

### 1. Add Vercel Domain to Firebase

```
Firebase Console → Authentication → Settings → Authorized domains
→ Add your-app.vercel.app
```

### 2. Environment Variables on Vercel

Ensure these are set in Vercel dashboard:

```
VITE_FIREBASE_API_KEY=AIzaSyBVWsrWShnUPmswFKIBng4MqRSu5gY4GhY
VITE_FIREBASE_AUTH_DOMAIN=cloudbamboo-digital-core.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cloudbamboo-digital-core
VITE_FIREBASE_STORAGE_BUCKET=cloudbamboo-digital-core.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=746949156954
VITE_FIREBASE_APP_ID=1:746949156954:web:5b5a904a925e134b57f863
```

### 3. Redeploy After Changes

```bash
# If you make Firebase Console changes
# Redeploy on Vercel (or it auto-deploys on git push)
```

## Quick Checklist

- [ ] Firebase project upgraded to Blaze plan
- [ ] Billing information added
- [ ] Phone authentication enabled
- [ ] Vercel domain in authorized domains
- [ ] No region restrictions blocking India
- [ ] Phone number in correct format (+916000280524)
- [ ] Waited 10 minutes for SMS
- [ ] Checked spam/blocked messages
- [ ] Tried different phone number

## Expected Timeline

After upgrading to Blaze plan:
- SMS should arrive within 30 seconds
- Maximum 2-3 minutes
- If longer, check Firebase Console for errors

## Cost Estimate

For testing/development:
- 10 SMS tests = ~$0.10
- 100 SMS tests = ~$1.00
- Very affordable for testing

For production:
- Depends on user volume
- Set budget alerts to monitor

## Next Steps

1. **Immediate:** Add test phone numbers for testing
2. **Short-term:** Upgrade to Blaze plan
3. **Long-term:** Monitor SMS usage and costs

---

## TL;DR

**Most likely issue:** Firebase Spark (free) plan doesn't send SMS.

**Solution:** Upgrade to Blaze plan in Firebase Console.

**Temporary workaround:** Use test phone numbers (no SMS needed).

