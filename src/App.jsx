import React, { useState, useEffect } from 'react';
import Sidebar, { SIDEBAR_ITEMS } from './components/Sidebar';
import TopHeader from './components/TopHeader';
import Footer from './components/Footer';

import OverviewPage from './pages/OverviewPage';
import ComingSoonPage from './pages/ComingSoonPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

import { PROFILES } from './data/mockData';
import { isLoggedIn, logoutUser } from './data/authUtils';

export default function App() {
  const [activePageId, setActivePageId] = useState('p1');
  const [activeProfile, setActiveProfile] = useState(PROFILES[0]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pageTransitioning, setPageTransitioning] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());

  const handleNavigate = (pageId) => {
    if (pageId === activePageId) return;
    setPageTransitioning(true);
    setActivePageId(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setPageTransitioning(false);
    }, 180);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation: 1-6 jumps to page, ArrowLeft/ArrowRight to flip pages
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      const keyNum = parseInt(e.key, 10);
      if (keyNum >= 1 && keyNum <= 6) {
        handleNavigate(`p${keyNum}`);
        return;
      }

      const currentIndex = SIDEBAR_ITEMS.findIndex((p) => p.id === activePageId);
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (currentIndex < SIDEBAR_ITEMS.length - 1) {
          handleNavigate(SIDEBAR_ITEMS[currentIndex + 1].id);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          handleNavigate(SIDEBAR_ITEMS[currentIndex - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePageId]);

  // Render current active page
  const renderCurrentPage = () => {
    // Only Overview is live; all other pages show "Coming Soon"
    if (activePageId === 'p1') {
      return <OverviewPage profile={activeProfile} onNavigate={handleNavigate} />;
    }

    // Find the sidebar item to get its label & number for the placeholder
    const item = SIDEBAR_ITEMS.find((p) => p.id === activePageId);
    return (
      <ComingSoonPage
        pageLabel={item?.label || 'Page'}
        pageNum={item?.num || '00'}
        onNavigate={handleNavigate}
      />
    );
  };

  const currentIndex = SIDEBAR_ITEMS.findIndex((p) => p.id === activePageId);
  const progressPercent = ((currentIndex + 1) / SIDEBAR_ITEMS.length) * 100;

  /* ── Routing Logic ── */

  const handleEnterDashboard = () => {
    setShowLanding(false);
    if (isAuthenticated) {
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
    setShowLanding(true);
  };

  if (showLanding) {
    return <LandingPage onEnterDashboard={handleEnterDashboard} />;
  }

  if (showLogin) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Top Page Reading Progress Line */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--line)',
          zIndex: 200
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'var(--primary)',
            width: `${progressPercent}%`,
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      {/* Left Modern Fixed Sidebar */}
      <Sidebar
        activePageId={activePageId}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={handleLogout}
      />

      {/* Main Content View Stage */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <TopHeader
          activePageId={activePageId}
          onNavigate={handleNavigate}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main
          style={{
            flex: 1,
            opacity: pageTransitioning ? 0.35 : 1,
            transform: pageTransitioning ? 'translateY(4px)' : 'translateY(0)',
            transition: 'opacity 0.18s ease, transform 0.18s ease'
          }}
        >
          <div className="active-page-stage">
            {renderCurrentPage()}
          </div>
        </main>

        <Footer onScrollTop={handleScrollTop} />
      </div>
    </div>
  );
}
