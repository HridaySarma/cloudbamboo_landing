import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  linkWithCredential,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if Firebase is configured
const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.apiKey !== 'undefined';

// Initialize Firebase only if configured
let app = null;
let auth = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  // Set session persistence to LOCAL (persists even when browser is closed)
  // This ensures user sessions last until explicitly signed out
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log('Firebase Auth persistence set to LOCAL');
    })
    .catch((error) => {
      console.error('Failed to set Firebase Auth persistence:', error);
    });
  
  // Set language for phone auth SMS
  auth.useDeviceLanguage();
  
  googleProvider = new GoogleAuthProvider();
  
  // Configure Google provider
  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });
} else {
  console.warn('Firebase is not configured. Please set up environment variables.');
}

/**
 * Check if Firebase is properly configured
 * @returns {boolean}
 */
export const isConfigured = () => isFirebaseConfigured;

/**
 * Sign in with Google popup
 * @returns {Promise<{user: object, isNewUser: boolean}>}
 */
export const signInWithGoogle = async () => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Please set up environment variables in .env file.');
  }
  
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const isNewUser = result._tokenResponse?.isNewUser || false;
    return {
      user: result.user,
      isNewUser,
    };
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw formatAuthError(error);
  }
};

/**
 * Sign in with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>}
 */
export const signInWithEmail = async (email, password) => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Please set up environment variables in .env file.');
  }
  
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return {
      user: result.user,
      isNewUser: false,
    };
  } catch (error) {
    console.error('Email sign-in error:', error);
    throw formatAuthError(error);
  }
};

/**
 * Sign up with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>}
 */
export const signUpWithEmail = async (email, password) => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Please set up environment variables in .env file.');
  }
  
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return {
      user: result.user,
      isNewUser: true,
    };
  } catch (error) {
    console.error('Email sign-up error:', error);
    throw formatAuthError(error);
  }
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export const signOut = async () => {
  if (!isFirebaseConfigured || !auth) {
    return;
  }
  
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Sign-out error:', error);
    throw formatAuthError(error);
  }
};

/**
 * Send password reset email
 * @param {string} email 
 * @returns {Promise<void>}
 */
export const resetPassword = async (email) => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Please set up environment variables in .env file.');
  }
  
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Password reset error:', error);
    throw formatAuthError(error);
  }
};

/**
 * Subscribe to auth state changes
 * @param {function} callback 
 * @returns {function} Unsubscribe function
 */
export const onAuthChange = (callback) => {
  if (!isFirebaseConfigured || !auth) {
    // If Firebase is not configured, immediately call callback with null and return noop
    setTimeout(() => callback(null), 0);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

/**
 * Get current user
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  if (!isFirebaseConfigured || !auth) {
    return null;
  }
  return auth.currentUser;
};

/**
 * Format Firebase auth errors to user-friendly messages
 * @param {object} error 
 * @returns {Error}
 */
export const formatAuthError = (error) => {
  const errorMessages = {
    'auth/email-already-in-use': 'This email is already registered. Please sign in instead.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled. Please contact support.',
    'auth/weak-password': 'Password should be at least 6 characters long.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/user-not-found': 'No account found with this email. Please sign up first.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Invalid credentials. Please check your email and password.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/popup-closed-by-user': 'Sign-in was cancelled. Please try again.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    // Phone auth error codes
    'auth/billing-not-enabled': 'Phone authentication requires Firebase Blaze plan. Please upgrade your Firebase project or use test phone numbers for development.',
    'auth/invalid-phone-number': 'Invalid phone number format. Please check and try again.',
    'auth/missing-phone-number': 'Please enter a phone number.',
    'auth/quota-exceeded': 'SMS quota exceeded. Please try again later.',
    'auth/operation-not-allowed': 'Phone authentication is not enabled.',
    'auth/invalid-verification-code': 'Invalid verification code. Please check and try again.',
    'auth/invalid-verification-id': 'Verification session expired. Please request a new code.',
    'auth/code-expired': 'Verification code has expired. Please request a new code.',
    'auth/credential-already-in-use': 'This phone number is already linked to another account.',
    'auth/provider-already-linked': 'Phone number is already linked to this account.',
    'auth/captcha-check-failed': 'reCAPTCHA verification failed. Please try again.',
    'auth/missing-app-credential': 'reCAPTCHA verification failed. Please refresh and try again.',
  };

  const message = errorMessages[error.code] || error.message || 'An error occurred. Please try again.';
  const formattedError = new Error(message);
  formattedError.code = error.code;
  return formattedError;
};

/**
 * Format phone number to E.164 format
 * @param {string} phone - 10-digit phone number
 * @param {string} countryCode - Country code without '+'
 * @returns {string} - Formatted phone number (e.g., "+919876543210")
 */
export const formatPhoneNumber = (phone, countryCode) => {
  if (!phone || !countryCode) {
    throw new Error('Phone number and country code are required');
  }
  
  // Remove any non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  const cleanCountryCode = countryCode.replace(/\D/g, '');
  
  if (!cleanPhone || !cleanCountryCode) {
    throw new Error('Invalid phone number or country code');
  }
  
  return `+${cleanCountryCode}${cleanPhone}`;
};

/**
 * Initialize reCAPTCHA verifier for phone authentication
 * @param {string} containerId - DOM element ID for reCAPTCHA
 * @param {object} options - Optional reCAPTCHA configuration
 * @returns {RecaptchaVerifier}
 */
export const initializeRecaptcha = (containerId, options = {}) => {
  if (!isFirebaseConfigured || !auth) {
    throw new Error('Firebase is not configured. Please set up environment variables in .env file.');
  }
  
  try {
    const defaultOptions = {
      size: 'invisible',
      callback: (response) => {
        // reCAPTCHA solved, can proceed with phone auth
        console.log('reCAPTCHA verified successfully');
      },
      'expired-callback': () => {
        // Response expired, user needs to solve reCAPTCHA again
        console.warn('reCAPTCHA expired, please try again');
      }
    };
    
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      containerId,
      { ...defaultOptions, ...options }
    );
    
    // Pre-render to catch initialization errors early
    recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
      console.log('reCAPTCHA rendered with widget ID:', widgetId);
    }).catch((error) => {
      console.error('reCAPTCHA render error:', error);
    });
    
    return recaptchaVerifier;
  } catch (error) {
    console.error('RecaptchaVerifier initialization error:', error);
    throw formatAuthError(error);
  }
};

/**
 * Send SMS verification code to phone number
 * @param {string} phoneNumber - Phone number in E.164 format (e.g., "+919876543210")
 * @param {RecaptchaVerifier} recaptchaVerifier - Initialized reCAPTCHA verifier
 * @returns {Promise<ConfirmationResult>}
 */
export const sendPhoneVerification = async (phoneNumber, recaptchaVerifier) => {
  if (!isFirebaseConfigured || !auth) {
    throw new Error('Firebase is not configured. Please set up environment variables in .env file.');
  }
  
  if (!phoneNumber) {
    throw new Error('Phone number is required');
  }
  
  if (!recaptchaVerifier) {
    throw new Error('RecaptchaVerifier is required');
  }
  
  try {
    console.log('Firebase: Sending phone verification to', phoneNumber);
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    console.log('Firebase: Phone verification sent successfully');
    return confirmationResult;
  } catch (error) {
    console.error('Firebase: Phone verification error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    // Reset reCAPTCHA on error as per Firebase docs
    if (window.recaptchaWidgetId !== undefined) {
      try {
        window.grecaptcha.reset(window.recaptchaWidgetId);
        console.log('reCAPTCHA reset after error');
      } catch (resetError) {
        console.error('Failed to reset reCAPTCHA:', resetError);
      }
    }
    
    throw formatAuthError(error);
  }
};

/**
 * Verify SMS code and link phone credential to current user
 * @param {ConfirmationResult} confirmationResult - Result from sendPhoneVerification
 * @param {string} code - 6-digit verification code
 * @returns {Promise<UserCredential>}
 */
export const verifyPhoneCode = async (confirmationResult, code) => {
  if (!isFirebaseConfigured || !auth) {
    throw new Error('Firebase is not configured. Please set up environment variables in .env file.');
  }
  
  if (!confirmationResult) {
    throw new Error('ConfirmationResult is required');
  }
  
  if (!code) {
    throw new Error('Verification code is required');
  }
  
  try {
    // Verify the code
    const result = await confirmationResult.confirm(code);
    
    // If there's a current user and they're different from the phone auth user,
    // we need to link the credential
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.uid !== result.user.uid) {
      const credential = PhoneAuthProvider.credential(
        confirmationResult.verificationId,
        code
      );
      const linkedResult = await linkWithCredential(currentUser, credential);
      return linkedResult;
    }
    
    return result;
  } catch (error) {
    console.error('Phone code verification error:', error);
    throw formatAuthError(error);
  }
};

/**
 * Clean up reCAPTCHA verifier
 * @param {RecaptchaVerifier} verifier - Verifier to clean up
 */
export const cleanupRecaptcha = (verifier) => {
  if (verifier) {
    try {
      verifier.clear();
    } catch (error) {
      console.error('RecaptchaVerifier cleanup error:', error);
    }
  }
};

export { auth };

