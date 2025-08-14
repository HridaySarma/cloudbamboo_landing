import React, { useState, useEffect } from 'react';
import './App.css';
import { initializeAnimations, initializeCursor } from './utils/animations';

// Enhanced Modal Component
const JourneyModal = ({ isOpen, onClose }) => {
  const [activePhase, setActivePhase] = useState(0);
  const [hoveredPhase, setHoveredPhase] = useState(null);

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
          icon: "🔮",
          details: ["Advanced analytics and business intelligence", "Custom integrations and APIs", "Enterprise-grade security and compliance", "Advanced reporting and insights"],
          highlights: ["Advanced Analytics", "Custom APIs", "Enterprise Security", "Advanced Reporting"]
        },
        { 
          title: "Deployment Options", 
          icon: "☁️",
          details: ["Cloud SaaS: Multi-tenant hosted solution", "Private cloud: Dedicated infrastructure", "On-premise: Client-managed servers", "Hybrid: Combination of cloud and on-premise"],
          highlights: ["Cloud SaaS", "Private Cloud", "On-premise", "Hybrid"]
        },
        { 
          title: "Enterprise Sales", 
          icon: "👔",
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
                    onMouseEnter={() => setHoveredPhase(index)}
                    onMouseLeave={() => setHoveredPhase(null)}
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['features', 'watchpoint', 'chatbot', 'philosophy', 'contact'];
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
        <div className="nav">
                    <div className="logo">
            <div className="logo-text-container">
              <div className="cloud-platform">
                <div className="cloud-cloud cloud-1"></div>
                <div className="cloud-cloud cloud-2"></div>
                <div className="cloud-cloud cloud-3"></div>
                <div className="cloud-cloud cloud-4"></div>
                <div className="cloud-cloud cloud-5"></div>
              </div>
              <div className="cloud-particles">
                <div className="cloud-particle particle-1"></div>
                <div className="cloud-particle particle-2"></div>
                <div className="cloud-particle particle-3"></div>
                <div className="cloud-particle particle-4"></div>
              </div>
              <span className="logo-text logo-text-solid">
                <span className="text-char" data-char="C">C</span>
                <span className="text-char" data-char="l">l</span>
                <span className="text-char" data-char="o">o</span>
                <span className="text-char" data-char="u">u</span>
                <span className="text-char" data-char="d">d</span>
                <span className="text-char" data-char="B">B</span>
                <span className="text-char" data-char="a">a</span>
                <span className="text-char" data-char="m">m</span>
                <span className="text-char" data-char="b">b</span>
                <span className="text-char" data-char="o">o</span>
                <span className="text-char" data-char="o">o</span>
              </span>
              <div className="logo-underline"></div>
            </div>
          </div>
          <nav className="nav-links">
            <a href="#features" className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}>Features</a>
            <a href="#watchpoint" className={`nav-link ${activeSection === 'watchpoint' ? 'active' : ''}`}>WatchPoint</a>
            <a href="#chatbot" className={`nav-link ${activeSection === 'chatbot' ? 'active' : ''}`}>AI Chatbots</a>
            <a href="#philosophy" className={`nav-link ${activeSection === 'philosophy' ? 'active' : ''}`}>Philosophy</a>
            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
          </nav>
          <div className="nav-cta">
            <button className="btn btn-creative" onClick={() => setIsModalOpen(true)}>How it's done?</button>
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
                  
                  <div className="cta-orb secondary-orb" onClick={() => document.getElementById('chatbot').scrollIntoView({ behavior: 'smooth' })}>
                    <div className="orb-content">
                      <div className="orb-icon">🤖</div>
                      <div className="orb-text">
                        <span className="orb-title">Chat with AI</span>
                        <span className="orb-subtitle">Talk to our AI rep</span>
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
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
        <div className="watchpoint-container container">
          <div className="section-header scroll-reveal">
            <h2 className="section-title">
              <span className="creative-watchpoint">
                <span className="letter w">W</span>
                <span className="letter a">a</span>
                <span className="letter t">t</span>
                <span className="letter c">c</span>
                <span className="letter h">h</span>
                <span className="letter p">P</span>
                <span className="letter o">o</span>
                <span className="letter i">i</span>
                <span className="letter n">n</span>
                <span className="letter t2">t</span>
              </span>
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
                    <span className="url-text">app.watchpoint.in</span>
                  </div>
                </div>
                <div className="mockup-iframe-container">
                  <img
                    src="/src/assets/attendance_demo.png"
                    className="mockup-iframe"
                    alt="WatchPoint Attendance Dashboard Demo"
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
            <div className="workflow-header">
              <h3 className="workflow-title">The Power of a Single 'Link'</h3>
              <p className="workflow-subtitle">One connection transforms your entire operation</p>
            </div>
            
            <div className="workflow-showcase">
              <div className="workflow-timeline">
                <div className="timeline-track">
                  <div className="track-line"></div>
                  <div className="track-pulse"></div>
                </div>
                
                <div className="workflow-step step-1">
                  <div className="step-orb">
                    <div className="orb-glow"></div>
                    <div className="orb-content">
                      <div className="step-icon">👥</div>
                      <div className="step-particles">
                        <div className="particle"></div>
                        <div className="particle"></div>
                        <div className="particle"></div>
                      </div>
                    </div>
                  </div>
                  <div className="step-info">
                    <h4 className="step-title">Staff</h4>
                    <p className="step-desc">Manage your workforce</p>
                  </div>
                  <div className="step-connector">
                    <div className="connector-line"></div>
                    <div className="connector-arrow">⚡</div>
                  </div>
                </div>
                
                <div className="workflow-step step-2">
                  <div className="step-orb">
                    <div className="orb-glow"></div>
                    <div className="orb-content">
                      <div className="step-icon">🏢</div>
                      <div className="step-particles">
                        <div className="particle"></div>
                        <div className="particle"></div>
                        <div className="particle"></div>
                      </div>
                    </div>
                  </div>
                  <div className="step-info">
                    <h4 className="step-title">Client</h4>
                    <p className="step-desc">Connect with customers</p>
                  </div>
                  <div className="step-connector">
                    <div className="connector-line"></div>
                    <div className="connector-arrow">⚡</div>
                  </div>
                </div>
                
                <div className="workflow-step step-3">
                  <div className="step-orb">
                    <div className="orb-glow"></div>
                    <div className="orb-content">
                      <div className="step-icon">📅</div>
                      <div className="step-particles">
                        <div className="particle"></div>
                        <div className="particle"></div>
                        <div className="particle"></div>
                      </div>
                    </div>
                  </div>
                  <div className="step-info">
                    <h4 className="step-title">Schedule</h4>
                    <p className="step-desc">Plan assignments</p>
                  </div>
                  <div className="step-connector">
                    <div className="connector-line"></div>
                    <div className="connector-arrow">⚡</div>
                  </div>
                </div>
                
                <div className="workflow-step step-4">
                  <div className="step-orb">
                    <div className="orb-glow"></div>
                    <div className="orb-content">
                      <div className="step-icon">🔗</div>
                      <div className="step-particles">
                        <div className="particle"></div>
                        <div className="particle"></div>
                        <div className="particle"></div>
                      </div>
                    </div>
                  </div>
                  <div className="step-info">
                    <h4 className="step-title">Link</h4>
                    <p className="step-desc">Magic happens here</p>
                  </div>
                </div>
              </div>
              
              <div className="workflow-outcomes">
                <div className="outcome-card outcome-1">
                  <div className="outcome-icon">📊</div>
                  <div className="outcome-content">
                    <h4>Reports</h4>
                    <p>Comprehensive analytics</p>
                  </div>
                  <div className="outcome-glow"></div>
                </div>
                
                <div className="outcome-card outcome-2">
                  <div className="outcome-icon">📍</div>
                  <div className="outcome-content">
                    <h4>Tracking</h4>
                    <p>Real-time monitoring</p>
                  </div>
                  <div className="outcome-glow"></div>
                </div>
                
                <div className="outcome-card outcome-3">
                  <div className="outcome-icon">📅</div>
                  <div className="outcome-content">
                    <h4>Scheduling</h4>
                    <p>Smart automation</p>
                  </div>
                  <div className="outcome-glow"></div>
                </div>
                
                <div className="outcome-card outcome-4">
                  <div className="outcome-icon">👥</div>
                  <div className="outcome-content">
                    <h4>Accounts</h4>
                    <p>User management</p>
                  </div>
                  <div className="outcome-glow"></div>
                </div>
                
                <div className="outcome-card outcome-5">
                  <div className="outcome-icon">💰</div>
                  <div className="outcome-content">
                    <h4>Finance</h4>
                    <p>Financial control</p>
                  </div>
                  <div className="outcome-glow"></div>
                </div>
                
                <div className="outcome-card outcome-6">
                  <div className="outcome-icon">🛡️</div>
                  <div className="outcome-content">
                    <h4>Security</h4>
                    <p>Enterprise protection</p>
                  </div>
                  <div className="outcome-glow"></div>
                </div>
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
            <button
              className="btn btn-primary"
              onClick={() => window.open('https://watchpoint.in', '_blank')}
            >
              View Demo
            </button>
            <button className="btn btn-glass">Download Brochure</button>
          </div>
        </div>
      </section>

      {/* Chatbot Section */}
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
              <div className="footer-logo">
                <span className="footer-logo-text">CloudBamboo</span>
              </div>
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
      
      <JourneyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
