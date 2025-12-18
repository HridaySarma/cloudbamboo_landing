import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, signOut as firebaseSignOut } from '../services/firebase';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
          phoneNumber: firebaseUser.phoneNumber,
        });
        
        // Phone is verified if phoneNumber exists in Firebase user
        const phoneVerified = !!firebaseUser.phoneNumber;
        setIsPhoneVerified(phoneVerified);
        setPhoneNumber(firebaseUser.phoneNumber);
      } else {
        setUser(null);
        setIsPhoneVerified(false);
        setPhoneNumber(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut();
      setUser(null);
      setIsPhoneVerified(false);
      setPhoneNumber(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isPhoneVerified,
    phoneNumber,
    isAuthenticated: !!user && isPhoneVerified,
    isPartiallyAuthenticated: !!user && !isPhoneVerified,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

