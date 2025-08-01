import React, { useState, useEffect } from 'react';
import './App.css';
import { initializeAnimations, initializeCursor } from './utils/animations';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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
      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav">
          <div className="logo">CloudBamboo</div>
          <nav className="nav-links">
            <a href="#features" className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}>Features</a>
            <a href="#watchpoint" className={`nav-link ${activeSection === 'watchpoint' ? 'active' : ''}`}>WatchPoint</a>
            <a href="#philosophy" className={`nav-link ${activeSection === 'philosophy' ? 'active' : ''}`}>Philosophy</a>
            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
          </nav>
          <div className="nav-cta">
            <button className="btn btn-glass">Get Started</button>
          </div>
          <button className="mobile-menu-btn" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
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
              <button className="btn btn-primary">Explore Our Solutions</button>
              <button className="btn btn-secondary">Watch Demo</button>
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
            <h2 className="section-title">Enterprise-Grade Solutions</h2>
            <p className="section-subtitle">
              We build powerful operational SaaS platforms designed for the unique challenges of service-based businesses.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <span className="icon-content">🛡️</span>
              </div>
              <h3 className="feature-title">Secure Infrastructure</h3>
              <p className="feature-description">
                Enterprise-grade security with end-to-end encryption, SOC 2 compliance,
                and advanced threat protection to keep your data safe.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <span className="icon-content">⚡</span>
              </div>
              <h3 className="feature-title">Lightning Performance</h3>
              <p className="feature-description">
                Optimized for speed with global CDN, intelligent caching,
                and sub-second response times across all operations.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <span className="icon-content">🔄</span>
              </div>
              <h3 className="feature-title">Seamless Integration</h3>
              <p className="feature-description">
                Connect with your existing tools through our extensive API library,
                webhooks, and pre-built integrations.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <span className="icon-content">📈</span>
              </div>
              <h3 className="feature-title">Scalable Architecture</h3>
              <p className="feature-description">
                Built to grow with your business, handling millions of transactions
                without breaking a sweat.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <span className="icon-content">🤖</span>
              </div>
              <h3 className="feature-title">AI-Powered Insights</h3>
              <p className="feature-description">
                Leverage machine learning to predict trends, optimize operations,
                and make data-driven decisions.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <span className="icon-content">🌍</span>
              </div>
              <h3 className="feature-title">Global Reach</h3>
              <p className="feature-description">
                Multi-region deployment with automatic failover and 99.99% uptime SLA
                for uninterrupted service.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <span className="icon-content">🔐</span>
              </div>
              <h3 className="feature-title">Data Privacy</h3>
              <p className="feature-description">
                GDPR compliant with advanced data encryption, secure backups,
                and granular access controls.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <span className="icon-content">📱</span>
              </div>
              <h3 className="feature-title">Mobile First</h3>
              <p className="feature-description">
                Responsive design with native mobile apps for iOS and Android,
                ensuring productivity on the go.
              </p>
            </div>
            <div className="feature-card scroll-reveal stagger-item">
              <div className="feature-icon">
                <span className="icon-content">🎯</span>
              </div>
              <h3 className="feature-title">Custom Solutions</h3>
              <p className="feature-description">
                Tailored to your specific industry needs with flexible modules
                and custom development options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WatchPoint Section */}
      <section id="watchpoint" className="watchpoint">
        <div className="watchpoint-floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
        <div className="watchpoint-container container">
          <div className="section-header scroll-reveal">
            <h2 className="section-title">
              WatchPoint: The All-in-One Command Center for Your Mobile Workforce
            </h2>
            <p className="section-subtitle">
              A powerful Workforce Management System designed to streamline the operations of a service-based business. 
              WatchPoint provides a centralized platform for everything from staff onboarding and real-time attendance 
              to automated payroll and invoicing.
            </p>
          </div>
          
          <div className="dashboard-showcase scroll-reveal">
            <div className="dashboard-preview">
              <div className="dashboard-mockup">
                <div className="mockup-header">
                  <div className="mockup-dot"></div>
                  <div className="mockup-dot"></div>
                  <div className="mockup-dot"></div>
                  <div className="mockup-url-bar">
                    <span className="url-text">greywolf.watchpoint.in</span>
                  </div>
                </div>
                <div className="mockup-iframe-container">
                  <iframe
                    src="https://greywolf.watchpoint.in"
                    className="mockup-iframe"
                    title="WatchPoint Demo"
                    frameBorder="0"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="dashboard-features">
              <div className="dashboard-feature">
                <div className="feature-check">✓</div>
                <div className="feature-content">
                  <h4>Real-time Monitoring</h4>
                  <p>Track your entire workforce in real-time with live location updates and instant notifications.</p>
                </div>
              </div>
              <div className="dashboard-feature">
                <div className="feature-check">✓</div>
                <div className="feature-content">
                  <h4>Automated Workflows</h4>
                  <p>From scheduling to payroll, automate repetitive tasks and focus on growing your business.</p>
                </div>
              </div>
              <div className="dashboard-feature">
                <div className="feature-check">✓</div>
                <div className="feature-content">
                  <h4>Comprehensive Analytics</h4>
                  <p>Get deep insights into your operations with customizable dashboards and detailed reports.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="workflow-section scroll-reveal">
            <h3 className="workflow-title">The Power of a Single 'Link'</h3>
            <div className="workflow-visual">
              <div className="workflow-step">
                <div className="workflow-icon">👤</div>
                <span className="workflow-label">Staff</span>
              </div>
              <span className="workflow-arrow">→</span>
              <div className="workflow-step">
                <div className="workflow-icon">🏢</div>
                <span className="workflow-label">Client</span>
              </div>
              <span className="workflow-arrow">→</span>
              <div className="workflow-step">
                <div className="workflow-icon">📅</div>
                <span className="workflow-label">Schedule</span>
              </div>
              <span className="workflow-arrow">→</span>
              <div className="workflow-step">
                <div className="workflow-icon">🔗</div>
                <span className="workflow-label">Link</span>
              </div>
            </div>
            <div className="workflow-visual">
              <div className="workflow-step">
                <div className="workflow-icon">💰</div>
                <span className="workflow-label">Payroll</span>
              </div>
              <div className="workflow-step">
                <div className="workflow-icon">🧾</div>
                <span className="workflow-label">Invoice</span>
              </div>
              <div className="workflow-step">
                <div className="workflow-icon">📍</div>
                <span className="workflow-label">Location</span>
              </div>
            </div>
          </div>
          
          <div className="modules-showcase scroll-reveal">
            <div className="module-card">
              <div className="module-icon">🎯</div>
              <h4 className="module-title">Operations Hub</h4>
              <p className="module-description">
                Manage Staff, Clients, and Assignments seamlessly in one unified platform.
              </p>
            </div>
            <div className="module-card">
              <div className="module-icon">⏰</div>
              <h4 className="module-title">Real-Time Accountability</h4>
              <p className="module-description">
                Track attendance with QR codes and monitor live staff locations instantly.
              </p>
            </div>
            <div className="module-card">
              <div className="module-icon">💳</div>
              <h4 className="module-title">Automated Financials</h4>
              <p className="module-description">
                Generate accurate payroll and invoices automatically from operational data.
              </p>
            </div>
            <div className="module-card">
              <div className="module-icon">📊</div>
              <h4 className="module-title">Actionable Insights</h4>
              <p className="module-description">
                Get a high-level overview with a comprehensive analytics dashboard.
              </p>
            </div>
          </div>
          
          <div className="watchpoint-cta scroll-reveal">
            <button className="btn btn-primary">Book a Live Demo of WatchPoint</button>
            <button className="btn btn-glass">Download Brochure</button>
          </div>
        </div>
      </section>

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
                <div className="philosophy-icon">💪</div>
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
                <div className="philosophy-icon">📈</div>
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
                <div className="philosophy-icon">🔄</div>
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
                  <span>hello@cloudbamboo.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span>+91 98765 43210</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>Guwahati, Assam, India</span>
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
              <div className="footer-logo">CloudBamboo</div>
              <p className="footer-description">
                Building powerful SaaS solutions that transform how service-based 
                businesses operate and grow.
              </p>
            </div>
            <div className="footer-column">
              <h4>Product</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">WatchPoint</a>
                <a href="#" className="footer-link">Features</a>
                <a href="#" className="footer-link">Pricing</a>
                <a href="#" className="footer-link">API Docs</a>
              </div>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">About Us</a>
                <a href="#" className="footer-link">Careers</a>
                <a href="#" className="footer-link">Blog</a>
                <a href="#" className="footer-link">Press</a>
              </div>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">Help Center</a>
                <a href="#" className="footer-link">Contact</a>
                <a href="#" className="footer-link">Status</a>
                <a href="#" className="footer-link">Terms</a>
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
    </div>
  );
}

export default App;
