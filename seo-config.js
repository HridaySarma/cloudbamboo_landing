// CloudBamboo Digital - SEO Configuration
// Comprehensive SEO settings for maximum search engine visibility

export const seoConfig = {
  // Site Information
  siteName: "CloudBamboo Digital",
  siteUrl: "https://cloudbamboo.com",
  siteDescription: "Leading SaaS development company specializing in workforce management systems, AI chatbots, and custom enterprise software solutions.",
  
  // Primary Keywords
  primaryKeywords: [
    "SaaS development",
    "workforce management software",
    "AI chatbot solutions",
    "custom software development",
    "enterprise software",
    "WatchPoint",
    "CloudBamboo Digital",
    "business automation",
    "operational SaaS platforms",
    "digital transformation"
  ],
  
  // Long-tail Keywords
  longTailKeywords: [
    "workforce management system for small business",
    "AI chatbot development services",
    "custom SaaS platform development",
    "enterprise software solutions India",
    "business process automation software",
    "cloud-based workforce tracking",
    "attendance management system",
    "project management software development",
    "business intelligence dashboard",
    "scalable software architecture"
  ],
  
  // Geographic Targeting
  geoKeywords: [
    "SaaS development India",
    "workforce management software India",
    "enterprise software development India",
    "AI chatbot services India",
    "custom software development India"
  ],
  
  // Competitor Keywords
  competitorKeywords: [
    "Salesforce alternative",
    "HubSpot alternative",
    "Monday.com alternative",
    "Asana alternative",
    "Slack alternative",
    "Microsoft Teams alternative"
  ],
  
  // Content Strategy Keywords
  contentKeywords: [
    "SaaS platform development",
    "workforce management best practices",
    "AI chatbot implementation",
    "enterprise software architecture",
    "business automation strategies",
    "digital transformation consulting",
    "cloud software solutions",
    "business intelligence tools",
    "workforce analytics",
    "operational efficiency software"
  ],
  
  // Technical SEO Settings
  technical: {
    // Core Web Vitals targets
    lcp: 2.5, // Largest Contentful Paint (seconds)
    fid: 100, // First Input Delay (milliseconds)
    cls: 0.1, // Cumulative Layout Shift
    
    // Performance targets
    fcp: 1.8, // First Contentful Paint (seconds)
    si: 3.4, // Speed Index (seconds)
    tti: 3.8, // Time to Interactive (seconds)
    
    // SEO targets
    titleLength: 60, // Max title length
    descriptionLength: 160, // Max description length
    headingStructure: "H1 > H2 > H3", // Proper heading hierarchy
    imageAltText: true, // All images need alt text
    internalLinking: true, // Internal linking strategy
    externalLinking: true, // External linking strategy
  },
  
  // Social Media Optimization
  social: {
    twitter: "@CloudBamboo",
    linkedin: "https://linkedin.com/company/cloudbamboo",
    facebook: "https://facebook.com/cloudbamboo",
    instagram: "https://instagram.com/cloudbamboo",
    youtube: "https://youtube.com/cloudbamboo"
  },
  
  // Analytics and Tracking
  analytics: {
    googleAnalytics: "", // Add your GA4 ID
    googleTagManager: "", // Add your GTM ID
    googleSearchConsole: "", // Add your GSC property
    bingWebmaster: "", // Add your Bing Webmaster ID
    yandexWebmaster: "", // Add your Yandex Webmaster ID
    baiduWebmaster: "" // Add your Baidu Webmaster ID
  },
  
  // Content Strategy
  contentStrategy: {
    // Blog topics for content marketing
    blogTopics: [
      "SaaS Development Best Practices",
      "Workforce Management Trends 2024",
      "AI Chatbot Implementation Guide",
      "Enterprise Software Architecture",
      "Business Process Automation",
      "Digital Transformation Strategies",
      "Cloud Computing Benefits",
      "Business Intelligence Solutions",
      "Workforce Analytics Insights",
      "Operational Efficiency Tips"
    ],
    
    // Content types to create
    contentTypes: [
      "How-to guides",
      "Case studies",
      "White papers",
      "Video tutorials",
      "Webinars",
      "Infographics",
      "E-books",
      "Industry reports",
      "Best practices guides",
      "Comparison articles"
    ]
  },
  
  // Local SEO (if applicable)
  localSeo: {
    businessName: "CloudBamboo Digital",
    address: "India",
    phone: "", // Add phone number
    email: "", // Add email
    businessHours: "9:00 AM - 6:00 PM IST",
    services: [
      "SaaS Development",
      "Workforce Management Software",
      "AI Chatbot Solutions",
      "Custom Software Development",
      "Enterprise Software Solutions"
    ]
  },
  
  // Schema.org Markup
  schema: {
    organization: {
      "@type": "Organization",
      "name": "CloudBamboo Digital",
      "url": "https://cloudbamboo.com",
      "logo": "https://cloudbamboo.com/cbd_logo_no_bg.png",
      "description": "Leading SaaS development company specializing in workforce management systems, AI chatbots, and custom enterprise software solutions.",
      "foundingDate": "2020",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["English"]
      }
    }
  }
};

// SEO Checklist for ongoing optimization
export const seoChecklist = [
  "✅ Meta title optimized (under 60 characters)",
  "✅ Meta description optimized (under 160 characters)",
  "✅ H1 tag present and optimized",
  "✅ Heading structure follows H1 > H2 > H3 hierarchy",
  "✅ All images have descriptive alt text",
  "✅ Internal linking strategy implemented",
  "✅ External links to authoritative sources",
  "✅ Schema.org markup implemented",
  "✅ Open Graph tags for social sharing",
  "✅ Twitter Card tags implemented",
  "✅ Canonical URL set",
  "✅ Robots.txt optimized",
  "✅ Sitemap.xml created and submitted",
  "✅ Core Web Vitals optimized",
  "✅ Mobile-friendly design",
  "✅ HTTPS enabled",
  "✅ Page speed optimized",
  "✅ Content is unique and valuable",
  "✅ Keywords naturally integrated",
  "✅ Local SEO optimized (if applicable)"
];

export default seoConfig;
