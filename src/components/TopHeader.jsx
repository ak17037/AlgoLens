import React from 'react';
import { Menu } from 'lucide-react';
import { SIDEBAR_ITEMS } from './Sidebar';

export default function TopHeader({
  activePageId,
  onToggleSidebar,
  sidebarCollapsed
}) {
  const currentIndex = SIDEBAR_ITEMS.findIndex((p) => p.id === activePageId);
  const currentPage = SIDEBAR_ITEMS[currentIndex] || SIDEBAR_ITEMS[0];

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 90,
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--line)',
        padding: '12px 36px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px'
      }}
    >
      {/* Left: Breadcrumbs & Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={onToggleSidebar}
          title="Toggle Navigation Sidebar"
          style={{
            background: 'var(--paper-2)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--ink)'
          }}
        >
          <Menu size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="mono" style={{ fontSize: '0.74rem', color: 'var(--primary)', fontWeight: 600 }}>
            {currentPage.num}
          </span>
          <span style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--ink)' }}>
            {currentPage.label}
          </span>
        </div>
      </div>
    </div>
  );
}
