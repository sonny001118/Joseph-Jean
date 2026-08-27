import React, { lazy, Suspense, useEffect, useState } from 'react';

const HeroScene = lazy(() => import('./HeroScene'));

const skills = {
  'AI & GenAI': ['LLMs', 'Agentic AI', 'RAG', 'LangGraph', 'LangChain', 'Amazon Bedrock', 'OpenAI API', 'Claude', 'PyTorch', 'MCP'],
  'Backend & APIs': ['Python', 'FastAPI', 'Flask', 'Django', 'Node.js', 'REST', 'GraphQL', 'gRPC', 'Microservices'],
  Frontend: ['React', 'Next.js', 'Remix', 'TypeScript', 'JavaScript'],
  'Cloud & MLOps': ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'MLflow', 'Kubeflow', 'GitHub Actions', 'Jenkins'],
  'Data & Search': ['PostgreSQL', 'Redis', 'OpenSearch', 'Elasticsearch', 'Snowflake', 'BigQuery', 'Redshift', 'Kafka'],
};

const experience = [
  {
    company: 'Palantir Technologies',
    role: 'Senior AI Platform Engineer',
    period: 'Jun 2025 — Present',
    location: 'Denver, CO',
    bullets: [
      'Built enterprise AI platforms for large-scale analytics, knowledge graphs, and decision intelligence.',
      'Developed agentic AI systems with LLMs, MCP, RAG, semantic search, and tool calling.',
      'Engineered distributed pipelines processing billions of intelligence records daily and reduced processing latency by 40%.',
      'Created evaluation, observability, tracing, regression testing, and secure cloud-native services for production AI.',
    ],
  },
  {
    company: 'Lumina',
    role: 'Senior AI Engineer, Agentic AI',
    period: 'Sep 2023 — May 2025',
    location: 'Remote',
    bullets: [
      'Architected production GenAI applications with Python, FastAPI, LangGraph, React, TypeScript, Kubernetes, and Bedrock.',
      'Built agentic AI platforms that reduced manual processing by 60% while supporting thousands of enterprise users.',
      'Developed RAG pipelines, evaluation frameworks, semantic caching, model routing, and cloud-native AWS microservices.',
    ],
  },
  {
    company: 'JOOR',
    role: 'Senior Fullstack Engineer',
    period: '2018 — 2022',
    location: 'New York, NY',
    bullets: [
      'Built B2B wholesale commerce products with React, TypeScript, Python, FastAPI, PostgreSQL, Kafka, Snowflake, and AWS.',
      'Created scalable backend services for catalogs, inventory, ordering, payments, analytics, and global retailer workflows.',
      'Developed ETL pipelines processing 500M+ product and transaction records daily.',
    ],
  },
  {
    company: 'COTA Healthcare',
    role: 'Junior Full Stack Engineer',
    period: '2014 — 2017',
    location: 'New York, NY',
    bullets: [
      'Built healthcare SaaS applications supporting oncology data, clinical workflows, patient analytics, and reporting.',
      'Developed secure cloud-native microservices and healthcare data integrations with HIPAA-conscious security and governance.',
      'Improved PostgreSQL performance, caching, asynchronous workflows, testing, monitoring, and cloud deployments.',
    ],
  },
];

const focusAreas = [
  {
    icon: 'AI',
    title: 'Production AI Systems',
    text: 'LLM applications, multi-agent workflows, RAG, semantic search, tool calling, and AI evaluation built for production reliability.',
  },
  {
    icon: 'SYS',
    title: 'Distributed Platforms',
    text: 'Cloud-native microservices, event-driven systems, scalable APIs, data pipelines, observability, and performance engineering.',
  },
  {
    icon: '☁',
    title: 'AWS & MLOps',
    text: 'Bedrock, Lambda, ECS, S3, EventBridge, Kubernetes, Terraform, MLflow, Kubeflow, monitoring, and secure deployment pipelines.',
  },
];

function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <div className="app-shell">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
      <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <a className="brand" href="#home" onClick={close}>
          <span>JJ</span>
          <strong>Joseph Jean Brimel</strong>
        </a>
        <nav className={open ? 'nav-links nav-open' : 'nav-links'}>
          <a href="#about" onClick={close}>About</a>
          <a href="#experience" onClick={close}>Experience</a>
          <a href="#skills" onClick={close}>Skills</a>
          <a href="#contact" onClick={close}>Contact</a>
          <a className="nav-cta" href="https://github.com/MagicDev119" target="_blank" rel="noreferrer" onClick={close}>
            GitHub ↗
          </a>
        </nav>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? '✕' : '☰'}
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">✦ Senior AI/ML Engineer</div>
              <h1>Building intelligent systems that <span>work in production.</span></h1>
              <p className="hero-lead">
                12+ years in software engineering, with deep expertise in LLMs, Agentic AI, RAG, MLOps, distributed systems, and AWS cloud platforms.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#experience">Explore my work ↗</a>
                <a className="button ghost" href="mailto:joseph.jean.brimel.ai@outlook.com">Let’s talk</a>
              </div>
              <div className="mini-stats">
                <div><strong>12+</strong><span>Years engineering</span></div>
                <div><strong>60%</strong><span>Manual work reduced</span></div>
                <div><strong>40%</strong><span>Pipeline latency reduced</span></div>
              </div>
            </div>

            <aside className="hero-card">
              <div className="avatar-orbit">
                <div className="avatar">JJ</div>
                <span className="orbit-dot dot-a" />
                <span className="orbit-dot dot-b" />
                <span className="orbit-dot dot-c" />
              </div>
              <div className="availability"><span/> Open to impactful AI platform opportunities</div>
              <div className="hero-card-lines">
                <div>⌖ Williamsport, PA</div>
                <a href="mailto:joseph.jean.brimel.ai@outlook.com">✉ joseph.jean.brimel.ai@outlook.com</a>
                <a href="tel:+12545242720">☎ 254-524-2720</a>
              </div>
              <div className="social-row">
                <a href="https://github.com/MagicDev119" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
                <a href="https://www.linkedin.com/in/joseph-b-4812a234a/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
              </div>
            </aside>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container">
            <div className="section-kicker">What I do</div>
            <div className="section-heading">
              <h2>From AI experimentation to reliable production systems.</h2>
              <p>I combine applied AI, backend engineering, distributed systems, data infrastructure, and cloud operations to ship complete platforms—not just demos.</p>
            </div>
            <div className="focus-grid">
              {focusAreas.map(({icon, title, text}) => (
                <article className="focus-card" key={title}>
                  <div className="icon-wrap">{icon}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="experience">
          <div className="container">
            <div className="section-kicker">Experience</div>
            <div className="section-heading compact">
              <h2>Engineering at scale.</h2>
              <p>AI platforms, enterprise SaaS, commerce, and healthcare systems across high-impact production environments.</p>
            </div>
            <div className="timeline">
              {experience.map((item) => (
                <article className="timeline-item" key={`${item.company}-${item.period}`}>
                  <div className="timeline-marker">•</div>
                  <div className="timeline-meta">
                    <span>{item.period}</span>
                    <small>{item.location}</small>
                  </div>
                  <div className="timeline-content">
                    <h3>{item.role}</h3>
                    <h4>{item.company}</h4>
                    <ul>{item.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="container">
            <div className="section-kicker">Toolkit</div>
            <div className="section-heading compact">
              <h2>Deep AI expertise. Broad engineering range.</h2>
              <p>A practical stack for building, deploying, evaluating, and operating intelligent software.</p>
            </div>
            <div className="skills-grid">
              {Object.entries(skills).map(([group, items], idx) => (
                <article className="skill-card" key={group}>
                  <div className="skill-card-title">
                    <span className="skill-symbol">{['AI', '</>', '✦', '☁', 'DB'][idx]}</span>
                    <h3>{group}</h3>
                  </div>
                  <div className="tag-list">{items.map(item => <span key={item}>{item}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section education-strip">
          <div className="container education-inner">
            <div>
              <div className="section-kicker">Education</div>
              <h2>Bachelor’s Degree, Computer Science</h2>
              <p>Bucknell University · United States · Sep 2008 — Mar 2013</p>
            </div>
            <div className="education-code">{'</>'}</div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-card">
            <div>
              <div className="section-kicker">Let’s build something useful</div>
              <h2>Need an engineer who can bridge AI, product, and production?</h2>
              <p>I’m interested in teams building serious AI products, intelligent platforms, developer infrastructure, and high-scale backend systems.</p>
            </div>
            <div className="contact-actions">
              <a className="button primary" href="mailto:joseph.jean.brimel.ai@outlook.com">✉ Email me</a>
              <a className="button ghost" href="https://github.com/MagicDev119" target="_blank" rel="noreferrer">GH GitHub</a>
              <a className="button ghost" href="https://www.linkedin.com/in/joseph-b-4812a234a/" target="_blank" rel="noreferrer">in LinkedIn</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Joseph Jean Brimel</span>
          <span>Built with React.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
