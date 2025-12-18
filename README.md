# CloudBamboo Digital Landing Page

This is the official homepage for CloudBamboo Digital, a software company that builds powerful, operational SaaS platforms for businesses across all industries.

## Project Overview

This React-based landing page showcases CloudBamboo Digital's expertise in building enterprise-grade SaaS solutions for businesses across all industries, with a focus on their flagship product, WatchPoint - a comprehensive Workforce Management System.

## Features

- Responsive design that works on all device sizes
- Modern UI with animations and interactive elements
- Complete homepage with multiple sections:
  - Hero section with animated "SaaS Weave" visualization
  - WatchPoint product showcase
  - Company philosophy section
  - Contact form for lead generation
  - Professional footer

## Technology Stack

- React.js
- Vite (build tool)
- CSS3 with modern features

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure Firebase (see Firebase Setup section below)
4. Start the development server:
   ```
   npm run dev
   ```

## Firebase Setup

This application uses Firebase Authentication with Phone Number verification. Follow these steps to configure Firebase:

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

### 2. Enable Phone Authentication

1. In Firebase Console, navigate to **Authentication** > **Sign-in method**
2. Click on **Phone** in the sign-in providers list
3. Toggle the **Enable** switch to ON
4. Click **Save**

### 3. Configure reCAPTCHA

Firebase Phone Authentication uses reCAPTCHA for bot protection:

1. **Automatic Configuration**: Firebase automatically configures reCAPTCHA for your domain
2. **Authorized Domains**: In Firebase Console, go to **Authentication** > **Settings** > **Authorized domains**
3. Add your domains:
   - `localhost` (for development)
   - Your production domain (e.g., `yourdomain.com`)
4. **reCAPTCHA Mode**: The app uses invisible reCAPTCHA by default for better UX

### 4. Configure Test Phone Numbers (Development)

For testing without consuming SMS quota:

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Scroll down to **Phone numbers for testing**
3. Click **Add phone number**
4. Add test phone numbers with verification codes:
   - Example: `+1 650-555-3434` with code `123456`
   - Example: `+91 98765 43210` with code `654321`
5. These numbers will bypass SMS sending and accept the configured codes

**Note**: Test phone numbers only work in development. Production users will receive real SMS messages.

### 5. Set Up Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Get your Firebase configuration:
   - In Firebase Console, go to **Project Settings** (gear icon)
   - Scroll down to **Your apps** section
   - Click on the web app or create one if needed
   - Copy the configuration values

3. Update `.env` with your Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 6. SMS Quota and Billing

- **Free Tier**: Firebase provides a limited number of free SMS verifications per month
- **Production**: For production use, you may need to enable billing in Firebase Console
- **Quota Monitoring**: Monitor usage in Firebase Console > **Authentication** > **Usage**

### 7. Security Considerations

- **Never commit `.env`** to version control (already in `.gitignore`)
- **Rotate API keys** if accidentally exposed
- **Enable App Check** (optional) for additional security against abuse
- **Monitor authentication logs** in Firebase Console for suspicious activity

### Troubleshooting

**reCAPTCHA Issues:**
- Ensure your domain is in the authorized domains list
- Check browser console for reCAPTCHA errors
- Clear browser cache and try again

**SMS Not Received:**
- Verify phone number format (E.164: `+[country code][number]`)
- Check Firebase Console for quota limits
- Ensure Phone Authentication is enabled
- Try using a test phone number first

**"auth/operation-not-allowed" Error:**
- Phone Authentication is not enabled in Firebase Console
- Follow step 2 above to enable it

**"auth/invalid-app-credential" Error:**
- reCAPTCHA verification failed
- Check that your domain is authorized
- Ensure the reCAPTCHA container element exists in the DOM

## Project Structure

```
src/
├── components/
│   ├── HeroSection.jsx
│   ├── WatchPointSection.jsx
│   ├── PhilosophySection.jsx
│   ├── ContactSection.jsx
│   └── Footer.jsx
├── App.jsx
├── App.css
└── main.jsx
```

## Customization

To customize the content:
1. Edit the component files in `src/components/`
2. Modify styles in `src/App.css`
3. Update the title and meta tags in `index.html`

## Deployment

To build for production:
```
npm run build
```

The output will be in the `dist/` directory, ready for deployment to any static hosting service.
