import React, { useState } from 'react';
import {
  LayoutDashboard,
  Compass,
  ArrowLeftRight,
  BarChart3,
  Target,
  Layers,
  Check,
  ChevronDown
} from 'lucide-react';
import { PROFILES } from '../data/mockData';

export const SIDEBAR_ITEMS = [
  { id: 'p1', num: '01', label: 'Overview', icon: Compass },
  { id: 'p2', num: '02', label: 'Current Progress', icon: ArrowLeftRight },
  { id: 'p3', num: '03', label: 'Analytics Engine', icon: BarChart3 },
  { id: 'p4', num: '04', label: 'Goals & Readiness', icon: Target },
  { id: 'p5', num: '05', label: 'Live Dashboard', icon: LayoutDashboard },
  { id: 'p6', num: '06', label: 'Tech Stack', icon: Layers }
];

export default function Sidebar({
  activePageId,
  onNavigate,
  activeProfile,
  onSelectProfile,
  collapsed,
  onToggleCollapse
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? '76px' : '250px',
        background: 'var(--panel)',
        borderRight: '1px solid var(--line)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        flexShrink: 0,
        userSelect: 'none'
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: collapsed ? '18px 12px' : '18px 18px',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between'
        }}
      >
        <div
          onClick={() => onNavigate('p1')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
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
              fontSize: '0.95rem',
              boxShadow: '0 3px 10px rgba(79, 70, 229, 0.3)',
              flexShrink: 0
            }}
          >
            AL
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.18rem', color: 'var(--ink)', lineHeight: 1.1 }}>
                Algo<span style={{ color: 'var(--primary)' }}>Lens</span>
              </div>
              <div className="mono" style={{ fontSize: '0.62rem', color: 'var(--ink-dim)' }}>
                CP Intelligence
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Switcher Pill */}
      <div style={{ padding: collapsed ? '12px 6px' : '14px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'space-between',
              background: 'var(--paper-2)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: collapsed ? '8px 4px' : '7px 10px',
              cursor: 'pointer',
              transition: 'background 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {activeProfile.avatar}
              </span>
              {!collapsed && (
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)' }}>
                    {activeProfile.name}
                  </div>
                  <div className="mono" style={{ fontSize: '0.62rem', color: 'var(--ink-dim)' }}>
                    @{activeProfile.handle}
                  </div>
                </div>
              )}
            </div>
            {!collapsed && <ChevronDown size={12} color="var(--ink-dim)" />}
          </button>

          {/* Profile Dropdown */}
          {profileDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                left: 0,
                width: '220px',
                background: 'var(--panel)',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
                padding: '8px',
                zIndex: 250
              }}
            >
              <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--ink-dim)', padding: '6px 8px', textTransform: 'uppercase' }}>
                Select Active Profile
              </div>
              {PROFILES.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProfile(p);
                    setProfileDropdownOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: activeProfile.id === p.id ? 'var(--primary-light)' : 'transparent',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: activeProfile.id === p.id ? 'var(--primary)' : 'var(--ink)' }}>
                      {p.name}
                    </div>
                    <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--ink-dim)' }}>
                      @{p.handle} · {p.overallSolved} solved
                    </div>
                  </div>
                  {activeProfile.id === p.id && <Check size={14} color="var(--primary)" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: collapsed ? '12px 6px' : '14px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePageId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? `${item.num} ${item.label}` : ''}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: collapsed ? '10px 0' : '9px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: '10px',
                background: isActive ? 'var(--primary)' : 'transparent',
                color: isActive ? '#fff' : 'var(--ink-dim)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                textAlign: 'left',
                boxShadow: isActive ? '0 3px 10px rgba(79, 70, 229, 0.25)' : 'none'
              }}
            >
              <Icon size={16} color={isActive ? '#fff' : 'var(--ink-dim)'} style={{ flexShrink: 0 }} />
              {!collapsed && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: isActive ? 700 : 500, color: isActive ? '#fff' : 'var(--ink)' }}>
                    {item.label}
                  </span>
                  <span className="mono" style={{ fontSize: '0.68rem', color: isActive ? 'rgba(255,255,255,0.7)' : 'var(--ink-faint)' }}>
                    {item.num}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Status */}
      <div
        style={{
          padding: collapsed ? '12px 8px' : '14px 16px',
          borderTop: '1px solid var(--line)',
          background: 'var(--paper-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          gap: '8px'
        }}
      >
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
        {!collapsed && (
          <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--ink-dim)' }}>
            4 Platforms Synced
          </span>
        )}
      </div>
    </aside>
  );
}
