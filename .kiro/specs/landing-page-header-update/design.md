# Design Document: Landing Page Header Update

## Overview

This design updates the HeroSection component to transform the landing page from a B2B-only focus to a comprehensive presentation of CloudBamboo Digital's dual product offerings:

1. **WatchPoint** (B2B) - SaaS platform for security workforce management
2. **Watchpoint SOS** (B2C) - On-demand personal security with guards and AI drones

The updated hero section will communicate the company's full technology stack (software, AI, drones) while providing clear navigation paths for both business and individual customers.

## Architecture

The update follows the existing React component architecture:

```
src/
├── components/
│   └── HeroSection.jsx  (modified)
└── App.css              (modified - hero styles)
```

The HeroSection component remains a functional React component with internal scroll handlers. No new dependencies or architectural changes are required.

## Components and Interfaces

### HeroSection Component

**Current Structure:**
- Single headline focused on B2B SaaS
- Single subtitle about business software
- Single CTA button

**Updated Structure:**
```jsx
HeroSection
├── hero-content
│   ├── hero-tagline (new - company positioning)
│   ├── hero-title (updated - broader scope)
│   ├── hero-subtitle (updated - dual offering)
│   ├── hero-features (new - technology badges: AI, Drones, Software)
│   └── hero-cta-group (new - dual CTAs)
│       ├── primary-cta (B2B - WatchPoint)
│       └── secondary-cta (B2C - Watchpoint SOS)
└── hero-animation (existing - visual element)
```

### Component Props

No props required - component is self-contained with internal state for scroll handlers.

### Internal Functions

```typescript
scrollToWatchPoint(): void
// Scrolls to #watchpoint section (B2B)

scrollToWatchPointSOS(): void  // NEW
// Scrolls to #watchpoint-sos section (B2C)
```

## Data Models

No data models required - this is a presentational component with static content.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the prework analysis, most acceptance criteria are content verification tests (examples) rather than universal properties. The testable criteria verify specific content presence in the rendered component.

**Property 1: Hero section contains required content elements**
*For any* render of the HeroSection component, the rendered output should contain: (a) text indicating B2B offerings, (b) text indicating B2C offerings, (c) reference to AI technology, (d) reference to drone technology, (e) a CTA linking to the WatchPoint section, and (f) a CTA linking to the Watchpoint SOS section.
**Validates: Requirements 1.1, 1.2, 2.1, 3.1, 4.1, 4.2**

**Property 2: CTA scroll navigation functions correctly**
*For any* click on a CTA button in the HeroSection, the page should scroll to the corresponding section element (WatchPoint CTA → #watchpoint, Watchpoint SOS CTA → #watchpoint-sos).
**Validates: Requirements 2.2, 3.2, 6.2**

## Error Handling

This is a presentational component with minimal error scenarios:

1. **Missing scroll targets**: If target sections (#watchpoint, #watchpoint-sos) don't exist, scroll functions should fail silently (current behavior with optional chaining)
2. **Animation failures**: CSS animations should use `will-change` and hardware acceleration to prevent jank; fallback to static display if animations fail

## Testing Strategy

### Unit Tests
- Verify HeroSection renders without errors
- Verify all required text content is present in the rendered output
- Verify both CTA buttons are rendered with correct attributes

### Property-Based Tests
Using **Vitest** with **@fast-check/vitest** for property-based testing:

- **Property 1**: Test that the component always renders with all required content elements regardless of any future prop variations
- **Property 2**: Test that scroll functions are called with correct element IDs

Each property-based test will be tagged with: `**Feature: landing-page-header-update, Property {number}: {property_text}**`

Property tests should run a minimum of 100 iterations.

### Integration Tests (Manual)
- Visual verification on desktop (1920px, 1440px, 1024px)
- Visual verification on mobile (375px, 414px)
- Smooth scroll behavior verification
- Animation performance check

## UI/UX Design

### Content Structure

**Tagline (new):**
```
"Security Reimagined"
```

**Headline (updated):**
```
"AI-Powered Security for Businesses & Individuals"
```

**Subtitle (updated):**
```
"From enterprise workforce management to on-demand personal protection — 
CloudBamboo Digital delivers cutting-edge security solutions powered by 
AI, drones, and trained professionals."
```

**Technology Badges (new):**
- 🤖 AI-Powered
- 🚁 Drone Response
- 💼 Enterprise SaaS
- 🛡️ Personal Safety

**CTAs:**
- Primary: "For Businesses" → scrolls to #watchpoint
- Secondary: "Personal Safety" → scrolls to #watchpoint-sos

### Visual Design

- Maintain existing dark theme and gradient styling
- Keep existing animation (saas-weave-animation)
- Add subtle badge styling for technology indicators
- Use existing button styles with primary/secondary variants
- Ensure adequate contrast for accessibility (WCAG AA)

### Responsive Behavior

**Desktop (>768px):**
- CTAs displayed side-by-side
- Technology badges in horizontal row
- Full headline and subtitle

**Mobile (≤768px):**
- CTAs stacked vertically
- Technology badges wrap to 2x2 grid
- Headline may break to multiple lines
- Subtitle remains readable with appropriate line height
