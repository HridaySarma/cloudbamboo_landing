import React, { useState, useEffect } from 'react';
import './App.css';
import { initializeAnimations, initializeCursor } from './utils/animations';
import logoImage from './assets/logo_modern.png';
import WatchPointPlans from './components/WatchPointPlans';

// Terms and Conditions Modal Component
const TermsModal = ({ isOpen, onClose }) => {
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
              <p className="subtitle">CloudBamboo Digital LLP - Service Agreement</p>
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
                By accessing and using CloudBamboo Digital LLP's services, including but not limited to our WatchPoint platform, 
                consulting services, and custom software solutions, you agree to be bound by these Terms and Conditions. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="legal-section">
              <h3>2. Services Description</h3>
              <h4>2.1 Software as a Service (SaaS)</h4>
              <p>
                CloudBamboo provides cloud-based software solutions including workforce management systems, 
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
              <h4>5.1 CloudBamboo Property</h4>
              <p>
                All software, documentation, and related materials provided by CloudBamboo remain our 
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
                To the maximum extent permitted by law, CloudBamboo's liability for any claims arising from 
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
              
              <h4>9.2 Termination by CloudBamboo</h4>
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
                <p>Email: hq@cloudbamboo.com</p>
                <p>Phone: +91 8399811340</p>
                <p>Address: Kharamakha, Mazbat, Assam, India</p>
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
              <p className="subtitle">How we collect, use, and protect your information</p>
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
                CloudBamboo Digital LLP ("we," "our," or "us") is committed to protecting your privacy. 
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
                <p>Email: hq@cloudbamboo.com</p>
                <p>Phone: +91 8399811340</p>
                <p>Address: Kharamakha, Mazbat, Assam, India</p>
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
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['features', 'watchpoint', 'philosophy', 'contact'];
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
  }, []);

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
    initializeCursor();
  }, []);

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
            <img src={logoImage} alt="CloudBamboo" className="brand-logo" />
            <span className="brand-name">CloudBamboo</span>
          </div>
          
          <nav className="navigation">
            <a href="#features" className={`nav-item ${activeSection === 'features' ? 'active' : ''}`}>Features</a>
            <a href="#watchpoint" className={`nav-item ${activeSection === 'watchpoint' ? 'active' : ''}`}>WatchPoint</a>
            <a href="#philosophy" className={`nav-item ${activeSection === 'philosophy' ? 'active' : ''}`}>Philosophy</a>
            <a href="#contact" className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
          </nav>
          
          <div className="header-actions">
            <button className="mobile-toggle" aria-label="Toggle menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero parallax" data-speed="0.5">
        <div className="container">
          <div className="hero-content scroll-reveal">
            <h1 className="hero-title">
              We Build Software That Powers Your Entire Operation
            </h1>
            <p className="hero-subtitle">
              CloudBamboo Digital architects robust, flexible, and scalable SaaS solutions
              that automate workflows and provide critical business insights.
            </p>
            <div className="hero-cta">
              <div className="interactive-cta">
                <div className="cta-orb-container">
                  <div className="cta-orb primary-orb" onClick={() => document.getElementById('watchpoint').scrollIntoView({ behavior: 'smooth' })}>
                    <div className="orb-content">
                      <div className="orb-icon">🚀</div>
                      <div className="orb-text">
                        <span className="orb-title">Launch Solutions</span>
                        <span className="orb-subtitle">Discover watchpoint</span>
                      </div>
                    </div>
                    <div className="orb-particles">
                      <div className="particle"></div>
                      <div className="particle"></div>
                      <div className="particle"></div>
                      <div className="particle"></div>
                    </div>
                    <div className="orb-glow"></div>
                  </div>

                  <div className="cta-orb secondary-orb" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                    <div className="orb-content">
                      <div className="orb-icon">💬</div>
                      <div className="orb-text">
                        <span className="orb-title">Get in Touch</span>
                        <span className="orb-subtitle">Contact our team</span>
                      </div>
                    </div>
                    <div className="orb-particles">
                      <div className="particle"></div>
                      <div className="particle"></div>
                      <div className="particle"></div>
                      <div className="particle"></div>
                    </div>
                    <div className="orb-glow"></div>
                  </div>
                </div>


              </div>
            </div>
          </div>
          <div className="hero-graphics">
            <div className="floating-cards">
              <div className="floating-card card-1 glow">
                <div className="card-icon">⚡</div>
                <h3 className="card-title">Lightning Fast</h3>
                <p className="card-description">Sub-second response times</p>
              </div>
              <div className="floating-card card-2 glow">
                <div className="card-icon">🔒</div>
                <h3 className="card-title">Enterprise Security</h3>
                <p className="card-description">Bank-grade encryption</p>
              </div>
              <div className="floating-card card-3 glow">
                <div className="card-icon">📊</div>
                <h3 className="card-title">Real-time Analytics</h3>
                <p className="card-description">Actionable insights</p>
              </div>
              <div className="floating-card card-4 glow">
                <div className="card-icon">🚀</div>
                <h3 className="card-title">Scalable</h3>
                <p className="card-description">Grows with your business</p>
              </div>
              <div className="floating-card card-5 glow">
                <div className="card-icon">🌐</div>
                <h3 className="card-title">Global Reach</h3>
                <p className="card-description">Multi-region deployment</p>
              </div>
              <div className="floating-card card-6 glow">
                <div className="card-icon">🤖</div>
                <h3 className="card-title">AI-Powered</h3>
                <p className="card-description">Smart automation</p>
              </div>
            </div>
            {/* Additional decorative elements */}
            <div className="hero-decoration">
              <svg className="hero-svg" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#00A8CC" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <circle cx="300" cy="300" r="250" fill="none" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="10 5" className="rotating-circle" />
                <circle cx="300" cy="300" r="200" fill="none" stroke="url(#gradient1)" strokeWidth="1" strokeDasharray="5 10" className="rotating-circle-reverse" />
                <circle cx="300" cy="300" r="150" fill="none" stroke="url(#gradient1)" strokeWidth="1" strokeDasharray="15 5" className="rotating-circle" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="features-bg-shapes">
          <div className="bg-shape"></div>
          <div className="bg-shape"></div>
          <div className="bg-shape"></div>
        </div>
        <div className="container">
          <div className="section-header scroll-reveal">
<h2 className="section-title">Our Solutions</h2>
            <p className="section-subtitle">
              We build powerful operational SaaS platforms designed for the unique challenges of service-based businesses.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <svg viewBox="0 0 100 100" className="icon-3d" style={{width: '100%', height: '100%'}}>
                  <defs>
                    <linearGradient id="securityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#3b82f6', stopOpacity:1}} />
                      <stop offset="50%" style={{stopColor:'#1d4ed8', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#1e40af', stopOpacity:1}} />
                    </linearGradient>
                    <filter id="securityShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                    </filter>
                  </defs>
                  {/* Shield outline */}
                  <path d="M50 15 L25 27 L25 55 Q25 72 50 82 Q75 72 75 55 L75 27 Z" 
                        fill="url(#securityGrad)" 
                        filter="url(#securityShadow)"
                        className="shield-base"/>
                  {/* Inner shield */}
                  <path d="M50 20 L30 30 L30 52 Q30 65 50 73 Q70 65 70 52 L70 30 Z" 
                        fill="rgba(255,255,255,0.2)" 
                        className="shield-inner"/>
                  {/* Lock symbol */}
                  <rect x="43" y="42" width="14" height="10" rx="2" fill="rgba(255,255,255,0.9)" className="lock-body"/>
                  <path d="M46 42 Q46 38 50 38 Q54 38 54 42" stroke="rgba(255,255,255,0.9)" strokeWidth="2" fill="none" className="lock-shackle"/>
                  <circle cx="50" cy="47" r="2" fill="url(#securityGrad)" className="lock-hole"/>
                </svg>
              </div>
              <h3 className="feature-title">Secure Infrastructure</h3>
              <p className="feature-description">
                Built with security best practices including encryption, secure hosting,
                and regular backups to keep your data protected.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <svg viewBox="0 0 100 100" className="icon-3d" style={{width: '100%', height: '100%'}}>
                  <defs>
                    <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#fbbf24', stopOpacity:1}} />
                      <stop offset="50%" style={{stopColor:'#f59e0b', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#d97706', stopOpacity:1}} />
                    </linearGradient>
                    <filter id="lightningShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                    </filter>
                  </defs>
                  {/* Lightning bolt */}
                  <path d="M55 15 L35 45 L45 45 L40 75 L65 40 L52 40 L55 15 Z" 
                        fill="url(#lightningGrad)" 
                        filter="url(#lightningShadow)"
                        className="lightning-bolt"/>
                  {/* Lightning highlight */}
                  <path d="M52 18 L38 42 L45 42 L42 65 L58 38 L52 38 L52 18 Z" 
                        fill="rgba(255,255,255,0.4)" 
                        className="lightning-highlight"/>
                  {/* Energy sparks */}
                  <circle cx="30" cy="25" r="2" fill="rgba(255,255,255,0.8)" className="spark-1"/>
                  <circle cx="70" cy="35" r="1.5" fill="rgba(255,255,255,0.8)" className="spark-2"/>
                  <circle cx="25" cy="65" r="1" fill="rgba(255,255,255,0.8)" className="spark-3"/>
                  <circle cx="75" cy="70" r="1.5" fill="rgba(255,255,255,0.8)" className="spark-4"/>
                </svg>
              </div>
              <h3 className="feature-title">Fast Performance</h3>
              <p className="feature-description">
                Optimized for speed with efficient code and smart caching
                to ensure your applications run smoothly.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <svg viewBox="0 0 100 100" className="icon-3d" style={{width: '100%', height: '100%'}}>
                  <defs>
                    <linearGradient id="integrationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#10b981', stopOpacity:1}} />
                      <stop offset="50%" style={{stopColor:'#059669', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#047857', stopOpacity:1}} />
                    </linearGradient>
                    <filter id="integrationShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                    </filter>
                  </defs>
                  {/* Central hub */}
                  <circle cx="50" cy="50" r="12" fill="url(#integrationGrad)" filter="url(#integrationShadow)" className="central-hub"/>
                  <circle cx="50" cy="50" r="8" fill="rgba(255,255,255,0.3)" className="hub-inner"/>
                  {/* Connection nodes */}
                  <circle cx="25" cy="25" r="6" fill="url(#integrationGrad)" filter="url(#integrationShadow)" className="node-1"/>
                  <circle cx="75" cy="25" r="6" fill="url(#integrationGrad)" filter="url(#integrationShadow)" className="node-2"/>
                  <circle cx="25" cy="75" r="6" fill="url(#integrationGrad)" filter="url(#integrationShadow)" className="node-3"/>
                  <circle cx="75" cy="75" r="6" fill="url(#integrationGrad)" filter="url(#integrationShadow)" className="node-4"/>
                  {/* Connecting lines */}
                  <path d="M31 31 Q40 40 42 42" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="none" className="connection-1"/>
                  <path d="M69 31 Q60 40 58 42" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="none" className="connection-2"/>
                  <path d="M31 69 Q40 60 42 58" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="none" className="connection-3"/>
                  <path d="M69 69 Q60 60 58 58" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="none" className="connection-4"/>
                  {/* Data flow indicators */}
                  <circle cx="36" cy="36" r="1.5" fill="rgba(255,255,255,0.9)" className="data-flow-1"/>
                  <circle cx="64" cy="36" r="1.5" fill="rgba(255,255,255,0.9)" className="data-flow-2"/>
                  <circle cx="36" cy="64" r="1.5" fill="rgba(255,255,255,0.9)" className="data-flow-3"/>
                  <circle cx="64" cy="64" r="1.5" fill="rgba(255,255,255,0.9)" className="data-flow-4"/>
                </svg>
              </div>
              <h3 className="feature-title">Easy Integration</h3>
              <p className="feature-description">
                Connect with your existing tools through APIs and webhooks.
                We can build custom integrations to fit your workflow.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <svg viewBox="0 0 100 100" className="icon-3d" style={{width: '100%', height: '100%'}}>
                  <defs>
                    <linearGradient id="scaleGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor:'#8b5cf6', stopOpacity:1}} />
                      <stop offset="50%" style={{stopColor:'#a855f7', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#c084fc', stopOpacity:1}} />
                    </linearGradient>
                    <filter id="scaleShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                    </filter>
                  </defs>
                  {/* Chart bars showing growth */}
                  <rect x="20" y="65" width="8" height="15" fill="url(#scaleGrad)" filter="url(#scaleShadow)" className="bar-1"/>
                  <rect x="32" y="55" width="8" height="25" fill="url(#scaleGrad)" filter="url(#scaleShadow)" className="bar-2"/>
                  <rect x="44" y="40" width="8" height="40" fill="url(#scaleGrad)" filter="url(#scaleShadow)" className="bar-3"/>
                  <rect x="56" y="25" width="8" height="55" fill="url(#scaleGrad)" filter="url(#scaleShadow)" className="bar-4"/>
                  <rect x="68" y="15" width="8" height="65" fill="url(#scaleGrad)" filter="url(#scaleShadow)" className="bar-5"/>
                  {/* Growth arrow */}
                  <path d="M25 60 Q40 45 55 30 Q65 20 75 15" stroke="rgba(255,255,255,0.9)" strokeWidth="3" fill="none" className="growth-line"/>
                  <path d="M75 15 L70 12 L70 18 L75 15 L78 12 L78 18 Z" fill="rgba(255,255,255,0.9)" className="arrow-head"/>
                  {/* Scale indicators */}
                  <circle cx="30" cy="50" r="2" fill="rgba(255,255,255,0.8)" className="scale-point-1"/>
                  <circle cx="48" cy="35" r="2" fill="rgba(255,255,255,0.8)" className="scale-point-2"/>
                  <circle cx="65" cy="20" r="2" fill="rgba(255,255,255,0.8)" className="scale-point-3"/>
                </svg>
              </div>
              <h3 className="feature-title">Scalable Solutions</h3>
              <p className="feature-description">
                Built to grow with your business using modern frameworks
                that can handle increased usage as you expand.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <svg viewBox="0 0 100 100" className="icon-3d" style={{width: '100%', height: '100%'}}>
                  <defs>
                    <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#06b6d4', stopOpacity:1}} />
                      <stop offset="50%" style={{stopColor:'#0891b2', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#0e7490', stopOpacity:1}} />
                    </linearGradient>
                    <filter id="aiShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                    </filter>
                  </defs>
                  {/* Brain/AI core */}
                  <circle cx="50" cy="45" r="20" fill="url(#aiGrad)" filter="url(#aiShadow)" className="ai-brain"/>
                  <circle cx="50" cy="45" r="15" fill="rgba(255,255,255,0.2)" className="brain-inner"/>
                  {/* Neural network connections */}
                  <path d="M35 35 Q45 40 50 45 Q55 40 65 35" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" className="neural-1"/>
                  <path d="M35 55 Q45 50 50 45 Q55 50 65 55" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" className="neural-2"/>
                  <path d="M40 30 Q45 35 50 40" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" className="neural-3"/>
                  <path d="M60 30 Q55 35 50 40" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" className="neural-4"/>
                  {/* AI nodes */}
                  <circle cx="35" cy="35" r="3" fill="rgba(255,255,255,0.8)" className="ai-node-1"/>
                  <circle cx="65" cy="35" r="3" fill="rgba(255,255,255,0.8)" className="ai-node-2"/>
                  <circle cx="35" cy="55" r="3" fill="rgba(255,255,255,0.8)" className="ai-node-3"/>
                  <circle cx="65" cy="55" r="3" fill="rgba(255,255,255,0.8)" className="ai-node-4"/>
                  {/* Data streams */}
                  <circle cx="25" cy="25" r="2" fill="rgba(255,255,255,0.9)" className="data-stream-1"/>
                  <circle cx="75" cy="25" r="2" fill="rgba(255,255,255,0.9)" className="data-stream-2"/>
                  <circle cx="25" cy="65" r="2" fill="rgba(255,255,255,0.9)" className="data-stream-3"/>
                  <circle cx="75" cy="65" r="2" fill="rgba(255,255,255,0.9)" className="data-stream-4"/>
                  {/* Central processing indicator */}
                  <circle cx="50" cy="45" r="4" fill="rgba(255,255,255,0.9)" className="ai-core"/>
                </svg>
              </div>
              <h3 className="feature-title">Smart Analytics</h3>
              <p className="feature-description">
                Get valuable insights from your data with analytics and reporting
                features that help you make informed business decisions.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <svg viewBox="0 0 100 100" className="icon-3d" style={{width: '100%', height: '100%'}}>
                  <defs>
                    <linearGradient id="globalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#22c55e', stopOpacity:1}} />
                      <stop offset="50%" style={{stopColor:'#16a34a', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#15803d', stopOpacity:1}} />
                    </linearGradient>
                    <filter id="globalShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                    </filter>
                  </defs>
                  {/* Globe base */}
                  <circle cx="50" cy="50" r="25" fill="url(#globalGrad)" filter="url(#globalShadow)" className="globe-base"/>
                  {/* Continental shapes */}
                  <path d="M35 35 Q45 30 55 35 Q60 40 55 45 Q45 50 35 45 Z" fill="rgba(255,255,255,0.3)" className="continent-1"/>
                  <path d="M45 55 Q55 50 65 55 Q70 60 65 65 Q55 70 45 65 Z" fill="rgba(255,255,255,0.3)" className="continent-2"/>
                  <ellipse cx="30" cy="60" rx="8" ry="5" fill="rgba(255,255,255,0.3)" className="continent-3"/>
                  {/* Network points */}
                  <circle cx="40" cy="40" r="2" fill="rgba(255,255,255,0.9)" className="network-point-1"/>
                  <circle cx="60" cy="35" r="2" fill="rgba(255,255,255,0.9)" className="network-point-2"/>
                  <circle cx="45" cy="60" r="2" fill="rgba(255,255,255,0.9)" className="network-point-3"/>
                  <circle cx="65" cy="55" r="2" fill="rgba(255,255,255,0.9)" className="network-point-4"/>
                  <circle cx="30" cy="55" r="2" fill="rgba(255,255,255,0.9)" className="network-point-5"/>
                  {/* Connection lines */}
                  <path d="M40 40 Q50 35 60 35" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" className="global-connection-1"/>
                  <path d="M45 60 Q55 55 65 55" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" className="global-connection-2"/>
                  <path d="M30 55 Q37 50 40 40" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" className="global-connection-3"/>
                  {/* Globe highlight */}
                  <ellipse cx="42" cy="42" rx="8" ry="6" fill="rgba(255,255,255,0.2)" className="globe-highlight"/>
                </svg>
              </div>
              <h3 className="feature-title">Reliable Hosting</h3>
              <p className="feature-description">
                Hosted on reliable cloud infrastructure with good uptime
                and monitoring to keep your applications running smoothly.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <svg viewBox="0 0 100 100" className="icon-3d" style={{width: '100%', height: '100%'}}>
                  <defs>
                    <linearGradient id="privacyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#dc2626', stopOpacity:1}} />
                      <stop offset="50%" style={{stopColor:'#b91c1c', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#991b1b', stopOpacity:1}} />
                    </linearGradient>
                    <filter id="privacyShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                    </filter>
                  </defs>
                  {/* Lock body */}
                  <rect x="35" y="45" width="30" height="35" rx="4" fill="url(#privacyGrad)" filter="url(#privacyShadow)" className="lock-body"/>
                  <rect x="38" y="48" width="24" height="29" rx="2" fill="rgba(255,255,255,0.2)" className="lock-inner"/>
                  {/* Lock shackle */}
                  <path d="M40 45 Q40 30 50 30 Q60 30 60 45" stroke="url(#privacyGrad)" strokeWidth="4" fill="none" filter="url(#privacyShadow)" className="lock-shackle"/>
                  <path d="M42 45 Q42 32 50 32 Q58 32 58 45" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" className="shackle-highlight"/>
                  {/* Keyhole */}
                  <circle cx="50" cy="60" r="4" fill="rgba(255,255,255,0.9)" className="keyhole-circle"/>
                  <path d="M50 64 L48 72 L52 72 Z" fill="rgba(255,255,255,0.9)" className="keyhole-slot"/>
                  {/* Security indicators */}
                  <circle cx="25" cy="30" r="2" fill="rgba(255,255,255,0.8)" className="security-dot-1"/>
                  <circle cx="75" cy="30" r="2" fill="rgba(255,255,255,0.8)" className="security-dot-2"/>
                  <circle cx="20" cy="70" r="1.5" fill="rgba(255,255,255,0.8)" className="security-dot-3"/>
                  <circle cx="80" cy="70" r="1.5" fill="rgba(255,255,255,0.8)" className="security-dot-4"/>
                  {/* Encryption waves */}
                  <path d="M15 50 Q25 45 35 50" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" className="encryption-wave-1"/>
                  <path d="M65 50 Q75 45 85 50" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" className="encryption-wave-2"/>
                </svg>
              </div>
              <h3 className="feature-title">Data Privacy</h3>
              <p className="feature-description">
                We follow privacy best practices with secure data handling,
                regular backups, and proper access controls.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <svg viewBox="0 0 100 100" className="icon-3d" style={{width: '100%', height: '100%'}}>
                  <defs>
                    <linearGradient id="mobileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#6366f1', stopOpacity:1}} />
                      <stop offset="50%" style={{stopColor:'#4f46e5', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#4338ca', stopOpacity:1}} />
                    </linearGradient>
                    <filter id="mobileShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                    </filter>
                  </defs>
                  {/* Main phone */}
                  <rect x="35" y="15" width="30" height="55" rx="6" fill="url(#mobileGrad)" filter="url(#mobileShadow)" className="phone-body"/>
                  <rect x="38" y="20" width="24" height="40" rx="2" fill="rgba(255,255,255,0.2)" className="phone-screen"/>
                  {/* Screen content */}
                  <rect x="40" y="22" width="20" height="3" rx="1" fill="rgba(255,255,255,0.8)" className="screen-header"/>
                  <rect x="40" y="27" width="15" height="2" rx="1" fill="rgba(255,255,255,0.6)" className="screen-line-1"/>
                  <rect x="40" y="31" width="18" height="2" rx="1" fill="rgba(255,255,255,0.6)" className="screen-line-2"/>
                  <rect x="40" y="35" width="12" height="2" rx="1" fill="rgba(255,255,255,0.6)" className="screen-line-3"/>
                  {/* Apps icons */}
                  <rect x="42" y="42" width="4" height="4" rx="1" fill="rgba(255,255,255,0.8)" className="app-1"/>
                  <rect x="48" y="42" width="4" height="4" rx="1" fill="rgba(255,255,255,0.8)" className="app-2"/>
                  <rect x="54" y="42" width="4" height="4" rx="1" fill="rgba(255,255,255,0.8)" className="app-3"/>
                  <rect x="42" y="48" width="4" height="4" rx="1" fill="rgba(255,255,255,0.8)" className="app-4"/>
                  <rect x="48" y="48" width="4" height="4" rx="1" fill="rgba(255,255,255,0.8)" className="app-5"/>
                  <rect x="54" y="48" width="4" height="4" rx="1" fill="rgba(255,255,255,0.8)" className="app-6"/>
                  {/* Home button */}
                  <circle cx="50" cy="65" r="2" fill="rgba(255,255,255,0.8)" className="home-button"/>
                  {/* Tablet companion */}
                  <rect x="15" y="35" width="18" height="25" rx="3" fill="url(#mobileGrad)" filter="url(#mobileShadow)" className="tablet-body" opacity="0.7"/>
                  <rect x="17" y="38" width="14" height="19" rx="1" fill="rgba(255,255,255,0.2)" className="tablet-screen"/>
                  {/* Responsive indicators */}
                  <circle cx="75" cy="25" r="2" fill="rgba(255,255,255,0.8)" className="responsive-dot-1"/>
                  <circle cx="80" cy="35" r="1.5" fill="rgba(255,255,255,0.8)" className="responsive-dot-2"/>
                  <circle cx="85" cy="45" r="1" fill="rgba(255,255,255,0.8)" className="responsive-dot-3"/>
                </svg>
              </div>
              <h3 className="feature-title">Mobile Ready</h3>
              <p className="feature-description">
                Responsive web design that works great on mobile devices.
                Native apps available when needed for your specific requirements.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <svg viewBox="0 0 100 100" className="icon-3d" style={{width: '100%', height: '100%'}}>
                  <defs>
                    <linearGradient id="customGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#ec4899', stopOpacity:1}} />
                      <stop offset="50%" style={{stopColor:'#db2777', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#be185d', stopOpacity:1}} />
                    </linearGradient>
                    <filter id="customShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                    </filter>
                  </defs>
                  {/* Target rings */}
                  <circle cx="50" cy="50" r="25" fill="none" stroke="url(#customGrad)" strokeWidth="3" filter="url(#customShadow)" className="target-ring-1"/>
                  <circle cx="50" cy="50" r="18" fill="none" stroke="url(#customGrad)" strokeWidth="2.5" className="target-ring-2"/>
                  <circle cx="50" cy="50" r="12" fill="none" stroke="url(#customGrad)" strokeWidth="2" className="target-ring-3"/>
                  <circle cx="50" cy="50" r="6" fill="url(#customGrad)" filter="url(#customShadow)" className="target-center"/>
                  {/* Crosshairs */}
                  <path d="M50 25 L50 35" stroke="rgba(255,255,255,0.8)" strokeWidth="2" className="crosshair-top"/>
                  <path d="M50 65 L50 75" stroke="rgba(255,255,255,0.8)" strokeWidth="2" className="crosshair-bottom"/>
                  <path d="M25 50 L35 50" stroke="rgba(255,255,255,0.8)" strokeWidth="2" className="crosshair-left"/>
                  <path d="M65 50 L75 50" stroke="rgba(255,255,255,0.8)" strokeWidth="2" className="crosshair-right"/>
                  {/* Precision indicators */}
                  <circle cx="50" cy="50" r="3" fill="rgba(255,255,255,0.9)" className="bullseye"/>
                  {/* Custom solution markers */}
                  <path d="M35 35 L40 30 L45 35 L40 40 Z" fill="rgba(255,255,255,0.7)" className="custom-marker-1"/>
                  <path d="M65 35 L60 30 L55 35 L60 40 Z" fill="rgba(255,255,255,0.7)" className="custom-marker-2"/>
                  <path d="M35 65 L40 60 L45 65 L40 70 Z" fill="rgba(255,255,255,0.7)" className="custom-marker-3"/>
                  <path d="M65 65 L60 60 L55 65 L60 70 Z" fill="rgba(255,255,255,0.7)" className="custom-marker-4"/>
                  {/* Targeting beam */}
                  <circle cx="20" cy="20" r="1.5" fill="rgba(255,255,255,0.8)" className="targeting-dot-1"/>
                  <circle cx="80" cy="20" r="1.5" fill="rgba(255,255,255,0.8)" className="targeting-dot-2"/>
                  <circle cx="20" cy="80" r="1.5" fill="rgba(255,255,255,0.8)" className="targeting-dot-3"/>
                  <circle cx="80" cy="80" r="1.5" fill="rgba(255,255,255,0.8)" className="targeting-dot-4"/>
                </svg>
              </div>
              <h3 className="feature-title">Custom Development</h3>
              <p className="feature-description">
                We build solutions tailored to your specific business needs
                and can customize features to match your workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WatchPoint Section */}
      <WatchPointPlans />

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
                    <h4>CloudBamboo AI Assistant</h4>
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

      {/* Philosophy Section - Enhanced */}
      <section id="philosophy" className="philosophy">
        <div className="philosophy-particles"></div>
        <div className="container">
          <div className="section-header scroll-reveal">
            <h2 className="section-title">Our Approach: Strength, Growth, and Flexibility</h2>
            <p className="section-subtitle">
              We don't just build software - we build the foundation for your business success.
            </p>
          </div>
          <div className="philosophy-grid">
            <div className="philosophy-card scroll-reveal">
              <div className="philosophy-icon-container">
                <div className="philosophy-icon-bg"></div>
                <div className="philosophy-icon">
                  <svg viewBox="0 0 100 100" className="icon-3d">
                    <defs>
                      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#4f46e5', stopOpacity:1}} />
                        <stop offset="50%" style={{stopColor:'#7c3aed', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:'#2563eb', stopOpacity:1}} />
                      </linearGradient>
                      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                      </filter>
                    </defs>
                    {/* Shield base */}
                    <path d="M50 10 L20 25 L20 55 Q20 75 50 85 Q80 75 80 55 L80 25 Z" 
                          fill="url(#shieldGrad)" 
                          filter="url(#shadow)"
                          className="shield-base"/>
                    {/* Shield highlight */}
                    <path d="M50 15 L25 27 L25 52 Q25 68 50 76 Q75 68 75 52 L75 27 Z" 
                          fill="rgba(255,255,255,0.2)"
                          className="shield-highlight"/>
                    {/* Center emblem */}
                    <circle cx="50" cy="45" r="8" fill="rgba(255,255,255,0.8)" className="emblem"/>
                    <circle cx="50" cy="45" r="4" fill="url(#shieldGrad)" className="emblem-inner"/>
                  </svg>
                </div>
              </div>
              <h3 className="philosophy-title">Strong Foundations</h3>
              <p className="philosophy-description">
                We build robust, reliable, and secure software. Our platforms are engineered
                to be the dependable backbone of your operations, with 99.99% uptime guaranteed.
              </p>
            </div>
            <div className="philosophy-card scroll-reveal">
              <div className="philosophy-icon-container">
                <div className="philosophy-icon-bg"></div>
                <div className="philosophy-icon">
                  <svg viewBox="0 0 100 100" className="icon-3d">
                    <defs>
                      <linearGradient id="growthGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor:'#059669', stopOpacity:1}} />
                        <stop offset="50%" style={{stopColor:'#10b981', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:'#34d399', stopOpacity:1}} />
                      </linearGradient>
                      <filter id="growthShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                      </filter>
                    </defs>
                    {/* Chart bars */}
                    <rect x="15" y="65" width="8" height="20" fill="url(#growthGrad)" filter="url(#growthShadow)" className="bar-1"/>
                    <rect x="28" y="55" width="8" height="30" fill="url(#growthGrad)" filter="url(#growthShadow)" className="bar-2"/>
                    <rect x="41" y="45" width="8" height="40" fill="url(#growthGrad)" filter="url(#growthShadow)" className="bar-3"/>
                    <rect x="54" y="30" width="8" height="55" fill="url(#growthGrad)" filter="url(#growthShadow)" className="bar-4"/>
                    {/* Growth arrow */}
                    <path d="M65 60 L85 25 L80 30 L85 20 L90 25 L85 25" 
                          stroke="url(#growthGrad)" 
                          strokeWidth="3" 
                          fill="url(#growthGrad)" 
                          filter="url(#growthShadow)"
                          className="growth-arrow"/>
                    {/* Arrow head highlight */}
                    <path d="M85 20 L90 25 L85 25" 
                          fill="rgba(255,255,255,0.3)" 
                          className="arrow-highlight"/>
                  </svg>
                </div>
              </div>
              <h3 className="philosophy-title">Designed for Growth</h3>
              <p className="philosophy-description">
                Our solutions are designed to scale with your business. As you grow,
                our software grows with you, effortlessly handling increased demand.
              </p>
            </div>
            <div className="philosophy-card scroll-reveal">
              <div className="philosophy-icon-container">
                <div className="philosophy-icon-bg"></div>
                <div className="philosophy-icon">
                  <svg viewBox="0 0 100 100" className="icon-3d">
                    <defs>
                      <linearGradient id="flexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#dc2626', stopOpacity:1}} />
                        <stop offset="50%" style={{stopColor:'#f59e0b', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:'#eab308', stopOpacity:1}} />
                      </linearGradient>
                      <filter id="flexShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                      </filter>
                    </defs>
                    {/* Main gear */}
                    <g filter="url(#flexShadow)">
                      <circle cx="40" cy="45" r="18" fill="url(#flexGrad)" className="gear-main"/>
                      <circle cx="40" cy="45" r="12" fill="rgba(255,255,255,0.2)" className="gear-inner"/>
                      <circle cx="40" cy="45" r="6" fill="url(#flexGrad)" className="gear-center"/>
                      {/* Gear teeth */}
                      <rect x="38" y="25" width="4" height="6" fill="url(#flexGrad)"/>
                      <rect x="38" y="57" width="4" height="6" fill="url(#flexGrad)"/>
                      <rect x="22" y="43" width="6" height="4" fill="url(#flexGrad)"/>
                      <rect x="54" y="43" width="6" height="4" fill="url(#flexGrad)"/>
                    </g>
                    {/* Secondary gear */}
                    <g filter="url(#flexShadow)">
                      <circle cx="65" cy="30" r="12" fill="url(#flexGrad)" className="gear-secondary"/>
                      <circle cx="65" cy="30" r="8" fill="rgba(255,255,255,0.2)" className="gear-inner-2"/>
                      <circle cx="65" cy="30" r="4" fill="url(#flexGrad)" className="gear-center-2"/>
                      {/* Small gear teeth */}
                      <rect x="63" y="16" width="4" height="4" fill="url(#flexGrad)"/>
                      <rect x="63" y="40" width="4" height="4" fill="url(#flexGrad)"/>
                      <rect x="51" y="28" width="4" height="4" fill="url(#flexGrad)"/>
                      <rect x="75" y="28" width="4" height="4" fill="url(#flexGrad)"/>
                    </g>
                    {/* Connection nodes */}
                    <circle cx="25" cy="65" r="4" fill="url(#flexGrad)" filter="url(#flexShadow)" className="node-1"/>
                    <circle cx="75" cy="60" r="4" fill="url(#flexGrad)" filter="url(#flexShadow)" className="node-2"/>
                    {/* Connection lines */}
                    <path d="M40 60 Q32 62 25 65" stroke="url(#flexGrad)" strokeWidth="2" fill="none" className="connection-1"/>
                    <path d="M65 42 Q70 51 75 60" stroke="url(#flexGrad)" strokeWidth="2" fill="none" className="connection-2"/>
                  </svg>
                </div>
              </div>
              <h3 className="philosophy-title">Ultimate Flexibility</h3>
              <p className="philosophy-description">
                We understand that no two businesses are the same. Our systems are built
                to be adaptable to your unique workflows and requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Enhanced */}
      <section id="contact" className="contact">
        <div className="contact-3d-elements">
          <div className="shape-3d">
            <div className="shape-face"></div>
            <div className="shape-face"></div>
            <div className="shape-face"></div>
            <div className="shape-face"></div>
            <div className="shape-face"></div>
            <div className="shape-face"></div>
          </div>
          <div className="shape-3d">
            <div className="shape-face"></div>
            <div className="shape-face"></div>
            <div className="shape-face"></div>
            <div className="shape-face"></div>
            <div className="shape-face"></div>
            <div className="shape-face"></div>
          </div>
          <div className="shape-3d">
            <div className="shape-face"></div>
            <div className="shape-face"></div>
            <div className="shape-face"></div>
            <div className="shape-face"></div>
            <div className="shape-face"></div>
            <div className="shape-face"></div>
          </div>
        </div>
        <div className="contact-creative-text">THINK OUTSIDE THE BOX</div>
        <div className="container">
          <div className="contact-container">
            <div className="contact-info scroll-reveal">
              <h2>Have a Project in Mind?</h2>
              <p>
                Whether you're interested in WatchPoint or have a unique challenge that requires
                a custom software solution, our team is ready to talk.
              </p>
              <p>
                We're here to help you transform your business operations with cutting-edge
                software solutions tailored to your specific needs.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>hq@cloudbamboo.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span>+91 8399811340</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>Kharamakha, Mazbat, Assam, India</span>
                </div>
              </div>
            </div>
            <div className="contact-form scroll-reveal">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input type="text" id="company" placeholder="Company Name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="your@email.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="interest">I'm interested in...</label>
                  <select id="interest" defaultValue="demo">
                    <option value="demo">A Demo of WatchPoint</option>
                    <option value="custom">Custom Software Development</option>
                    <option value="consulting">Consulting Services</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    placeholder="Tell us about your project or questions..."
                    rows="4"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary form-submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-container">
            <div className="footer-brand">
                          <div className="footer-logo">
              <img src={logoImage} alt="CloudBamboo" className="footer-logo-image" />
              <span className="footer-logo-text">CloudBamboo</span>
            </div>
              <p className="footer-description">
                Building powerful SaaS solutions that transform how service-based
                businesses operate and grow.
              </p>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <div className="footer-links">
                <button 
                  className="footer-link"
                  onClick={() => setIsTermsModalOpen(true)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'underline' }}
                >
                  Terms & Conditions
                </button>
                <button 
                  className="footer-link"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'underline' }}
                >
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copyright">
              © 2025 CloudBamboo Digital LLP. All rights reserved.
            </div>
            <div className="footer-social">
              <a href="#" className="social-link">f</a>
              <a href="#" className="social-link">t</a>
              <a href="#" className="social-link">in</a>
              <a href="#" className="social-link">ig</a>
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
