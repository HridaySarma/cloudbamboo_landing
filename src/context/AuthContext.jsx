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
        });
        
        // Check if phone is verified from localStorage
        const storedPhoneData = localStorage.getItem(`phoneVerified_${firebaseUser.uid}`);
        if (storedPhoneData) {
          const { verified, phone } = JSON.parse(storedPhoneData);
          setIsPhoneVerified(verified);
          setPhoneNumber(phone);
        } else {
          setIsPhoneVerified(false);
          setPhoneNumber(null);
        }
      } else {
        setUser(null);
        setIsPhoneVerified(false);
        setPhoneNumber(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const setPhoneVerified = (phone) => {
    if (user) {
      localStorage.setItem(`phoneVerified_${user.uid}`, JSON.stringify({
        verified: true,
        phone: phone,
        verifiedAt: new Date().toISOString(),
      }));
      setIsPhoneVerified(true);
      setPhoneNumber(phone);
    }
  };

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
    setPhoneVerified,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

