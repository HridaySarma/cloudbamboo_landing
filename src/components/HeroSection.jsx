import { useEffect, useState } from 'react';
import './HeroSection.css';
import mobileHome from '../assets/mobile_home.jpeg';
import liveRequest from '../assets/live_request.png';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(() => {
    // Calculate bottom-right position
    const widgetWidth = 380; // Approximate width of the widget
    const widgetHeight = 250; // Approximate height of the widget
    return {
      x: window.innerWidth - widgetWidth - 30,
      y: window.innerHeight - widgetHeight - 30,
    };
  });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const features = [
    { icon: '🤖', label: 'AI Detection', desc: 'Real-time threat analysis' },
    { icon: '🚁', label: 'Drone Response', desc: 'Instant aerial support' },
    { icon: '📍', label: 'Live Tracking', desc: '24/7 GPS monitoring' },
    { icon: '👥', label: 'Expert Teams', desc: 'Trained professionals' },
  ];

  useEffect(() => {
    setIsVisible(true);
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    const launchDate = new Date('2026-01-02T00:00:00').getTime();
    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    // Handle window resize to keep widget in bounds
    const handleResize = () => {
      setPosition((prev) => {
        const widgetWidth = 380;
        const widgetHeight = 250;
        return {
          x: Math.min(prev.x, window.innerWidth - widgetWidth - 30),
          y: Math.min(prev.y, window.innerHeight - widgetHeight - 30),
        };
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(featureInterval);
      clearInterval(countdownInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.closest('.countdown-toggle')) return;
    setIsDragging(true);
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    setPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('touchend', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleMouseMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <section className="hero-section">
      {/* Background Elements */}
      <div className="hero-bg">
        <div className="hero-gradient-orb orb-1"></div>
        <div className="hero-gradient-orb orb-2"></div>
        <div className="hero-grid"></div>
      </div>

      <div className={`hero-container ${isVisible ? 'visible' : ''}`}>
        {/* Left Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Presenting   <span className="title-highlight">Watchpoint.</span>
          </h1>

          <p className="hero-description">
            AI-powered protection for businesses and individuals. 
            Enterprise workforce management meets instant personal safety — 
            all in one platform.
          </p>

          {/* Feature Carousel */}
          <div className="hero-features">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-item ${activeFeature === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <span className="feature-icon">{feature.icon}</span>
                <div className="feature-text">
                  <span className="feature-label">{feature.label}</span>
                  <span className="feature-desc">{feature.desc}</span>
                </div>
              </div>
            ))}
          </div>


        </div>

        {/* Right Visual - Dual Phone Mockups */}
        <div className="hero-visual">
          <div className="phones-container">
            {/* B2B Guard Management App */}
            <div className="phone-mockup phone-b2b">
              <div className="phone-label">
                <span className="label-icon">💼</span>
                <span>For Businesses</span>
              </div>
              <div className="phone-frame">
                <div className="phone-notch"></div>
                <img 
                  src={mobileHome} 
                  alt="WatchPoint Guard Management - Attendance & workforce tracking for security teams" 
                  className="phone-screen"
                />
              </div>
              <div className="phone-glow glow-blue"></div>
            </div>

            {/* SOS Personal Safety App */}
            <div className="phone-mockup phone-sos">
              <div className="phone-label">
                <span className="label-icon">🛡️</span>
                <span>Personal Safety</span>
              </div>
              <div className="phone-frame">
                <div className="phone-notch"></div>
                <img 
                  src={liveRequest} 
                  alt="WatchPoint SOS - Emergency response & personal protection app" 
                  className="phone-screen"
                />
              </div>
              <div className="phone-glow glow-purple"></div>
            </div>
          </div>


        </div>
      </div>

      {/* Floating Countdown Timer */}
      <div 
        className={`countdown-floating ${isCollapsed ? 'collapsed' : ''} ${isDragging ? 'dragging' : ''}`}
        style={{
          right: 'auto',
          bottom: 'auto',
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <button 
          className="countdown-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? '⬆' : '⬇'}
        </button>
        
        {!isCollapsed && (
          <div className="countdown-header">
            <div className="countdown-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">Launching 2nd January 2026</span>
            </div>
            <div className="countdown-title-wrapper">
              <span className="countdown-icon">🚀</span>
              <span className="countdown-title">Launch Countdown</span>
            </div>
          </div>
        )}
        
        <div className="countdown-grid">
          <div className="countdown-box">
            <div className="countdown-value">{countdown.days}</div>
            {!isCollapsed && <div className="countdown-label">Days</div>}
            <div className="countdown-glow"></div>
          </div>
          <div className="countdown-box">
            <div className="countdown-value">{countdown.hours.toString().padStart(2, '0')}</div>
            {!isCollapsed && <div className="countdown-label">Hours</div>}
            <div className="countdown-glow"></div>
          </div>
          <div className="countdown-box">
            <div className="countdown-value">{countdown.minutes.toString().padStart(2, '0')}</div>
            {!isCollapsed && <div className="countdown-label">Minutes</div>}
            <div className="countdown-glow"></div>
          </div>
          <div className="countdown-box">
            <div className="countdown-value">{countdown.seconds.toString().padStart(2, '0')}</div>
            {!isCollapsed && <div className="countdown-label">Seconds</div>}
            <div className="countdown-glow"></div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Hint */}
      <div className="scroll-hint">
        <span>Explore solutions</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default HeroSection;
