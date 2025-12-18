# Using Production Domain (cloudbamboo.in) for Phone Auth

## Overview

Using your production domain `cloudbamboo.in` will solve the localhost reCAPTCHA issue because Firebase Phone Auth works with authorized domains.

## Setup Steps

### Step 1: Add Domain to Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **cloudbamboo-digital-core**
3. Navigate to: **Authentication** > **Settings**
4. Scroll to **Authorized domains** section
5. Click **Add domain**
6. Enter: `cloudbamboo.in`
7. Click **Add**

**Also add www subdomain if you use it:**
- Add: `www.cloudbamboo.in`

### Step 2: Deploy Your Application

You have several deployment options:

#### Option A: Deploy to Firebase Hosting (Recommended)

**Benefits:**
- ✅ Automatic SSL certificate
- ✅ Global CDN
- ✅ Easy deployment
- ✅ Free tier available

**Steps:**

1. Install Firebase CLI (if not already):
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase Hosting:
```bash
firebase init hosting
```

Select:
- Public directory: `dist`
- Single-page app: `Yes`
- Automatic builds: `No` (or Yes if you want GitHub integration)

4. Build your app:
```bash
npm run build
```

5. Deploy to Firebase:
```bash
firebase deploy --only hosting
```

6. Your app will be available at:
   - `https://cloudbamboo-digital-core.firebaseapp.com`
   - `https://cloudbamboo-digital-core.web.app`

7. Connect your custom domain:
   - In Firebase Console: **Hosting** > **Add custom domain**
   - Enter: `cloudbamboo.in`
   - Follow DNS configuration instructions
   - Firebase will provision SSL certificate automatically

#### Option B: Deploy to Your Existing Server

If you already have hosting for `cloudbamboo.in`:

1. Build your app:
```bash
npm run build
```

2. Upload the `dist` folder contents to your server

3. Configure your web server (nginx/apache) to serve the SPA:

**Nginx example:**
```nginx
server {
    listen 80;
    server_name cloudbamboo.in www.cloudbamboo.in;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name cloudbamboo.in www.cloudbamboo.in;
    
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;
    
    root /var/www/cloudbamboo/dist;
    index index.html;
    
    # SPA routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Apache example (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

4. Ensure HTTPS is enabled (required for phone auth)

### Step 3: Update Environment Variables (If Needed)

Your `.env` file should already be correct:

```env
VITE_FIREBASE_API_KEY=AIzaSyBVWsrWShnUPmswFKIBng4MqRSu5gY4GhY
VITE_FIREBASE_AUTH_DOMAIN=cloudbamboo-digital-core.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cloudbamboo-digital-core
VITE_FIREBASE_STORAGE_BUCKET=cloudbamboo-digital-core.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=746949156954
VITE_FIREBASE_APP_ID=1:746949156954:web:5b5a904a925e134b57f863
```

No changes needed - Firebase will work with any authorized domain.

### Step 4: Test Phone Authentication

1. Visit: `https://cloudbamboo.in`
2. Navigate to login/signup
3. Complete email authentication
4. Enter your real phone number
5. Click "Send OTP"
6. reCAPTCHA should work smoothly
7. Receive SMS with code
8. Enter code and verify

## Quick Deployment Commands

### Using Firebase Hosting:

```bash
# Build
npm run build

# Deploy
firebase deploy --only hosting

# View deployment
firebase open hosting:site
```

### Using Your Own Server:

```bash
# Build
npm run build

# Upload dist folder to server
scp -r dist/* user@cloudbamboo.in:/var/www/cloudbamboo/

# Or use FTP/SFTP client
```

## Testing Before Full Deployment

### Option 1: Test on Firebase Default Domain First

1. Deploy to Firebase Hosting
2. Test on `cloudbamboo-digital-core.firebaseapp.com`
3. Once working, connect custom domain

### Option 2: Use Staging Subdomain

1. Add `staging.cloudbamboo.in` to authorized domains
2. Deploy to staging first
3. Test thoroughly
4. Deploy to production

## Important Notes

### HTTPS is Required

- ✅ Phone auth requires HTTPS
- ✅ Firebase Hosting provides this automatically
- ✅ If using your own server, ensure SSL certificate is valid

### Domain Verification

- Firebase may take a few minutes to verify your domain
- DNS changes can take up to 48 hours to propagate
- Test after domain is verified in Firebase Console

### SMS Costs

- Real phone numbers will receive real SMS
- Check Firebase pricing for SMS costs
- Consider setting up billing alerts

### Rate Limiting

- Firebase enforces rate limits on SMS
- Too many requests from same IP/phone will be blocked
- Use test phone numbers for development

## Troubleshooting

### Domain Not Working

1. Check Firebase Console shows domain as "Connected"
2. Verify DNS records are correct
3. Clear browser cache
4. Try incognito/private mode
5. Check browser console for errors

### reCAPTCHA Still Not Working

1. Verify domain is in authorized domains list
2. Check HTTPS is working (not HTTP)
3. Clear browser cache and cookies
4. Try different browser
5. Check Firebase Console for any errors

### SMS Not Received

1. Check phone number format (E.164: +[country][number])
2. Verify Firebase project has SMS quota
3. Check Firebase Console > Authentication > Usage
4. Try different phone number
5. Check spam/blocked messages

## Recommended Workflow

**For Development:**
1. Use test phone numbers on localhost (see LOCALHOST_SETUP.md)
2. No deployment needed
3. Fast iteration

**For Testing:**
1. Deploy to Firebase Hosting default domain
2. Test with real phone numbers
3. Verify all flows work

**For Production:**
1. Connect custom domain (cloudbamboo.in)
2. Deploy production build
3. Monitor Firebase Console for issues

## Cost Considerations

### Firebase Hosting (Free Tier)
- 10 GB storage
- 360 MB/day bandwidth
- Usually sufficient for small to medium apps

### SMS Costs
- Varies by country
- India: ~$0.01 per SMS
- USA: ~$0.01 per SMS
- Check Firebase pricing page for details

### Recommendations
- Use test phone numbers for development
- Use real numbers only for testing/production
- Set up billing alerts in Firebase Console

---

## Quick Start: Deploy Now

```bash
# 1. Build your app
npm run build

# 2. Deploy to Firebase
firebase deploy --only hosting

# 3. Add cloudbamboo.in in Firebase Console
# Go to: Hosting > Add custom domain > cloudbamboo.in

# 4. Update DNS records as instructed by Firebase

# 5. Wait for domain verification (5-30 minutes)

# 6. Test at https://cloudbamboo.in
```

That's it! Your phone authentication will work perfectly on your production domain.

