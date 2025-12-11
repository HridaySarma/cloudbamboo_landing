import React from 'react';
import './WatchpointSOS.css';
import droneVideo from '../assets/Drone_Intervenes_in_Stalker_Scenario.mp4';
import sosHome from '../assets/sos_home.png';

const WatchpointSOS = () => {
	return (
		<section id="watchpoint-sos" className="watchpoint-sos-section">
			{/* Animated Background Elements */}
			<div className="sos-bg-elements">
				<div className="pulse-ring pulse-ring-1"></div>
				<div className="pulse-ring pulse-ring-2"></div>
				<div className="pulse-ring pulse-ring-3"></div>
				<div className="grid-overlay"></div>
			</div>

			<div className="watchpoint-sos-container container">
				{/* Revolutionary Header */}
				<div className="sos-section-header scroll-reveal">
					<div className="revolution-badge">
						<span className="badge-pulse"></span>
						<span>🚀 INDUSTRY FIRST</span>
					</div>
					<p className="section-kicker">Watchpoint SOS</p>
					<h2 className="section-title">The Uber for Security</h2>
					<p className="section-subtitle">
						A revolutionary on-demand security platform that's never been done before. 
						Trained guards at your fingertips, AI-powered drones in the sky — protection reimagined for the modern world.
					</p>
				</div>

				{/* App Showcase with How It Works */}
				<div className="sos-app-showcase scroll-reveal">
					<div className="sos-phone-mockup">
						<div className="sos-phone-frame">
							<div className="sos-phone-notch"></div>
							<img 
								src={sosHome} 
								alt="WatchPoint SOS App" 
								className="sos-phone-screen"
							/>
						</div>
						<div className="sos-phone-glow"></div>
					</div>
					
					<div className="how-it-works">
						<h3 className="how-it-works-title">How It Works</h3>
						<div className="steps-container">
							<div className="step">
								<div className="step-number">1</div>
								<div className="step-content">
									<h4>Tap SOS</h4>
									<p>One tap sends your location</p>
								</div>
							</div>
							<div className="step">
								<div className="step-number">2</div>
								<div className="step-content">
									<h4>Instant Dispatch</h4>
									<p>Nearest guard & drone deployed</p>
								</div>
							</div>
							<div className="step">
								<div className="step-number">3</div>
								<div className="step-content">
									<h4>Help Arrives</h4>
									<p>Protection in minutes, not hours</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Dual Response System */}
				<div className="dual-mode-grid">
					{/* Human Response Card */}
					<div className="sos-mode-card guard-mode scroll-reveal">
						<div className="card-glow guard-glow"></div>
						<div className="card-header-strip guard-strip"></div>
						
						<div className="mode-icon-wrapper">
							<div className="mode-icon guard-icon">
								<div className="icon-ring"></div>
								<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" fill="currentColor"/>
									<path d="M17.08 14.15C14.29 12.29 9.73996 12.29 6.92996 14.15C5.65996 15 4.95996 16.15 4.95996 17.38C4.95996 18.61 5.65996 19.75 6.91996 20.59C8.31996 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z" fill="currentColor"/>
								</svg>
							</div>
						</div>

						<div className="mode-content">
							<div className="mode-badge guard-badge">
								<span className="badge-dot guard-dot"></span>
								HUMAN RESPONSE
							</div>
							<h3 className="mode-title">Elite Trained Guards</h3>
							<p className="mode-description">
								Professional, vetted security personnel strategically positioned across the city. 
								Like calling an Uber, but for your safety — trained to protect, equipped to respond.
							</p>

							<div className="features-grid">
								<div className="feature-card">
									<div className="feature-icon-box guard-feature-icon">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
										</svg>
									</div>
									<div className="feature-info">
										<h5>De-escalation Training</h5>
										<p>Conflict resolution experts</p>
									</div>
								</div>

								<div className="feature-card">
									<div className="feature-icon-box guard-feature-icon">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<circle cx="12" cy="12" r="10"/>
											<path d="M12 6v6l4 2"/>
										</svg>
									</div>
									<div className="feature-info">
										<h5>Self-Defense Trained</h5>
										<p>Protection when needed</p>
									</div>
								</div>

								<div className="feature-card">
									<div className="feature-icon-box guard-feature-icon">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
											<circle cx="12" cy="13" r="3"/>
										</svg>
									</div>
									<div className="feature-info">
										<h5>Body Cam Recording</h5>
										<p>Full video evidence</p>
									</div>
								</div>

								<div className="feature-card">
									<div className="feature-icon-box guard-feature-icon">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
											<line x1="16" y1="8" x2="2" y2="22"/>
											<line x1="17.5" y1="15" x2="9" y2="15"/>
										</svg>
									</div>
									<div className="feature-info">
										<h5>Pepper Spray Equipped</h5>
										<p>Non-lethal deterrent</p>
									</div>
								</div>

								<div className="feature-card">
									<div className="feature-icon-box guard-feature-icon">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
											<path d="M9 12l2 2 4-4"/>
										</svg>
									</div>
									<div className="feature-info">
										<h5>Protective Gear</h5>
										<p>Safety clothing & equipment</p>
									</div>
								</div>

								<div className="feature-card">
									<div className="feature-icon-box guard-feature-icon">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
										</svg>
									</div>
									<div className="feature-info">
										<h5>Police Coordination</h5>
										<p>Instant escalation when needed</p>
									</div>
								</div>
							</div>
						</div>

						<div className="card-footer">
							<div className="availability-tag">
								<span className="live-dot"></span>
								Available 24/7
							</div>
							<div className="response-time">
								<span className="time-value">&lt;5</span>
								<span className="time-unit">min response</span>
							</div>
						</div>
					</div>

					{/* AI Drone Response Card */}
					<div className="sos-mode-card drone-mode scroll-reveal">
						<div className="card-glow drone-glow"></div>
						<div className="card-header-strip drone-strip"></div>

						<div className="mode-icon-wrapper">
							<div className="mode-icon drone-icon">
								<div className="icon-ring drone-ring"></div>
								<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
									<path d="M2 12H6M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
									<path d="M12 2V6M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
									<path d="M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
									<path d="M19.07 4.93L16.24 7.76M7.76 16.24L4.93 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
								</svg>
							</div>
						</div>

						<div className="mode-content">
							<div className="mode-badge drone-badge">
								<span className="ai-spark">✨</span>
								AI-POWERED DRONE
							</div>
							<h3 className="mode-title">Autonomous Aerial Response</h3>
							<p className="mode-description">
								First-of-its-kind AI drone response system. Immediate aerial support with human supervision — 
								technology and humanity working together for your safety.
							</p>

							<div className="features-grid">
								<div className="feature-card">
									<div className="feature-icon-box drone-feature-icon">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
											<circle cx="12" cy="13" r="4"/>
										</svg>
									</div>
									<div className="feature-info">
										<h5>HD Night Vision Camera</h5>
										<p>Crystal clear footage 24/7</p>
									</div>
								</div>

								<div className="feature-card">
									<div className="feature-icon-box drone-feature-icon">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
											<path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
										</svg>
									</div>
									<div className="feature-info">
										<h5>120dB Siren</h5>
										<p>Powerful deterrent alarm</p>
									</div>
								</div>

								<div className="feature-card">
									<div className="feature-icon-box drone-feature-icon">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<circle cx="12" cy="12" r="5"/>
											<line x1="12" y1="1" x2="12" y2="3"/>
											<line x1="12" y1="21" x2="12" y2="23"/>
											<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
											<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
											<line x1="1" y1="12" x2="3" y2="12"/>
											<line x1="21" y1="12" x2="23" y2="12"/>
											<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
											<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
										</svg>
									</div>
									<div className="feature-info">
										<h5>High-Intensity Spotlight</h5>
										<p>Illuminates any situation</p>
									</div>
								</div>

								<div className="feature-card">
									<div className="feature-icon-box drone-feature-icon">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
											<line x1="8" y1="21" x2="16" y2="21"/>
											<line x1="12" y1="17" x2="12" y2="21"/>
										</svg>
									</div>
									<div className="feature-info">
										<h5>Human Supervision</h5>
										<p>Operators always monitoring</p>
									</div>
								</div>

								<div className="feature-card">
									<div className="feature-icon-box drone-feature-icon">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<path d="M12 2L2 7l10 5 10-5-10-5z"/>
											<path d="M2 17l10 5 10-5"/>
											<path d="M2 12l10 5 10-5"/>
										</svg>
									</div>
									<div className="feature-info">
										<h5>AI Threat Assessment</h5>
										<p>Smart situation analysis</p>
									</div>
								</div>

								<div className="feature-card">
									<div className="feature-icon-box drone-feature-icon">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
											<polyline points="17 8 12 3 7 8"/>
											<line x1="12" y1="3" x2="12" y2="15"/>
										</svg>
									</div>
									<div className="feature-info">
										<h5>Video Evidence</h5>
										<p>Recorded for legal use</p>
									</div>
								</div>
							</div>
						</div>

						<div className="card-footer">
							<div className="availability-tag drone-tag">
								<span className="live-dot drone-dot"></span>
								Instant Deployment
							</div>
							<div className="response-time drone-response">
								<span className="time-value">&lt;2</span>
								<span className="time-unit">min arrival</span>
							</div>
						</div>
					</div>
				</div>

				{/* Video Showcase */}
				<div className="video-showcase scroll-reveal">
					<div className="video-header">
						<div className="video-badge">
							<span className="video-live-dot"></span>
							SEE IT IN ACTION
						</div>
						<h3 className="video-title">Drone Intervention Demo</h3>
						<p className="video-subtitle">Watch how our AI-powered drone responds to a real stalker scenario</p>
					</div>
					<div className="video-container">
						<div className="video-glow"></div>
						<video 
							className="demo-video"
							controls
							playsInline
							poster=""
						>
							<source src={droneVideo} type="video/mp4" />
							Your browser does not support the video tag.
						</video>
						<div className="video-features">
							<div className="video-feature">
								<span>📹</span> HD Recording
							</div>
							<div className="video-feature">
								<span>🚨</span> Siren Activated
							</div>
							<div className="video-feature">
								<span>💡</span> Spotlight On
							</div>
						</div>
					</div>
				</div>

				{/* Evidence & Police Coordination */}
				<div className="evidence-section scroll-reveal">
					<div className="evidence-card">
						<div className="evidence-icon">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
								<polyline points="14 2 14 8 20 8"/>
								<path d="M12 18v-6"/>
								<path d="M9 15l3 3 3-3"/>
							</svg>
						</div>
						<h4>Dual Video Evidence</h4>
						<p>Both drone and body cam footage recorded and stored securely for legal proceedings</p>
					</div>
					<div className="evidence-card highlight-card">
						<div className="evidence-icon police-icon">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
								<path d="M12 8v4"/>
								<path d="M12 16h.01"/>
							</svg>
						</div>
						<h4>Instant Police Alert</h4>
						<p>Any situation requiring law enforcement triggers immediate police notification with live location</p>
					</div>
					<div className="evidence-card">
						<div className="evidence-icon">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
								<path d="M7 11V7a5 5 0 0 1 10 0v4"/>
							</svg>
						</div>
						<h4>Secure Storage</h4>
						<p>All evidence encrypted and stored in compliance with legal requirements</p>
					</div>
				</div>

				{/* Key Message */}
				<div className="sos-key-point scroll-reveal">
					<div className="key-point-glow"></div>
					<div className="key-point-content">
						<div className="key-point-icon">
							<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
								<path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
							</svg>
						</div>
						<div className="key-point-text-wrapper">
							<h4 className="key-point-headline">Security, Reimagined.</h4>
							<p className="key-point-text">
								No more waiting. No more helplessness. With Watchpoint SOS, professional security is just one tap away — 
								<strong> anytime, anywhere.</strong>
							</p>
						</div>
					</div>
				</div>

				{/* B2C Pricing Section */}
				<div className="pricing-section scroll-reveal">
					<div className="pricing-header">
						<div className="pricing-badge">
							<span>💎</span>
							FOR INDIVIDUALS
						</div>
						<h3 className="pricing-title">Choose Your Safety Plan</h3>
						<p className="pricing-subtitle">Flexible protection plans designed for your lifestyle and safety needs</p>
					</div>

					<div className="pricing-grid">
						{/* Simple Safety Plan */}
						<div className="pricing-card simple-plan">
							<div className="plan-header">
								<div className="plan-icon">🔹</div>
								<h4 className="plan-name">SIMPLE SAFETY</h4>
								<div className="plan-price">
									<span className="currency">₹</span>
									<span className="amount">199</span>
									<span className="period">/month</span>
								</div>
							</div>
							<div className="plan-features">
								<div className="feature-item">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Simple SOS</span>
								</div>
								<div className="feature-item">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Trained guard assistance</span>
								</div>
								<div className="feature-item">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Real-time tracking</span>
								</div>
								<div className="feature-item">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>24/7 support</span>
								</div>
							</div>
							<div className="plan-examples">
								<h5>Perfect for:</h5>
								<ul>
									<li>Feeling unsafe</li>
									<li>Someone following you</li>
									<li>Need escort home</li>
									<li>Cab ride discomfort</li>
									<li>Domestic tension (non-violent)</li>
									<li>Loud disturbance</li>
								</ul>
							</div>
							<div className="plan-best-for">
								<strong>Best for:</strong> Low-risk situations with no physical danger
							</div>
							<div className="plan-discounts">
								<div className="discount-header">
									<span className="discount-icon">💰</span>
									<span>Bulk Purchase Discounts</span>
								</div>
								<div className="discount-options">
									<div className="discount-option">
										<span className="discount-duration">Buy 3 Plans</span>
										<span className="discount-value">10% OFF</span>
									</div>
									<div className="discount-option">
										<span className="discount-duration">Buy 5+ Plans</span>
										<span className="discount-value">20% OFF</span>
									</div>
								</div>
							</div>
						</div>

						{/* Critical Safety Plan */}
						<div className="pricing-card critical-plan">
							<div className="plan-header">
								<div className="plan-icon">🔸</div>
								<h4 className="plan-name">CRITICAL SAFETY</h4>
								<div className="plan-price">
									<span className="currency">₹</span>
									<span className="amount">599</span>
									<span className="period">/month</span>
								</div>
							</div>
							<div className="plan-features">
								<div className="feature-item">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Critical SOS</span>
								</div>
								<div className="feature-item">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Drone-assisted monitoring</span>
								</div>
								<div className="feature-item">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Elite guard dispatch</span>
								</div>
								<div className="feature-item">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Bodycam evidence</span>
								</div>
							</div>
							<div className="plan-examples critical-examples">
								<h5>Life-Threatening Situations:</h5>
								<ul>
									<li>Assault attempt</li>
									<li>Break-in</li>
									<li>Stalker aggression</li>
									<li>Kidnap attempt</li>
									<li>Threat with weapon</li>
									<li>Midnight street danger</li>
								</ul>
							</div>
							<div className="plan-best-for">
								<strong>Best for:</strong> Severe, life-threatening situations
							</div>
							<div className="plan-discounts">
								<div className="discount-header">
									<span className="discount-icon">💰</span>
									<span>Bulk Purchase Discounts</span>
								</div>
								<div className="discount-options">
									<div className="discount-option">
										<span className="discount-duration">Buy 3 Plans</span>
										<span className="discount-value">15% OFF</span>
									</div>
									<div className="discount-option">
										<span className="discount-duration">Buy 5+ Plans</span>
										<span className="discount-value">25% OFF</span>
									</div>
								</div>
							</div>
						</div>

						{/* Super Safety Plan */}
						<div className="pricing-card super-plan featured">
							<div className="featured-badge">MOST POPULAR</div>
							<div className="plan-header">
								<div className="plan-icon">🔷</div>
								<h4 className="plan-name">SUPER SAFETY</h4>
								<div className="plan-price">
									<span className="currency">₹</span>
									<span className="amount">799</span>
									<span className="period">/month</span>
								</div>
							</div>
							<div className="plan-features">
								<div className="feature-item">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>1 Critical SOS</span>
								</div>
								<div className="feature-item">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>1 Simple SOS</span>
								</div>
								<div className="feature-item">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Amber alerts unlimited</span>
								</div>
								<div className="feature-item">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Priority routing</span>
								</div>
								<div className="feature-item">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Dedicated safety monitoring</span>
								</div>
							</div>
							<div className="plan-highlight">
								<div className="highlight-icon">⭐</div>
								<p>Use Simple SOS without burning Critical SOS — maximum flexibility for all situations</p>
							</div>
							<div className="plan-best-for">
								<strong>Best for:</strong> Complete protection with flexible response options
							</div>
							<div className="plan-discounts">
								<div className="discount-header">
									<span className="discount-icon">💰</span>
									<span>Bulk Purchase Discounts</span>
								</div>
								<div className="discount-options">
									<div className="discount-option">
										<span className="discount-duration">Buy 3 Plans</span>
										<span className="discount-value">18% OFF</span>
									</div>
									<div className="discount-option">
										<span className="discount-duration">Buy 5+ Plans</span>
										<span className="discount-value">30% OFF</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Elite Guard Equipment Section */}
				<div className="elite-guard-section scroll-reveal">
					<div className="elite-guard-header">
						<div className="elite-badge">
							<span>🛡️</span>
							ELITE GUARD STANDARD
						</div>
						<h3 className="elite-title">Always Ready. Never Lacking.</h3>
						<p className="elite-subtitle">Every Critical SOS guard is equipped with professional-grade gear and training</p>
					</div>
					<div className="elite-equipment-grid">
						<div className="equipment-card">
							<div className="equipment-icon">📹</div>
							<h4>Body Camera ON</h4>
							<p>HD recording for complete evidence documentation</p>
						</div>
						<div className="equipment-card">
							<div className="equipment-icon">🛡️</div>
							<h4>Pepper Spray Kit</h4>
							<p>Non-lethal defense equipment for immediate response</p>
						</div>
						<div className="equipment-card">
							<div className="equipment-icon">⚡</div>
							<h4>Emergency Trained</h4>
							<p>Certified in crisis management and de-escalation</p>
						</div>
						<div className="equipment-card">
							<div className="equipment-icon">🎯</div>
							<h4>Quick Decision-Making</h4>
							<p>Trained to assess and act in high-pressure situations</p>
						</div>
					</div>
					<div className="elite-guarantee">
						<div className="guarantee-icon">✓</div>
						<p><strong>The guard will always have those. He will never be caught lacking.</strong></p>
					</div>
				</div>

				{/* Guard Payment Model */}
				<div className="guard-payment-section scroll-reveal">
					<div className="payment-header">
						<h3 className="payment-title">How Guards Are Paid</h3>
						<p className="payment-subtitle">Fair, transparent earnings for our security professionals</p>
					</div>
					<div className="payment-grid">
						<div className="payment-card">
							<div className="payment-icon simple-icon">
								<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<line x1="12" y1="1" x2="12" y2="23"/>
									<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
								</svg>
							</div>
							<h4>Simple SOS</h4>
							<div className="payment-amount">₹150 <span>per mission</span></div>
						</div>
						<div className="payment-card">
							<div className="payment-icon critical-icon">
								<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<line x1="12" y1="1" x2="12" y2="23"/>
									<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
								</svg>
							</div>
							<h4>Critical SOS</h4>
							<div className="payment-amount">₹500 <span>per mission</span></div>
						</div>
					</div>
					<div className="payment-benefits">
						<div className="benefit-item">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
								<path d="M9 12l2 2 4-4"/>
							</svg>
							<span>Insurance, safety gear, and training provided by us</span>
						</div>
						<div className="benefit-item">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<circle cx="12" cy="12" r="10"/>
								<path d="M12 6v6l4 2"/>
							</svg>
							<span>Transparent & fair earnings model</span>
						</div>
						<div className="benefit-item">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
							</svg>
							<span>Guards only get paid when they perform</span>
						</div>
					</div>
				</div>

				{/* App Download Section */}
				<div className="app-download-section scroll-reveal">
					<div className="download-glow"></div>
					<div className="download-content">
						<div className="download-header">
							<div className="download-badge">
								<span className="badge-pulse-dot"></span>
								<span>📱 COMING SOON</span>
							</div>
							<h3 className="download-title">Get Watchpoint SOS</h3>
							<p className="download-subtitle">
								Download the app and experience next-generation personal safety. 
								Available on iOS and Android — launching January 2nd, 2026.
							</p>
						</div>
						
						<div className="download-buttons">
							<a href="#" className="store-button app-store-btn">
								<div className="store-icon">
									<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
										<path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
									</svg>
								</div>
								<div className="store-text">
									<span className="store-label">Download on the</span>
									<span className="store-name">App Store</span>
								</div>
							</a>
							
							<a href="#" className="store-button play-store-btn">
								<div className="store-icon">
									<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
										<path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
									</svg>
								</div>
								<div className="store-text">
									<span className="store-label">Get it on</span>
									<span className="store-name">Google Play</span>
								</div>
							</a>
						</div>
						
						<div className="download-features">
							<div className="download-feature">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
								</svg>
								<span>Secure & Private</span>
							</div>
							<div className="download-feature">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
								</svg>
								<span>Instant Response</span>
							</div>
							<div className="download-feature">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<circle cx="12" cy="12" r="10"/>
									<path d="M12 6v6l4 2"/>
								</svg>
								<span>24/7 Available</span>
							</div>
						</div>
					</div>
				</div>

				{/* B2B Pricing Section */}
				<div className="b2b-pricing-section scroll-reveal">
					<div className="b2b-header">
						<div className="b2b-badge">
							<span>🏢</span>
							FOR BUSINESSES
						</div>
						<h3 className="b2b-title">Security Guard Provider Solutions</h3>
						<p className="b2b-subtitle">Enterprise-grade platform for security companies to manage and deploy their workforce</p>
					</div>
					<div className="b2b-cta-card">
						<div className="b2b-content">
							<h4>Transform Your Security Business</h4>
							<p>Join the future of on-demand security services. Our B2B SaaS platform helps security guard companies:</p>
							<div className="b2b-features">
								<div className="b2b-feature">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Manage guard deployment efficiently</span>
								</div>
								<div className="b2b-feature">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Real-time tracking & monitoring</span>
								</div>
								<div className="b2b-feature">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Automated dispatch system</span>
								</div>
								<div className="b2b-feature">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Performance analytics & reporting</span>
								</div>
								<div className="b2b-feature">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Revenue optimization tools</span>
								</div>
								<div className="b2b-feature">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									<span>Integration with existing systems</span>
								</div>
							</div>
						</div>
						<div className="b2b-cta">
							<button className="b2b-contact-btn">
								<span>Contact Sales</span>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<line x1="5" y1="12" x2="19" y2="12"/>
									<polyline points="12 5 19 12 12 19"/>
								</svg>
							</button>
							<p className="b2b-note">Custom pricing based on your fleet size and requirements</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WatchpointSOS;

