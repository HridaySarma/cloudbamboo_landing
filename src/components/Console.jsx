import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logo_gemini.png';
import '../styles/Console.css';

const Console = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeProductSection, setActiveProductSection] = useState('watchpoint');
  const [walletAmount, setWalletAmount] = useState(0);
  const [addAmount, setAddAmount] = useState('');

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinedDate: 'January 15, 2025',
    avatar: '👤'
  };

  // Mock purchased products
  const purchasedProducts = [
    {
      id: 1,
      type: 'watchpoint',
      name: 'WatchPoint Pro',
      description: 'Complete workforce management solution',
      purchaseDate: 'March 10, 2025',
      expiryDate: 'March 10, 2026',
      status: 'Active',
      features: [
        'Real-time employee tracking',
        'Attendance management',
        'Task assignments',
        'Performance analytics',
        'Custom reports'
      ]
    },
    {
      id: 2,
      type: 'chatbot',
      name: 'AI Assistant Premium',
      description: 'Advanced chatbot with Claude 4 Sonnet',
      purchaseDate: 'April 5, 2025',
      expiryDate: 'April 5, 2026',
      status: 'Active',
      features: [
        'Claude 4 Sonnet integration',
        'Custom knowledge base',
        'WhatsApp integration',
        'Unlimited conversations',
        'Analytics dashboard'
      ]
    }
  ];

  // Mock available products
  const availableProducts = {
    watchpoint: [
      {
        id: 101,
        name: 'WatchPoint Basic',
        price: 99,
        billing: 'monthly',
        description: 'Essential workforce management tools for small teams',
        features: [
          'Employee tracking',
          'Basic attendance',
          'Simple reporting',
          '5 team members',
          'Email support'
        ]
      },
      {
        id: 102,
        name: 'WatchPoint Pro',
        price: 199,
        billing: 'monthly',
        description: 'Complete workforce management solution for growing businesses',
        popular: true,
        features: [
          'Real-time employee tracking',
          'Advanced attendance management',
          'Task assignments',
          'Performance analytics',
          'Custom reports',
          '25 team members',
          'Priority support'
        ]
      },
      {
        id: 103,
        name: 'WatchPoint Enterprise',
        price: 499,
        billing: 'monthly',
        description: 'Full-featured workforce solution for large organizations',
        features: [
          'All Pro features',
          'Custom integrations',
          'Advanced analytics',
          'Dedicated account manager',
          'White-label option',
          'Unlimited team members',
          '24/7 premium support'
        ]
      }
    ],
    chatbot: [
      {
        id: 201,
        name: 'AI Assistant Basic',
        price: 49,
        billing: 'monthly',
        description: 'Entry-level AI chatbot for simple customer interactions',
        features: [
          'GPT-based responses',
          'Basic customization',
          'Web integration',
          '1,000 messages/month',
          'Email support'
        ]
      },
      {
        id: 202,
        name: 'AI Assistant Premium',
        price: 149,
        billing: 'monthly',
        description: 'Advanced chatbot with cutting-edge AI models',
        popular: true,
        features: [
          'Claude 4 Sonnet integration',
          'Custom knowledge base',
          'WhatsApp integration',
          'Unlimited conversations',
          'Analytics dashboard',
          'Priority support'
        ]
      },
      {
        id: 203,
        name: 'AI Assistant Enterprise',
        price: 349,
        billing: 'monthly',
        description: 'Enterprise-grade AI assistant with full customization',
        features: [
          'All Premium features',
          'Custom AI model training',
          'Multiple chatbot personas',
          'Advanced integrations',
          'Dedicated account manager',
          'Premium support'
        ]
      }
    ]
  };

  // Handle adding money to wallet
  const handleAddMoney = (e) => {
    e.preventDefault();
    const amount = parseFloat(addAmount);
    if (!isNaN(amount) && amount > 0) {
      setWalletAmount(walletAmount + amount);
      setAddAmount('');
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="console-page">
      {/* Header */}
      <header className="console-header">
        <div className="console-nav">
          <Link to="/" className="console-logo">
            <img src={logoImage} alt="CloudBamboo" className="logo-image" />
            <span className="logo-text">CloudBamboo</span>
          </Link>
          <div className="console-user-info">
            <div className="user-avatar">{user.avatar}</div>
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <div className="wallet-balance">
              <span className="balance-label">Wallet:</span>
              <span className="balance-amount">{formatCurrency(walletAmount)}</span>
            </div>
            <Link to="/" className="home-link">Home</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="console-main">
        {/* Sidebar */}
        <div className="console-sidebar">
          <div className="sidebar-menu">
            <button
              className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <span className="item-icon">📊</span>
              <span className="item-text">Dashboard</span>
            </button>
            <button
              className={`sidebar-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <span className="item-icon">🛒</span>
              <span className="item-text">Products</span>
            </button>
            <button
              className={`sidebar-item ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <span className="item-icon">👤</span>
              <span className="item-text">Account</span>
            </button>
            <button
              className={`sidebar-item ${activeTab === 'wallet' ? 'active' : ''}`}
              onClick={() => setActiveTab('wallet')}
            >
              <span className="item-icon">💰</span>
              <span className="item-text">Wallet</span>
            </button>
            <button
              className={`sidebar-item ${activeTab === 'support' ? 'active' : ''}`}
              onClick={() => setActiveTab('support')}
            >
              <span className="item-icon">📞</span>
              <span className="item-text">Support</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="console-content">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-tab">
              <h2>Welcome back, {user.name}!</h2>

              <div className="dashboard-summary">
                <div className="summary-card">
                  <div className="card-header">
                    <span className="card-icon">🧰</span>
                    <h3>My Products</h3>
                  </div>
                  <div className="card-content">
                    <p className="card-value">{purchasedProducts.length}</p>
                    <p className="card-label">Active Subscriptions</p>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="card-header">
                    <span className="card-icon">💰</span>
                    <h3>Wallet Balance</h3>
                  </div>
                  <div className="card-content">
                    <p className="card-value">{formatCurrency(walletAmount)}</p>
                    <p className="card-label">Available Funds</p>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="card-header">
                    <span className="card-icon">📅</span>
                    <h3>Next Renewal</h3>
                  </div>
                  <div className="card-content">
                    <p className="card-value">March 10, 2026</p>
                    <p className="card-label">WatchPoint Pro</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-products">
                <h3>Your Products</h3>
                <div className="products-grid">
                  {purchasedProducts.map(product => (
                    <div className="product-card" key={product.id}>
                      <div className={`product-icon ${product.type}`}>
                        {product.type === 'watchpoint' ? '🔍' : '🤖'}
                      </div>
                      <div className="product-info">
                        <h4>{product.name}</h4>
                        <p className="product-description">{product.description}</p>
                        <div className="product-meta">
                          <span className="meta-item">
                            <span className="meta-label">Status:</span>
                            <span className="meta-value status-active">{product.status}</span>
                          </span>
                          <span className="meta-item">
                            <span className="meta-label">Expires:</span>
                            <span className="meta-value">{product.expiryDate}</span>
                          </span>
                        </div>
                        <button className="product-btn">Manage</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="products-tab">
              <h2>Available Products</h2>

              <div className="product-categories">
                <button
                  className={`category-btn ${activeProductSection === 'watchpoint' ? 'active' : ''}`}
                  onClick={() => setActiveProductSection('watchpoint')}
                >
                  <span className="category-icon">🔍</span>
                  <span className="category-name">WatchPoint</span>
                </button>
                <button
                  className={`category-btn ${activeProductSection === 'chatbot' ? 'active' : ''}`}
                  onClick={() => setActiveProductSection('chatbot')}
                >
                  <span className="category-icon">🤖</span>
                  <span className="category-name">AI Chatbots</span>
                </button>
              </div>

              {activeProductSection === 'watchpoint' && (
                <div className="product-section">
                  <div className="section-header">
                    <h3>WatchPoint - Workforce Management Solution</h3>
                    <p>Powerful tools to manage and optimize your workforce</p>
                  </div>

                  <div className="pricing-cards">
                    {availableProducts.watchpoint.map(plan => (
                      <div className={`pricing-card ${plan.popular ? 'popular' : ''}`} key={plan.id}>
                        {plan.popular && <div className="popular-badge">Popular Choice</div>}
                        <h4 className="plan-name">{plan.name}</h4>
                        <div className="plan-price">
                          <span className="price">{formatCurrency(plan.price)}</span>
                          <span className="billing-cycle">/{plan.billing}</span>
                        </div>
                        <p className="plan-description">{plan.description}</p>
                        <ul className="plan-features">
                          {plan.features.map((feature, index) => (
                            <li key={index}>✓ {feature}</li>
                          ))}
                        </ul>
                        <button className="plan-btn">Select Plan</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeProductSection === 'chatbot' && (
                <div className="product-section">
                  <div className="section-header">
                    <h3>AI Chatbots - Intelligent Customer Interactions</h3>
                    <p>AI-powered chatbots for exceptional customer experiences</p>
                  </div>

                  <div className="pricing-cards">
                    {availableProducts.chatbot.map(plan => (
                      <div className={`pricing-card ${plan.popular ? 'popular' : ''}`} key={plan.id}>
                        {plan.popular && <div className="popular-badge">Popular Choice</div>}
                        <h4 className="plan-name">{plan.name}</h4>
                        <div className="plan-price">
                          <span className="price">{formatCurrency(plan.price)}</span>
                          <span className="billing-cycle">/{plan.billing}</span>
                        </div>
                        <p className="plan-description">{plan.description}</p>
                        <ul className="plan-features">
                          {plan.features.map((feature, index) => (
                            <li key={index}>✓ {feature}</li>
                          ))}
                        </ul>
                        <button className="plan-btn">Select Plan</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="account-tab">
              <h2>Account Settings</h2>

              <div className="account-details">
                <div className="account-section">
                  <h3>Personal Information</h3>
                  <form className="account-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" defaultValue={user.name} />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" defaultValue={user.email} />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="tel" placeholder="Enter phone number" />
                    </div>
                    <button type="submit" className="form-btn">Update Information</button>
                  </form>
                </div>

                <div className="account-section">
                  <h3>Password & Security</h3>
                  <form className="account-form">
                    <div className="form-group">
                      <label>Current Password</label>
                      <input type="password" placeholder="Enter current password" />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input type="password" placeholder="Enter new password" />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input type="password" placeholder="Confirm new password" />
                    </div>
                    <button type="submit" className="form-btn">Change Password</button>
                  </form>
                </div>

                <div className="account-section">
                  <h3>Company Details</h3>
                  <form className="account-form">
                    <div className="form-group">
                      <label>Company Name</label>
                      <input type="text" placeholder="Enter company name" />
                    </div>
                    <div className="form-group">
                      <label>Industry</label>
                      <select>
                        <option value="">Select industry</option>
                        <option value="tech">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Company Size</label>
                      <select>
                        <option value="">Select company size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501+">501+ employees</option>
                      </select>
                    </div>
                    <button type="submit" className="form-btn">Save Details</button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Wallet Tab */}
          {activeTab === 'wallet' && (
            <div className="wallet-tab">
              <h2>Wallet Management</h2>

              <div className="wallet-overview">
                <div className="wallet-balance-card">
                  <h3>Current Balance</h3>
                  <div className="balance-amount-large">{formatCurrency(walletAmount)}</div>
                  <p className="balance-info">Last updated: Today, 12:30 PM</p>
                </div>
              </div>

              <div className="wallet-actions">
                <div className="wallet-section">
                  <h3>Add Money</h3>
                  <form className="wallet-form" onSubmit={handleAddMoney}>
                    <div className="form-group">
                      <label>Amount</label>
                      <div className="amount-input-wrapper">
                        <span className="currency-symbol">$</span>
                        <input
                          type="number"
                          placeholder="0.00"
                          min="1"
                          step="0.01"
                          value={addAmount}
                          onChange={(e) => setAddAmount(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="quick-amounts">
                      <button type="button" className="amount-btn" onClick={() => setAddAmount('100')}>$100</button>
                      <button type="button" className="amount-btn" onClick={() => setAddAmount('200')}>$200</button>
                      <button type="button" className="amount-btn" onClick={() => setAddAmount('500')}>$500</button>
                      <button type="button" className="amount-btn" onClick={() => setAddAmount('1000')}>$1,000</button>
                    </div>
                    <div className="form-group">
                      <label>Payment Method</label>
                      <select required>
                        <option value="">Select payment method</option>
                        <option value="visa">Visa ending in 4242</option>
                        <option value="mastercard">Mastercard ending in 5555</option>
                        <option value="new">+ Add new payment method</option>
                      </select>
                    </div>
                    <button type="submit" className="form-btn">Add Money</button>
                  </form>
                </div>

                <div className="wallet-section">
                  <h3>Transaction History</h3>
                  <div className="transaction-list">
                    <div className="transaction-item">
                      <div className="transaction-icon deposit">↓</div>
                      <div className="transaction-details">
                        <div className="transaction-title">Wallet Deposit</div>
                        <div className="transaction-date">August 15, 2025</div>
                      </div>
                      <div className="transaction-amount deposit">+$500.00</div>
                    </div>
                    <div className="transaction-item">
                      <div className="transaction-icon payment">↑</div>
                      <div className="transaction-details">
                        <div className="transaction-title">WatchPoint Pro Subscription</div>
                        <div className="transaction-date">August 10, 2025</div>
                      </div>
                      <div className="transaction-amount payment">-$199.00</div>
                    </div>
                    <div className="transaction-item">
                      <div className="transaction-icon deposit">↓</div>
                      <div className="transaction-details">
                        <div className="transaction-title">Wallet Deposit</div>
                        <div className="transaction-date">July 28, 2025</div>
                      </div>
                      <div className="transaction-amount deposit">+$300.00</div>
                    </div>
                    <div className="transaction-item">
                      <div className="transaction-icon payment">↑</div>
                      <div className="transaction-details">
                        <div className="transaction-title">AI Assistant Premium Subscription</div>
                        <div className="transaction-date">July 5, 2025</div>
                      </div>
                      <div className="transaction-amount payment">-$149.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div className="support-tab">
              <h2>Customer Support</h2>

              <div className="support-options">
                <div className="support-card">
                  <div className="support-icon">📞</div>
                  <h3>Contact Us</h3>
                  <p>Speak directly with our customer support team</p>
                  <div className="contact-info">
                    <div className="contact-item">
                      <span className="contact-label">Email:</span>
                      <span className="contact-value">support@cloudbamboo.com</span>
                    </div>
                    <div className="contact-item">
                      <span className="contact-label">Phone:</span>
                      <span className="contact-value">+1 (555) 123-4567</span>
                    </div>
                    <div className="contact-item">
                      <span className="contact-label">Hours:</span>
                      <span className="contact-value">Mon-Fri, 9AM-6PM EST</span>
                    </div>
                  </div>
                </div>

                <div className="support-card">
                  <div className="support-icon">📝</div>
                  <h3>Submit a Ticket</h3>
                  <p>Create a support ticket for technical issues</p>
                  <button className="support-btn">Create Ticket</button>
                </div>

                <div className="support-card">
                  <div className="support-icon">📚</div>
                  <h3>Knowledge Base</h3>
                  <p>Browse our help articles and tutorials</p>
                  <button className="support-btn">View Articles</button>
                </div>
              </div>

              <div className="faq-section">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-list">
                  <div className="faq-item">
                    <h4>How do I integrate WatchPoint with my existing HR system?</h4>
                    <p>WatchPoint offers API integration with popular HR systems. Navigate to Settings > Integrations in your WatchPoint dashboard to set up the connection.</p>
                  </div>
                  <div className="faq-item">
                    <h4>Can I customize my AI chatbot's responses?</h4>
                    <p>Yes, you can train your AI chatbot with custom knowledge and response patterns through our training interface. Go to AI Assistant > Training in your dashboard.</p>
                  </div>
                  <div className="faq-item">
                    <h4>How do I add team members to my account?</h4>
                    <p>You can invite team members by going to Account > Team Management and clicking on "Invite Member".</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Console;
