import React from 'react';

const PhilosophySection = () => {
  const philosophies = [
    {
      title: "Strong Foundations",
      description: "We build robust, reliable, and secure software. Our platforms are engineered to be the dependable backbone of your operations.",
      icon: "💪"
    },
    {
      title: "Designed for Growth",
      description: "Our solutions are designed to scale with your business. As you grow, our software grows with you, effortlessly.",
      icon: "📈"
    },
    {
      title: "Ultimate Flexibility",
      description: "We understand that no two businesses are the same. Our systems are built to be adaptable to your unique workflows.",
      icon: "🔄"
    }
  ];

  return (
    <section id="philosophy" className="philosophy-section">
      <div className="philosophy-container">
        <h2 className="section-title">Our Approach: Strength, Growth, and Flexibility</h2>
        <div className="philosophy-grid">
          {philosophies.map((philosophy, index) => (
            <div key={index} className="philosophy-card">
              <div className="philosophy-icon">{philosophy.icon}</div>
              <h3 className="philosophy-title">{philosophy.title}</h3>
              <p className="philosophy-description">{philosophy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;