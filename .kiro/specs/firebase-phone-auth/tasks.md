# Implementation Plan

- [x] 1. Extend Firebase service with phone authentication functions
  - Add phone authentication imports from firebase/auth (PhoneAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, linkWithCredential)
  - Implement initializeRecaptcha function to create RecaptchaVerifier with invisible mode
  - Implement sendPhoneVerification function to send SMS using Firebase Phone Auth
  - Implement verifyPhoneCode function to verify OTP and link phone credential
  - Implement formatPhoneNumber function to convert phone + country code to E.164 format
  - Implement cleanupRecaptcha function to properly dispose of RecaptchaVerifier
  - Add phone auth error codes to formatAuthError function
  - _Requirements: 1.2, 1.4, 2.2, 2.3, 6.1, 6.2_

- [x] 1.1 Write property test for phone number formatting
  - **Property 1: Phone number E.164 format validation**
  - **Validates: Requirements 1.3**

- [x] 1.2 Write property test for error message mapping
  - **Property 7: Error code to user-friendly message mapping**
  - **Validates: Requirements 4.1**

- [x] 1.3 Write unit tests for Firebase service phone auth functions
  - Test formatPhoneNumber with valid inputs (various country codes and phone numbers)
  - Test formatPhoneNumber with invalid inputs (empty, letters, special characters)
  - Test error message mapping for known Firebase phone auth error codes
  - Test error message mapping for unknown error codes
  - _Requirements: 1.3, 4.1_

- [x] 2. Update PhoneVerification component to use Firebase Phone Auth
  - Add state for confirmationResult and recaptchaVerifier
  - Add hidden div with id="recaptcha-container" for RecaptchaVerifier attachment
  - Initialize RecaptchaVerifier in useEffect on component mount
  - Update handleSendOTP to use sendPhoneVerification with formatted phone number
  - Store ConfirmationResult in state after successful SMS send
  - Update handleVerifyOTP to use verifyPhoneCode with confirmationResult
  - Update handleResendOTP to reinitialize verification with same phone number
  - Update handleBackToPhone to clear confirmationResult and verification state
  - Add cleanup in useEffect to dispose of RecaptchaVerifier on unmount
  - _Requirements: 1.2, 1.4, 1.5, 2.2, 2.3, 3.1, 3.3, 3.4, 6.2_

- [x] 2.1 Write property test for confirmation result persistence
  - **Property 2: Confirmation result persistence**
  - **Validates: Requirements 1.5**

- [x] 2.2 Write property test for state cleanup on navigation
  - **Property 6: State cleanup on navigation back**
  - **Validates: Requirements 3.4**

- [x] 2.3 Write property test for resend cooldown enforcement
  - **Property 5: Resend cooldown enforcement**
  - **Validates: Requirements 3.2**

- [x] 2.4 Write unit tests for PhoneVerification component
  - Test component renders phone input step initially
  - Test component renders OTP input step after SMS sent
  - Test navigation back to phone input clears state
  - Test resend button disabled during cooldown period
  - Test OTP input auto-focus and paste handling
  - _Requirements: 2.1, 3.3, 3.4_

- [x] 3. Update AuthContext to use Firebase phone number
  - Modify onAuthChange callback to read phoneNumber from firebaseUser object
  - Update isPhoneVerified logic to check if firebaseUser.phoneNumber is non-null
  - Remove localStorage-based phone verification logic
  - Remove setPhoneVerified function (no longer needed as Firebase manages this)
  - Update phoneNumber state to come directly from firebaseUser.phoneNumber
  - _Requirements: 2.4, 7.2, 7.3, 7.4, 7.5_

- [x] 3.1 Write property test for authentication state consistency
  - **Property 4: Authentication state consistency**
  - **Validates: Requirements 2.4, 7.3, 7.5**

- [x] 3.2 Write property test for phone credential linking
  - **Property 3: Phone credential linking on verification**
  - **Validates: Requirements 2.3, 7.1, 7.2**

- [x] 3.3 Write property test for phone persistence across sessions
  - **Property 9: Phone number persistence across sessions**
  - **Validates: Requirements 7.4**

- [x] 3.4 Write unit tests for AuthContext updates
  - Test isPhoneVerified is true when user has phoneNumber
  - Test isPhoneVerified is false when user has no phoneNumber
  - Test isAuthenticated is true when user exists and has phoneNumber
  - Test phoneNumber state matches firebaseUser.phoneNumber
  - _Requirements: 2.4, 7.3, 7.5_

- [x] 4. Remove custom OTP service and update imports
  - Delete src/services/otpService.js file
  - Remove otpService imports from PhoneVerification component
  - Update any remaining references to custom OTP functions
  - Verify build succeeds without errors
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 5. Update environment configuration for Firebase Phone Auth
  - Document Firebase Console setup requirements in README or .env.example
  - Add instructions for enabling Phone Authentication in Firebase Console
  - Add instructions for configuring test phone numbers for development
  - Document reCAPTCHA configuration requirements
  - _Requirements: 6.1_

- [x] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Manual testing and validation
  - Test complete flow: email auth → phone verification → OTP entry → dashboard
  - Test resend OTP functionality with cooldown timer
  - Test changing phone number during verification
  - Test error scenarios (invalid phone, wrong OTP, network errors)
  - Test reCAPTCHA behavior (invisible mode and fallback)
  - Verify phone number persists across sign out and sign in
  - Test on both development and production environments
  - _Requirements: All_
