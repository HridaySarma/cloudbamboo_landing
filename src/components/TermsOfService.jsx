import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const TermsOfService = () => {
  return (
    <div className="terms-page">
      <div className="terms-page-container">
        {/* Header */}
        <div className="terms-page-header">
          <div className="terms-header-content">
            <div className="terms-title-section">
              <h1>Terms and Conditions</h1>
              <p className="terms-subtitle"><strong>CloudBamboo Digital LLP</strong> (Founded 2025)</p>
              <div className="legal-badge">
                <span className="badge-icon">📋</span>
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
              <h3>1. Acceptance of Terms</h3>
              <p>
                By accessing and using <strong>CloudBamboo Digital LLP's</strong> services, including but not limited to our WatchPoint platform, 
                consulting services, and custom software solutions, you agree to be bound by these Terms and Conditions. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="legal-section">
              <h3>2. Services Description</h3>
              <h4>2.1 Software as a Service (SaaS)</h4>
              <p>
                <strong>CloudBamboo Digital LLP</strong> provides cloud-based software solutions including workforce management systems, 
                attendance tracking, project management tools, and custom business applications.
              </p>
              
              <h4>2.2 Custom Development</h4>
              <p>
                We offer custom software development services tailored to specific business requirements, 
                including but not limited to web applications, mobile apps, and enterprise systems.
              </p>
              
              <h4>2.3 Consulting Services</h4>
              <p>
                Technical consulting, system architecture design, and digital transformation advisory services.
              </p>
            </section>

            <section className="legal-section">
              <h3>3. User Responsibilities</h3>
              <h4>3.1 Account Security</h4>
              <p>
                Users are responsible for maintaining the confidentiality of their account credentials and 
                for all activities that occur under their account. Users must notify us immediately of any 
                unauthorized use of their account.
              </p>
              
              <h4>3.2 Acceptable Use</h4>
              <p>
                Users agree not to use our services for any unlawful purpose or in any way that could damage, 
                disable, overburden, or impair our servers or networks. Users must not attempt to gain 
                unauthorized access to any part of our services.
              </p>
              
              <h4>3.3 Data Accuracy</h4>
              <p>
                Users are responsible for the accuracy and completeness of data entered into our systems 
                and for regularly backing up their data.
              </p>
            </section>

            <section className="legal-section">
              <h3>4. Payment Terms</h3>
              <h4>4.1 Subscription Fees</h4>
              <p>
                Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable 
                except as expressly stated in these terms or required by law.
              </p>
              
              <h4>4.2 Custom Development</h4>
              <p>
                Custom development projects are billed according to the agreed project proposal. 
                Payment terms will be specified in the individual service agreement.
              </p>
              
              <h4>4.3 Late Payments</h4>
              <p>
                Accounts with overdue payments may result in service suspension until payment is received. 
                We reserve the right to charge interest on overdue amounts.
              </p>
            </section>

            <section className="legal-section">
              <h3>5. Intellectual Property</h3>
              <h4>5.1 CloudBamboo Digital LLP Property</h4>
              <p>
                All software, documentation, and related materials provided by <strong>CloudBamboo Digital LLP</strong> remain our 
                intellectual property. Users are granted a limited, non-exclusive license to use our services.
              </p>
              
              <h4>5.2 Customer Data</h4>
              <p>
                Customers retain ownership of their data. We claim no intellectual property rights over 
                customer data and will not use customer data except as necessary to provide services.
              </p>
              
              <h4>5.3 Custom Development</h4>
              <p>
                For custom development projects, intellectual property ownership will be specified in 
                the individual service agreement.
              </p>
            </section>

            <section className="legal-section">
              <h3>6. Data Protection & Privacy</h3>
              <p>
                We are committed to protecting your privacy and personal data. Our data handling practices 
                are detailed in our Privacy Policy, which forms an integral part of these terms.
              </p>
            </section>

            <section className="legal-section">
              <h3>7. Service Level Agreement</h3>
              <h4>7.1 Uptime</h4>
              <p>
                We strive to maintain 99.9% uptime for our SaaS services. Planned maintenance will be 
                communicated in advance when possible.
              </p>
              
              <h4>7.2 Support</h4>
              <p>
                Technical support is provided during business hours (9 AM - 6 PM IST) via email and phone. 
                Emergency support may be available for critical issues.
              </p>
            </section>

            <section className="legal-section">
              <h3>8. Limitation of Liability</h3>
              <p>
                To the maximum extent permitted by law, <strong>CloudBamboo Digital LLP's</strong> liability for any claims arising from 
                or related to these terms or our services shall not exceed the amount paid by the customer 
                for services in the 12 months preceding the claim.
              </p>
            </section>

            <section className="legal-section">
              <h3>9. Termination</h3>
              <h4>9.1 Termination by Customer</h4>
              <p>
                Customers may terminate their subscription at any time. Termination will be effective at 
                the end of the current billing period.
              </p>
              
              <h4>9.2 Termination by CloudBamboo Digital LLP</h4>
              <p>
                We may terminate services immediately if users violate these terms or for non-payment. 
                We will provide reasonable notice when possible.
              </p>
            </section>

            <section className="legal-section">
              <h3>10. Governing Law</h3>
              <p>
                These terms are governed by the laws of India. Any disputes shall be subject to the 
                exclusive jurisdiction of the courts in Assam, India.
              </p>
            </section>

            <section className="legal-section">
              <h3>11. Contact Information</h3>
              <p>
                For questions about these Terms and Conditions, please contact us at:
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

export default TermsOfService;

