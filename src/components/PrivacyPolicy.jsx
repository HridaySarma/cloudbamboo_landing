import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const PrivacyPolicy = () => {
  return (
    <div className="terms-page">
      <div className="terms-page-container">
        {/* Header */}
        <div className="terms-page-header">
          <div className="terms-header-content">
            <div className="terms-title-section">
              <h1>Privacy Policy</h1>
              <p className="terms-subtitle"><strong>CloudBamboo Digital LLP</strong> (Founded 2025)</p>
              <div className="legal-badge">
                <span className="badge-icon">🔒</span>
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
              <h3>1. Introduction</h3>
              <p>
                <strong>CloudBamboo Digital LLP</strong> ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our services, including our website and software applications.
              </p>
            </section>

            <section className="legal-section">
              <h3>2. Information We Collect</h3>
              
              <h4>2.1 Personal Information</h4>
              <p>We may collect the following personal information:</p>
              <ul>
                <li>Name, email address, and phone number</li>
                <li>Company name and job title</li>
                <li>Billing and payment information</li>
                <li>Communication preferences</li>
              </ul>
              
              <h4>2.2 Usage Data</h4>
              <p>We automatically collect information about how you use our services:</p>
              <ul>
                <li>Log files and usage statistics</li>
                <li>IP addresses and device information</li>
                <li>Browser type and operating system</li>
                <li>Pages visited and time spent on our services</li>
              </ul>
              
              <h4>2.3 Cookies and Tracking</h4>
              <p>
                We use cookies and similar tracking technologies to enhance your experience, 
                analyze usage patterns, and improve our services.
              </p>
            </section>

            <section className="legal-section">
              <h3>3. How We Use Your Information</h3>
              
              <h4>3.1 Service Provision</h4>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and manage accounts</li>
                <li>Provide customer support and technical assistance</li>
                <li>Send important service-related communications</li>
              </ul>
              
              <h4>3.2 Business Operations</h4>
              <ul>
                <li>Analyze usage patterns to improve our services</li>
                <li>Conduct research and development</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h4>3.3 Marketing Communications</h4>
              <ul>
                <li>Send newsletters and product updates (with consent)</li>
                <li>Provide information about new features and services</li>
                <li>Conduct surveys and gather feedback</li>
              </ul>
            </section>

            <section className="legal-section">
              <h3>4. Information Sharing</h3>
              
              <h4>4.1 We Do Not Sell Personal Information</h4>
              <p>
                We do not sell, rent, or trade your personal information to third parties 
                for marketing purposes.
              </p>
              
              <h4>4.2 Service Providers</h4>
              <p>
                We may share information with trusted third-party service providers who assist 
                us in operating our business, such as:
              </p>
              <ul>
                <li>Cloud hosting and infrastructure providers</li>
                <li>Payment processors</li>
                <li>Customer support platforms</li>
                <li>Analytics and monitoring services</li>
              </ul>
              
              <h4>4.3 Legal Requirements</h4>
              <p>
                We may disclose information when required by law, court order, or government 
                regulation, or to protect our rights and safety.
              </p>
            </section>

            <section className="legal-section">
              <h3>5. Data Security</h3>
              
              <h4>5.1 Security Measures</h4>
              <p>We implement industry-standard security measures including:</p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection</li>
              </ul>
              
              <h4>5.2 Data Breach Response</h4>
              <p>
                In the event of a data breach, we will notify affected users and relevant 
                authorities as required by law, typically within 72 hours of discovery.
              </p>
            </section>

            <section className="legal-section">
              <h3>6. Data Retention</h3>
              <p>
                We retain personal information only as long as necessary to fulfill the purposes 
                for which it was collected, including:
              </p>
              <ul>
                <li>Active account data: Retained while account is active</li>
                <li>Billing records: Retained for 7 years for tax purposes</li>
                <li>Marketing data: Retained until opt-out or request for deletion</li>
                <li>Log files: Typically retained for 90 days</li>
              </ul>
            </section>

            <section className="legal-section">
              <h3>7. Your Rights</h3>
              
              <h4>7.1 Access and Control</h4>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Update or correct inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability (receive your data in a structured format)</li>
              </ul>
              
              <h4>7.2 Exercise Your Rights</h4>
              <p>
                To exercise these rights, contact us at hq@cloudbamboo.com. We will respond 
                to your request within 30 days.
              </p>
            </section>

            <section className="legal-section">
              <h3>8. International Data Transfers</h3>
              <p>
                Your information may be transferred to and processed in countries other than 
                your own. We ensure appropriate safeguards are in place to protect your information 
                during such transfers.
              </p>
            </section>

            <section className="legal-section">
              <h3>9. Children's Privacy</h3>
              <p>
                Our services are not intended for children under 13 years of age. We do not 
                knowingly collect personal information from children under 13.
              </p>
            </section>

            <section className="legal-section">
              <h3>10. Updates to This Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of 
                significant changes by email or through our services. Your continued use of 
                our services after such notification constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="legal-section">
              <h3>11. Contact Us</h3>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, 
                please contact us:
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

export default PrivacyPolicy;

