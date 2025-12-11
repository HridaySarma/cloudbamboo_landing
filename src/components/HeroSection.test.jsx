import { describe, expect, afterEach, vi, it } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { test } from '@fast-check/vitest';
import fc from 'fast-check';
import HeroSection from './HeroSection';

/**
 * **Feature: landing-page-header-update, Property 1: Hero section contains required content elements**
 * **Validates: Requirements 1.1, 1.2, 2.1, 3.1, 4.1, 4.2**
 * 
 * *For any* render of the HeroSection component, the rendered output should contain:
 * (a) text indicating B2B offerings
 * (b) text indicating B2C offerings  
 * (c) reference to AI technology
 * (d) reference to drone technology
 * (e) a CTA linking to the WatchPoint section
 * (f) a CTA linking to the Watchpoint SOS section
 */

// Import App component which contains the hero section inline
import App from '../App';

/**
 * Unit Tests for HeroSection Component
 * These tests verify basic rendering and content requirements.
 */
describe('HeroSection Unit Tests', () => {
  afterEach(() => {
    cleanup();
  });

  // 4.1 Test that HeroSection renders without errors
  it('renders without errors', () => {
    expect(() => render(<HeroSection />)).not.toThrow();
  });

  // 4.2 Test that all required text content is present
  describe('required text content', () => {
    it('displays the tagline', () => {
      render(<HeroSection />);
      expect(screen.getByText('Security Reimagined')).toBeInTheDocument();
    });

    it('displays the headline with B2B and B2C scope', () => {
      render(<HeroSection />);
      expect(screen.getByText('AI-Powered Security for Businesses & Individuals')).toBeInTheDocument();
    });

    it('displays the subtitle with enterprise and personal offerings', () => {
      render(<HeroSection />);
      expect(screen.getByText(/enterprise workforce management/i)).toBeInTheDocument();
      expect(screen.getByText(/on-demand personal protection/i)).toBeInTheDocument();
    });

    it('displays all technology badges', () => {
      render(<HeroSection />);
      // Use more specific selectors to target badges (which include emojis)
      expect(screen.getByText(/🤖 AI-Powered/)).toBeInTheDocument();
      expect(screen.getByText(/🚁 Drone Response/)).toBeInTheDocument();
      expect(screen.getByText(/💼 Enterprise SaaS/)).toBeInTheDocument();
      expect(screen.getByText(/🛡️ Personal Safety/)).toBeInTheDocument();
    });
  });

  // 4.3 Test that both CTA buttons are rendered with correct attributes
  describe('CTA buttons', () => {
    it('renders the "For Businesses" CTA button', () => {
      render(<HeroSection />);
      const businessCta = screen.getByRole('button', { name: /for businesses/i });
      expect(businessCta).toBeInTheDocument();
      expect(businessCta).toHaveClass('hero-cta-primary');
    });

    it('renders the "Personal Safety" CTA button', () => {
      render(<HeroSection />);
      const personalCta = screen.getByRole('button', { name: /personal safety/i });
      expect(personalCta).toBeInTheDocument();
      expect(personalCta).toHaveClass('hero-cta-secondary');
    });

    it('both CTAs have the base hero-cta class', () => {
      render(<HeroSection />);
      const businessCta = screen.getByRole('button', { name: /for businesses/i });
      const personalCta = screen.getByRole('button', { name: /personal safety/i });
      expect(businessCta).toHaveClass('hero-cta');
      expect(personalCta).toHaveClass('hero-cta');
    });
  });
});

describe('HeroSection Content Properties', () => {
  // Clean up after each test to prevent duplicate elements
  afterEach(() => {
    cleanup();
  });

  /**
   * Property 1: Hero section contains required content elements
   * This property test verifies that regardless of render conditions,
   * the hero section always contains all required content elements.
   * 
   * Note: Since the hero section is a static component with no props,
   * we run 100 iterations to verify consistent behavior across renders.
   * The timeout is extended due to the complexity of rendering the full App.
   */
  test.prop(
    [fc.constant(null)], // We use a constant since the component has no props
    { numRuns: 100, timeout: 60000 }
  )('Property 1: Hero section contains required content elements', () => {
    // Clean up before each property test iteration
    cleanup();
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // (a) Text indicating B2B offerings - "Businesses" in headline
    const businessTexts = screen.getAllByText(/businesses/i);
    expect(businessTexts.length).toBeGreaterThan(0);

    // (b) Text indicating B2C offerings - "Individuals" or "Personal" 
    const personalTexts = screen.getAllByText(/individuals|personal/i);
    expect(personalTexts.length).toBeGreaterThan(0);

    // (c) Reference to AI technology
    const aiTexts = screen.getAllByText(/ai-powered/i);
    expect(aiTexts.length).toBeGreaterThan(0);

    // (d) Reference to drone technology
    const droneTexts = screen.getAllByText(/drone/i);
    expect(droneTexts.length).toBeGreaterThan(0);

    // (e) CTA linking to WatchPoint section (B2B) - button with "For Businesses"
    const b2bCtas = screen.getAllByRole('button', { name: /for businesses/i });
    expect(b2bCtas.length).toBeGreaterThan(0);

    // (f) CTA linking to Watchpoint SOS section (B2C) - button with "Personal Safety"
    const b2cCtas = screen.getAllByRole('button', { name: /personal safety/i });
    expect(b2cCtas.length).toBeGreaterThan(0);
    
    // Clean up after assertions
    cleanup();
  });
});

/**
 * **Feature: landing-page-header-update, Property 2: CTA scroll navigation functions correctly**
 * **Validates: Requirements 2.2, 3.2, 6.2**
 * 
 * *For any* click on a CTA button in the HeroSection, the page should scroll to the 
 * corresponding section element (WatchPoint CTA → #watchpoint, Watchpoint SOS CTA → #watchpoint-sos).
 */
describe('HeroSection CTA Scroll Navigation Properties', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  /**
   * Property 2: CTA scroll navigation functions correctly
   * This property test verifies that clicking CTA buttons triggers scrollIntoView
   * on the correct target elements.
   */
  test.prop(
    [fc.constantFrom('watchpoint', 'watchpoint-sos')],
    { numRuns: 100, timeout: 60000 }
  )('Property 2: CTA scroll navigation functions correctly', (targetId) => {
    cleanup();
    
    // Create mock target elements
    const mockElement = document.createElement('div');
    mockElement.id = targetId;
    mockElement.scrollIntoView = vi.fn();
    document.body.appendChild(mockElement);

    // Mock getElementById to return our mock element
    const originalGetElementById = document.getElementById;
    document.getElementById = vi.fn((id) => {
      if (id === targetId) {
        return mockElement;
      }
      return originalGetElementById.call(document, id);
    });

    render(<HeroSection />);

    // Find and click the appropriate CTA button
    let ctaButton;
    if (targetId === 'watchpoint') {
      ctaButton = screen.getByRole('button', { name: /for businesses/i });
    } else {
      ctaButton = screen.getByRole('button', { name: /personal safety/i });
    }

    fireEvent.click(ctaButton);

    // Verify scrollIntoView was called with smooth behavior
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    // Cleanup
    document.body.removeChild(mockElement);
    document.getElementById = originalGetElementById;
    cleanup();
  });
});
