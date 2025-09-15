import React from 'react';

const WatchPointSection = () => {
  const features = [
    {
      title: "Operations Hub",
      description: "Manage Staff, Clients, and Assignments seamlessly."
    },
    {
      title: "Real-Time Accountability",
      description: "Track attendance with QR codes and monitor live staff locations."
    },
    {
      title: "Automated Financials",
      description: "Generate accurate payroll and invoices automatically from operational data."
    },
    {
      title: "Actionable Insights",
      description: "Get a high-level overview with a comprehensive analytics dashboard."
    }
  ];

  return (
    <section id="watchpoint" className="watchpoint">
      <div className="watchpoint-container">
        <h2 className="section-title">WatchPoint: The All-in-One Command Center for Your Mobile Workforce</h2>
        <p className="section-description">
          A powerful Workforce Management System designed to streamline the operations of a service-based business. 
          WatchPoint provides a centralized platform for everything from staff onboarding and real-time attendance to automated payroll and invoicing.
        </p>
        
        <div className="dashboard-preview">
          <div className="dashboard-placeholder">
            <div className="dashboard-header">
              <div className="dashboard-title">WatchPoint Dashboard</div>
              <div className="dashboard-controls">
                <div className="control-button"></div>
                <div className="control-button"></div>
                <div className="control-button"></div>
              </div>
            </div>
            <div className="dashboard-content">
              <div className="dashboard-chart">
                <div className="chart-placeholder">Analytics Dashboard</div>
              </div>
              <div className="dashboard-widgets">
                <div className="widget">
                  <div className="widget-title">Staff Overview</div>
                  <div className="widget-content">32 Active Staff</div>
                </div>
                <div className="widget">
                  <div className="widget-title">Today's Assignments</div>
                  <div className="widget-content">18 Scheduled</div>
                </div>
                <div className="widget">
                  <div className="widget-title">Pending Invoices</div>
                  <div className="widget-content">7 Invoices</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="workflow-section">
          <h3 className="workflow-title">The Power of a Single 'Link'</h3>
          <div className="workflow-diagram">
            <div className="workflow-icons">
              <div className="icon">👤</div>
              <div className="plus">+</div>
              <div className="icon">🏢</div>
              <div className="plus">+</div>
              <div className="icon">📅</div>
              <div className="arrow">→</div>
              <div className="link-icon">🔗</div>
            </div>
            <div className="result-icons">
              <div className="result-icon">💰</div>
              <div className="result-icon">🧾</div>
              <div className="result-icon">📍</div>
            </div>
          </div>
        </div>
        
        <div className="features-section">
          <h3 className="features-title">A Fully Integrated Platform</h3>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="watchpoint-cta">
          <button className="cta-button">Book a Live Demo of WatchPoint</button>
        </div>
      </div>
    </section>
  );
};

export default WatchPointSection;