import React, { useState } from 'react';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const contactMethods = [
    { icon: '📧', label: 'Email', value: 'hq@cloudbamboo.in', link: 'mailto:hq@cloudbamboo.in' },
    { icon: '📱', label: 'Phone', value: '+91 XXX XXX XXXX', link: 'tel:+91XXXXXXXXXX' },
    { icon: '💬', label: 'Live Chat', value: 'Available 24/7', link: '#' }
  ];

  return (
    <section className="contact-section-modern">
      {/* Animated Background */}
      <div className="contact-bg">
        <div className="contact-orb contact-orb-1"></div>
        <div className="contact-orb contact-orb-2"></div>
        <div className="contact-grid-pattern"></div>
      </div>

      <div className="contact-wrapper">
        {/* Header */}
        <div className="contact-header">
          <div className="contact-badge">
            <span className="badge-pulse-dot"></span>
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="contact-title">
            Ready to Build <span className="title-gradient">Something Amazing?</span>
          </h2>
          <p className="contact-subtitle">
            Whether you're interested in WatchPoint or need a custom solution, 
            our team is ready to turn your vision into reality.
          </p>
        </div>

        <div className="contact-content-grid">
          {/* Left Side - Contact Info */}
          <div className="contact-info-panel">
            <div className="info-card">
              <h3 className="info-title">Get in Touch</h3>
              <p className="info-desc">
                Choose your preferred way to reach us. We typically respond within 24 hours.
              </p>

              <div className="contact-methods">
                {contactMethods.map((method, index) => (
                  <a 
                    key={index}
                    href={method.link}
                    className="contact-method-card"
                  >
                    <div className="method-icon">{method.icon}</div>
                    <div className="method-content">
                      <span className="method-label">{method.label}</span>
                      <span className="method-value">{method.value}</span>
                    </div>
                    <svg className="method-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                ))}
              </div>

              <div className="info-features">
                <div className="info-feature-item">
                  <span className="feature-check">✓</span>
                  <span>Free consultation</span>
                </div>
                <div className="info-feature-item">
                  <span className="feature-check">✓</span>
                  <span>No commitment required</span>
                </div>
                <div className="info-feature-item">
                  <span className="feature-check">✓</span>
                  <span>Quick response time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="contact-form-panel">
            <form className="modern-contact-form" onSubmit={handleSubmit}>
              <div className={`modern-form-group ${focusedField === 'name' ? 'focused' : ''} ${formData.name ? 'filled' : ''}`}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <div className="input-glow"></div>
              </div>

              <div className={`modern-form-group ${focusedField === 'email' ? 'focused' : ''} ${formData.email ? 'filled' : ''}`}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <div className="input-glow"></div>
              </div>

              <div className={`modern-form-group ${focusedField === 'message' ? 'focused' : ''} ${formData.message ? 'filled' : ''}`}>
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows="4"
                  placeholder="Tell us about your project..."
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
  );
};

export default ContactSection;