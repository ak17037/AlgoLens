import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { PROFILES } from '../data/mockData';

export const PAGES_NAV = [
  { id: 'p1', num: '01', label: 'Overview', title: '01 — Overview' },
  { id: 'p2', num: '02', label: 'Disparity', title: '02 — The Problem' },
  { id: 'p3', num: '03', label: 'Workflow', title: '03 — How It Works' },
  { id: 'p4', num: '04', label: 'Data Ingest', title: '04 — Data Collection' },
  { id: 'p5', num: '05', label: 'Analytics', title: '05 — Analytics Engine' },
  { id: 'p6', num: '06', label: 'AI Coach', title: '06 — AI Recommendations' },
  { id: 'p7', num: '07', label: 'Goals', title: '07 — Goals & Readiness' },
  { id: 'p8', num: '08', label: 'Dashboard', title: '08 — Dashboard Preview' },
  { id: 'p9', num: '09', label: 'Tech Stack', title: '09 — Tech Stack' }
];

export default function Navbar({
  activePageId,
  onNavigate,
  activeProfile,
  onSelectProfile
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);

  const currentIndex = PAGES_NAV.findIndex((p) => p.id === activePageId);
  const currentPage = PAGES_NAV[currentIndex] || PAGES_NAV[0];

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(PAGES_NAV[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < PAGES_NAV.length - 1) {
      onNavigate(PAGES_NAV[currentIndex + 1].id);
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 120,
        background: 'rgba(238, 240, 233, 0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--line)',
        boxShadow: '0 2px 10px rgba(20, 25, 22, 0.03)'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 36px',
          maxWidth: '1280px',
          margin: '0 auto',
          gap: '20px'
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('p1')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              background: 'var(--teal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.92rem',
              fontFamily: 'Space Grotesk, sans-serif',
              boxShadow: '0 2px 6px rgba(31, 107, 88, 0.25)'
            }}
          >
            AL
          </div>
          <div>
            <div className="display" style={{ fontWeight: 700, fontSize: '1.24rem', letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1.1 }}>
              Algo<span style={{ color: 'var(--teal)' }}>Lens</span>
            </div>
            <div className="mono" style={{ fontSize: '0.62rem', color: 'var(--ink-dim)', letterSpacing: '0.04em' }}>
              CP Analytics Suite
            </div>
          </div>
        </div>

        {/* Clean, Direct 9-Page Navigation Bar */}
        <nav
          className="desktop-nav-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--panel)',
            padding: '4px 6px',
            borderRadius: '10px',
            border: '1px solid var(--line)',
            overflowX: 'auto'
          }}
        >
          {PAGES_NAV.map((page) => {
            const isActive = activePageId === page.id;
            return (
              <button
                key={page.id}
                onClick={() => handleNavClick(page.id)}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
              >
                <span className="mono mono-num" style={{ fontSize: '0.66rem', opacity: isActive ? 1 : 0.65 }}>
                  {page.num}
                </span>
                <span>{page.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Stepper & Profile Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {/* Quick Page Prev/Next Stepper */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              background: 'var(--panel)',
              border: '1px solid var(--line)',
              borderRadius: '6px',
              padding: '3px 4px'
            }}
          >
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              title="Previous Page (←)"
              style={{
                background: 'none',
                border: 'none',
                color: currentIndex === 0 ? 'var(--line-strong)' : 'var(--ink)',
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                padding: '4px',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ChevronLeft size={16} />
            </button>

            <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--ink)', fontWeight: 600, padding: '0 4px' }}>
              {currentPage.num} <span style={{ color: 'var(--ink-dim)', fontWeight: 400 }}>/ 09</span>
            </span>

            <button
              onClick={handleNext}
              disabled={currentIndex === PAGES_NAV.length - 1}
              title="Next Page (→)"
              style={{
                background: 'none',
                border: 'none',
                color: currentIndex === PAGES_NAV.length - 1 ? 'var(--line-strong)' : 'var(--ink)',
                cursor: currentIndex === PAGES_NAV.length - 1 ? 'not-allowed' : 'pointer',
                padding: '4px',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* User Profile Pill */}
          <div style={{ position: 'relative' }} ref={profileRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--panel)',
                border: '1px solid var(--line)',
                borderRadius: '20px',
                padding: '5px 12px 5px 6px',
                cursor: 'pointer',
                transition: 'border-color 0.15s ease'
              }}
            >
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: 'var(--teal)',
                  color: '#fff',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}
              >
                {activeProfile.avatar}
              </span>
              <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink)' }}>
                  {activeProfile.name.split(' ')[0]}
                </div>
                <div className="mono" style={{ fontSize: '0.62rem', color: 'var(--ink-dim)' }}>
                  @{activeProfile.handle}
                </div>
              </div>
              <ChevronDown size={12} color="var(--ink-dim)" />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '125%',
                  width: '220px',
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  boxShadow: '0 12px 28px rgba(20, 25, 22, 0.12)',
                  padding: '8px',
                  zIndex: 250
                }}
              >
                <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--ink-dim)', padding: '6px 8px', textTransform: 'uppercase' }}>
                  Switch Test Profile
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
                      borderRadius: '4px',
                      cursor: 'pointer',
                      background: activeProfile.id === p.id ? 'var(--paper-2)' : 'transparent',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <div>
                      <div className="display" style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--ink)' }}>
                        {p.name}
                      </div>
                      <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--ink-dim)' }}>
                        @{p.handle} · {p.overallSolved} solved
                      </div>
                    </div>
                    {activeProfile.id === p.id && <Check size={14} color="var(--teal)" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              display: 'none',
              color: 'var(--ink)'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--panel)',
            borderBottom: '1px solid var(--line)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxHeight: '75vh',
            overflowY: 'auto'
          }}
        >
          <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Jump to Page (01–09)
          </div>
          {PAGES_NAV.map((page) => (
            <button
              key={page.id}
              onClick={() => handleNavClick(page.id)}
              style={{
                textAlign: 'left',
                background: activePageId === page.id ? 'var(--teal-light)' : 'transparent',
                border: activePageId === page.id ? '1px solid var(--teal)' : '1px solid transparent',
                padding: '10px 14px',
                borderRadius: '6px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '0.88rem',
                color: 'var(--ink)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="mono" style={{ color: 'var(--gold-dark)', fontSize: '0.75rem', fontWeight: 600 }}>{page.num}</span>
                <span style={{ fontWeight: activePageId === page.id ? 600 : 400 }}>{page.label}</span>
              </div>
              {activePageId === page.id && <Check size={14} color="var(--teal)" />}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 1040px) {
          .desktop-nav-bar { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
