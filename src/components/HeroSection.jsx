import { useEffect, useState, useRef } from 'react';
import './HeroSection.css';
import mobileHome from '../assets/mobile_home.jpeg';
import liveRequest from '../assets/live_request.png';
import droneVideo from '../assets/Drone_Intervenes_in_Stalker_Scenario.mp4';
import officeTalkVideo from '../assets/office_talk.mp4';

const HeroSection = () => {
  const videoRef = useRef(null);
  const secondVideoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [switchToSecondVideo, setSwitchToSecondVideo] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  
  // Countdown timer state
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCollapsed, setIsCollapsed] = useState(true);


  // const features = [
  //   { icon: '📋', label: 'Attendance', desc: 'Real-time tracking & automated reports' },
  //   { icon: '📍', label: 'Geo Tracking', desc: 'Live GPS location monitoring' },
  //   { icon: '💰', label: 'Finances', desc: 'Budget tracking & expense management' },
  //   { icon: '📄', label: 'Invoicing', desc: 'Automated client billing & payments' },
  // ];
  const features = [];

  const handleVideoTimeUpdate = () => {
    if (videoRef.current && !videoEnded) {
      const video = videoRef.current;
      const timeRemaining = video.duration - video.currentTime;
      
      // Trigger end sequence 3 seconds before actual end
      if (timeRemaining <= 3 && timeRemaining > 0) {
        handleVideoEnd();
      }
    }
  };

  const handleVideoEnd = () => {
    if (videoEnded) return; // Prevent multiple calls
    setVideoEnded(true);
    
    // Start the second video and begin crossfade
    if (secondVideoRef.current) {
      secondVideoRef.current.play();
      setSwitchToSecondVideo(true);
    }
    
    // Wait a moment, then start showing content
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  };

  useEffect(() => {
    // Only show content after video intro
    if (showContent) {
      setIsVisible(true);
    }
  }, [showContent]);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => {
      clearInterval(featureInterval);
    };
  }, []);

  // Countdown timer effect - set target date (e.g., 30 days from now or a specific launch date)
  useEffect(() => {
    const targetDate = new Date('2026-03-04T00:00:00').getTime(); // Launch date: March 4, 2026
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(countdownInterval);
  }, []);



  return (
    <section className="hero-section">
      {/* Video Background */}
      <div className="hero-video-bg">
        {/* First Video - Drone Intervention */}
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          playsInline
          className={`hero-video ${switchToSecondVideo ? 'fade-out' : ''}`}
          onTimeUpdate={handleVideoTimeUpdate}
          onEnded={handleVideoEnd}
        >
          <source src={droneVideo} type="video/mp4" />
        </video>
        
        {/* Second Video - Office Talk */}
        <video 
          ref={secondVideoRef}
          loop
          muted 
          playsInline
          className={`hero-video hero-video-second ${switchToSecondVideo ? 'fade-in' : ''}`}
        >
          <source src={officeTalkVideo} type="video/mp4" />
        </video>
        
        <div className={`hero-video-overlay ${videoEnded ? 'darkened' : ''}`}></div>
      </div>

      {/* Background Elements */}
      <div className="hero-bg">
        <div className="hero-gradient-orb orb-1"></div>
        <div className="hero-gradient-orb orb-2"></div>
        <div className="hero-grid"></div>
      </div>

      <div className={`hero-container ${isVisible ? 'visible' : ''} ${!showContent ? 'hidden-intro' : ''}`}>
        {/* Left Content */}
        <div className="hero-content">
          <h1 className="hero-title hero-title-animated">
            Presenting <br />
            <span className="title-highlight title-highlight-watchpoint">Watchpoint.</span>
          </h1>

          <p className="hero-description hero-description-bold">
            <span className="hero-tagline hero-tagline-golden"><span className="tagline-icon">🤖</span> AI powered management for business and protection for individuals.</span>
          </p>

          {/* Feature Carousel - Commented out for now */}
          {/* <div className="hero-features hero-features-enhanced">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-item feature-item-enhanced ${activeFeature === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <span className="feature-icon feature-icon-large">{feature.icon}</span>
                <div className="feature-text">
                  <span className="feature-label">{feature.label}</span>
                  <span className="feature-desc">{feature.desc}</span>
                </div>
              </div>
            ))}
          </div> */}

          {/* Main CTA Button */}
          <div className="hero-cta-container">
            <a 
              href="https://watchpoint.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero-cta-button"
            >
              <span className="cta-icon">🚀</span>
              <span className="cta-text">
                <span className="cta-main">Explore <span className="cta-watchpoint-gradient">Watchpoint</span></span>
                <span className="cta-sub">Experience the Solution</span>
              </span>
              <span className="cta-arrow">→</span>
            </a>
            <div className="cta-glow"></div>
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
            
            {/* Floor/Shadow beneath phones */}
            <div className="phones-floor"></div>
          </div>


        </div>
      </div>


      {/* Bottom Scroll Hint */}
      <div className={`scroll-hint ${!showContent ? 'hidden-intro' : ''}`}>
        <span>Explore solutions</span>
        <div className="scroll-line"></div>
      </div>

      {/* Countdown Timer - Bottom Right Corner */}
      <div className={`countdown-floating countdown-bottom-right ${!showContent ? 'hidden-intro' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        <button 
          className="countdown-toggle" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand countdown' : 'Collapse countdown'}
        >
          {isCollapsed ? '▲' : '▼'}
        </button>
        
        {!isCollapsed && (
          <div className="countdown-header">
            <div className="countdown-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">Coming Soon</span>
            </div>
            <div className="countdown-title-wrapper">
              <span className="countdown-icon">🚀</span>
              <span className="countdown-title">Launch Countdown</span>
            </div>
          </div>
        )}
        
        <div className="countdown-grid">
          <div className="countdown-box">
            <div className="countdown-glow"></div>
            <span className="countdown-value">{String(countdown.days).padStart(2, '0')}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-box">
            <div className="countdown-glow"></div>
            <span className="countdown-value">{String(countdown.hours).padStart(2, '0')}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-box">
            <div className="countdown-glow"></div>
            <span className="countdown-value">{String(countdown.minutes).padStart(2, '0')}</span>
            <span className="countdown-label">Mins</span>
          </div>
          <div className="countdown-box">
            <div className="countdown-glow"></div>
            <span className="countdown-value">{String(countdown.seconds).padStart(2, '0')}</span>
            <span className="countdown-label">Secs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
