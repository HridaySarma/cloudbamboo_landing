import React from 'react';
import profilePic from '../assets/profile_pic.png';

const FounderSection = () => {
  return (
    <section className="founder-section" id="founder">
      <div className="founder-container">
        <div className="founder-content">
          <div className="founder-header">
            <h2 className="section-title founder-title">Meet the Founder</h2>
            <div className="founder-subtitle">
              From Code to Vision: The Journey Behind WatchPoint
            </div>
          </div>
          
          <div className="founder-main">
            <div className="founder-image-container">
              <div className="founder-image">
                <img 
                  src={profilePic} 
                  alt="Hriday Sarma - Founder & Full Stack Developer" 
                  className="founder-photo"
                />
              </div>
              <div className="founder-image-decorations">
                <div className="decoration-circle decoration-1"></div>
                <div className="decoration-circle decoration-2"></div>
                <div className="decoration-circle decoration-3"></div>
              </div>
            </div>
            
            <div className="founder-story">
              <div className="founder-intro">
                <h3 className="founder-name">Hriday Sarma</h3>
                <p className="founder-role">Full Stack Developer & Entrepreneur</p>
                <div className="founder-experience">
                  <span className="experience-badge">4+ Years Experience</span>
                </div>
              </div>
              
              <div className="founder-journey">
                <div className="journey-stage">
                  <div className="stage-marker">
                    <div className="stage-number">01</div>
                  </div>
                  <div className="stage-content">
                    <h4 className="stage-title">The Discovery</h4>
                    <p className="stage-description">
                      While freelancing as a full stack developer, I connected with a friend working at a security guard provider company. 
                      He shared the critical challenges they faced - existing market solutions were either overpriced or failed to meet their operational needs.
                    </p>
                  </div>
                </div>
                
                <div className="journey-stage">
                  <div className="stage-marker">
                    <div className="stage-number">02</div>
                  </div>
                  <div className="stage-content">
                    <h4 className="stage-title">The Innovation</h4>
                    <p className="stage-description">
                      Recognizing this gap in the market, I embarked on developing an MVP for WatchPoint while pursuing my Masters. 
                      Balancing academics with coding, I built the foundation of what would become a game-changing solution.
                    </p>
                  </div>
                </div>
                
                <div className="journey-stage">
                  <div className="stage-marker">
                    <div className="stage-number">03</div>
                  </div>
                  <div className="stage-content">
                    <h4 className="stage-title">The Dedication</h4>
                    <p className="stage-description">
                      After completing my Masters, I worked full-time while dedicating my evenings and weekends to refining WatchPoint. 
                      For an entire year, I poured my passion into perfecting the software that would revolutionize security management.
                    </p>
                  </div>
                </div>
                
                <div className="journey-stage">
                  <div className="stage-marker">
                    <div className="stage-number">04</div>
                  </div>
                  <div className="stage-content">
                    <h4 className="stage-title">The Leap</h4>
                    <p className="stage-description">
                      After extensive market research and promising sales calls, I took the bold step of leaving my full-time job. 
                      The confidence in WatchPoint's potential drove me to pursue my entrepreneurial vision and solve real-world problems through innovative software.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="founder-mission">
                <div className="mission-content">
                  <h4 className="mission-title">Beyond WatchPoint</h4>
                  <p className="mission-description">
                    My journey with WatchPoint is just the beginning. I'm passionate about using entrepreneurship and coding 
                    to solve real-world problems, creating software that doesn't just function—but transforms how businesses operate.
                  </p>
                </div>
                <div className="mission-stats">
                  <div className="stat-item">
                    <span className="stat-number">4+</span>
                    <span className="stat-label">Years Development</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">1</span>
                    <span className="stat-label">Bold Leap</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">∞</span>
                    <span className="stat-label">Possibilities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
