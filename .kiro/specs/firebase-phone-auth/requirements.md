# Requirements Document

## Introduction

This document outlines the requirements for replacing the current custom OTP-based phone verification system with Firebase's native phone authentication. The system currently uses email authentication (Google OAuth and email/password) followed by a custom OTP verification step. The goal is to integrate Firebase Phone Authentication to provide a more robust, secure, and maintainable phone verification solution.

## Glossary

- **Firebase Phone Auth**: Firebase Authentication's built-in phone number authentication service using SMS verification
- **RecaptchaVerifier**: Firebase component that provides invisible reCAPTCHA verification for phone authentication
- **ConfirmationResult**: Firebase object returned after sending SMS, used to verify the OTP code
- **PhoneAuthProvider**: Firebase provider for phone number authentication
- **Custom OTP Service**: The existing client-side OTP generation and verification system to be replaced
- **Partial Authentication**: State where user has completed email authentication but not phone verification
- **Full Authentication**: State where user has completed both email and phone verification

## Requirements

### Requirement 1

**User Story:** As a user who has completed email authentication, I want to verify my phone number using Firebase Phone Auth, so that my account is fully verified with a secure, industry-standard solution.

#### Acceptance Criteria

1. WHEN a user completes email authentication THEN the system SHALL redirect the user to the phone verification page
2. WHEN the phone verification page loads THEN the system SHALL initialize Firebase RecaptchaVerifier for bot protection
3. WHEN a user enters a valid phone number with country code THEN the system SHALL accept phone numbers in E.164 format
4. WHEN a user submits a phone number THEN the system SHALL send an SMS verification code using Firebase Phone Auth
5. WHEN Firebase sends the SMS THEN the system SHALL store the ConfirmationResult for later verification

### Requirement 2

**User Story:** As a user who has received an SMS code, I want to enter and verify the code, so that I can complete my account setup and access the dashboard.

#### Acceptance Criteria

1. WHEN a user receives the SMS code THEN the system SHALL display a 6-digit OTP input interface
2. WHEN a user enters a 6-digit code THEN the system SHALL verify the code using Firebase ConfirmationResult
3. WHEN the verification succeeds THEN the system SHALL link the phone credential to the current user account
4. WHEN phone linking succeeds THEN the system SHALL update the authentication state to fully authenticated
5. WHEN authentication state updates THEN the system SHALL redirect the user to the dashboard

### Requirement 3

**User Story:** As a user who didn't receive the SMS or entered the wrong number, I want to resend the code or change my phone number, so that I can complete verification without creating a new account.

#### Acceptance Criteria

1. WHEN a user requests to resend the OTP THEN the system SHALL call Firebase Phone Auth again with the same phone number
2. WHEN resend is triggered THEN the system SHALL enforce a 30-second cooldown period between resend attempts
3. WHEN a user chooses to change the phone number THEN the system SHALL return to the phone input step
4. WHEN returning to phone input THEN the system SHALL clear any previous verification state
5. WHEN a new phone number is submitted THEN the system SHALL reinitialize the verification process

### Requirement 4

**User Story:** As a user experiencing verification issues, I want to see clear error messages, so that I can understand what went wrong and how to fix it.

#### Acceptance Criteria

1. WHEN Firebase returns an error code THEN the system SHALL map the error to a user-friendly message
2. WHEN the phone number format is invalid THEN the system SHALL display a validation error before attempting to send SMS
3. WHEN too many SMS requests are made THEN the system SHALL display a rate-limit error with retry guidance
4. WHEN the OTP code is incorrect THEN the system SHALL display an error and allow retry without resending SMS
5. WHEN network errors occur THEN the system SHALL display a connectivity error with retry options

### Requirement 5

**User Story:** As a developer, I want to remove the custom OTP service dependencies, so that the codebase is cleaner and relies on Firebase's managed infrastructure.

#### Acceptance Criteria

1. WHEN Firebase Phone Auth is implemented THEN the system SHALL remove the custom otpService.js file
2. WHEN phone verification logic is updated THEN the system SHALL remove all references to sendOTP, verifyOTP, and resendOTP functions
3. WHEN Firebase integration is complete THEN the system SHALL consolidate all authentication logic in firebase.js
4. WHEN the custom OTP service is removed THEN the system SHALL ensure no broken imports remain in the codebase
5. WHEN testing the new implementation THEN the system SHALL verify that phone verification works in both development and production environments

### Requirement 6

**User Story:** As a developer, I want to handle Firebase Phone Auth's reCAPTCHA requirements, so that the authentication flow works smoothly without blocking legitimate users.

#### Acceptance Criteria

1. WHEN initializing phone auth THEN the system SHALL create a RecaptchaVerifier instance with invisible mode
2. WHEN the RecaptchaVerifier is created THEN the system SHALL attach it to a DOM element in the phone verification component
3. WHEN reCAPTCHA verification is required THEN the system SHALL handle it automatically without user interaction when possible
4. WHEN reCAPTCHA fails or requires user interaction THEN the system SHALL display the reCAPTCHA challenge
5. WHEN reCAPTCHA verification completes THEN the system SHALL proceed with sending the SMS verification code

### Requirement 7

**User Story:** As a system administrator, I want phone numbers to be properly stored and linked to user accounts, so that users can be identified and contacted reliably.

#### Acceptance Criteria

1. WHEN a user successfully verifies their phone THEN the system SHALL link the phone credential to the Firebase user account
2. WHEN the phone credential is linked THEN the system SHALL update the user's phoneNumber property in Firebase Auth
3. WHEN the authentication state changes THEN the system SHALL update the AuthContext with the verified phone number
4. WHEN a user signs in on a new device THEN the system SHALL recognize the phone number as already verified
5. WHEN querying user information THEN the system SHALL include the verified phone number in the user object
