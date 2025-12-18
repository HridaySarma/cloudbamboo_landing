import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { test } from '@fast-check/vitest';
import fc from 'fast-check';
import { formatPhoneNumber, formatAuthError } from './firebase';

/**
 * **Feature: firebase-phone-auth, Property 1: Phone number E.164 format validation**
 * **Validates: Requirements 1.3**
 * 
 * *For any* phone number and country code input, the formatted result must match 
 * the E.164 format regex ^\+[1-9]\d{1,14}$ before attempting to send SMS
 */
describe('Firebase Phone Auth Property Tests', () => {
  describe('Property 1: Phone number E.164 format validation', () => {
    test.prop([
      // Generate valid phone number and country code combinations
      // E.164 allows max 15 digits total (country code + phone number)
      fc.integer({ min: 1, max: 999 }).chain(countryCode => {
        const countryCodeStr = countryCode.toString();
        const countryCodeLength = countryCodeStr.length;
        const maxPhoneLength = 15 - countryCodeLength;
        const minPhoneLength = Math.max(4, 6); // At least 4-6 digits for phone
        
        return fc.tuple(
          fc.constant(countryCodeStr),
          fc.stringMatching(new RegExp(`^[0-9]{${minPhoneLength},${maxPhoneLength}}$`))
        );
      })
    ], { numRuns: 100 })(
      'formatted phone numbers match E.164 format',
      ([countryCode, phone]) => {
        const formatted = formatPhoneNumber(phone, countryCode);
        
        // E.164 format: +[country code][phone number]
        // Total length: 1-15 characters (including +)
        // Must start with +
        // Country code: 1-3 digits, not starting with 0
        // Phone number: remaining digits
        const e164Regex = /^\+[1-9]\d{1,14}$/;
        
        expect(formatted).toMatch(e164Regex);
        expect(formatted).toContain('+');
        expect(formatted.startsWith('+')).toBe(true);
        expect(formatted.substring(1)).toMatch(/^\d+$/); // Everything after + should be digits
        expect(formatted.length).toBeLessThanOrEqual(16); // + plus max 15 digits
      }
    );
  });

  /**
   * **Feature: firebase-phone-auth, Property 7: Error code to user-friendly message mapping**
   * **Validates: Requirements 4.1**
   * 
   * *For any* Firebase auth error code from the phone authentication flow, the system must 
   * return a user-friendly error message string that does not expose the raw error code to the user
   */
  describe('Property 7: Error code to user-friendly message mapping', () => {
    // Known Firebase phone auth error codes
    const knownPhoneAuthErrorCodes = [
      'auth/invalid-phone-number',
      'auth/missing-phone-number',
      'auth/quota-exceeded',
      'auth/user-disabled',
      'auth/operation-not-allowed',
      'auth/invalid-verification-code',
      'auth/invalid-verification-id',
      'auth/code-expired',
      'auth/credential-already-in-use',
      'auth/provider-already-linked',
      'auth/captcha-check-failed',
      'auth/missing-app-credential',
      'auth/network-request-failed',
      'auth/too-many-requests',
    ];

    test.prop([
      fc.oneof(
        // Known error codes
        fc.constantFrom(...knownPhoneAuthErrorCodes),
        // Unknown error codes (should still return user-friendly message)
        fc.string().map(s => `auth/${s}`),
        fc.string().map(s => `unknown/${s}`)
      )
    ], { numRuns: 100 })(
      'error codes map to user-friendly messages without exposing raw codes',
      (errorCode) => {
        const error = { code: errorCode, message: 'Raw error message' };
        const formattedError = formatAuthError(error);
        
        // Should return an Error object
        expect(formattedError).toBeInstanceOf(Error);
        
        // Should have a user-friendly message
        expect(formattedError.message).toBeTruthy();
        expect(typeof formattedError.message).toBe('string');
        expect(formattedError.message.length).toBeGreaterThan(0);
        
        // Should not expose raw error codes in the message (unless it's a fallback)
        // User-friendly messages should be descriptive, not just the error code
        if (knownPhoneAuthErrorCodes.includes(errorCode)) {
          // Known errors should have specific user-friendly messages
          expect(formattedError.message).not.toBe(errorCode);
          expect(formattedError.message).not.toContain('auth/');
        }
        
        // Should preserve the error code for debugging
        expect(formattedError.code).toBe(errorCode);
      }
    );
  });
});

/**
 * Unit Tests for Firebase Phone Auth Functions
 * These tests verify specific examples and edge cases.
 */
describe('Firebase Phone Auth Unit Tests', () => {
  describe('formatPhoneNumber', () => {
    it('formats valid phone numbers with various country codes', () => {
      // India
      expect(formatPhoneNumber('9876543210', '91')).toBe('+919876543210');
      
      // USA
      expect(formatPhoneNumber('5551234567', '1')).toBe('+15551234567');
      
      // UK
      expect(formatPhoneNumber('7911123456', '44')).toBe('+447911123456');
      
      // Australia
      expect(formatPhoneNumber('412345678', '61')).toBe('+61412345678');
    });

    it('handles phone numbers with non-digit characters', () => {
      // Should strip out non-digit characters
      expect(formatPhoneNumber('987-654-3210', '91')).toBe('+919876543210');
      expect(formatPhoneNumber('(555) 123-4567', '1')).toBe('+15551234567');
      expect(formatPhoneNumber('987 654 3210', '91')).toBe('+919876543210');
    });

    it('handles country codes with non-digit characters', () => {
      expect(formatPhoneNumber('9876543210', '+91')).toBe('+919876543210');
      expect(formatPhoneNumber('5551234567', '+1')).toBe('+15551234567');
    });

    it('throws error for empty phone number', () => {
      expect(() => formatPhoneNumber('', '91')).toThrow('Phone number and country code are required');
    });

    it('throws error for empty country code', () => {
      expect(() => formatPhoneNumber('9876543210', '')).toThrow('Phone number and country code are required');
    });

    it('throws error for null/undefined inputs', () => {
      expect(() => formatPhoneNumber(null, '91')).toThrow('Phone number and country code are required');
      expect(() => formatPhoneNumber('9876543210', null)).toThrow('Phone number and country code are required');
      expect(() => formatPhoneNumber(undefined, '91')).toThrow('Phone number and country code are required');
      expect(() => formatPhoneNumber('9876543210', undefined)).toThrow('Phone number and country code are required');
    });

    it('throws error for phone numbers with only non-digit characters', () => {
      expect(() => formatPhoneNumber('abcdefghij', '91')).toThrow('Invalid phone number or country code');
      expect(() => formatPhoneNumber('----------', '91')).toThrow('Invalid phone number or country code');
    });

    it('throws error for country codes with only non-digit characters', () => {
      expect(() => formatPhoneNumber('9876543210', 'abc')).toThrow('Invalid phone number or country code');
      expect(() => formatPhoneNumber('9876543210', '+++')).toThrow('Invalid phone number or country code');
    });
  });

  describe('formatAuthError', () => {
    it('maps known Firebase phone auth error codes to user-friendly messages', () => {
      const testCases = [
        { code: 'auth/invalid-phone-number', expectedMessage: 'Invalid phone number format. Please check and try again.' },
        { code: 'auth/missing-phone-number', expectedMessage: 'Please enter a phone number.' },
        { code: 'auth/quota-exceeded', expectedMessage: 'SMS quota exceeded. Please try again later.' },
        { code: 'auth/invalid-verification-code', expectedMessage: 'Invalid verification code. Please check and try again.' },
        { code: 'auth/code-expired', expectedMessage: 'Verification code has expired. Please request a new code.' },
        { code: 'auth/captcha-check-failed', expectedMessage: 'reCAPTCHA verification failed. Please try again.' },
        { code: 'auth/network-request-failed', expectedMessage: 'Network error. Please check your connection.' },
      ];

      testCases.forEach(({ code, expectedMessage }) => {
        const error = { code, message: 'Raw Firebase error' };
        const formatted = formatAuthError(error);
        
        expect(formatted.message).toBe(expectedMessage);
        expect(formatted.code).toBe(code);
      });
    });

    it('returns generic message for unknown error codes', () => {
      const unknownError = { code: 'auth/unknown-error-xyz', message: 'Some unknown error' };
      const formatted = formatAuthError(unknownError);
      
      // Should fall back to the original message or generic message
      expect(formatted.message).toBeTruthy();
      expect(formatted.code).toBe('auth/unknown-error-xyz');
    });

    it('handles errors without error codes', () => {
      const error = { message: 'Some error without code' };
      const formatted = formatAuthError(error);
      
      expect(formatted.message).toBeTruthy();
    });

    it('preserves error code in formatted error', () => {
      const error = { code: 'auth/invalid-phone-number', message: 'Raw error' };
      const formatted = formatAuthError(error);
      
      expect(formatted.code).toBe('auth/invalid-phone-number');
      expect(formatted).toBeInstanceOf(Error);
    });
  });
});
