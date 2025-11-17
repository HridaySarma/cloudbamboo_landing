import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const RefundPolicy = () => {
  return (
    <div className="terms-page">
      <div className="terms-page-container">
        {/* Header */}
        <div className="terms-page-header">
          <div className="terms-header-content">
            <div className="terms-title-section">
              <h1>Refund Policy</h1>
              <p className="terms-subtitle">CloudBamboo Digital LLP (Founded 2025)</p>
              <div className="legal-badge">
                <span className="badge-icon">💰</span>
                <span className="badge-text">Last Updated: January 2025</span>
              </div>
            </div>
            <Link to="/" className="terms-back-link">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="terms-page-body">
          <div className="legal-content">
            <section className="legal-section">
              <h3>1. No Refund Policy</h3>
              <p>
                <strong>CloudBamboo Digital LLP</strong> operates on a "No Refund" policy for all paid subscriptions and services. 
                This policy is in place because we provide a comprehensive <strong>14-day free trial period</strong> that allows 
                you to fully evaluate our services before making any payment commitment.
              </p>
            </section>

            <section className="legal-section">
              <h3>2. 14-Day Free Trial</h3>
              <h4>2.1 Trial Period</h4>
              <p>
                All new users are eligible for a <strong>14-day free trial</strong> of our services, including but not limited to:
              </p>
              <ul>
                <li>Full access to all features and functionalities</li>
                <li>Complete service capabilities during the trial period</li>
                <li>Customer support and technical assistance</li>
                <li>All premium features and tools</li>
              </ul>
              
              <h4>2.2 Trial Evaluation</h4>
              <p>
                The 14-day free trial period is designed to give you sufficient time to:
              </p>
              <ul>
                <li>Test all features and functionalities of our services</li>
                <li>Evaluate the suitability of our services for your needs</li>
                <li>Assess the quality and performance of our platform</li>
                <li>Make an informed decision about subscribing to our paid plans</li>
              </ul>
            </section>

            <section className="legal-section">
              <h3>3. Subscription Terms</h3>
              <h4>3.1 Automatic Billing</h4>
              <p>
                After the 14-day free trial period ends, your subscription will automatically convert to a paid plan 
                if you choose to continue using our services. By subscribing, you acknowledge that you have had 
                adequate opportunity to evaluate our services during the free trial period.
              </p>
              
              <h4>3.2 Cancellation</h4>
              <p>
                You may cancel your subscription at any time. Cancellation will take effect at the end of your 
                current billing period. You will continue to have access to the services until the end of the 
                paid period for which you have already been charged.
              </p>
              
              <h4>3.3 No Prorated Refunds</h4>
              <p>
                We do not provide prorated refunds for partial subscription periods. Once a payment has been processed, 
                you will have access to the services for the entire billing period for which you have paid.
              </p>
            </section>

            <section className="legal-section">
              <h3>4. Custom Development and Consulting Services</h3>
              <h4>4.1 Project-Based Services</h4>
              <p>
                For custom development projects and consulting services, payment terms will be specified in individual 
                service agreements. These projects are typically structured with milestone-based payments, and refunds 
                will be handled on a case-by-case basis as outlined in the specific service agreement.
              </p>
              
              <h4>4.2 Service Delivery</h4>
              <p>
                Once custom development work has commenced or consulting services have been delivered, refunds are 
                generally not available unless otherwise specified in the service agreement or required by applicable law.
              </p>
            </section>

            <section className="legal-section">
              <h3>5. Exceptions</h3>
              <h4>5.1 Service Failure</h4>
              <p>
                In the rare event that <strong>CloudBamboo Digital LLP</strong> is unable to provide the services you have 
                paid for due to technical failures on our part, we will work with you to resolve the issue. If the 
                service cannot be restored within a reasonable timeframe, we may provide a credit or refund at our discretion.
              </p>
              
              <h4>5.2 Duplicate Charges</h4>
              <p>
                If you are charged multiple times for the same service due to a technical error on our part, we will 
                immediately refund the duplicate charges upon verification.
              </p>
              
              <h4>5.3 Legal Requirements</h4>
              <p>
                This refund policy does not affect your statutory rights as a consumer. If you are located in a 
                jurisdiction that provides for mandatory refund rights, those rights will apply as required by law.
              </p>
            </section>

            <section className="legal-section">
              <h3>6. Chargebacks</h3>
              <p>
                If you initiate a chargeback or dispute a payment without first contacting us to resolve the issue, 
                we reserve the right to suspend or terminate your account. We encourage you to contact us directly 
                at hq@cloudbamboo.com to resolve any billing concerns before initiating a chargeback.
              </p>
            </section>

            <section className="legal-section">
              <h3>7. Changes to This Policy</h3>
              <p>
                <strong>CloudBamboo Digital LLP</strong> reserves the right to modify this Refund Policy at any time. 
                Changes will be effective immediately upon posting to our website. Your continued use of our services 
                after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="legal-section">
              <h3>8. Contact Information</h3>
              <p>
                If you have questions about this Refund Policy or need assistance with billing matters, please contact us:
              </p>
              <div className="contact-info">
                <p><strong>CloudBamboo Digital LLP</strong></p>
                <p>Limited Liability Partnership (Founded 2025)</p>
                <p>Email: hq@cloudbamboo.com</p>
                <p>Phone: +91 8399811340</p>
                <p>Registered Office: Kharamakha, Mazbat, Assam, India</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;

