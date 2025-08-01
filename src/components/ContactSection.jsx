import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
    interest: 'demo'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      company: '',
      email: '',
      message: '',
      interest: 'demo'
    });
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">Have a Project in Mind?</h2>
        <p className="section-description">
          Whether you're interested in WatchPoint or have a unique challenge that requires a custom software solution, our team is ready to talk.
        </p>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <select
              name="interest"
              value={formData.interest}
              onChange={handleInputChange}
            >
              <option value="demo">I'm interested in a Demo of WatchPoint</option>
              <option value="custom">Custom Software Development</option>
              <option value="other">Other Inquiry</option>
            </select>
          </div>
          
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
            ></textarea>
          </div>
          
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;