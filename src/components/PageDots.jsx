import React from 'react';
import { PAGES_NAV } from './Navbar';

export default function PageDots({ activePageId, onNavigate }) {
  const currentIndex = PAGES_NAV.findIndex((p) => p.id === activePageId);
  const currentNumStr = String(currentIndex >= 0 ? currentIndex + 1 : 1).padStart(2, '0');

  return (
    <>
      {/* Right Side Dots */}
      <div
        className="page-dots-container"
        style={{
          position: 'fixed',
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 90,
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          padding: '12px 6px',
          borderRadius: '20px',
          background: 'rgba(238, 240, 233, 0.6)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(203, 208, 194, 0.4)'
        }}
      >
        {PAGES_NAV.map((page) => {
          const isActive = activePageId === page.id;
          return (
            <button
              key={page.id}
              onClick={() => onNavigate(page.id)}
              title={page.title}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isActive ? 'var(--teal)' : 'var(--line)',
                border: 'none',
                cursor: 'pointer',
                transform: isActive ? 'scale(1.6)' : 'scale(1)',
                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                padding: 0
              }}
            />
          );
        })}
      </div>

      {/* Bottom Left Page Number Readout */}
      <div
        className="page-num-readout"
        style={{
          position: 'fixed',
          left: '32px',
          bottom: '24px',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '0.75rem',
          color: 'var(--ink-dim)',
          zIndex: 90,
          background: 'rgba(247, 248, 242, 0.85)',
          padding: '6px 12px',
          borderRadius: '3px',
          border: '1px solid var(--line)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{currentNumStr}</span>
        <span style={{ color: 'var(--line-strong)' }}>/</span>
        <span>09</span>
        <span style={{ color: 'var(--ink-faint)', fontSize: '0.68rem', marginLeft: '4px' }}>
          {PAGES_NAV[currentIndex]?.label}
        </span>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .page-dots-container, .page-num-readout {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
