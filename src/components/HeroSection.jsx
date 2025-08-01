import React from 'react';
import '../App.css';

const HeroSection = () => {
  const scrollToWatchPoint = () => {
    const watchPointSection = document.getElementById('watchpoint');
    if (watchPointSection) {
      watchPointSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">We Build Software That Powers Your Entire Operation</h1>
        <p className="hero-subtitle">
          CloudBamboo Digital architects robust, flexible, and scalable SaaS solutions that automate workflows and provide critical business insights.
        </p>
        <button className="hero-cta" onClick={scrollToWatchPoint}>
          Explore Our Solutions
        </button>
      </div>
      <div className="hero-animation">
        <div className="saas-weave-animation">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
          <div className="line line-4"></div>
          <div className="line line-5"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;