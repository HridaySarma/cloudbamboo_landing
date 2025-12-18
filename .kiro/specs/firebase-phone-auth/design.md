# Firebase Phone Authentication Design Document

## Overview

This design document outlines the implementation of Firebase Phone Authentication to replace the existing custom OTP service. The solution will integrate Firebase's native phone verification, which provides SMS delivery, code verification, and phone credential linking. The implementation will maintain the existing two-step authentication flow (email first, then phone) while improving security, reliability, and maintainability.

## Architecture

### High-Level Flow

```
User completes email auth → Redirected to /verify → 
Initialize RecaptchaVerifier → Enter phone number → 
Firebase sends SMS → Enter 6-digit code → 
Verify code with Firebase → Link phone credential → 
Update auth state → Redirect to /dashboard
```

### Component Structure

1. **PhoneVerification Component** (Modified)
   - Manages UI state for phone input and OTP verification
   - Integrates RecaptchaVerifier for bot protection
   - Handles Firebase Phone Auth API calls
   - Displays user feedback and error messages

2. **Firebase Service** (Extended)
   - Exports phone authentication functions
   - Manages RecaptchaVerifier lifecycle
   - Handles phone credential linking
   - Provides error formatting for phone auth errors

3. **AuthContext** (Modified)
   - Updates phone verification state based on Firebase user object
   - Checks `user.phoneNumber` from Firebase instead of localStorage
   - Maintains backward compatibility during transition

### Dependencies

- `firebase/auth` - PhoneAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, linkWithCredential
- Existing Firebase configuration and auth instance
- DOM element for RecaptchaVerifier attachment

## Components and Interfaces

### Firebase Service Extensions

```javascript
// New exports from firebase.js

/**
 * Initialize reCAPTCHA verifier for phone authentication
 * @param {string} containerId - DOM element ID for reCAPTCHA
 * @returns {RecaptchaVerifier}
 */
export const initializeRecaptcha = (containerId) => { ... }

/**
 * Send SMS verification code to phone number
 * @param {string} phoneNumber - Phone number in E.164 format (e.g., "+919876543210")
 * @param {RecaptchaVerifier} recaptchaVerifier - Initialized reCAPTCHA verifier
 * @returns {Promise<ConfirmationResult>}
 */
export const sendPhoneVerification = async (phoneNumber, recaptchaVerifier) => { ... }

/**
 * Verify SMS code and link phone credential to current user
 * @param {ConfirmationResult} confirmationResult - Result from sendPhoneVerification
 * @param {string} code - 6-digit verification code
 * @returns {Promise<UserCredential>}
 */
export const verifyPhoneCode = async (confirmationResult, code) => { ... }

/**
 * Format phone number to E.164 format
 * @param {string} phone - 10-digit phone number
 * @param {string} countryCode - Country code without '+'
 * @returns {string} - Formatted phone number (e.g., "+919876543210")
 */
export const formatPhoneNumber = (phone, countryCode) => { ... }

/**
 * Clean up reCAPTCHA verifier
 * @param {RecaptchaVerifier} verifier - Verifier to clean up
 */
export const cleanupRecaptcha = (verifier) => { ... }
```

### PhoneVerification Component Interface

```javascript
// State management
const [step, setStep] = useState('phone'); // 'phone' | 'otp'
const [phone, setPhone] = useState('');
const [countryCode, setCountryCode] = useState('91');
const [otp, setOtp] = useState(['', '', '', '', '', '']);
const [confirmationResult, setConfirmationResult] = useState(null);
const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
const [resendTimer, setResendTimer] = useState(0);

// Key functions
const initRecaptcha = () => { ... }
const handleSendOTP = async () => { ... }
const handleVerifyOTP = async () => { ... }
const handleResendOTP = async () => { ... }
```

### AuthContext Updates

```javascript
// Check phone verification from Firebase user object
useEffect(() => {
  const unsubscribe = onAuthChange((firebaseUser) => {
    if (firebaseUser) {
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        emailVerified: firebaseUser.emailVerified,
        phoneNumber: firebaseUser.phoneNumber, // From Firebase
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
```

## Data Models

### ConfirmationResult (Firebase)

```javascript
{
  verificationId: string,  // Unique ID for this verification attempt
  confirm: (code: string) => Promise<UserCredential>  // Method to verify code
}
```

### RecaptchaVerifier (Firebase)

```javascript
{
  type: 'recaptcha',
  verify: () => Promise<string>,  // Returns reCAPTCHA token
  render: () => Promise<number>,  // Renders reCAPTCHA widget
  clear: () => void  // Cleans up the verifier
}
```

### Firebase User (Extended)

```javascript
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  emailVerified: boolean,
  phoneNumber: string | null,  // E.164 format, null if not verified
  providerData: Array<{
    providerId: string,  // 'phone' when phone auth is linked
    uid: string,  // Phone number
    phoneNumber: string
  }>
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Phone number E.164 format validation

*For any* phone number and country code input, the formatted result must match the E.164 format regex `^\+[1-9]\d{1,14}$` before attempting to send SMS

**Validates: Requirements 1.3**

### Property 2: Confirmation result persistence

*For any* successful SMS send operation, the returned ConfirmationResult must be stored in component state and remain non-null until verification completes or user navigates back

**Validates: Requirements 1.5**

### Property 3: Phone credential linking on verification

*For any* successful OTP verification, the phone credential must be linked to the currently authenticated user's account, resulting in the user.phoneNumber property being populated with the verified phone number

**Validates: Requirements 2.3, 7.1, 7.2**

### Property 4: Authentication state consistency

*For any* Firebase user object, if phoneNumber is non-null, then AuthContext.isPhoneVerified must be true and AuthContext.isAuthenticated must be true

**Validates: Requirements 2.4, 7.3, 7.5**

### Property 5: Resend cooldown enforcement

*For any* resend attempt, if the time elapsed since the last SMS send is less than 30 seconds, the system must prevent the resend operation and keep the resend button disabled

**Validates: Requirements 3.2**

### Property 6: State cleanup on navigation back

*For any* transition from OTP step back to phone input step, all verification state (confirmationResult, OTP array values, error messages) must be cleared to initial values

**Validates: Requirements 3.4**

### Property 7: Error code to user-friendly message mapping

*For any* Firebase auth error code from the phone authentication flow, the system must return a user-friendly error message string that does not expose the raw error code to the user

**Validates: Requirements 4.1**

### Property 8: RecaptchaVerifier initialization before SMS

*For any* phone verification attempt, a RecaptchaVerifier instance must be successfully initialized and attached to a DOM element before calling signInWithPhoneNumber

**Validates: Requirements 6.1, 6.2**

### Property 9: Phone number persistence across sessions

*For any* user with a linked phone credential, when signing in on a new device or session, the user.phoneNumber property must be populated with the previously verified phone number

**Validates: Requirements 7.4**

## Error Handling

### Firebase Phone Auth Error Codes

```javascript
const phoneAuthErrors = {
  'auth/invalid-phone-number': 'Invalid phone number format. Please check and try again.',
  'auth/missing-phone-number': 'Please enter a phone number.',
  'auth/quota-exceeded': 'SMS quota exceeded. Please try again later.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/operation-not-allowed': 'Phone authentication is not enabled.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/invalid-verification-code': 'Invalid verification code. Please check and try again.',
  'auth/invalid-verification-id': 'Verification session expired. Please request a new code.',
  'auth/code-expired': 'Verification code has expired. Please request a new code.',
  'auth/credential-already-in-use': 'This phone number is already linked to another account.',
  'auth/provider-already-linked': 'Phone number is already linked to this account.',
  'auth/captcha-check-failed': 'reCAPTCHA verification failed. Please try again.',
  'auth/missing-app-credential': 'reCAPTCHA verification failed. Please refresh and try again.',
  'auth/network-request-failed': 'Network error. Please check your connection.',
};
```

### Error Recovery Strategies

1. **Invalid Phone Number**: Validate format before API call, show inline validation
2. **Rate Limiting**: Display cooldown timer, suggest waiting period
3. **Invalid Code**: Allow retry without resending SMS (up to 3 attempts)
4. **Expired Code**: Automatically enable resend button, clear OTP inputs
5. **Network Errors**: Show retry button, maintain form state
6. **reCAPTCHA Failures**: Reset verifier, reinitialize on retry

### Validation Rules

- Phone number: Exactly 10 digits (for most countries)
- Country code: Must be selected from predefined list
- OTP: Exactly 6 digits
- E.164 format: `+[country code][phone number]` (e.g., `+919876543210`)

## Testing Strategy

### Unit Tests

Unit tests will verify specific examples and edge cases:

1. **Phone Number Formatting**
   - Test formatPhoneNumber with valid inputs (e.g., "9876543210", "91")
   - Test with invalid inputs (empty string, letters, special characters)
   - Test E.164 format output

2. **Error Message Mapping**
   - Test formatAuthError with known Firebase error codes
   - Test with unknown error codes (should return generic message)
   - Test with null/undefined errors

3. **Component State Transitions**
   - Test step changes from 'phone' to 'otp'
   - Test state cleanup when going back to phone input
   - Test OTP input auto-focus behavior

4. **Resend Timer**
   - Test timer countdown from 30 to 0
   - Test resend button disabled state during countdown
   - Test resend button enabled state after countdown

### Property-Based Tests

Property-based tests will verify universal properties across many inputs:

1. **Property 1: Phone Format Validation** (Requirements 1.3)
   - Generate random phone numbers and country codes
   - Verify formatted output always matches E.164 regex: `^\+[1-9]\d{1,14}$`
   - Verify invalid inputs are rejected before API call

2. **Property 5: Auth State Consistency** (Requirements 2.4, 7.3)
   - Generate random user objects with various phoneNumber values
   - Verify isPhoneVerified === !!user.phoneNumber
   - Verify isAuthenticated === (!!user && !!user.phoneNumber)

3. **Property 7: Error Mapping** (Requirements 4.1)
   - Generate random Firebase error codes
   - Verify all outputs are user-friendly strings (no raw error codes)
   - Verify known error codes map to specific messages

### Integration Tests

Integration tests will verify the complete flow:

1. **Complete Verification Flow**
   - Mock Firebase auth methods
   - Simulate user entering phone → receiving SMS → entering code
   - Verify final state: user.phoneNumber populated, isAuthenticated true

2. **Resend Flow**
   - Simulate sending OTP, waiting, then resending
   - Verify cooldown enforcement
   - Verify new ConfirmationResult replaces old one

3. **Error Recovery**
   - Simulate various error scenarios
   - Verify appropriate error messages displayed
   - Verify user can retry after errors

### Testing Library Selection

- **Unit Testing**: Vitest (already configured in project)
- **Property-Based Testing**: fast-check (JavaScript PBT library)
- **Component Testing**: React Testing Library with Vitest
- **Mocking**: Vitest mocks for Firebase methods

### Test Configuration

```javascript
// vitest.config.js additions
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/services/firebase.js', 'src/components/auth/PhoneVerification.jsx']
    }
  }
});
```

## Implementation Notes

### RecaptchaVerifier Setup

The RecaptchaVerifier must be initialized with specific parameters:

```javascript
const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  size: 'invisible',  // Invisible reCAPTCHA for better UX
  callback: (response) => {
    // reCAPTCHA solved, can proceed with phone auth
  },
  'expired-callback': () => {
    // Response expired, user needs to solve reCAPTCHA again
  }
});
```

### Phone Number Linking

Firebase supports multiple authentication providers per user. Phone authentication will be linked as an additional provider:

```javascript
// After verifying OTP
const credential = PhoneAuthProvider.credential(verificationId, code);
await linkWithCredential(auth.currentUser, credential);
// Now auth.currentUser.phoneNumber is populated
```

### Cleanup Considerations

- RecaptchaVerifier must be cleared when component unmounts
- ConfirmationResult should be cleared when user goes back to phone input
- Timer intervals must be cleaned up to prevent memory leaks

### Development vs Production

- **Development**: Firebase Phone Auth works with test phone numbers configured in Firebase Console
- **Production**: Requires proper Firebase project configuration and SMS quota
- **Testing**: Use Firebase test phone numbers (e.g., +1 650-555-3434 with code 123456)

### Migration Strategy

1. Implement Firebase Phone Auth alongside existing custom OTP service
2. Test thoroughly in development environment
3. Deploy to production with feature flag (if needed)
4. Monitor for issues over 1-2 weeks
5. Remove custom OTP service code once stable
6. Clean up localStorage-based phone verification (migrate to Firebase-based)

## Security Considerations

1. **reCAPTCHA Protection**: Prevents automated abuse of SMS sending
2. **Rate Limiting**: Firebase enforces rate limits on SMS sending per phone number
3. **Code Expiration**: Verification codes expire after a short period (typically 5 minutes)
4. **Credential Linking**: Phone credential is cryptographically linked to user account
5. **No Client-Side Secrets**: All verification happens server-side in Firebase

## Performance Considerations

1. **RecaptchaVerifier Initialization**: Should happen once per component mount
2. **SMS Delivery**: Typically 5-30 seconds, show loading state
3. **Code Verification**: Near-instant, happens server-side
4. **Network Optimization**: Minimize re-renders during verification flow

## Accessibility

1. **Phone Input**: Proper labels, aria-labels, and input types
2. **OTP Inputs**: Keyboard navigation between inputs, paste support
3. **Error Messages**: Announced by screen readers using aria-live regions
4. **Loading States**: Clear indication of async operations
5. **Focus Management**: Auto-focus on appropriate inputs at each step
