import React, { useState } from 'react';
import attendanceDemo from '../assets/attendance_demo.png';
import './WatchPointPlans.css';

const plans = [
	{
		name: 'Vigilance',
		tagline: 'Essential Management & Tracking',
		price: 99,
		features: [
			'Staff Onboarding',
			'Attendance Tracking',
			'Scheduling & Assignments',
			'Client Management',
			'Basic Analytics & Reports',
			'User Roles & Permissions',
			'Document Management',
			'Shift Management',
			'Leave Management',
			'Resignation Management',
			'Mobile App Access',
			'Geo-fencing',
		],
		icon: '🛡️',
		color: '#667eea',
		discounts: [
			{ users: 100, percent: 5 },
			{ users: 200, percent: 10 },
			{ users: 500, percent: 20 },
			{ users: 1000, percent: 30 },
		],
	},
	{
		name: 'Sentinel',
		tagline: 'Advanced Operations & Finance',
		price: 199,
		features: [
			'All Vigilance Features',
			'Notifications',
			'Payroll Automation',
			'Invoicing',
			'Advance Salary Management',
			'Sales Management',
			'Expense Tracking',
			'Tax Calculations',
			'Financial Dashboards',
		],
		icon: '💳',
		color: '#4ecdc4',
		discounts: [
			{ users: 100, percent: 5 },
			{ users: 200, percent: 10 },
			{ users: 500, percent: 20 },
			{ users: 1000, percent: 30 },
		],
	},
	{
		name: 'Guardian',
		tagline: 'Live Intelligence & Emergency Response',
		price: 399,
		features: [
			'All Sentinel Features',
			'Live Tracking (GPS)',
			'Live Reports & Dashboards',
			'In-app Chat & Messaging',
			'Emergency Services (SOS, Panic Button)',
			'Incident Reporting',
			'Real-time Alerts',
			'Video & Photo Uploads',
		],
		icon: '🚨',
		color: '#ff6b6b',
		discounts: [
			{ users: 100, percent: 5 },
			{ users: 200, percent: 10 },
			{ users: 500, percent: 20 },
			{ users: 1000, percent: 30 },
		],
	},
];

const WatchPointPlans = () => {
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isContactFormOpen, setIsContactFormOpen] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState(null);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		message: ''
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState(null);

	const openFullscreen = () => {
		setIsFullscreen(true);
	};

	const closeFullscreen = () => {
		setIsFullscreen(false);
	};

	const openContactForm = (plan) => {
		setSelectedPlan(plan);
		setIsContactFormOpen(true);
		setFormData(prev => ({
			...prev,
			message: `I'm interested in the ${plan.name} plan (₹${plan.price}/user/month). Please get in touch with me.`
		}));
	};

	const closeContactForm = () => {
		setIsContactFormOpen(false);
		setSelectedPlan(null);
		setSubmitStatus(null);
		setFormData({
			name: '',
			email: '',
			phone: '',
			message: ''
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus(null);

		try {
			// Create a mailto link that opens the user's email client
			const subject = `WatchPoint ${selectedPlan.name} Plan Inquiry`;
			const body = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Selected Plan: ${selectedPlan.name} (₹${selectedPlan.price}/user/month)

Message:
${formData.message}

--
This inquiry was submitted through the WatchPoint website.`;

			const mailtoLink = `mailto:hq@cloudbamboo.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
			window.location.href = mailtoLink;

			setSubmitStatus('success');
			setTimeout(() => {
				closeContactForm();
			}, 2000);

		} catch (error) {
			console.error('Error submitting form:', error);
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
		}
	};

	// Handle ESC key press
	React.useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.key === 'Escape') {
				if (isContactFormOpen) {
					closeContactForm();
				} else if (isFullscreen) {
					closeFullscreen();
				}
			}
		};

		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [isFullscreen, isContactFormOpen]);

	// Prevent body scroll when fullscreen or contact form is open
	React.useEffect(() => {
		if (isFullscreen || isContactFormOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isFullscreen, isContactFormOpen]);

	return (
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
				<div className="watchpoint-title-container">
					<div className="watchpoint-title-decoration left"></div>
					<h2 className="section-title">
						<span className="creative-watchpoint">
							<span className="letter w white-shade-1">W</span>
							<span className="letter a white-shade-2">a</span>
							<span className="letter t white-shade-3">t</span>
							<span className="letter c white-shade-4">c</span>
							<span className="letter h white-shade-5">h</span>
							<span className="letter p white-shade-6">P</span>
							<span className="letter o white-shade-7">o</span>
							<span className="letter i white-shade-8">i</span>
							<span className="letter n white-shade-9">n</span>
							<span className="letter t2 white-shade-10">t</span>
						</span>
					</h2>
					<div className="watchpoint-title-decoration right"></div>
				</div>
				<p className="section-subtitle">
					<span className="subtitle-highlight">A powerful Workforce Management System</span> designed to streamline
					operations for any business with workforce management needs. WatchPoint provides a
					<span className="subtitle-emphasis"> centralized platform</span> for everything from
					<span className="subtitle-feature">staff onboarding</span> and
					<span className="subtitle-feature">real-time attendance</span> to
					<span className="subtitle-feature">automated payroll</span> and
					<span className="subtitle-feature">invoicing</span>.
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
								src={attendanceDemo}
								className="mockup-iframe"
								alt="WatchPoint Attendance Dashboard Demo"
								loading="lazy"
								onClick={openFullscreen}
								style={{ cursor: 'pointer' }}
								title="Click to view fullscreen"
							/>
						</div>
					</div>
				</div>
				<div className="dashboard-features">
					<div className="dashboard-feature">
						<div className="feature-check">✓</div>
						<div className="feature-content">
							<h4>Real-time Monitoring</h4>
							<p>
								Track your entire workforce in real-time with live location
								updates and instant notifications.
							</p>
						</div>
					</div>
					<div className="dashboard-feature">
						<div className="feature-check">✓</div>
						<div className="feature-content">
							<h4>Automated Workflows</h4>
							<p>
								From scheduling to payroll, automate repetitive tasks and focus
								on growing your business.
							</p>
						</div>
					</div>
					<div className="dashboard-feature">
						<div className="feature-check">✓</div>
						<div className="feature-content">
							<h4>Comprehensive Analytics</h4>
							<p>
								Get deep insights into your operations with customizable
								dashboards and detailed reports.
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* Enhanced Plans Section */}
			<div className="watchpoint-plans scroll-reveal">
				<h3 className="plans-title">
					<span className="plans-title-decoration">
						<span className="plans-title-line"></span>
						<span className="plans-title-icon">⚡</span>
						<span className="plans-title-line"></span>
					</span>
					<span className="plans-title-text">
						<span className="plans-title-choose">Choose Your</span>
						<span className="plans-title-watchpoint">WatchPoint</span>
						<span className="plans-title-power">Power Plan</span>
					</span>
				</h3>

				<div className="plans-grid">
					{plans.map((plan, idx) => (
						<div
							className={`plan-card enhanced-plan-card${
								idx === 2 ? ' recommended' : ''
							}`}
							key={plan.name}
							style={{ '--plan-color': plan.color }}
						>
							<div className="plan-header">
								<span
									className="plan-icon"
									style={{
										background: `linear-gradient(135deg, ${plan.color} 60%, #fff 100%)`,
									}}
								>
									{plan.icon}
								</span>
								<h4 className="plan-name">{plan.name}</h4>
								<span className="plan-tagline">{plan.tagline}</span>
								{idx === 2 && (
									<span className="plan-badge">Most Popular</span>
								)}

								<div className="price-container">
									<span className="price-currency">₹</span>
									<span className="price-amount">{plan.price}</span>
									<div className="price-details">
										<span className="price-period">per user / month</span>
									</div>
								</div>

								<div className="discount-container">
									<div className="discount-toggle">
										<span>Volume Discounts</span>
										<span className="discount-arrow">▼</span>
									</div>
									<div className="discount-table">
										{plan.discounts.map((discount, i) => (
											<div className="discount-row" key={i}>
												<span className="discount-users">
													{discount.users}+ users
												</span>
												<span className="discount-percent">
													{discount.percent}% off
												</span>
											</div>
										))}
									</div>
								</div>
							</div>
							<ul className="plan-features">
								{plan.features.map((feature, i) => (
									<li key={i} className="plan-feature">
										<span className="feature-check">✔</span>
										<span className="feature-text">{feature}</span>
									</li>
								))}
							</ul>
							<div className="plan-footer">
								<button 
									className="plan-cta-btn"
									onClick={() => openContactForm(plan)}
								>
									Get Started
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			{/* ...existing code for workflow, modules, CTA... */}
		</div>

		{/* Fullscreen Modal */}
		{isFullscreen && (
			<div 
				className="fullscreen-modal"
				onClick={closeFullscreen}
			>
				<div 
					className="fullscreen-content"
					onClick={(e) => e.stopPropagation()}
				>
					<button 
						className="fullscreen-close"
						onClick={closeFullscreen}
						aria-label="Close fullscreen"
					>
						×
					</button>
					<img
						src={attendanceDemo}
						alt="WatchPoint Attendance Dashboard Demo - Fullscreen"
						className="fullscreen-image"
					/>
				</div>
			</div>
		)}

		{/* Contact Form Modal */}
		{isContactFormOpen && (
			<div 
				className="contact-form-modal"
				onClick={closeContactForm}
			>
				<div 
					className="contact-form-content"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="contact-form-header">
						<h3 className="contact-form-title">
							Get Started with {selectedPlan?.name}
						</h3>
						<p className="contact-form-subtitle">
							Fill out the form below and we'll get back to you shortly
						</p>
						<button 
							className="contact-form-close"
							onClick={closeContactForm}
							aria-label="Close contact form"
						>
							×
						</button>
					</div>

					<form className="contact-form" onSubmit={handleSubmit}>
						<div className="form-row">
							<div className="form-group">
								<label htmlFor="name" className="form-label">
									Full Name *
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									className="form-input"
									placeholder="Enter your full name"
									required
								/>
							</div>
						</div>

						<div className="form-row">
							<div className="form-group">
								<label htmlFor="email" className="form-label">
									Email Address *
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									className="form-input"
									placeholder="Enter your email address"
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="phone" className="form-label">
									Phone Number
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									value={formData.phone}
									onChange={handleInputChange}
									className="form-input"
									placeholder="Enter your phone number"
								/>
							</div>
						</div>

						<div className="form-row">
							<div className="form-group">
								<label htmlFor="message" className="form-label">
									Message
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleInputChange}
									className="form-textarea"
									placeholder="Tell us about your requirements..."
									rows="4"
								/>
							</div>
						</div>

						{submitStatus && (
							<div className={`form-status ${submitStatus}`}>
								{submitStatus === 'success' ? (
									<>
										<span className="status-icon">✓</span>
										Thank you! Your email client should open shortly with your inquiry.
									</>
								) : (
									<>
										<span className="status-icon">⚠</span>
										Something went wrong. Please try again or contact us directly.
									</>
								)}
							</div>
						)}

						<div className="form-actions">
							<button
								type="button"
								className="btn-secondary"
								onClick={closeContactForm}
								disabled={isSubmitting}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="btn-primary"
								disabled={isSubmitting || !formData.name || !formData.email}
							>
								{isSubmitting ? (
									<>
										<span className="spinner"></span>
										Submitting...
									</>
								) : (
									'Send Inquiry'
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		)}
	</section>
	);
};

export default WatchPointPlans;
