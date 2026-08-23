import React from 'react';
import { Clock, ArrowLeft } from 'lucide-react';

export default function ComingSoonPage({ pageLabel, pageNum, onNavigate }) {
  return (
    <section className="page-section" id="coming-soon">
      <div className="wrap">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: 'calc(100vh - 320px)',
            gap: '20px'
          }}
        >
          {/* Icon Badge */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '20px',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px -4px rgba(79, 70, 229, 0.12)'
            }}
          >
            <Clock size={32} color="var(--primary)" />
          </div>

          {/* Page Tag */}
          <div className="idx">{pageNum} — {pageLabel.toUpperCase()}</div>

          {/* Heading */}
          <h2
            className="editorial-h2"
            style={{
              textAlign: 'center',
              maxWidth: '20ch',
              margin: '0 auto'
            }}
          >
            This page is{' '}
            <span style={{ color: 'var(--primary)' }}>coming soon.</span>
          </h2>

          {/* Description */}
          <p
            className="editorial-lede"
            style={{
              textAlign: 'center',
              maxWidth: '44ch',
              margin: '0 auto'
            }}
          >
            We're still building this section. Check back later —
            or head to the Overview to explore what's already live.
          </p>

          {/* CTA */}
          <button
            onClick={() => onNavigate('p1')}
            className="editorial-button"
            style={{ marginTop: '8px' }}
          >
            <ArrowLeft size={14} />
            <span>Back to Overview</span>
          </button>
        </div>
      </div>
    </section>
  );
}
