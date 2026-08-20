import React from 'react';
import { SIDEBAR_ITEMS } from './Sidebar';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function PagePagination({ activePageId, onNavigate }) {
  const currentIndex = SIDEBAR_ITEMS.findIndex((p) => p.id === activePageId);
  const prevPage = currentIndex > 0 ? SIDEBAR_ITEMS[currentIndex - 1] : null;
  const nextPage = currentIndex < SIDEBAR_ITEMS.length - 1 ? SIDEBAR_ITEMS[currentIndex + 1] : null;

  return (
    <div
      style={{
        marginTop: '50px',
        paddingTop: '24px',
        borderTop: '1px solid var(--line)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}
    >
      {/* Previous Button */}
      {prevPage ? (
        <button
          onClick={() => onNavigate(prevPage.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            padding: '10px 18px',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            textAlign: 'left',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
            transition: 'all 0.15s ease'
          }}
        >
          <ArrowLeft size={16} color="var(--primary)" />
          <div>
            <div className="mono" style={{ fontSize: '0.66rem', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
              Previous Page {prevPage.num}
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink)' }}>
              {prevPage.label}
            </div>
          </div>
        </button>
      ) : (
        <div style={{ visibility: 'hidden' }} />
      )}

      {/* Center 6-Dot Indicator */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {SIDEBAR_ITEMS.map((page) => {
            const isActive = activePageId === page.id;
            return (
              <button
                key={page.id}
                onClick={() => onNavigate(page.id)}
                title={page.label}
                style={{
                  width: isActive ? '22px' : '7px',
                  height: '7px',
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? 'var(--primary)' : 'var(--line)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            );
          })}
        </div>
        <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--ink-dim)' }}>
          Page {SIDEBAR_ITEMS[currentIndex]?.num} of 06
        </span>
      </div>

      {/* Next Button */}
      {nextPage ? (
        <button
          onClick={() => onNavigate(nextPage.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'var(--primary)',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            textAlign: 'right',
            boxShadow: '0 3px 12px rgba(79, 70, 229, 0.3)',
            transition: 'all 0.15s ease'
          }}
        >
          <div>
            <div className="mono" style={{ fontSize: '0.66rem', color: 'rgba(255, 255, 255, 0.75)', textTransform: 'uppercase' }}>
              Next Page {nextPage.num}
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
              {nextPage.label}
            </div>
          </div>
          <ArrowRight size={16} color="#fff" />
        </button>
      ) : (
        <button
          onClick={() => onNavigate('p1')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--primary)',
            color: '#fff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            fontWeight: 700
          }}
        >
          <span>Return to Overview</span>
          <ArrowRight size={16} color="#fff" />
        </button>
      )}
    </div>
  );
}
