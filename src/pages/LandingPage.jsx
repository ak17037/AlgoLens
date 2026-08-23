import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Code2,
  GitBranch,
  MousePointerClick,
  Component,
  Sparkles,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';

/* ── Syllabus feature data ── */
const FEATURES = [
  {
    icon: Code2,
    title: 'HTML & CSS',
    subtitle: 'Semantic Structure & Modern Styling',
    points: [
      'Semantic HTML5 elements (<header>, <main>, <section>, <footer>)',
      'CSS custom properties & design token system',
      'Responsive Flexbox & Grid layouts',
      'Glassmorphism, gradients & micro-animations'
    ],
    accent: 'var(--primary)',
    accentLight: 'var(--primary-light)'
  },
  {
    icon: GitBranch,
    title: 'JavaScript & Git',
    subtitle: 'ES6+ Logic & Clean Architecture',
    points: [
      'Arrow functions, destructuring & template literals',
      'Array methods: .map(), .filter(), .reduce()',
      'Modular folder structure (/pages, /components, /data)',
      'Meaningful GitHub commit practices'
    ],
    accent: 'var(--teal)',
    accentLight: 'var(--teal-light)'
  },
  {
    icon: MousePointerClick,
    title: 'DOM Manipulation',
    subtitle: 'Event Handling & Dynamic Rendering',
    points: [
      'State-driven reactive UI re-rendering',
      'onClick, onChange & keyboard event handling',
      'Dynamic SVG radar chart with trigonometry',
      'Smooth requestAnimationFrame interpolation'
    ],
    accent: 'var(--gold)',
    accentLight: 'var(--gold-light)'
  },
  {
    icon: Component,
    title: 'React Basics',
    subtitle: 'Components, Props & Hooks',
    points: [
      'JSX & reusable functional components',
      'Props & unidirectional data flow',
      'useState for local state management',
      'useEffect for lifecycle & animations'
    ],
    accent: 'var(--primary)',
    accentLight: 'var(--primary-light)'
  }
];

/* ── Live stats data ── */
const STATS = [
  { label: 'Components', target: 12, suffix: '+' },
  { label: 'Pages', target: 6, suffix: '' },
  { label: 'Interactive Features', target: 15, suffix: '+' },
  { label: 'Lines of Code', target: 2400, suffix: '+' }
];

/* ── Animated Counter Hook ── */
function useCounter(target, duration = 1600) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let frameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  return count;
}

/* ── Stat Card Sub-component ── */
function StatCard({ label, target, suffix }) {
  const animatedValue = useCounter(target);

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px 12px'
      }}
    >
      <div
        style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--ink)',
          lineHeight: 1
        }}
      >
        {animatedValue.toLocaleString()}{suffix}
      </div>
      <div
        className="mono"
        style={{
          fontSize: '0.72rem',
          color: 'var(--ink-dim)',
          marginTop: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function LandingPage({ onEnterDashboard }) {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* ─── Sticky Navbar ─── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(248, 250, 252, 0.85)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--line)',
          padding: '14px 0'
        }}
      >
        <div
          className="wrap"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #4F46E5 0%, #0D9488 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: '0.9rem',
                boxShadow: '0 3px 10px rgba(79, 70, 229, 0.3)',
                flexShrink: 0
              }}
            >
              AL
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--ink)', lineHeight: 1.1 }}>
                Algo<span style={{ color: 'var(--primary)' }}>Lens</span>
              </div>
              <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--ink-dim)' }}>
                CP Intelligence Dashboard
              </div>
            </div>
          </div>

          {/* Nav CTA */}
          <button
            onClick={onEnterDashboard}
            className="editorial-button"
            style={{ fontSize: '0.78rem', padding: '8px 18px' }}
          >
            <span>Open Dashboard</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <header
        style={{
          padding: '72px 0 56px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle gradient orb behind hero text */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="editorial-badge teal" style={{ marginBottom: '18px' }}>
            <Sparkles size={12} />
            <span>React Frontend Project — Built for Learning</span>
          </div>

          <h1
            className="editorial-h1"
            style={{
              maxWidth: '18ch',
              margin: '0 auto',
              textAlign: 'center'
            }}
          >
            Practice everywhere.{' '}
            <span style={{ color: 'var(--primary)' }}>Understand</span> it in one place.
          </h1>

          <p
            className="editorial-lede"
            style={{
              maxWidth: '52ch',
              margin: '20px auto 0',
              textAlign: 'center'
            }}
          >
            AlgoLens unifies your competitive programming progress across LeetCode,
            Codeforces, CodeChef &amp; GeeksforGeeks into clear,
            actionable insights — built with React, modern JavaScript &amp; semantic HTML.
          </p>

          {/* Dual CTA */}
          <div
            style={{
              display: 'flex',
              gap: '14px',
              justifyContent: 'center',
              marginTop: '32px',
              flexWrap: 'wrap'
            }}
          >
            <button
              onClick={onEnterDashboard}
              className="editorial-button"
              style={{ fontSize: '0.88rem', padding: '12px 28px' }}
            >
              <Zap size={15} />
              <span>Enter Dashboard</span>
              <ArrowRight size={14} />
            </button>
            <a
              href="#features"
              className="editorial-button secondary"
              style={{ fontSize: '0.88rem', padding: '12px 28px', textDecoration: 'none' }}
            >
              <span>View Features</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─── Live Stats Strip ─── */}
      <section
        style={{
          background: 'var(--panel)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '820px',
          margin: '-16px auto 0',
          position: 'relative',
          zIndex: 2,
          boxShadow: '0 8px 32px -4px rgba(15, 23, 42, 0.06)',
          width: 'calc(100% - 72px)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0'
          }}
        >
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              style={{
                borderRight: idx < 3 ? '1px solid var(--line)' : 'none'
              }}
            >
              <StatCard label={stat.label} target={stat.target} suffix={stat.suffix} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features / Syllabus Section ─── */}
      <section
        id="features"
        style={{
          padding: '72px 0 64px'
        }}
      >
        <div className="wrap">
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <div className="idx" style={{ justifyContent: 'center' }}>
              SYLLABUS COVERAGE
            </div>
            <h2
              className="editorial-h2"
              style={{ margin: '10px auto 0', textAlign: 'center', maxWidth: '30ch' }}
            >
              Four pillars, one cohesive project.
            </h2>
            <p
              className="editorial-lede"
              style={{ margin: '12px auto 0', textAlign: 'center', maxWidth: '54ch' }}
            >
              Every component in AlgoLens maps directly to a syllabus criterion —
              HTML structure, JavaScript logic, DOM interactivity, and React architecture.
            </p>
          </div>

          {/* 4-Column Feature Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '18px'
            }}
          >
            {FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              const isHovered = hoveredFeature === idx;

              return (
                <article
                  key={feat.title}
                  onMouseEnter={() => setHoveredFeature(idx)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{
                    background: 'var(--panel)',
                    border: isHovered
                      ? `2px solid ${feat.accent}`
                      : '1px solid var(--line)',
                    borderRadius: 'var(--radius-lg)',
                    padding: isHovered ? '23px 19px' : '24px 20px',
                    boxShadow: isHovered
                      ? '0 12px 32px -6px rgba(79, 70, 229, 0.1)'
                      : '0 4px 16px -2px rgba(15, 23, 42, 0.03)',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}
                >
                  {/* Icon Badge */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: feat.accentLight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon size={20} color={feat.accent} />
                  </div>

                  {/* Title */}
                  <div>
                    <h3
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: 'var(--ink)',
                        margin: 0
                      }}
                    >
                      {feat.title}
                    </h3>
                    <div
                      className="mono"
                      style={{
                        fontSize: '0.68rem',
                        color: feat.accent,
                        marginTop: '2px',
                        fontWeight: 600
                      }}
                    >
                      {feat.subtitle}
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      flex: 1
                    }}
                  >
                    {feat.points.map((point) => (
                      <li
                        key={point}
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--ink-dim)',
                          lineHeight: 1.45,
                          paddingLeft: '14px',
                          position: 'relative'
                        }}
                      >
                        {/* Custom bullet dot */}
                        <span
                          aria-hidden="true"
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: '7px',
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: feat.accent,
                            opacity: 0.6
                          }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── What You'll See Section ─── */}
      <section
        style={{
          padding: '48px 0 64px',
          background: 'var(--panel)',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)'
        }}
      >
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div className="idx" style={{ justifyContent: 'center' }}>
              INSIDE THE DASHBOARD
            </div>
            <h2
              className="editorial-h2"
              style={{ margin: '10px auto 0', textAlign: 'center', maxWidth: '28ch' }}
            >
              Six pages, one story.
            </h2>
          </div>

          {/* Page preview cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px'
            }}
          >
            {[
              { num: '01', title: 'Overview', desc: 'Hero stats, animated radar skill map & profile presets', icon: Sparkles },
              { num: '02', title: 'Current Progress', desc: 'Cross-platform rating translator with live slider', icon: BarChart3 },
              { num: '03', title: 'Analytics Engine', desc: '14-day consistency calculator & growth metrics', icon: BarChart3 },
              { num: '04', title: 'Goals & Readiness', desc: 'Readiness score, goal tracking & difficulty heatmaps', icon: Target },
              { num: '05', title: 'Live Dashboard', desc: 'Full interactive dashboard with profile switching', icon: Zap },
              { num: '06', title: 'Tech Stack', desc: 'Architecture breakdown & syllabus implementation map', icon: Code2 }
            ].map((page) => {
              const PageIcon = page.icon;
              return (
                <div
                  key={page.num}
                  className="editorial-panel"
                  style={{
                    padding: '22px 20px',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer'
                  }}
                  onClick={onEnterDashboard}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'var(--primary-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <PageIcon size={16} color="var(--primary)" />
                    </div>
                    <div>
                      <span className="mono" style={{ fontSize: '0.66rem', color: 'var(--primary)', fontWeight: 600 }}>
                        {page.num}
                      </span>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.1 }}>
                        {page.title}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-dim)', lineHeight: 1.5, margin: 0 }}>
                    {page.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section style={{ padding: '56px 0 64px' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2
            className="editorial-h2"
            style={{ margin: '0 auto', textAlign: 'center', maxWidth: '24ch' }}
          >
            Ready to explore?
          </h2>
          <p
            className="editorial-lede"
            style={{ margin: '12px auto 0', textAlign: 'center', maxWidth: '48ch' }}
          >
            Dive into the full AlgoLens experience — interactive charts,
            live data transformations, and a polished React architecture.
          </p>
          <button
            onClick={onEnterDashboard}
            className="editorial-button"
            style={{
              fontSize: '0.92rem',
              padding: '14px 32px',
              marginTop: '28px'
            }}
          >
            <Zap size={16} />
            <span>Launch Dashboard</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        style={{
          borderTop: '1px solid var(--line)',
          padding: '20px 0',
          background: 'var(--panel)'
        }}
      >
        <div
          className="wrap"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--ink)' }}>
              Algo<span style={{ color: 'var(--primary)' }}>Lens</span>
            </span>
            <span
              className="mono"
              style={{
                fontSize: '0.66rem',
                color: 'var(--ink-faint)',
                padding: '3px 8px',
                background: 'var(--paper-2)',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--line)'
              }}
            >
              React Project · 2025
            </span>
          </div>
          <div
            className="mono"
            style={{ fontSize: '0.68rem', color: 'var(--ink-faint)' }}
          >
            Built with React + Vite · Semantic HTML · CSS Variables · ES6+
          </div>
        </div>
      </footer>
    </div>
  );
}
