import React from 'react';
import '../App.css';

const serviceTracks = [
  {
    title: 'Product Strategy Pods',
    description: 'Zero-fluff discovery sprints that clarify the business problem, KPIs and guardrails before a single line of code is written.',
    badges: ['Signal mapping', 'KPI blueprints', 'Stakeholder workshops']
  },
  {
    title: 'Platform Engineering',
    description: 'Full-stack web, mobile and API development on modern cloud architectures with observability baked in.',
    badges: ['TypeScript + React', 'Node & Go services', 'IaC pipelines']
  },
  {
    title: 'AI & Automation',
    description: 'Applied AI copilots, document understanding, and workflow automation that plug into your existing systems.',
    badges: ['LLM orchestration', 'RAG stacks', 'Policy automation']
  },
  {
    title: 'Enterprise Integration',
    description: 'Secure integrations with HRMS, ERP, finance and communication layers with hardened governance.',
    badges: ['API gateways', 'Event buses', 'Data governance']
  }
];

const buildPlaybook = [
  {
    phase: '01 // Recon',
    detail: 'Immersive workshops, shadowing and data pulls to model the real-world workflow.'
  },
  {
    phase: '02 // Systems Design',
    detail: 'Interaction maps, service contracts, security posture and success metrics.'
  },
  {
    phase: '03 // Build & Integrate',
    detail: 'Sprint-based delivery with demos every week and automated quality gates.'
  },
  {
    phase: '04 // Launch & Scale',
    detail: 'Hypercare, instrumentation, and playbooks that let your teams take full control.'
  }
];

const capabilityStack = [
  {
    title: 'Experience Layer',
    items: ['Design systems', 'High-fidelity prototypes', 'Web & mobile apps']
  },
  {
    title: 'Logic Layer',
    items: ['Domain-driven services', 'Workflow engines', 'Realtime comms']
  },
  {
    title: 'Data & Intelligence',
    items: ['Data lakes', 'Analytics fabric', 'AI copilots & agents']
  },
  {
    title: 'Ops & Reliability',
    items: ['Cloud infrastructure', 'Observability', 'DevSecOps automation']
  }
];

const Services = () => {
  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="services-hero-content">
          <p className="section-kicker">Custom Services</p>
          <h1>Our engineering task-force for special missions</h1>
          <p className="section-subtitle">
            When WatchPoint isn&apos;t the full answer, our custom services squad designs, builds and integrates software
            with the same bold aesthetic and precision we put into our flagship product.
          </p>
          <div className="services-hero-badges">
            <span>Limited engagements</span>
            <span>Founder-led delivery</span>
            <span>Security first</span>
          </div>
        </div>
      </section>

      <section className="services-grid-section">
        <div className="services-grid">
          {serviceTracks.map((track) => (
            <div key={track.title} className="services-card">
              <h3>{track.title}</h3>
              <p>{track.description}</p>
              <div className="services-badges">
                {track.badges.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="services-playbook">
        <div className="services-playbook-header">
          <p className="section-kicker">Engagement Playbook</p>
          <h2>How we execute bespoke builds</h2>
        </div>
        <div className="services-playbook-grid">
          {buildPlaybook.map((stage) => (
            <div key={stage.phase} className="playbook-card">
              <span className="playbook-phase">{stage.phase}</span>
              <p>{stage.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="services-stack">
        <div className="services-stack-header">
          <p className="section-kicker">Capability Stack</p>
          <h2>Full-spectrum delivery with bold polish</h2>
        </div>
        <div className="services-stack-grid">
          {capabilityStack.map((layer) => (
            <div key={layer.title} className="stack-card">
              <h3>{layer.title}</h3>
              <ul>
                {layer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;

