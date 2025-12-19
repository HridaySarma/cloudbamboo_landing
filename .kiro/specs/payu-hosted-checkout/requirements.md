# Requirements Document - PayU Hosted Checkout Integration

## Introduction

This document outlines the requirements for integrating PayU's hosted checkout solution into the WatchPoint subscription platform. The integration will enable customers to complete payment transactions through PayU's secure payment gateway, supporting multiple payment methods including credit/debit cards, UPI, and net banking. The frontend will collect transaction details, redirect users to PayU's hosted payment page, and handle success/failure responses.

## Glossary

- **PayU System**: The third-party payment gateway service that processes payment transactions
- **Checkout Component**: The React component that displays order summary and initiates payment flow
- **Transaction ID (txnid)**: A unique identifier generated for each payment transaction
- **Hash**: A SHA-512 cryptographic signature used to verify transaction integrity
- **Success URL (surl)**: The URL where PayU redirects users after successful payment
- **Failure URL (furl)**: The URL where PayU redirects users after failed payment
- **Payment Response Handler**: The component that receives and processes PayU's response
- **Backend Hash Service**: The server-side service that generates secure hash values
- **User Context**: The authenticated user information from Firebase Auth
- **Plan Data**: The subscription plan details including price, features, and user count

## Requirements

### Requirement 1

**User Story:** As a customer, I want to initiate a payment transaction from the checkout page, so that I can purchase a subscription plan securely.

#### Acceptance Criteria

1. WHEN a user clicks the "Pay Now" button on the checkout page THEN the Checkout Component SHALL collect all required transaction parameters including key, txnid, amount, productinfo, firstname, email, and phone
2. WHEN transaction parameters are collected THEN the Checkout Component SHALL generate a unique transaction ID using the format "TXN" followed by timestamp and random alphanumeric characters
3. WHEN the user has not agreed to terms and conditions THEN the Checkout Component SHALL prevent payment initiation and display a validation message
4. WHEN all validation passes THEN the Checkout Component SHALL send transaction parameters to the Backend Hash Service to obtain a secure hash
5. WHEN the hash is received from the backend THEN the Checkout Component SHALL construct a form with all PayU parameters and automatically submit it to redirect the user to PayU's hosted payment page

### Requirement 2

**User Story:** As a customer, I want to be redirected to PayU's secure payment page, so that I can complete my payment using my preferred payment method.

#### Acceptance Criteria

1. WHEN the payment form is submitted THEN the Checkout Component SHALL POST the form data to the PayU test environment URL (https://test.payu.in/_payment) during development
2. WHEN the form includes all mandatory parameters THEN the PayU System SHALL display the hosted payment page with available payment options
3. WHEN the payment page loads THEN the PayU System SHALL display the correct transaction amount, product information, and customer details
4. WHEN the user is on the payment page THEN the PayU System SHALL provide options for credit card, debit card, UPI, net banking, and other configured payment methods
5. WHEN the user completes or abandons the payment THEN the PayU System SHALL redirect to the appropriate success or failure URL

### Requirement 3

**User Story:** As a customer, I want to see a clear confirmation after payment completion, so that I know whether my transaction was successful or failed.

#### Acceptance Criteria

1. WHEN PayU redirects to the success URL THEN the Payment Response Handler SHALL receive transaction details including status, txnid, mihpayid, amount, and response hash
2. WHEN PayU redirects to the failure URL THEN the Payment Response Handler SHALL receive transaction details including failure reason and transaction ID
3. WHEN a response is received THEN the Payment Response Handler SHALL send the response data to the Backend Hash Service for hash verification
4. WHEN the hash verification succeeds THEN the Payment Response Handler SHALL trust the transaction status and display appropriate success or failure message
5. WHEN the hash verification fails THEN the Payment Response Handler SHALL reject the response and display a security error message

### Requirement 4

**User Story:** As a customer, I want my payment information to be transmitted securely, so that my financial data is protected.

#### Acceptance Criteria

1. WHEN transaction parameters are prepared THEN the Checkout Component SHALL include all user-defined fields (udf1-udf5) as empty strings if not provided
2. WHEN the hash is generated THEN the Backend Hash Service SHALL use the exact parameter sequence: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT
3. WHEN the hash is computed THEN the Backend Hash Service SHALL use SHA-512 algorithm and return lowercase hexadecimal digest
4. WHEN the form is submitted to PayU THEN the Checkout Component SHALL include the hash parameter to ensure data integrity
5. WHEN PayU returns a response THEN the Payment Response Handler SHALL verify the response hash using reverse sequence: SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key

### Requirement 5

**User Story:** As a developer, I want to configure PayU credentials through environment variables, so that I can easily switch between test and production environments.

#### Acceptance Criteria

1. WHEN the application starts THEN the Checkout Component SHALL read PayU merchant key from environment variable VITE_PAYU_MERCHANT_KEY
2. WHEN the application starts THEN the Checkout Component SHALL read PayU salt from environment variable VITE_PAYU_SALT
3. WHEN the application starts THEN the Checkout Component SHALL read success URL from environment variable VITE_PAYU_SUCCESS_URL
4. WHEN the application starts THEN the Checkout Component SHALL read failure URL from environment variable VITE_PAYU_FAILURE_URL
5. WHEN environment variables are missing THEN the Checkout Component SHALL display an error message and prevent payment initiation

### Requirement 6

**User Story:** As a customer, I want to see loading states during payment processing, so that I understand the system is working on my request.

#### Acceptance Criteria

1. WHEN the user clicks "Pay Now" THEN the Checkout Component SHALL display a loading spinner and disable the button
2. WHEN the hash request is sent to the backend THEN the Checkout Component SHALL show a "Processing..." message
3. WHEN the form is being submitted to PayU THEN the Checkout Component SHALL display a "Redirecting to payment gateway..." message
4. WHEN an error occurs during hash generation THEN the Checkout Component SHALL hide the loading state and display an error message
5. WHEN the user returns from PayU THEN the Payment Response Handler SHALL display a loading state while verifying the response hash

### Requirement 7

**User Story:** As a system administrator, I want payment transactions to be logged, so that I can track and troubleshoot payment issues.

#### Acceptance Criteria

1. WHEN a payment is initiated THEN the Checkout Component SHALL log the transaction ID and amount to the browser console
2. WHEN the hash is received from backend THEN the Checkout Component SHALL log a success message without exposing the hash value
3. WHEN PayU returns a response THEN the Payment Response Handler SHALL log the transaction status and transaction ID
4. WHEN hash verification fails THEN the Payment Response Handler SHALL log a security warning with transaction ID
5. WHEN any error occurs THEN the Checkout Component SHALL log the error details for debugging purposes

### Requirement 8

**User Story:** As a customer, I want to see my order details before payment, so that I can verify the transaction amount and plan information.

#### Acceptance Criteria

1. WHEN the checkout page loads THEN the Checkout Component SHALL display the selected plan name, price per user, and total user count
2. WHEN pricing includes a discount THEN the Checkout Component SHALL display the discount amount and percentage
3. WHEN calculating the total THEN the Checkout Component SHALL include 18% GST on the discounted amount
4. WHEN displaying the order summary THEN the Checkout Component SHALL show subtotal, discount, GST, and total amount
5. WHEN the user information is available THEN the Checkout Component SHALL display the customer's name, email, and phone number

### Requirement 9

**User Story:** As a developer, I want to handle payment errors gracefully, so that users receive helpful feedback when issues occur.

#### Acceptance Criteria

1. WHEN the backend hash service is unavailable THEN the Checkout Component SHALL display "Unable to connect to payment service. Please try again."
2. WHEN the hash generation fails THEN the Checkout Component SHALL display "Payment initialization failed. Please contact support."
3. WHEN required user information is missing THEN the Checkout Component SHALL display "Please complete your profile before making a payment."
4. WHEN the network request times out THEN the Checkout Component SHALL display "Request timed out. Please check your connection and try again."
5. WHEN an unknown error occurs THEN the Checkout Component SHALL display a generic error message and log the error details

### Requirement 10

**User Story:** As a customer, I want to navigate back from the checkout page, so that I can review or change my plan selection.

#### Acceptance Criteria

1. WHEN the user clicks the back button THEN the Checkout Component SHALL navigate to the previous page without initiating payment
2. WHEN the checkout page loads without plan data THEN the Checkout Component SHALL automatically redirect to the dashboard
3. WHEN the user is not authenticated THEN the Checkout Component SHALL redirect to the login page
4. WHEN the user returns from PayU success page THEN the Payment Response Handler SHALL provide a button to navigate to the dashboard
5. WHEN the user returns from PayU failure page THEN the Payment Response Handler SHALL provide a button to retry payment or return to plan selection
