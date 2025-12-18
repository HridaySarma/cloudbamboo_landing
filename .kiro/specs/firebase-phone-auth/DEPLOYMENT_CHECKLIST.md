# Deployment Checklist for cloudbamboo.in

## Pre-Deployment

- [ ] All automated tests passing (`npm test`)
- [ ] Build succeeds without errors (`npm run build`)
- [ ] Environment variables are correct in `.env`
- [ ] Firebase Phone Authentication is enabled in Console
- [ ] Test phone numbers configured (optional, for testing)

## Firebase Console Setup

- [ ] Go to [Firebase Console](https://console.firebase.google.com/)
- [ ] Select project: **cloudbamboo-digital-core**
- [ ] **Authentication** > **Sign-in method** > **Phone** is **Enabled**
- [ ] **Authentication** > **Settings** > **Authorized domains**:
  - [ ] `cloudbamboo.in` is added
  - [ ] `www.cloudbamboo.in` is added (if using www)
  - [ ] `cloudbamboo-digital-core.firebaseapp.com` is listed

## Deployment Steps

### Option 1: Firebase Hosting (Recommended)

```bash
# 1. Install Firebase CLI (if not installed)
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Initialize (if not done)
firebase init hosting

# 4. Build
npm run build

# 5. Deploy
firebase deploy --only hosting
```

- [ ] Deployment successful
- [ ] Note the deployed URL: `https://cloudbamboo-digital-core.firebaseapp.com`
- [ ] Test on Firebase URL first

### Option 2: Custom Domain Setup

In Firebase Console:

- [ ] Go to **Hosting** > **Add custom domain**
- [ ] Enter: `cloudbamboo.in`
- [ ] Follow DNS configuration instructions
- [ ] Add DNS records to your domain registrar:
  - [ ] A record or CNAME as instructed
  - [ ] TXT record for verification
- [ ] Wait for verification (5-30 minutes)
- [ ] SSL certificate provisioned automatically
- [ ] Domain shows as "Connected" in Firebase Console

## Post-Deployment Testing

### Basic Functionality
- [ ] Visit `https://cloudbamboo.in`
- [ ] Homepage loads correctly
- [ ] No console errors
- [ ] All assets load (images, fonts, etc.)

### Authentication Flow
- [ ] Navigate to `/login`
- [ ] Sign in with email/password works
- [ ] Sign in with Google works
- [ ] Redirect to `/verify` after email auth

### Phone Verification
- [ ] Phone input page loads
- [ ] Enter real phone number
- [ ] Click "Send OTP"
- [ ] reCAPTCHA works (no stuck/hanging)
- [ ] SMS received within 30 seconds
- [ ] Enter OTP code
- [ ] Verification succeeds
- [ ] Redirect to `/dashboard`
- [ ] Phone number displayed in dashboard

### Error Handling
- [ ] Invalid phone number shows error
- [ ] Wrong OTP shows error
- [ ] Resend OTP works with cooldown timer
- [ ] Change phone number works
- [ ] Network errors handled gracefully

### Persistence
- [ ] Sign out
- [ ] Sign in again with same account
- [ ] Phone number still verified (no re-verification needed)
- [ ] Dashboard accessible immediately

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

## Monitoring

### Firebase Console
- [ ] Check **Authentication** > **Users** for new users
- [ ] Check **Authentication** > **Usage** for SMS count
- [ ] Monitor for any error spikes

### Browser Console
- [ ] No JavaScript errors
- [ ] No network errors
- [ ] reCAPTCHA logs show success

### Performance
- [ ] Page load time < 3 seconds
- [ ] SMS delivery time < 30 seconds
- [ ] No memory leaks
- [ ] No excessive API calls

## Rollback Plan

If issues occur:

```bash
# Revert to previous deployment
firebase hosting:rollback

# Or deploy previous version
git checkout <previous-commit>
npm run build
firebase deploy --only hosting
```

## Production Checklist

- [ ] Remove all `console.log` statements (or use production build)
- [ ] Enable production mode optimizations
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Set up analytics (Google Analytics, Firebase Analytics)
- [ ] Configure CSP headers if needed
- [ ] Set up backup/disaster recovery
- [ ] Document deployment process for team
- [ ] Set up CI/CD pipeline (optional)

## Security Checklist

- [ ] HTTPS enabled (automatic with Firebase Hosting)
- [ ] Environment variables not exposed in client code
- [ ] Firebase security rules configured
- [ ] Rate limiting enabled
- [ ] No sensitive data in console logs
- [ ] CORS configured correctly
- [ ] CSP headers set (if applicable)

## Cost Monitoring

- [ ] Set up billing alerts in Firebase Console
- [ ] Monitor SMS usage
- [ ] Monitor hosting bandwidth
- [ ] Set budget limits if needed

## Documentation

- [ ] Update README with deployment instructions
- [ ] Document environment variables
- [ ] Document Firebase Console settings
- [ ] Create runbook for common issues
- [ ] Share credentials with team (securely)

## Support Preparation

- [ ] Test error messages are user-friendly
- [ ] Prepare FAQ for common issues
- [ ] Set up support email/chat
- [ ] Train team on troubleshooting
- [ ] Create user guide for phone verification

---

## Quick Deploy Command

```bash
npm run build && firebase deploy --only hosting
```

## Quick Test URLs

After deployment, test these URLs:

- Homepage: `https://cloudbamboo.in`
- Login: `https://cloudbamboo.in/login`
- Verify: `https://cloudbamboo.in/verify`
- Dashboard: `https://cloudbamboo.in/dashboard`

---

**Estimated Time:**
- Initial deployment: 10-15 minutes
- Custom domain setup: 30-60 minutes (including DNS propagation)
- Testing: 30-45 minutes
- **Total: 1.5-2 hours**

