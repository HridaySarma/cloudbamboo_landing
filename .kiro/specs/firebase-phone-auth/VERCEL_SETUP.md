# Vercel Deployment Setup for Firebase Phone Auth

## Your Current Setup

- ✅ Site hosted on Vercel
- ✅ reCAPTCHA working
- ✅ Firebase accepting phone verification requests
- ❌ SMS not being received

## Issue

Your Vercel domain needs to be added to Firebase authorized domains, AND you likely need to upgrade your Firebase plan.

## Quick Fix Steps

### Step 1: Add Vercel Domain to Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **cloudbamboo-digital-core**
3. Navigate to: **Authentication** → **Settings**
4. Scroll to **Authorized domains**
5. Click **Add domain**
6. Add your Vercel domains:
   - Your Vercel preview URL (e.g., `cloudbamboo-xyz.vercel.app`)
   - Your production domain: `cloudbamboo.in`
   - Any other Vercel URLs you use

### Step 2: Upgrade Firebase Plan (Required for SMS)

**This is the most likely reason SMS isn't working!**

1. In Firebase Console, click **Upgrade** (left sidebar or top banner)
2. Select **Blaze Plan** (pay-as-you-go)
3. Add billing information
4. Confirm upgrade

**Why?** The Spark (free) plan has very limited or no SMS capability.

**Cost:** ~$0.01 per SMS (very affordable)

### Step 3: Verify Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Ensure these are set for **Production**, **Preview**, and **Development**:

```
VITE_FIREBASE_API_KEY=AIzaSyBVWsrWShnUPmswFKIBng4MqRSu5gY4GhY
VITE_FIREBASE_AUTH_DOMAIN=cloudbamboo-digital-core.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cloudbamboo-digital-core
VITE_FIREBASE_STORAGE_BUCKET=cloudbamboo-digital-core.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=746949156954
VITE_FIREBASE_APP_ID=1:746949156954:web:5b5a904a925e134b57f863
```

### Step 4: Redeploy on Vercel

After making Firebase changes:

```bash
# Push to git (if auto-deploy enabled)
git add .
git commit -m "Update Firebase config"
git push

# Or trigger manual deploy in Vercel dashboard
```

## Vercel-Specific Configuration

### Finding Your Vercel Domain

1. Vercel Dashboard → Your Project
2. Look at **Domains** section
3. You'll see URLs like:
   - `your-project.vercel.app` (production)
   - `your-project-git-branch.vercel.app` (preview)
   - `cloudbamboo.in` (custom domain)

### Add All Vercel Domains

Add these to Firebase authorized domains:
- ✅ Production: `your-project.vercel.app`
- ✅ Custom domain: `cloudbamboo.in`
- ✅ Preview domains (optional): `your-project-git-*.vercel.app`

**Note:** You can use wildcards in some cases, but it's safer to add specific domains.

## Testing on Vercel

### Option 1: Use Test Phone Numbers (No SMS Required)

Perfect for testing without SMS costs:

1. Firebase Console → **Authentication** → **Sign-in method** → **Phone**
2. Scroll to **Phone numbers for testing**
3. Add: `+916000280524` → Code: `123456`
4. Save

Now on your Vercel site:
- Enter: `+916000280524`
- Use code: `123456`
- Instant verification, no SMS

### Option 2: Use Real Phone Numbers (After Upgrade)

After upgrading to Blaze plan:
- Enter real phone number
- SMS will be sent
- Enter received code
- Verification completes

## Vercel Environment Variables

### Setting Variables

```bash
# Using Vercel CLI
vercel env add VITE_FIREBASE_API_KEY

# Or in Vercel Dashboard
Settings → Environment Variables → Add
```

### Important Notes

- Set for all environments (Production, Preview, Development)
- Redeploy after adding variables
- Variables starting with `VITE_` are exposed to client

## Debugging on Vercel

### Check Vercel Logs

1. Vercel Dashboard → Your Project → **Deployments**
2. Click on latest deployment
3. Check **Build Logs** for errors
4. Check **Function Logs** (if using serverless functions)

### Check Browser Console

On your Vercel site:
1. Open DevTools (F12)
2. Check Console for errors
3. You should see:
   ```
   reCAPTCHA initialized successfully
   Firebase: Phone verification sent successfully
   ```

### Check Network Tab

1. DevTools → Network
2. Look for requests to `identitytoolkit.googleapis.com`
3. Check response status (should be 200)

## Common Vercel Issues

### Issue 1: Environment Variables Not Loading

**Symptom:** Firebase not configured errors

**Solution:**
- Verify variables are set in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

### Issue 2: Domain Not Authorized

**Symptom:** reCAPTCHA fails or auth errors

**Solution:**
- Add Vercel domain to Firebase authorized domains
- Include both `.vercel.app` and custom domain

### Issue 3: Build Errors

**Symptom:** Deployment fails

**Solution:**
```bash
# Test build locally first
npm run build

# Check for errors
# Fix and push again
```

## Vercel + Firebase Best Practices

### 1. Use Environment Variables

Never hardcode Firebase config in code:
```javascript
// ❌ Bad
const firebaseConfig = {
  apiKey: "AIzaSy...",
  // ...
};

// ✅ Good
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // ...
};
```

### 2. Set Up Preview Deployments

- Test on preview URLs before production
- Add preview domains to Firebase if needed

### 3. Monitor Costs

- Set up Firebase billing alerts
- Monitor SMS usage in Firebase Console
- Use test phone numbers for development

### 4. Security

- Don't commit `.env` files
- Use Vercel environment variables
- Rotate API keys if exposed

## Deployment Workflow

```bash
# 1. Make changes locally
npm run dev

# 2. Test locally
# Use test phone numbers

# 3. Build and test
npm run build
npm run preview

# 4. Commit and push
git add .
git commit -m "Update phone auth"
git push

# 5. Vercel auto-deploys
# Check deployment status in dashboard

# 6. Test on Vercel URL
# Use real phone numbers (after Blaze upgrade)
```

## Cost Optimization

### Development
- Use test phone numbers (free)
- Test on localhost when possible

### Staging
- Use test phone numbers
- Limited real SMS testing

### Production
- Real phone numbers only
- Monitor usage
- Set budget alerts

## Quick Checklist for Vercel

- [ ] Vercel domain added to Firebase authorized domains
- [ ] Firebase upgraded to Blaze plan
- [ ] Environment variables set in Vercel dashboard
- [ ] Latest code deployed to Vercel
- [ ] Test phone numbers configured (for testing)
- [ ] Browser console shows no errors
- [ ] SMS received (or using test numbers)

## Next Steps

1. **Immediate:** Add Vercel domain to Firebase
2. **Critical:** Upgrade to Blaze plan for SMS
3. **Testing:** Use test phone numbers
4. **Production:** Test with real numbers

---

## TL;DR for Vercel

1. Add your Vercel domain to Firebase authorized domains
2. Upgrade Firebase to Blaze plan (required for SMS)
3. Use test phone numbers for testing (no SMS needed)
4. Redeploy on Vercel after changes

Your code is working correctly - you just need the Firebase plan upgrade!

