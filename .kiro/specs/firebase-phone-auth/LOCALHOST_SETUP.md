# Localhost Setup for Firebase Phone Auth

## The Problem

Firebase Phone Authentication does NOT work with `localhost` in production mode because:
- localhost is not allowed in OAuth redirect domains for phone auth
- reCAPTCHA verification requires an authorized domain

## Solution Options

### Option 1: Use Test Phone Numbers (Easiest for Development)

This bypasses the domain restriction entirely.

**Steps:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **cloudbamboo-digital-core**
3. Navigate to: **Authentication** > **Sign-in method** > **Phone**
4. Scroll to **Phone numbers for testing**
5. Click **Add phone number**
6. Add test numbers:
   - Phone: `+1 650-555-3434` → Code: `123456`
   - Phone: `+91 9999999999` → Code: `123456`
   - Add more as needed

**Benefits:**
- ✅ Works on localhost
- ✅ No SMS costs
- ✅ No reCAPTCHA required
- ✅ Instant verification

**Usage:**
- Use these phone numbers in your app
- Enter the configured code (e.g., `123456`)
- Verification happens instantly without SMS

### Option 2: Use Firebase Auth Emulator (Best for Full Testing)

Run Firebase services locally without needing real phone numbers.

**Steps:**

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init emulators
```

Select:
- ✅ Authentication Emulator
- Port: 9099 (default)

4. Update your Firebase config to use emulator:

In `src/services/firebase.js`, add after initializing auth:

```javascript
// Use emulator in development
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://localhost:9099');
}
```

5. Start the emulator:
```bash
firebase emulators:start
```

6. Start your app:
```bash
npm run dev
```

**Benefits:**
- ✅ Full Firebase Auth features locally
- ✅ No domain restrictions
- ✅ No SMS costs
- ✅ Test all auth flows

### Option 3: Use ngrok for Temporary Public URL

Create a temporary public URL that Firebase will accept.

**Steps:**

1. Install ngrok:
```bash
# macOS
brew install ngrok

# Or download from https://ngrok.com/download
```

2. Start your dev server:
```bash
npm run dev
```

3. In another terminal, start ngrok:
```bash
ngrok http 5173
```

4. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)

5. Add this URL to Firebase Console:
   - Go to: **Authentication** > **Settings** > **Authorized domains**
   - Click **Add domain**
   - Paste the ngrok URL (without https://)
   - Save

6. Access your app via the ngrok URL instead of localhost

**Benefits:**
- ✅ Real phone auth testing
- ✅ Real SMS delivery
- ✅ reCAPTCHA works

**Drawbacks:**
- ❌ URL changes each time you restart ngrok (free tier)
- ❌ Need to update Firebase Console each time
- ❌ Slower than localhost

### Option 4: Deploy to Firebase Hosting (For Testing)

Deploy your app to Firebase Hosting for testing.

**Steps:**

1. Build your app:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
firebase deploy --only hosting
```

3. Access via: `https://cloudbamboo-digital-core.firebaseapp.com`

**Benefits:**
- ✅ Real production environment
- ✅ Real phone auth
- ✅ No domain issues

**Drawbacks:**
- ❌ Slower development cycle
- ❌ Need to rebuild/redeploy for each change

## Recommended Approach

**For Development:**
Use **Option 1 (Test Phone Numbers)** - It's the fastest and easiest.

**For Pre-Production Testing:**
Use **Option 4 (Firebase Hosting)** - Test with real phone numbers before going live.

**For Production:**
Deploy to your production domain and add it to authorized domains.

## Quick Setup: Test Phone Numbers

Here's the fastest way to get started right now:

1. **Add Test Phone Numbers in Firebase Console:**
   ```
   +1 650-555-3434 → 123456
   +91 9999999999 → 123456
   ```

2. **Use in your app:**
   - Country Code: `+1` or `+91`
   - Phone: `6505553434` or `9999999999`
   - OTP: `123456`

3. **That's it!** No localhost issues, no reCAPTCHA, instant verification.

## Current Issue Resolution

Your reCAPTCHA is getting stuck because:
1. You're running on `localhost:5173`
2. localhost is not in authorized domains for phone auth
3. reCAPTCHA can't verify the domain

**Immediate Fix:**
Add test phone numbers (Option 1) and use those for development.

## Updating Firebase Service for Emulator (Optional)

If you want to use the emulator, update `src/services/firebase.js`:

```javascript
import { connectAuthEmulator } from 'firebase/auth';

// After initializing auth
if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  // Use emulator in development
  if (import.meta.env.DEV) {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  }
  
  googleProvider = new GoogleAuthProvider();
  // ... rest of code
}
```

Then start the emulator before running your app:
```bash
firebase emulators:start --only auth
```

---

**Bottom Line:** Use test phone numbers for now. It's the quickest solution to get past the localhost restriction.

