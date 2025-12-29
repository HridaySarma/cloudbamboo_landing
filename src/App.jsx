import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import { initializeAnimations } from './utils/animations';
import logoImage from './assets/logo_modern.png';
import attendanceDemo from './assets/attendance_demo.png';
import mobileHome from './assets/mobile_home.jpeg';
import guardVideo from './assets/guard.mp4';
import './components/WatchPointPlans.css';
import PhilosophySection from './components/PhilosophySection';
import WatchpointSOS from './components/WatchpointSOS';
import HeroSection from './components/HeroSection';
// import FounderSection from './components/FounderSection';


const watchpointPillars = [
  {
    id: '01',
    title: 'Verified Mobile Attendance',
    description: 'Eliminate fake attendance without expensive hardware. Use our Android app for GPS-tagged, selfie-verified check-ins and QR scanning.',
    badges: ['GPS Geofencing', 'Selfie Verification', 'No External Hardware'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    )
  },
  {
    id: '02',
    title: 'Automated Payroll & Billing',
    description: 'Stop calculating salaries manually. The system automatically converts verified attendance data into accurate payroll and client invoices.',
    badges: ['Auto-Calculated Salaries', 'PF/ESI Compliant', 'One-Click Invoicing'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M12 8v8"/>
        <path d="M8 12h8"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    )
  },
  {
    id: '03',
    title: 'Real-Time Field Operations',
    description: 'Ensure guards are active and alert. Digital patrol logs and instant incident reporting replace unreliable paper/WhatsApp updates.',
    badges: ['Live Patrol Tracking', 'Instant Incident Alerts', 'Digital Daily Reports'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    )
  },
  {
    id: '04',
    title: 'Operational Visibility',
    description: 'The "Control Tower" for your business. Gain predictive insights into workforce performance, site profitability, and compliance status.',
    badges: ['Central Command View', 'Performance Analytics', 'Client-Facing Reports'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    )
  }
];

const systemLayers = [
  {
    title: 'Unified Ingestion Layer',
    subtitle: 'Aggregates data streams from thousands of mobile devices simultaneously. Whether it\'s a guard checking in or a patrol report, data is normalized and synced instantly.',
    detail: 'Leverages secure API gateways and real-time WebSockets to handle high-concurrency streams with zero latency.'
  },
  {
    title: 'Integrity & Validation',
    subtitle: 'Algorithms that stop fraud at the source. We filter out location spoofing and unauthorized devices to ensure your payroll data is 100% accurate.',
    detail: 'Built-in anti-spoofing logic and device fingerprinting guarantee 100% data authenticity.'
  },
  {
    title: 'Operational Automation',
    subtitle: 'The brain of the platform. Configurable rules engine that handles roster compliance, leave management, and payroll processing automatically.',
    detail: 'A seamless rules engine processes complex reporting and payroll logic in the background.'
  },
  {
    title: 'Decision Intelligence',
    subtitle: 'Dashboards that give CXOs and Ops Managers instant context. From daily summaries to long-term profitability trends, get the data you need to decide fast.',
    detail: 'Interactive, multi-tenant analytics architecture delivers role-aware operational insights in real-time.'
  }
];

const watchpointPlans = [
  {
    name: 'Vigilance',
    tagline: 'Essential Management & Tracking',
    price: 99,
    features: [
      {
        name: 'Staff Onboarding',
        description: 'Streamlined employee onboarding process with digital forms, document collection, and automated workflows. Set up new staff members quickly with role-based access and training materials.'
      },
      {
        name: 'Attendance Tracking',
        description: 'Real-time attendance monitoring with biometric integration, QR code check-ins, and automated timesheet generation. Track attendance patterns and generate compliance reports.'
      },
      {
        name: 'Scheduling & Assignments',
        description: 'Intelligent shift scheduling with drag-and-drop interface, conflict detection, and automated assignment recommendations. Optimize workforce allocation across multiple sites.'
      },
      {
        name: 'Client Management',
        description: 'Comprehensive client database with contact management, service history, and communication logs. Track client requirements, contracts, and service agreements in one place.'
      },
      {
        name: 'Basic Analytics & Reports',
        description: 'Pre-built dashboards and reports for attendance, scheduling, and workforce metrics. Export data in multiple formats and schedule automated report delivery.'
      },
      {
        name: 'User Roles & Permissions',
        description: 'Granular access control with role-based permissions. Define custom roles and restrict access to sensitive data and features based on organizational hierarchy.'
      },
      {
        name: 'Document Management',
        description: 'Centralized document storage with version control, access tracking, and automated expiry reminders. Store employee documents, contracts, and compliance certificates securely.'
      },
      {
        name: 'Shift Management',
        description: 'Complete shift lifecycle management from creation to completion. Handle shift swaps, overtime approvals, and break time tracking with automated notifications.'
      },
      {
        name: 'Leave Management',
        description: 'Automated leave request workflow with approval chains, balance tracking, and calendar integration. Support multiple leave types and carry-forward policies.'
      },
      {
        name: 'Resignation Management',
        description: 'Streamlined resignation process with automated workflows, exit interviews, knowledge transfer tracking, and final settlement calculations. Manage employee offboarding efficiently with document collection and access revocation.'
      },
      {
        name: 'Mobile App Access',
        description: 'Native mobile applications for iOS and Android with full feature access. Offline capability, push notifications, and optimized mobile workflows for field operations.'
      },
      {
        name: 'Geo-fencing',
        description: 'Virtual boundary management with automatic check-in/check-out when staff enter or exit designated areas. Generate alerts for unauthorized access or absence.'
      },
      {
        name: 'Incident Reporting',
        description: 'Comprehensive incident management with photo/video evidence, witness statements, and automated escalation workflows. Track incident resolution and generate reports.'
      },
      {
        name: 'Photo Uploads',
        description: 'Capture and upload photos directly from mobile devices with timestamp and location metadata. Useful for site inspections, incident documentation, and proof of work.'
      },
    ],
    icon: '🛡️',
    color: '#667eea',
    discounts: [
      { users: 100, percent: 5 },
      { users: 200, percent: 10 },
      { users: 500, percent: 20 },
      { users: 1000, percent: 30 },
    ],
  },
  {
    name: 'Sentinel',
    tagline: 'Advanced Operations & Finance',
    price: 199,
    features: [
      {
        name: 'All Vigilance Features',
        description: 'Everything included in the Vigilance plan plus advanced financial and operational capabilities.'
      },
      {
        name: 'Notifications',
        description: 'Multi-channel notifications via email, SMS, and in-app alerts. Customize notification preferences and set up automated reminders for important events.'
      },
      {
        name: 'Payroll Automation',
        description: 'Automated payroll processing with support for multiple pay structures, overtime calculations, and statutory deductions. Generate payslips and handle salary revisions seamlessly.'
      },
      {
        name: 'Invoicing',
        description: 'Professional invoice generation with customizable templates, automated numbering, and tax calculations. Track invoice status, send reminders, and manage payment receipts.'
      },
      {
        name: 'Advance Salary Management',
        description: 'Track and manage advance salaries to employees with automated deduction schedules. Set up repayment plans and generate advance reports for accounting.'
      },
      {
        name: 'Tax Calculations',
        description: 'Automated tax calculations for income tax, GST, and other statutory requirements. Generate tax reports and ensure compliance with current tax regulations.'
      },
      {
        name: 'Financial Dashboards',
        description: 'Advanced financial analytics with revenue trends, expense analysis, profit margins, and cash flow visualization. Real-time financial health monitoring.'
      },
    ],
    icon: '💳',
    color: '#4ecdc4',
    discounts: [
      { users: 100, percent: 5 },
      { users: 200, percent: 10 },
      { users: 500, percent: 20 },
      { users: 1000, percent: 30 },
    ],
  },
  {
    name: 'Guardian',
    tagline: 'Live Intelligence & Emergency Response',
    price: 399,
    features: [
      {
        name: 'All Sentinel Features',
        description: 'Complete access to all Sentinel plan features plus real-time intelligence and emergency response capabilities.'
      },
      {
        name: 'Live Tracking (GPS)',
        description: 'Real-time GPS tracking of field staff with location history, route optimization, and geofence alerts. Monitor movement patterns and ensure safety compliance.'
      },
      {
        name: 'Live Reports & Dashboards',
        description: 'Real-time operational dashboards with live data updates, interactive charts, and customizable widgets. Monitor KPIs and performance metrics in real-time.'
      },
      {
        name: 'In-app Chat & Messaging',
        description: 'Secure team communication with group chats, file sharing, and message broadcasting. Support for voice messages and read receipts for critical communications.'
      },
      {
        name: 'Emergency Services (SOS, Panic Button)',
        description: 'One-tap emergency alert system with automatic location sharing, escalation to emergency contacts, and integration with emergency services. Critical for field staff safety.'
      },
      {
        name: 'Real-time Alerts',
        description: 'Instant alerts for attendance anomalies, location deviations, emergency situations, and system events. Customizable alert rules and notification channels.'
      },
      {
        name: 'Video Uploads',
        description: 'Capture and upload videos directly from mobile devices with timestamp and location metadata. Useful for site inspections, incident documentation, and proof of work.'
      },
    ],
    icon: '🚨',
    color: '#ff6b6b',
    discounts: [
      { users: 100, percent: 5 },
      { users: 200, percent: 10 },
      { users: 500, percent: 20 },
      { users: 1000, percent: 30 },
    ],
  },
];

// Terms and Conditions Modal Component
const TermsModal = ({ isOpen, onClose }) => {
  // Prevent body scroll when modal is open while preserving scroll position
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      const scrollY = document.body.style.top;
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const handleScroll = (e) => {
    e.stopPropagation();
  };

  const handleWheel = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content legal-modal" onClick={(e) => e.stopPropagation()}>
        {/* Animated Background Elements */}
        <div className="modal-bg-elements">
          <div className="floating-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" style={{
                '--delay': `${i * 0.5}s`,
                '--size': `${Math.random() * 4 + 2}px`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`
              }}></div>
            ))}
          </div>
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        <div className="modal-header">
          <div className="header-content">
            <div className="title-section">
              <h2>Terms and Conditions</h2>
              <p className="subtitle">CloudBamboo Digital (Founded 2025)</p>
              <div className="legal-badge">
                <span className="badge-icon">📋</span>
                <span className="badge-text">Last Updated: January 2025</span>
              </div>
            </div>
            <button className="modal-close" onClick={onClose}>
              <span>×</span>
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="legal-content" onScroll={handleScroll} onWheel={handleWheel}>
            
            <section className="legal-section">
              <h3>1. Acceptance of Terms</h3>
              <p>
                By accessing and using CloudBamboo Digital's services, including but not limited to our WatchPoint platform, 
                consulting services, and custom software solutions, you agree to be bound by these Terms and Conditions. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="legal-section">
              <h3>2. Services Description</h3>
              <h4>2.1 Software as a Service (SaaS)</h4>
              <p>
                CloudBamboo Digital provides cloud-based software solutions including workforce management systems, 
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
              <h4>5.1 CloudBamboo Digital Property</h4>
              <p>
                All software, documentation, and related materials provided by CloudBamboo Digital remain our 
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
                To the maximum extent permitted by law, CloudBamboo Digital's liability for any claims arising from 
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
              
              <h4>9.2 Termination by CloudBamboo Digital</h4>
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
                <p><strong>CloudBamboo Digital</strong></p>
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

// Privacy Policy Modal Component
const PrivacyModal = ({ isOpen, onClose }) => {
  // Prevent body scroll when modal is open while preserving scroll position
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      const scrollY = document.body.style.top;
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const handleScroll = (e) => {
    e.stopPropagation();
  };

  const handleWheel = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content legal-modal" onClick={(e) => e.stopPropagation()}>
        {/* Animated Background Elements */}
        <div className="modal-bg-elements">
          <div className="floating-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" style={{
                '--delay': `${i * 0.5}s`,
                '--size': `${Math.random() * 4 + 2}px`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`
              }}></div>
            ))}
          </div>
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        <div className="modal-header">
          <div className="header-content">
            <div className="title-section">
              <h2>Privacy Policy</h2>
              <p className="subtitle">CloudBamboo Digital (Founded 2025)</p>
              <div className="legal-badge">
                <span className="badge-icon">🔒</span>
                <span className="badge-text">Last Updated: January 2025</span>
              </div>
            </div>
            <button className="modal-close" onClick={onClose}>
              <span>×</span>
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="legal-content" onScroll={handleScroll} onWheel={handleWheel}>
            
            <section className="legal-section">
              <h3>1. Introduction</h3>
              <p>
                CloudBamboo Digital ("we," "our," or "us") is committed to protecting your privacy. 
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
                <p><strong>CloudBamboo Digital</strong></p>
                <p>(Founded 2025)</p>
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

// Enhanced Modal Component
const JourneyModal = ({ isOpen, onClose }) => {
  const [activePhase, setActivePhase] = useState(0);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Prevent scroll propagation
  const handleScroll = (e) => {
    e.stopPropagation();
  };

  // Prevent wheel events from bubbling to body
  const handleWheel = (e) => {
    e.stopPropagation();
  };

  const phases = [
    {
      title: "Ideation & Market Research",
      duration: "Months 1-2",
      icon: "🔍",
      color: "#667eea",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      bgPattern: "radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)",
      items: [
        {
          title: "Problem Identification",
          icon: "🎯",
          details: ["Industry inefficiencies in traditional manual processes", "Data management challenges leading to errors and delays", "Lack of real-time monitoring and reporting capabilities", "Compliance and regulatory challenges in operations"],
          highlights: ["Manual Processes", "Data Errors", "Real-time Monitoring", "Compliance"]
        },
        {
          title: "Market Analysis",
          icon: "📊",
          details: ["Competitor research: Existing solutions vs. market gaps", "Target market: Industry-specific companies and departments", "Market size: Understanding total addressable market", "Gap identification: Unmet needs and opportunities"],
          highlights: ["Competitor Research", "Target Market", "Market Size", "Gap Analysis"]
        },
        {
          title: "Solution Design",
          icon: "💡",
          details: ["Core concept: Technology-enabled process automation", "Key features: Real-time monitoring, analytics, multi-role management", "Technology stack: Modern web/mobile technologies", "Business model: SaaS subscription + enterprise licensing"],
          highlights: ["Process Automation", "Real-time Analytics", "Modern Tech Stack", "SaaS Model"]
        }
      ]
    },
    {
      title: "MVP Development",
      duration: "Months 3-6",
      icon: "⚡",
      color: "#4ecdc4",
      gradient: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)",
      bgPattern: "radial-gradient(circle at 80% 20%, rgba(78, 205, 196, 0.1) 0%, transparent 50%)",
      items: [
        {
          title: "Core Features Development",
          icon: "🚀",
          details: ["User authentication and role management", "Core business logic implementation", "Basic reporting and analytics", "Mobile-responsive web interface"],
          highlights: ["User Auth", "Business Logic", "Analytics", "Mobile UI"]
        },
        {
          title: "Technical Foundation",
          icon: "🏗️",
          details: ["Backend: Modern API framework with ORM", "Database: Scalable database with proper indexing", "Authentication: Secure token-based system", "File handling: Document and media storage", "Mobile/Web: Cross-platform user interface"],
          highlights: ["Modern API", "Scalable DB", "Secure Auth", "File Storage", "Cross-platform"]
        },
        {
          title: "MVP Testing",
          icon: "🧪",
          details: ["Internal testing: Core functionality validation", "Beta users: 5-10 target companies", "Feedback collection: User experience and feature requests", "Bug fixes: Critical issues resolution"],
          highlights: ["Internal Testing", "Beta Users", "User Feedback", "Bug Fixes"]
        }
      ]
    },
    {
      title: "Product-Market Fit",
      duration: "Months 7-12",
      icon: "🎯",
      color: "#45b7d1",
      gradient: "linear-gradient(135deg, #45b7d1 0%, #667eea 100%)",
      bgPattern: "radial-gradient(circle at 40% 60%, rgba(69, 183, 209, 0.1) 0%, transparent 50%)",
      items: [
        {
          title: "Feature Expansion",
          icon: "📈",
          details: ["Advanced analytics and reporting", "Integration capabilities", "Custom workflows and automation", "Enhanced user experience features"],
          highlights: ["Advanced Analytics", "Integrations", "Workflows", "Enhanced UX"]
        },
        {
          title: "User Acquisition Strategy",
          icon: "🎯",
          details: ["Direct sales: Target industry companies", "Partnerships: Complementary software companies", "Referral program: Existing client incentives", "Content marketing: Industry-specific content", "Industry events: Trade shows and conferences"],
          highlights: ["Direct Sales", "Partnerships", "Referral Program", "Content Marketing", "Industry Events"]
        },
        {
          title: "Customer Success",
          icon: "🎉",
          details: ["Onboarding process: Step-by-step setup guides", "Training programs: Video tutorials and documentation", "Support system: Multiple support channels", "Success metrics: User adoption and retention rates"],
          highlights: ["Onboarding", "Training", "Support System", "Success Metrics"]
        }
      ]
    },
    {
      title: "Scaling Infrastructure",
      duration: "Months 13-18",
      icon: "🚀",
      color: "#96ceb4",
      gradient: "linear-gradient(135deg, #96ceb4 0%, #4ecdc4 100%)",
      bgPattern: "radial-gradient(circle at 60% 40%, rgba(150, 206, 180, 0.1) 0%, transparent 50%)",
      items: [
        {
          title: "Technical Scaling",
          icon: "⚙️",
          details: ["Microservices architecture", "Load balancing and auto-scaling", "CDN implementation for global delivery", "Database sharding and replication"],
          highlights: ["Microservices", "Auto-scaling", "CDN", "Database Sharding"]
        },
        {
          title: "Performance Optimization",
          icon: "⚡",
          details: ["Database optimization: Query optimization, indexing", "Caching strategy: Redis for frequently accessed data", "API optimization: Rate limiting, pagination", "Background jobs: Automated processing tasks", "Monitoring: Application performance monitoring"],
          highlights: ["DB Optimization", "Redis Caching", "API Optimization", "Background Jobs", "APM"]
        },
        {
          title: "Security Enhancements",
          icon: "🔒",
          details: ["Data encryption: At rest and in transit", "Access controls: Role-based permissions", "Audit logging: Complete activity tracking", "Compliance: Industry-specific regulations", "Security testing: Regular penetration testing"],
          highlights: ["Data Encryption", "Access Controls", "Audit Logging", "Compliance", "Security Testing"]
        }
      ]
    },
    {
      title: "Business Model Evolution",
      duration: "Months 19-24",
      icon: "💰",
      color: "#feca57",
      gradient: "linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)",
      bgPattern: "radial-gradient(circle at 30% 70%, rgba(254, 202, 87, 0.1) 0%, transparent 50%)",
      items: [
        {
          title: "Revenue Streams",
          icon: "💎",
          details: ["SaaS subscriptions with tiered pricing", "Enterprise licensing and custom solutions", "Professional services and consulting", "Training and certification programs"],
          highlights: ["SaaS Subscriptions", "Enterprise Licensing", "Professional Services", "Training Programs"]
        },
        {
          title: "Partnership Strategy",
          icon: "🤝",
          details: ["B2B licensing: Software companies reselling platform", "White-label solutions: Custom branding for partners", "API marketplace: Third-party integrations", "Channel partners: Industry-specific companies"],
          highlights: ["B2B Licensing", "White-label", "API Marketplace", "Channel Partners"]
        },
        {
          title: "Market Expansion",
          icon: "🌍",
          details: ["Geographic expansion: Multiple regions and countries", "Industry verticals: Related industry segments", "Product extensions: Additional modules and features", "Internationalization: Multi-language support"],
          highlights: ["Geographic Expansion", "Industry Verticals", "Product Extensions", "Internationalization"]
        }
      ]
    },
    {
      title: "Enterprise Features",
      duration: "Months 25-30",
      icon: "🏢",
      color: "#ff9ff3",
      gradient: "linear-gradient(135deg, #ff9ff3 0%, #54a0ff 100%)",
      bgPattern: "radial-gradient(circle at 70% 30%, rgba(255, 159, 243, 0.1) 0%, transparent 50%)",
      items: [
        {
          title: "Advanced Capabilities",
          icon: (
            <svg viewBox="0 0 100 100" className="icon-3d" style={{width: '100%', height: '100%'}}>
              <defs>
                <linearGradient id="analyticsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#8b5cf6', stopOpacity:1}} />
                  <stop offset="50%" style={{stopColor:'#a855f7', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#c084fc', stopOpacity:1}} />
                </linearGradient>
                <filter id="analyticsShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                </filter>
              </defs>
              {/* Dashboard base */}
              <rect x="15" y="25" width="70" height="50" rx="8" fill="url(#analyticsGrad)" filter="url(#analyticsShadow)" className="dashboard-base"/>
              <rect x="20" y="30" width="60" height="40" rx="4" fill="rgba(255,255,255,0.2)" className="dashboard-screen"/>
              {/* Analytics bars */}
              <rect x="25" y="55" width="4" height="10" fill="rgba(255,255,255,0.8)" className="bar-1"/>
              <rect x="32" y="50" width="4" height="15" fill="rgba(255,255,255,0.8)" className="bar-2"/>
              <rect x="39" y="45" width="4" height="20" fill="rgba(255,255,255,0.8)" className="bar-3"/>
              <rect x="46" y="40" width="4" height="25" fill="rgba(255,255,255,0.8)" className="bar-4"/>
              {/* Trend line */}
              <path d="M55 60 Q60 50 65 45 Q70 40 75 35" stroke="rgba(255,255,255,0.9)" strokeWidth="2" fill="none" className="trend-line"/>
              {/* Data points */}
              <circle cx="55" cy="60" r="2" fill="rgba(255,255,255,0.9)" className="data-point-1"/>
              <circle cx="65" cy="45" r="2" fill="rgba(255,255,255,0.9)" className="data-point-2"/>
              <circle cx="75" cy="35" r="2" fill="rgba(255,255,255,0.9)" className="data-point-3"/>
            </svg>
          ),
          details: ["Advanced analytics and business intelligence", "Custom integrations and APIs", "Enterprise-grade security and compliance", "Advanced reporting and insights"],
          highlights: ["Advanced Analytics", "Custom APIs", "Enterprise Security", "Advanced Reporting"]
        },
        {
          title: "Deployment Options",
          icon: (
            <svg viewBox="0 0 100 100" className="icon-3d" style={{width: '100%', height: '100%'}}>
              <defs>
                <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#0ea5e9', stopOpacity:1}} />
                  <stop offset="50%" style={{stopColor:'#3b82f6', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#1e40af', stopOpacity:1}} />
                </linearGradient>
                <filter id="cloudShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                </filter>
              </defs>
              {/* Main cloud */}
              <ellipse cx="50" cy="45" rx="25" ry="15" fill="url(#cloudGrad)" filter="url(#cloudShadow)" className="main-cloud"/>
              <ellipse cx="35" cy="40" rx="12" ry="8" fill="url(#cloudGrad)" filter="url(#cloudShadow)" className="cloud-left"/>
              <ellipse cx="65" cy="40" rx="12" ry="8" fill="url(#cloudGrad)" filter="url(#cloudShadow)" className="cloud-right"/>
              <ellipse cx="50" cy="35" rx="15" ry="10" fill="url(#cloudGrad)" filter="url(#cloudShadow)" className="cloud-top"/>
              {/* Cloud highlights */}
              <ellipse cx="45" cy="40" rx="8" ry="5" fill="rgba(255,255,255,0.3)" className="cloud-highlight"/>
              {/* Servers/Infrastructure */}
              <rect x="20" y="60" width="8" height="15" rx="2" fill="url(#cloudGrad)" filter="url(#cloudShadow)" className="server-1"/>
              <rect x="30" y="65" width="8" height="10" rx="2" fill="url(#cloudGrad)" filter="url(#cloudShadow)" className="server-2"/>
              <rect x="62" y="62" width="8" height="13" rx="2" fill="url(#cloudGrad)" filter="url(#cloudShadow)" className="server-3"/>
              <rect x="72" y="67" width="8" height="8" rx="2" fill="url(#cloudGrad)" filter="url(#cloudShadow)" className="server-4"/>
              {/* Connection lines */}
              <path d="M34 55 Q40 58 45 55" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" className="connection-1"/>
              <path d="M55 55 Q60 58 66 55" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" className="connection-2"/>
              {/* Server indicators */}
              <circle cx="24" cy="65" r="1" fill="rgba(255,255,255,0.8)" className="server-led-1"/>
              <circle cx="34" cy="68" r="1" fill="rgba(255,255,255,0.8)" className="server-led-2"/>
              <circle cx="66" cy="67" r="1" fill="rgba(255,255,255,0.8)" className="server-led-3"/>
              <circle cx="76" cy="70" r="1" fill="rgba(255,255,255,0.8)" className="server-led-4"/>
            </svg>
          ),
          details: ["Cloud SaaS: Multi-tenant hosted solution", "Private cloud: Dedicated infrastructure", "On-premise: Client-managed servers", "Hybrid: Combination of cloud and on-premise"],
          highlights: ["Cloud SaaS", "Private Cloud", "On-premise", "Hybrid"]
        },
        {
          title: "Enterprise Sales",
          icon: (
            <svg viewBox="0 0 100 100" className="icon-3d" style={{width: '100%', height: '100%'}}>
              <defs>
                <linearGradient id="salesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#f59e0b', stopOpacity:1}} />
                  <stop offset="50%" style={{stopColor:'#d97706', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#92400e', stopOpacity:1}} />
                </linearGradient>
                <filter id="salesShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                </filter>
              </defs>
              {/* Central figure - lead person */}
              <circle cx="50" cy="35" r="8" fill="url(#salesGrad)" filter="url(#salesShadow)" className="head-center"/>
              <path d="M42 45 Q50 50 58 45 Q58 55 50 60 Q42 55 42 45" fill="url(#salesGrad)" filter="url(#salesShadow)" className="body-center"/>
              {/* Left team member */}
              <circle cx="25" cy="40" r="6" fill="url(#salesGrad)" filter="url(#salesShadow)" className="head-left"/>
              <path d="M19 48 Q25 52 31 48 Q31 56 25 60 Q19 56 19 48" fill="url(#salesGrad)" filter="url(#salesShadow)" className="body-left"/>
              {/* Right team member */}
              <circle cx="75" cy="40" r="6" fill="url(#salesGrad)" filter="url(#salesShadow)" className="head-right"/>
              <path d="M69 48 Q75 52 81 48 Q81 56 75 60 Q69 56 69 48" fill="url(#salesGrad)" filter="url(#salesShadow)" className="body-right"/>
              {/* Connection lines representing collaboration */}
              <path d="M35 50 Q42 48 45 50" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" className="connection-left"/>
              <path d="M55 50 Q58 48 65 50" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" className="connection-right"/>
              {/* Success indicators - stars/achievements */}
              <path d="M50 20 L52 26 L58 26 L53 30 L55 36 L50 32 L45 36 L47 30 L42 26 L48 26 Z" 
                    fill="rgba(255,255,255,0.8)" 
                    filter="url(#salesShadow)" 
                    className="achievement-star"/>
              {/* Professional briefcase */}
              <rect x="40" y="70" width="20" height="12" rx="2" fill="url(#salesGrad)" filter="url(#salesShadow)" className="briefcase"/>
              <rect x="45" y="67" width="10" height="4" rx="1" fill="url(#salesGrad)" filter="url(#salesShadow)" className="briefcase-handle"/>
              {/* Additional professional elements */}
              <circle cx="15" cy="25" r="2" fill="rgba(255,255,255,0.7)" className="professional-dot-1"/>
              <circle cx="85" cy="25" r="2" fill="rgba(255,255,255,0.7)" className="professional-dot-2"/>
              <circle cx="20" cy="75" r="2" fill="rgba(255,255,255,0.7)" className="professional-dot-3"/>
              <circle cx="80" cy="75" r="2" fill="rgba(255,255,255,0.7)" className="professional-dot-4"/>
            </svg>
          ),
          details: ["Sales team: Dedicated enterprise sales", "Solution architects: Technical pre-sales", "Customer success: Dedicated account managers", "Professional services: Implementation and consulting"],
          highlights: ["Enterprise Sales", "Solution Architects", "Account Managers", "Professional Services"]
        }
      ]
    },
    {
      title: "Platform Ecosystem",
      duration: "Months 31-36",
      icon: "🌐",
      color: "#54a0ff",
      gradient: "linear-gradient(135deg, #54a0ff 0%, #5f27cd 100%)",
      bgPattern: "radial-gradient(circle at 50% 50%, rgba(84, 160, 255, 0.1) 0%, transparent 50%)",
      items: [
        {
          title: "API Platform",
          icon: "🔌",
          details: ["Comprehensive REST and GraphQL APIs", "Developer portal and documentation", "SDK development for multiple languages", "API management and monitoring program"],
          highlights: ["REST APIs", "GraphQL", "Developer Portal", "SDK Development"]
        },
        {
          title: "Integration Network",
          icon: "🔗",
          details: ["Enterprise systems: ERP, CRM, HR systems", "Industry tools: Specialized software integrations", "Data platforms: Analytics and BI tools", "IoT devices: Hardware and sensor integrations"],
          highlights: ["ERP/CRM/HR", "Industry Tools", "Data Platforms", "IoT Devices"]
        },
        {
          title: "Marketplace Development",
          icon: "🛍️",
          details: ["Third-party apps: Complementary applications", "Custom integrations: Industry-specific solutions", "Data connectors: Import/export capabilities", "Analytics tools: Business intelligence integration"],
          highlights: ["Third-party Apps", "Custom Integrations", "Data Connectors", "Analytics Tools"]
        }
      ]
    },
    {
      title: "Global Scale",
      duration: "Months 37-48",
      icon: "🌍",
      color: "#5f27cd",
      gradient: "linear-gradient(135deg, #5f27cd 0%, #ff6b6b 100%)",
      bgPattern: "radial-gradient(circle at 20% 80%, rgba(95, 39, 205, 0.1) 0%, transparent 50%)",
      items: [
        {
          title: "International Expansion",
          icon: "🌏",
          details: ["Regional offices and local teams", "Cultural adaptation and localization", "Compliance with local regulations", "Partnership with local companies"],
          highlights: ["Regional Offices", "Cultural Adaptation", "Local Compliance", "Local Partnerships"]
        },
        {
          title: "Product Localization",
          icon: "🌐",
          details: ["Language support: Multiple languages", "Currency support: Multiple currencies", "Time zones: Global time zone handling", "Local regulations: Country-specific compliance", "Cultural adaptation: UI/UX for different markets"],
          highlights: ["Multi-language", "Multi-currency", "Time Zones", "Local Regulations", "Cultural UX"]
        },
        {
          title: "Acquisition Strategy",
          icon: "🎯",
          details: ["Strategic acquisitions: Complementary companies", "Technology acquisitions: AI/ML companies", "Talent acquisition: Key personnel and teams", "Market expansion: Geographic market entry"],
          highlights: ["Strategic Acquisitions", "Tech Acquisitions", "Talent Acquisition", "Market Expansion"]
        }
      ]
    },
    {
      title: "AI & Innovation",
      duration: "Months 49-60",
      icon: "🤖",
      color: "#ff6b6b",
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #00d9ff 100%)",
      bgPattern: "radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%)",
      items: [
        {
          title: "Artificial Intelligence",
          icon: "🧠",
          details: ["Machine learning algorithms for predictive analytics", "Natural language processing for user interactions", "Computer vision for document processing", "AI-powered automation and optimization capabilities"],
          highlights: ["Machine Learning", "NLP", "Computer Vision", "AI Automation"]
        },
        {
          title: "Advanced Analytics",
          icon: "📊",
          details: ["Predictive analytics: Future trends and needs", "Behavioral analytics: User and system patterns", "Risk assessment: Proactive risk management", "Operational intelligence: Real-time insights", "Business intelligence: Executive dashboards"],
          highlights: ["Predictive Analytics", "Behavioral Analytics", "Risk Assessment", "Operational Intelligence", "Business Intelligence"]
        },
        {
          title: "Innovation Labs",
          icon: "🔬",
          details: ["R&D team: Dedicated innovation team", "Technology partnerships: Universities and research labs", "Patent portfolio: Intellectual property protection", "Future vision: Long-term technology roadmap"],
          highlights: ["R&D Team", "Tech Partnerships", "Patent Portfolio", "Future Vision"]
        }
      ]
    },
    {
      title: "Market Leadership",
      duration: "Months 61+",
      icon: "👑",
      color: "#00d9ff",
      gradient: "linear-gradient(135deg, #00d9ff 0%, #667eea 100%)",
      bgPattern: "radial-gradient(circle at 40% 60%, rgba(0, 217, 255, 0.1) 0%, transparent 50%)",
      items: [
        {
          title: "Industry Leadership",
          icon: "🏆",
          details: ["Thought leadership and industry expertise", "Industry conferences and speaking engagements", "White papers and research publications", "Industry standards and best practices research"],
          highlights: ["Thought Leadership", "Industry Conferences", "White Papers", "Industry Standards"]
        },
        {
          title: "Ecosystem Dominance",
          icon: "🌟",
          details: ["Platform effects: Network effects in industry", "Data advantage: Largest industry dataset", "Technology moat: Proprietary algorithms and systems", "Brand recognition: Trusted platform", "Customer lock-in: High switching costs"],
          highlights: ["Platform Effects", "Data Advantage", "Technology Moat", "Brand Recognition", "Customer Lock-in"]
        },
        {
          title: "Sustainable Growth",
          icon: "📈",
          details: ["Recurring revenue: High subscription retention", "Customer lifetime value: Long-term relationships", "Net revenue retention: Strong expansion revenue", "Profitability: Sustainable unit economics", "Market share: Significant market presence"],
          highlights: ["Recurring Revenue", "Customer LTV", "Net Revenue Retention", "Profitability", "Market Share"]
        }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Animated Background Elements */}
        <div className="modal-bg-elements">
          <div className="floating-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" style={{
                '--delay': `${i * 0.5}s`,
                '--size': `${Math.random() * 4 + 2}px`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`
              }}></div>
            ))}
          </div>
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        <div className="modal-header">
          <div className="header-content">
            <div className="title-section">
              <h2>Complete Project Journey</h2>
              <p className="subtitle">From Idea to Millions of Users</p>
              <div className="progress-indicator">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${((activePhase + 1) / phases.length) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-text">Phase {activePhase + 1} of {phases.length}</span>
              </div>
            </div>
            <button className="modal-close" onClick={onClose}>
              <span>×</span>
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="journey-timeline">
            <div className="timeline-nav" onScroll={handleScroll} onWheel={handleWheel}>
              <div className="nav-header">
                <h3>Development Phases</h3>
                <p>Click to explore each phase</p>
              </div>
              <div className="nav-items">
                {phases.map((phase, index) => (
                  <button
                    key={index}
                    className={`timeline-nav-item ${activePhase === index ? 'active' : ''}`}
                    onClick={() => setActivePhase(index)}

                    style={{
                      '--phase-color': phase.color,
                      '--phase-gradient': phase.gradient,
                      '--bg-pattern': phase.bgPattern
                    }}
                  >
                    <div className="nav-item-content">
                      <div className="phase-icon-wrapper">
                        <span className="phase-icon">{phase.icon}</span>
                        {activePhase === index && <div className="active-indicator"></div>}
                      </div>
                      <div className="phase-text">
                        <span className="phase-title">{phase.title}</span>
                        <span className="phase-duration">{phase.duration}</span>
                      </div>
                    </div>
                    <div className="hover-glow"></div>
                  </button>
                ))}
              </div>
            </div>

            <div className="timeline-content" onScroll={handleScroll} onWheel={handleWheel}>
              <div className="phase-header">
                <div className="phase-info">
                  <div className="phase-badge" style={{ '--phase-gradient': phases[activePhase].gradient }}>
                    <span className="badge-icon">{phases[activePhase].icon}</span>
                    <span className="badge-text">{phases[activePhase].duration}</span>
                  </div>
                  <h3 style={{ '--phase-color': phases[activePhase].color }}>
                    {phases[activePhase].title}
                  </h3>
                  <p className="phase-description">
                    {activePhase === 0 && "Laying the foundation with market research and problem identification"}
                    {activePhase === 1 && "Building the core product with essential features and technical foundation"}
                    {activePhase === 2 && "Finding product-market fit through user feedback and feature expansion"}
                    {activePhase === 3 && "Scaling infrastructure to handle growth and performance demands"}
                    {activePhase === 4 && "Evolving business model with multiple revenue streams and partnerships"}
                    {activePhase === 5 && "Adding enterprise-grade features and deployment options"}
                    {activePhase === 6 && "Building a comprehensive platform ecosystem with APIs and integrations"}
                    {activePhase === 7 && "Expanding globally with localization and international markets"}
                    {activePhase === 8 && "Integrating AI and advanced analytics for innovation"}
                    {activePhase === 9 && "Achieving market leadership with sustainable growth and ecosystem dominance"}
                  </p>
                </div>
                <div className="phase-visual">
                  <div className="phase-icon-large" style={{ '--phase-gradient': phases[activePhase].gradient }}>
                    {phases[activePhase].icon}
                  </div>
                  <div className="phase-stats">
                    <div className="stat-item">
                      <span className="stat-number">{activePhase + 1}</span>
                      <span className="stat-label">Phase</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{phases[activePhase].items.length}</span>
                      <span className="stat-label">Categories</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{phases[activePhase].items.reduce((acc, item) => acc + item.details.length, 0)}</span>
                      <span className="stat-label">Tasks</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="phase-details">
                {phases[activePhase].items.map((item, index) => (
                  <div key={index} className="phase-item" style={{ '--phase-color': phases[activePhase].color }}>
                    <div className="item-header">
                      <div className="item-icon">{item.icon}</div>
                      <h4>{item.title}</h4>
                    </div>

                    <div className="highlights-section">
                      <div className="highlights-grid">
                        {item.highlights.map((highlight, highlightIndex) => (
                          <span key={highlightIndex} className="highlight-tag">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="details-section">
                      <h5>Detailed Tasks:</h5>
                      <ul>
                        {item.details.map((detail, detailIndex) => (
                          <li key={detailIndex}>
                            <span className="detail-text">{detail}</span>
                            <div className="detail-progress">
                              <div className="progress-dot"></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [expandedFeature, setExpandedFeature] = useState(null); // Format: "planIndex-featureIndex"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Close mobile menu on scroll
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }

      // Update active section based on scroll position
      const sections = ['features', 'watchpoint', 'philosophy', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.mobile-navigation') && !e.target.closest('.mobile-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Initialize all animations
    initializeAnimations();
    // initializeCursor(); // Removed cursor tracking effect
  }, []);

  const openFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const openContactForm = useCallback((plan) => {
    setSelectedPlan(plan);
    setIsContactFormOpen(true);
    setFormData(prev => ({
      ...prev,
      message: `I'm interested in the ${plan.name} plan (₹${plan.price}/user/month). Please get in touch with me.`
    }));
  }, []);

  const closeContactForm = useCallback(() => {
    setIsContactFormOpen(false);
    setSelectedPlan(null);
    setSubmitStatus(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  }, []);

  // Handle ESC key press for modals
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        if (isContactFormOpen) {
          closeContactForm();
        } else if (isFullscreen) {
          closeFullscreen();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isFullscreen, isContactFormOpen, closeContactForm, closeFullscreen]);

  // Prevent body scroll when fullscreen or contact form is open
  useEffect(() => {
    if (isFullscreen || isContactFormOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen, isContactFormOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const subject = `WatchPoint ${selectedPlan.name} Plan Inquiry`;
      const body = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Selected Plan: ${selectedPlan.name} (₹${selectedPlan.price}/user/month)

Message:
${formData.message}

--
This inquiry was submitted through the WatchPoint website.`;

      const mailtoLink = `mailto:hq@cloudbamboo.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      setSubmitStatus('success');
      setTimeout(() => {
        closeContactForm();
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      {/* Animated Background Elements */}
      <div className="animated-bg">
        <div className="bg-gradient bg-gradient-1"></div>
        <div className="bg-gradient bg-gradient-2"></div>
        <div className="bg-gradient bg-gradient-3"></div>
      </div>

      {/* Particle Effects */}
      <div className="particles"></div>
      {/* Modern Header */}
      <header className={`modern-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="brand">
            <img src={logoImage} alt="CloudBamboo Digital" className="brand-logo" />
            <div className="brand-name">
              <div className="brand-line">
                <span className="brand-cloud">Cloud</span>
                <span className="brand-bamboo">bamboo</span>
              </div>
              <div className="digital-line">
                <span className="brand-digital">Digital</span>
              </div>
            </div>
          </div>
          
          <nav className="navigation">
            <a 
              href="#features" 
              className={`nav-item ${activeSection === 'features' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Home
            </a>
            <div 
              className="nav-item nav-dropdown"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <span className="nav-dropdown-trigger">
                Products
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 8L2 4h8L6 8z"/>
                </svg>
              </span>
              {isProductsDropdownOpen && (
                <div className="nav-dropdown-menu">
                  <a 
                    href="#watchpoint"
                    className="nav-dropdown-item"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsProductsDropdownOpen(false);
                      document.getElementById('watchpoint')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="dropdown-item-icon">💼</span>
                    <div className="dropdown-item-content">
                      <strong>Watchpoint Management</strong>
                      <small>Workforce & Asset Management</small>
                    </div>
                  </a>
                  <a 
                    href="#watchpoint-sos"
                    className="nav-dropdown-item"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsProductsDropdownOpen(false);
                      document.getElementById('watchpoint-sos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="dropdown-item-icon">🛡️</span>
                    <div className="dropdown-item-content">
                      <strong>Watchpoint SOS</strong>
                      <small>Personal Safety & Protection</small>
                    </div>
                  </a>
                </div>
              )}
            </div>
            <a 
              href="#contact" 
              className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Contact
            </a>
            <a 
              href="#about" 
              className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              About
            </a>
            <a 
              href="https://watchpoint.in" 
              target="_blank"
              rel="noopener noreferrer"
              className="nav-download-sos-btn"
            >
              <svg className="sos-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
              <span className="sos-text">
                <span className="sos-main">Get Started</span>
                <span className="sos-pulse">🚀</span>
              </span>
              <div className="sos-btn-glow"></div>
            </a>
            <Link to="/login" className="nav-login-btn">
              <svg className="login-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              <span>Login</span>
              <div className="login-btn-shine"></div>
            </Link>
          </nav>
          
          <div className="header-actions">
            <button 
              className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          
          {/* Mobile Navigation Menu */}
          <nav className={`mobile-navigation ${isMobileMenuOpen ? 'open' : ''}`}>
            <a 
              href="#features" 
              className={`mobile-nav-item ${activeSection === 'features' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Home
            </a>
            <div className="mobile-nav-section">
              <div className="mobile-nav-section-title">Products</div>
              <a 
                href="#watchpoint"
                className="mobile-nav-item mobile-nav-subitem"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.getElementById('watchpoint')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <span className="mobile-nav-icon">💼</span>
                Watchpoint Management
              </a>
              <a 
                href="#watchpoint-sos"
                className="mobile-nav-item mobile-nav-subitem"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.getElementById('watchpoint-sos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <span className="mobile-nav-icon">🛡️</span>
                Watchpoint SOS
              </a>
            </div>
            <a 
              href="#contact" 
              className={`mobile-nav-item ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Contact
            </a>
            <a 
              href="#about" 
              className={`mobile-nav-item ${activeSection === 'about' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              About
            </a>
            <a 
              href="https://watchpoint.in" 
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-download-sos-btn"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="sos-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
              <span className="sos-text">
                <span className="sos-main">Get Started</span>
                <span className="sos-pulse">🚀</span>
              </span>
              <div className="sos-btn-glow"></div>
            </a>
            <Link 
              to="/login" 
              className="mobile-nav-login-btn"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="login-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              <span>Login</span>
              <div className="login-btn-shine"></div>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />


      {/* WatchPoint Feature Matrix */}
      <section id="features" className="watchpoint-features">
        <div className="container">
          <div className="section-header scroll-reveal">
            <p className="section-kicker">Product DNA</p>
            <h2 className="section-title">The OS for Security Agencies</h2>
          </div>
          <div className="watchpoint-pillar-grid">
            {watchpointPillars.map((pillar, index) => (
              <div 
                key={pillar.title} 
                className="pillar-card-container scroll-reveal"
              >
                <div className="pillar-card-flipper">
                  <div className="pillar-card pillar-card-front">
                    <div className="pillar-icon">{pillar.icon}</div>
                    <span className="pillar-index">{pillar.id}</span>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                    <div className="pillar-badges">
                      {pillar.badges.map((badge) => (
                        <span key={badge} className="pillar-badge">{badge}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pillar-card pillar-card-back">
                    <img src={attendanceDemo} alt={pillar.title} className="pillar-card-back-image" />
                  </div>
                </div>
              </div>
            ))}
              </div>
            </div>
      </section>

      {/* Dashboard Showcase with Guard Video and Admin Panel - COMMENTED OUT */}
      {/* <section className="watchpoint-dashboard-showcase">
        <div className="container">
          <div className="dashboard-showcase scroll-reveal">
            <div className="dashboard-section-header">
              <p className="section-kicker">Live Operations</p>
              <h2 className="section-title">See it in action, track it in real-time</h2>
              <p className="section-subtitle">
                When guards scan QR codes and capture selfies on-site, every action instantly appears in your admin dashboard. 
                Watch the mobile workflow below and see how it reflects in the command center. The dashboard screenshot shows real attendance data from guards who have logged in.
              </p>
            </div>
            <div className="dashboard-video-panel-container">
              <div className="guard-video-section">
                <div className="guard-video-wrapper">
                  <div className="video-label">
                    <span className="video-label-icon">📱</span>
                    <span className="video-label-text">Guard Mobile App</span>
                  </div>
                  <div className="guard-video-container">
                    <video 
                      src={guardVideo}
                      className="guard-video"
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label="Guard scanning QR code and capturing selfie for attendance"
                    />
                  </div>
                  <div className="video-description">
                    <p className="video-step">
                      <span className="step-number">1</span>
                      <span className="step-text">Guard scans QR code at site location</span>
                    </p>
                    <p className="video-step">
                      <span className="step-number">2</span>
                      <span className="step-text">Selfie captured for verification</span>
                    </p>
                    <p className="video-step">
                      <span className="step-number">3</span>
                      <span className="step-text">Attendance logged instantly</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="dashboard-preview-sophisticated">
                <div className="dashboard-mockup-enhanced">
                  <div className="mockup-header-enhanced">
                    <div className="mockup-dots">
                      <div className="mockup-dot"></div>
                      <div className="mockup-dot"></div>
                      <div className="mockup-dot"></div>
                    </div>
                    <div className="mockup-url-bar-enhanced">
                      <div className="mockup-lock-icon">🔒</div>
                      <span className="url-text">greywolf.watchpoint.in</span>
                      <div className="mockup-status-indicator"></div>
                    </div>
                  </div>
                  <div className="mockup-iframe-container-enhanced">
                    <div className="screenshot-overlay">
                      <div className="screenshot-glow"></div>
                      <img
                        src={attendanceDemo}
                        className="mockup-iframe-enhanced"
                        alt="WatchPoint Admin Dashboard showing real-time attendance data from guards who have logged in"
                        loading="lazy"
                        onClick={openFullscreen}
                        style={{ cursor: 'pointer' }}
                        title="Real attendance data from guards who have logged in - Click to view fullscreen"
                      />
                      <div className="screenshot-hover-effect">
                        <span className="hover-text">Click to expand</span>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-label">
                    <div>
                      <span className="dashboard-label-icon">🖥️</span>
                      <span className="dashboard-label-text">WatchPoint Command Center - Real-Time Dashboard</span>
                    </div>
                    <span className="dashboard-label-note">Live data from guards who have logged in</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-features">
              <div className="dashboard-feature">
                <div className="feature-check">✓</div>
                <div className="feature-content">
                  <h4>Instant Sync</h4>
                  <p>
                    Every QR scan and selfie capture from the mobile app appears instantly in your admin dashboard. 
                    No delays, no manual entry.
                  </p>
                </div>
              </div>
              <div className="dashboard-feature">
                <div className="feature-check">✓</div>
                <div className="feature-content">
                  <h4>Verified Attendance</h4>
                  <p>
                    Selfie verification ensures the right person is at the right location. 
                    All verification data is automatically logged and visible in real-time.
                  </p>
                </div>
              </div>
              <div className="dashboard-feature">
                <div className="feature-check">✓</div>
                <div className="feature-content">
                  <h4>Complete Visibility</h4>
                  <p>
                    Track every guard action, check-in time, location, and verification status 
                    from a single command center dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* WatchPoint Plans Section - Compact Redesign */}
      <section id="watchpoint" className="watchpoint-plans-section">
        <div className="container">
          <div className="watchpoint-plans scroll-reveal">
            <div className="plans-header-section">
              <p className="section-kicker">Pricing</p>
              <h2 className="section-title">Choose Your WatchPoint Power Plan</h2>
              <p className="section-subtitle">
                Select the perfect plan for your operations. Each plan includes powerful features designed to streamline your workforce management.
              </p>
            </div>

            <div className="plans-grid-compact-v2">
              {watchpointPlans.map((plan, planIdx) => {
                const isExpanded = expandedFeature === `plan-${planIdx}`;
                const displayFeatures = isExpanded ? plan.features : plan.features.slice(0, 4);
                
                return (
                  <div
                    className={`plan-card-compact-v2${
                      planIdx === 2 ? ' recommended' : ''
                    }`}
                    key={plan.name}
                    style={{ '--plan-color': plan.color }}
                  >
                    {planIdx === 2 && (
                      <div className="featured-badge-v2">Most Popular</div>
                    )}
                    
                    <div className="plan-header-compact-v2">
                      <span
                        className="plan-icon-compact-v2"
                        style={{
                          background: `linear-gradient(135deg, ${plan.color} 60%, rgba(255,255,255,0.2) 100%)`,
                        }}
                      >
                        {plan.icon}
                      </span>
                      <div className="plan-info-compact-v2">
                        <h4 className="plan-name-compact-v2">{plan.name}</h4>
                        <span className="plan-tagline-compact-v2">{plan.tagline}</span>
                      </div>
                    </div>

                    <div className="price-container-compact-v2">
                      <div className="price-display-compact-v2">
                        <span className="price-currency-v2">₹</span>
                        <span className="price-amount-v2">{plan.price}</span>
                        <span className="price-period-v2">/user/mo</span>
                      </div>
                    </div>

                    <div className="discount-container-compact-v2">
                      <button 
                        className="discount-toggle-v2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedFeature(expandedFeature === `discount-${planIdx}` ? null : `discount-${planIdx}`);
                        }}
                      >
                        <span className="discount-label-v2">💰 Volume Discounts</span>
                        <span className={`toggle-icon-v2 ${expandedFeature === `discount-${planIdx}` ? 'expanded' : ''}`}>▼</span>
                      </button>
                      {expandedFeature === `discount-${planIdx}` && (
                        <div className="discount-list-v2">
                          {plan.discounts.map((discount, i) => (
                            <div className="discount-item-v2" key={i}>
                              <span>{discount.users}+ users</span>
                              <span className="discount-value-v2">{discount.percent}% off</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="plan-features-compact-v2">
                      <ul className="features-list-compact-v2">
                        {displayFeatures.map((feature, featureIdx) => {
                          const featureKey = `${planIdx}-${featureIdx}`;
                          const isFeatureExpanded = expandedFeature === featureKey;
                          const featureName = typeof feature === 'string' ? feature : feature.name;
                          const featureDesc = typeof feature === 'string' ? '' : feature.description;
                          
                          return (
                            <li key={featureIdx} className="feature-item-compact-v2">
                              <div className="feature-main-compact-v2">
                                <span className="check-icon-v2">✓</span>
                                <span className="feature-text-v2">{featureName}</span>
                                {featureDesc && (
                                  <button
                                    className="feature-info-btn-v2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedFeature(isFeatureExpanded ? null : featureKey);
                                    }}
                                    aria-label={`Learn more about ${featureName}`}
                                  >
                                    ℹ
                                  </button>
                                )}
                              </div>
                              {isFeatureExpanded && featureDesc && (
                                <div className="feature-details-v2">
                                  <p>{featureDesc}</p>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                      {plan.features.length > 4 && (
                        <button 
                          className="features-toggle-v2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedFeature(isExpanded ? null : `plan-${planIdx}`);
                          }}
                        >
                          {isExpanded ? (
                            <>Show Less <span className="toggle-arrow-v2">↑</span></>
                          ) : (
                            <>+{plan.features.length - 4} More Features <span className="toggle-arrow-v2">↓</span></>
                          )}
                        </button>
                      )}
                    </div>

                    <div className="plan-footer-compact-v2">
                      <button 
                        className="plan-cta-btn-compact-v2"
                        onClick={() => navigate('/login')}
                      >
                        Get Started →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Watchpoint SOS Section */}
      <WatchpointSOS />

      {/* Philosophy Section */}
      {/* <PhilosophySection /> */}

      {/* Founder Section */}
      {/* <FounderSection /> */}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fullscreen-modal"
          onClick={closeFullscreen}
        >
          <div 
            className="fullscreen-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="fullscreen-close"
              onClick={closeFullscreen}
              aria-label="Close fullscreen"
            >
              ×
            </button>
            <img
              src={attendanceDemo}
              alt="WatchPoint Attendance Dashboard Demo - Fullscreen"
              className="fullscreen-image"
            />
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {isContactFormOpen && (
        <div 
          className="contact-form-modal"
          onClick={closeContactForm}
        >
          <div 
            className="contact-form-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="contact-form-header">
              <h3 className="contact-form-title">
                Get Started with {selectedPlan?.name}
              </h3>
              <p className="contact-form-subtitle">
                Fill out the form below and we'll get back to you shortly
              </p>
              <button 
                className="contact-form-close"
                onClick={closeContactForm}
                aria-label="Close contact form"
              >
                ×
              </button>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Tell us about your requirements..."
                    rows="4"
                  />
                </div>
              </div>

              {submitStatus && (
                <div className={`form-status ${submitStatus}`}>
                  {submitStatus === 'success' ? (
                    <>
                      <span className="status-icon">✓</span>
                      Thank you! Your email client should open shortly with your inquiry.
                    </>
                  ) : (
                    <>
                      <span className="status-icon">⚠</span>
                      Something went wrong. Please try again or contact us directly.
                    </>
                  )}
                </div>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={closeContactForm}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting || !formData.name || !formData.email}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    'Send Inquiry'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chatbot Section - Hidden for now */}
      {/* 
      <section id="chatbot" className="chatbot">
        <div className="chatbot-floating-elements">
          <div className="chatbot-floating-element"></div>
          <div className="chatbot-floating-element"></div>
          <div className="chatbot-floating-element"></div>
        </div>
        <div className="container">
          <div className="section-header scroll-reveal">
            <h2 className="section-title">AI-Powered Chatbots That Transform Customer Experience</h2>
            <p className="section-subtitle">
              Custom AI chatbots powered by cutting-edge models like Gemini Pro and Claude 4 Sonnet,
              tailored to your business with seamless WhatsApp integration and stunning UI.
            </p>
          </div>

          <div className="chatbot-showcase scroll-reveal">
            <div className="chatbot-demo">
              <div className="chatbot-interface">
                <div className="chatbot-header">
                  <div className="chatbot-avatar">🤖</div>
                  <div className="chatbot-info">
                    <h4>CloudBamboo Digital AI Assistant</h4>
                    <span className="chatbot-status">● Online</span>
                  </div>
                </div>
                <div className="chatbot-messages">
                  <div className="message bot-message">
                    <div className="message-content">
                      Hello! I'm your AI assistant powered by Claude 4 Sonnet. How can I help you today?
                    </div>
                  </div>
                  <div className="message user-message">
                    <div className="message-content">
                      Tell me about your services
                    </div>
                  </div>
                  <div className="message bot-message">
                    <div className="message-content">
                      We offer custom software solutions including workforce management systems, AI chatbots, and enterprise applications. Would you like to know more about any specific service?
                    </div>
                  </div>
                </div>
                <div className="chatbot-input">
                  <input type="text" placeholder="Type your message..." />
                  <button className="send-btn">📤</button>
                </div>
              </div>
            </div>

            <div className="chatbot-features">
              <div className="chatbot-feature">
                <div className="feature-icon">🧠</div>
                <div className="feature-content">
                  <h4>Advanced AI Models</h4>
                  <p>Powered by Gemini Pro, Claude 4 Sonnet, GPT-4, and custom-trained models for superior understanding and responses.</p>
                </div>
              </div>
              <div className="chatbot-feature">
                <div className="feature-icon">🎨</div>
                <div className="feature-content">
                  <h4>Beautiful UI Design</h4>
                  <p>Stunning, responsive interfaces that match your brand identity and provide exceptional user experience.</p>
                </div>
              </div>
              <div className="chatbot-feature">
                <div className="feature-icon">💬</div>
                <div className="feature-content">
                  <h4>WhatsApp Integration</h4>
                  <p>Seamless integration with WhatsApp Business API for direct customer engagement on their preferred platform.</p>
                </div>
              </div>
              <div className="chatbot-feature">
                <div className="feature-icon">⚙️</div>
                <div className="feature-content">
                  <h4>Custom Context</h4>
                  <p>Trained on your specific business data, policies, and knowledge base for accurate, contextual responses.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ai-models-section scroll-reveal">
            <h3 className="models-title">Powered by Leading AI Models</h3>
            <div className="ai-models-grid">
              <div className="ai-model-card">
                <div className="model-icon">🔮</div>
                <h4 className="model-name">Gemini Pro</h4>
                <p className="model-description">Google's most capable AI model for complex reasoning and multimodal understanding.</p>
              </div>
              <div className="ai-model-card">
                <div className="model-icon">⚡</div>
                <h4 className="model-name">Claude 4 Sonnet</h4>
                <p className="model-description">Anthropic's advanced model known for safety, accuracy, and nuanced conversations.</p>
              </div>
              <div className="ai-model-card">
                <div className="model-icon">🚀</div>
                <h4 className="model-name">GPT-4 Turbo</h4>
                <p className="model-description">OpenAI's flagship model with exceptional language understanding and generation.</p>
              </div>
              <div className="ai-model-card">
                <div className="model-icon">🎯</div>
                <h4 className="model-name">Custom Models</h4>
                <p className="model-description">Specially trained models on your data for industry-specific expertise and responses.</p>
              </div>
            </div>
          </div>

          <div className="chatbot-cta scroll-reveal">
            <button
              className="btn btn-primary"
              onClick={() => window.open('https://chatbot.cloudbamboo.in', '_blank')}
            >
              Learn More
            </button>
            <button className="btn btn-glass">Request Demo</button>
          </div>
        </div>
      </section>
      */}


      {/* Contact Section - Modern Redesign */}
      <section id="contact" className="contact-section-modern">
        {/* Animated Background */}
        <div className="contact-bg">
          <div className="contact-orb contact-orb-1"></div>
          <div className="contact-orb contact-orb-2"></div>
          <div className="contact-grid-pattern"></div>
        </div>

        <div className="contact-wrapper">
          {/* Header */}
          <div className="contact-header scroll-reveal">
            <div className="contact-badge">
              <span className="badge-pulse-dot"></span>
              <span>LET'S CONNECT</span>
            </div>
            <h2 className="contact-title">
              Ready to Deploy <span className="title-gradient">WatchPoint?</span>
            </h2>
            <p className="contact-subtitle">
              WatchPoint is engineered for operations that refuse to slow down. 
              Tell us how your workforce runs today and we'll plug in a command-grade control center.
            </p>
          </div>

          <div className="contact-content-grid">
            {/* Left Side - Contact Info */}
            <div className="contact-info-panel scroll-reveal">
              <div className="info-card">
                <h3 className="info-title">Get in Touch</h3>
                <p className="info-desc">
                  Our pilots move fast: blueprint the policy, wire the data sources, 
                  and give your leadership team a live view within days.
                </p>

                <div className="contact-methods">
                  <a href="mailto:hq@cloudbamboo.in" className="contact-method-card">
                    <div className="method-icon">📧</div>
                    <div className="method-content">
                      <span className="method-label">Email</span>
                      <span className="method-value">hq@cloudbamboo.in</span>
                    </div>
                    <svg className="method-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>

                  <a href="tel:+918399811340" className="contact-method-card">
                    <div className="method-icon">📱</div>
                    <div className="method-content">
                      <span className="method-label">Phone</span>
                      <span className="method-value">+91 8399811340</span>
                    </div>
                    <svg className="method-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>

                  <div className="contact-method-card">
                    <div className="method-icon">📍</div>
                    <div className="method-content">
                      <span className="method-label">Location</span>
                      <span className="method-value">Kharamakha, Mazbat, Assam, India</span>
                    </div>
                    <svg className="method-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>

                <div className="info-features">
                  <div className="info-feature-item">
                    <span className="feature-check">✓</span>
                    <span>Free consultation & demo</span>
                  </div>
                  <div className="info-feature-item">
                    <span className="feature-check">✓</span>
                    <span>Fast deployment in days</span>
                  </div>
                  <div className="info-feature-item">
                    <span className="feature-check">✓</span>
                    <span>24/7 support available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="contact-form-panel scroll-reveal">
              <form className="modern-contact-form">
                <div className="form-row">
                  <div className="modern-form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" required />
                    <div className="input-glow"></div>
                  </div>

                  <div className="modern-form-group">
                    <label htmlFor="company">Company</label>
                    <input type="text" id="company" required />
                    <div className="input-glow"></div>
                  </div>
                </div>

                <div className="modern-form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" required />
                  <div className="input-glow"></div>
                </div>

                <div className="modern-form-group">
                  <label htmlFor="interest">I'm Interested In</label>
                  <select id="interest" defaultValue="pilot">
                    <option value="pilot">Pilot deployment of WatchPoint</option>
                    <option value="pricing">Pricing & plan guidance</option>
                    <option value="integration">Integration & rollout support</option>
                    <option value="other">Partnership / other</option>
                  </select>
                  <div className="input-glow"></div>
                </div>

                <div className="modern-form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us about your project or questions..."
                  ></textarea>
                  <div className="input-glow"></div>
                </div>

                <button type="submit" className="modern-submit-btn">
                  <span className="btn-content">
                    <span className="btn-text">Send Message</span>
                    <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  </span>
                  <div className="btn-glow"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      {/* About CloudBamboo Digital - Modern Redesign */}
      <section id="about" className="about-modern-section">
        {/* Background */}
        <div className="about-bg">
          <div className="about-orb about-orb-1"></div>
          <div className="about-orb about-orb-2"></div>
          <div className="about-grid-lines"></div>
        </div>

        <div className="about-modern-wrapper">
          {/* Header */}
          <div className="about-modern-header scroll-reveal">
            <div className="about-badge">
              <span className="badge-sparkle">✨</span>
              <span>WHO WE ARE</span>
            </div>
            <h2 className="about-modern-title">
              Meet <span className="title-highlight">CloudBamboo Digital</span>
            </h2>
            <p className="about-modern-subtitle">
              A product studio crafting thoughtful software from Assam, India. 
              We build tools that help businesses work better every day.
            </p>
          </div>

          {/* Story Section */}
          <div className="about-story-section scroll-reveal">
            <div className="story-content">
              <div className="story-year">EST. 2025</div>
              <h3 className="story-title">Our Story</h3>
              <p className="story-text">
                <strong>CloudBamboo Digital LLP</strong> was born from a simple vision: to build quality 
                software from Assam, India. We're a young team focused on creating practical solutions 
                that solve real problems—combining modern technology with thoughtful design.
              </p>
              <p className="story-text">
                We believe great software comes from passion, precision, and purpose. Our flagship product, WatchPoint, 
                embodies this philosophy: careful attention to detail, strong security, and an experience that feels 
                intuitive. We're here to grow and learn—one product at a time.
              </p>
            </div>
            <div className="story-visual">
              <div className="story-card">
                <div className="card-glow"></div>
                <div className="card-icon-wrapper">
                  <svg className="card-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21h18M3 7v14M21 7v14M5 7h14M5 21V7M19 21V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 11h2M9 15h2M13 11h2M13 15h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="card-label">Limited Liability Partnership</div>
                <div className="card-value">Incorporated 2025</div>
              </div>
              <div className="story-card">
                <div className="card-glow"></div>
                <div className="card-icon-wrapper">
                  <svg className="card-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="card-label">Headquarters</div>
                <div className="card-value">Assam, India</div>
              </div>
              <div className="story-card">
                <div className="card-glow"></div>
                <div className="card-icon-wrapper">
                  <svg className="card-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="card-label">Mission</div>
                <div className="card-value">Enterprise Excellence</div>
              </div>
            </div>
          </div>

          {/* What We Do */}
          <div className="about-services-section scroll-reveal">
            <h3 className="services-title">What We Do</h3>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">💼</div>
                <h4>Product Development</h4>
                <p>We build SaaS products designed to scale with your business needs.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">🎨</div>
                <h4>Custom Software</h4>
                <p>Bespoke solutions tailored to your unique challenges and workflows.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">🔒</div>
                <h4>Security First</h4>
                <p>Strong security protocols built into every line of code.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">⚡</div>
                <h4>Performance</h4>
                <p>Fast, reliable systems built with uptime as a priority.</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="about-values-section scroll-reveal">
            <h3 className="values-title">Our Values</h3>
            <div className="values-list">
              <div className="value-item">
                <div className="value-number">01</div>
                <div className="value-content">
                  <h4>Relentless Polish</h4>
                  <p>Every pixel, every interaction, every line of code—crafted with obsessive attention to detail.</p>
                </div>
              </div>
              <div className="value-item">
                <div className="value-number">02</div>
                <div className="value-content">
                  <h4>Security Discipline</h4>
                  <p>We build systems you can trust with your most critical operations and sensitive data.</p>
                </div>
              </div>
              <div className="value-item">
                <div className="value-number">03</div>
                <div className="value-content">
                  <h4>Bold Innovation</h4>
                  <p>We don't follow trends—we set them. Our products push boundaries while staying practical.</p>
                </div>
              </div>
              <div className="value-item">
                <div className="value-number">04</div>
                <div className="value-content">
                  <h4>Client Success</h4>
                  <p>Your success is our success. We're partners in your growth, not just vendors.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          {/* <div className="about-stats-section scroll-reveal">
            <div className="stat-box">
              <div className="stat-icon">🎯</div>
              <div className="stat-value">100%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon">⚡</div>
              <div className="stat-value">99.9%</div>
              <div className="stat-label">Uptime Guarantee</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon">🛡️</div>
              <div className="stat-value">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon">🌏</div>
              <div className="stat-value">Global</div>
              <div className="stat-label">Client Reach</div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-container">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src={logoImage} alt="CloudBamboo Digital" className="footer-logo-image" />
                <div className="footer-logo-text" style={{color: '#FFFFFF'}}>
                  <div className="footer-brand-line">
                    <span className="brand-cloud footer-brand-text" style={{color: '#FFFFFF', textShadow: '0 0 10px rgba(255,255,255,0.8)'}}>Cloud</span>
                    <span className="brand-bamboo footer-brand-text" style={{color: '#FFFFFF', textShadow: '0 0 10px rgba(255,255,255,0.8)', display: 'inline-block'}}>Bamboo</span>
                  </div>
                  <div className="footer-digital-line">
                    <span className="brand-digital">Digital</span>
                  </div>
                </div>
              </div>
              <p className="footer-description">
                WatchPoint by CloudBamboo Digital LLP keeps your workforce sharp, compliant, and revenue-ready every single day.
              </p>
            </div>
            
            <div className="footer-column footer-legal">
              <h4>Legal</h4>
              <div className="footer-links">
                <Link 
                  to="/terms-and-conditions"
                  className="footer-link footer-link-enhanced"
                >
                  Terms & Conditions
                </Link>
                <Link 
                  to="/privacy-policy"
                  className="footer-link footer-link-enhanced"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/refund-policy"
                  className="footer-link footer-link-enhanced"
                >
                  Refund Policy
                </Link>
              </div>
            </div>
            
            <div className="footer-column footer-company">
              <h4>Company Info</h4>
              <div className="footer-company-details">
                <p><strong>CloudBamboo</strong></p>
                <p><strong>Digital LLP</strong></p>
                <p>Limited Liability Partnership</p>
                <p>Founded in 2025</p>
                <p>Registered Office:</p>
                <p>Kharamakha, Mazbat, Assam, India</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copyright">
              © 2025 CloudBamboo Digital LLP. All rights reserved.
            </div>
            <div className="footer-location">
              Guwahati, Assam, India
            </div>
          </div>
        </div>
      </footer>

      <JourneyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
      <PrivacyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
    </div>
  );
}

export default App;

