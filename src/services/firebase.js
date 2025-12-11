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
const formatAuthError = (error) => {
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
  };

  const message = errorMessages[error.code] || error.message || 'An error occurred. Please try again.';
  const formattedError = new Error(message);
  formattedError.code = error.code;
  return formattedError;
};

export { auth };

