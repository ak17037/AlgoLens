import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ onScrollTop }) {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--line)',
        padding: '24px 0',
        marginTop: '40px',
        background: 'var(--panel)'
      }}
    >
      <div className="wrap">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          {/* Brand & Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--ink)' }}>
              Algo<span style={{ color: 'var(--primary)' }}>Lens</span>
            </div>
            <div
              className="mono"
              style={{
                fontSize: '0.68rem',
                background: 'var(--paper-2)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--ink-dim)'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
              <span>LeetCode · Codeforces · CodeChef Connected</span>
            </div>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={onScrollTop}
            className="mono"
            style={{
              background: 'var(--paper-2)',
              border: '1px solid var(--line)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              color: 'var(--ink)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.74rem',
              fontWeight: 600
            }}
          >
            <ArrowUp size={13} color="var(--primary)" />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
