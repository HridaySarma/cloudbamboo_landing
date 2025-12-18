import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { fc, test } from '@fast-check/vitest';
import { AuthProvider, useAuth } from './AuthContext';
import * as firebase from '../services/firebase';

// Mock Firebase service
vi.mock('../services/firebase', () => ({
  onAuthChange: vi.fn(),
  signOut: vi.fn(),
}));

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Property Tests', () => {
    /**
     * Feature: firebase-phone-auth, Property 4: Authentication state consistency
     * Validates: Requirements 2.4, 7.3, 7.5
     */
    test.prop([
      fc.record({
        uid: fc.string({ minLength: 1 }),
        email: fc.emailAddress(),
        displayName: fc.option(fc.string(), { nil: null }),
        photoURL: fc.option(fc.webUrl(), { nil: null }),
        emailVerified: fc.boolean(),
        phoneNumber: fc.option(
          fc.string({ minLength: 10, maxLength: 15 }).map(s => `+${s}`),
          { nil: null }
        ),
      })
    ])('Property 4: Authentication state consistency - isPhoneVerified and isAuthenticated must match phoneNumber presence', async (firebaseUser) => {
      // Setup: Mock onAuthChange to call callback with generated user
      let authCallback;
      firebase.onAuthChange.mockImplementation((callback) => {
        authCallback = callback;
        return vi.fn(); // unsubscribe function
      });

      // Render the hook
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      // Trigger auth change with the generated user
      authCallback(firebaseUser);

      // Wait for state to update
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Property: If phoneNumber is non-null, then isPhoneVerified must be true
      if (firebaseUser.phoneNumber !== null) {
        expect(result.current.isPhoneVerified).toBe(true);
        expect(result.current.phoneNumber).toBe(firebaseUser.phoneNumber);
        expect(result.current.isAuthenticated).toBe(true);
      } else {
        // If phoneNumber is null, then isPhoneVerified must be false
        expect(result.current.isPhoneVerified).toBe(false);
        expect(result.current.phoneNumber).toBe(null);
        expect(result.current.isAuthenticated).toBe(false);
      }

      // Property: isAuthenticated === (user exists && phoneNumber exists)
      const expectedIsAuthenticated = !!firebaseUser && !!firebaseUser.phoneNumber;
      expect(result.current.isAuthenticated).toBe(expectedIsAuthenticated);

      // Property: isPhoneVerified === !!phoneNumber
      expect(result.current.isPhoneVerified).toBe(!!firebaseUser.phoneNumber);
    });

    /**
     * Feature: firebase-phone-auth, Property 3: Phone credential linking on verification
     * Validates: Requirements 2.3, 7.1, 7.2
     */
    test.prop([
      fc.record({
        uid: fc.string({ minLength: 1 }),
        email: fc.emailAddress(),
        displayName: fc.option(fc.string(), { nil: null }),
        photoURL: fc.option(fc.webUrl(), { nil: null }),
        emailVerified: fc.boolean(),
        phoneNumber: fc.option(
          fc.string({ minLength: 10, maxLength: 15 }).map(s => `+${s}`),
          { nil: null }
        ),
      })
    ])('Property 3: Phone credential linking - after verification, user.phoneNumber must be populated', async (firebaseUser) => {
      // Setup: Mock onAuthChange to call callback with generated user
      let authCallback;
      firebase.onAuthChange.mockImplementation((callback) => {
        authCallback = callback;
        return vi.fn(); // unsubscribe function
      });

      // Render the hook
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      // Trigger auth change with the generated user
      authCallback(firebaseUser);

      // Wait for state to update
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Property: If phone credential is linked (phoneNumber exists), then:
      // 1. The user object must have phoneNumber property
      // 2. The phoneNumber state must match the Firebase user's phoneNumber
      if (firebaseUser.phoneNumber !== null) {
        expect(result.current.user.phoneNumber).toBe(firebaseUser.phoneNumber);
        expect(result.current.phoneNumber).toBe(firebaseUser.phoneNumber);
        
        // The phone number should be in E.164 format (starts with +)
        expect(firebaseUser.phoneNumber).toMatch(/^\+/);
      } else {
        // If no phone credential is linked, phoneNumber should be null
        expect(result.current.user.phoneNumber).toBe(null);
        expect(result.current.phoneNumber).toBe(null);
      }
    });

    /**
     * Feature: firebase-phone-auth, Property 9: Phone number persistence across sessions
     * Validates: Requirements 7.4
     */
    test.prop([
      fc.record({
        uid: fc.string({ minLength: 1 }),
        email: fc.emailAddress(),
        displayName: fc.option(fc.string(), { nil: null }),
        photoURL: fc.option(fc.webUrl(), { nil: null }),
        emailVerified: fc.boolean(),
        phoneNumber: fc.string({ minLength: 10, maxLength: 15 }).map(s => `+${s}`),
      })
    ])('Property 9: Phone persistence - phone number must persist across sessions', async (firebaseUser) => {
      // Setup: Mock onAuthChange to simulate user signing in with phone already linked
      let authCallback;
      firebase.onAuthChange.mockImplementation((callback) => {
        authCallback = callback;
        return vi.fn(); // unsubscribe function
      });

      // First session: User signs in with phone already linked
      const { result: result1, unmount: unmount1 } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      authCallback(firebaseUser);

      await waitFor(() => {
        expect(result1.current.loading).toBe(false);
      });

      // Verify phone is present in first session
      expect(result1.current.phoneNumber).toBe(firebaseUser.phoneNumber);
      expect(result1.current.isPhoneVerified).toBe(true);

      // Simulate session end
      unmount1();

      // Second session: User signs in again (simulating new device or browser session)
      const { result: result2 } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      // Trigger auth change with same user (Firebase would return this from persistence)
      authCallback(firebaseUser);

      await waitFor(() => {
        expect(result2.current.loading).toBe(false);
      });

      // Property: Phone number must persist - same phone number should be available
      expect(result2.current.phoneNumber).toBe(firebaseUser.phoneNumber);
      expect(result2.current.isPhoneVerified).toBe(true);
      expect(result2.current.isAuthenticated).toBe(true);
      
      // The phone number should match across sessions
      expect(result2.current.phoneNumber).toBe(result1.current.phoneNumber);
    });
  });

  describe('Unit Tests', () => {
    it('should set isPhoneVerified to true when user has phoneNumber', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: null,
        emailVerified: true,
        phoneNumber: '+1234567890',
      };

      let authCallback;
      firebase.onAuthChange.mockImplementation((callback) => {
        authCallback = callback;
        return vi.fn();
      });

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      authCallback(mockUser);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.isPhoneVerified).toBe(true);
      expect(result.current.phoneNumber).toBe('+1234567890');
    });

    it('should set isPhoneVerified to false when user has no phoneNumber', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: null,
        emailVerified: true,
        phoneNumber: null,
      };

      let authCallback;
      firebase.onAuthChange.mockImplementation((callback) => {
        authCallback = callback;
        return vi.fn();
      });

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      authCallback(mockUser);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.isPhoneVerified).toBe(false);
      expect(result.current.phoneNumber).toBe(null);
    });

    it('should set isAuthenticated to true when user exists and has phoneNumber', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: null,
        emailVerified: true,
        phoneNumber: '+1234567890',
      };

      let authCallback;
      firebase.onAuthChange.mockImplementation((callback) => {
        authCallback = callback;
        return vi.fn();
      });

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      authCallback(mockUser);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toBeTruthy();
      expect(result.current.phoneNumber).toBe('+1234567890');
    });

    it('should match phoneNumber state with firebaseUser.phoneNumber', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: null,
        emailVerified: true,
        phoneNumber: '+9876543210',
      };

      let authCallback;
      firebase.onAuthChange.mockImplementation((callback) => {
        authCallback = callback;
        return vi.fn();
      });

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      authCallback(mockUser);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.phoneNumber).toBe(mockUser.phoneNumber);
      expect(result.current.user.phoneNumber).toBe(mockUser.phoneNumber);
    });
  });
});
