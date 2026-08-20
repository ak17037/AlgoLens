import React, { useState, useEffect } from 'react';
import Sidebar, { SIDEBAR_ITEMS } from './components/Sidebar';
import TopHeader from './components/TopHeader';
import Footer from './components/Footer';

// 6 Streamlined Core Pages
import OverviewPage from './pages/OverviewPage';
import ProblemPage from './pages/ProblemPage';
import AnalyticsPage from './pages/AnalyticsPage';
import GoalsReadinessPage from './pages/GoalsReadinessPage';
import DashboardPage from './pages/DashboardPage';
import TechStackPage from './pages/TechStackPage';

import { PROFILES } from './data/mockData';

export default function App() {
  const [activePageId, setActivePageId] = useState('p1');
  const [activeProfile, setActiveProfile] = useState(PROFILES[0]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pageTransitioning, setPageTransitioning] = useState(false);

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
    switch (activePageId) {
      case 'p1':
        return <OverviewPage profile={activeProfile} onNavigate={handleNavigate} />;
      case 'p2':
        return <ProblemPage onNavigate={handleNavigate} />;
      case 'p3':
        return <AnalyticsPage profile={activeProfile} onNavigate={handleNavigate} />;
      case 'p4':
        return <GoalsReadinessPage profile={activeProfile} onNavigate={handleNavigate} />;
      case 'p5':
        return <DashboardPage profile={activeProfile} onSelectProfile={setActiveProfile} onNavigate={handleNavigate} />;
      case 'p6':
        return <TechStackPage onScrollTop={handleScrollTop} onNavigate={handleNavigate} />;
      default:
        return <OverviewPage profile={activeProfile} onNavigate={handleNavigate} />;
    }
  };

  const currentIndex = SIDEBAR_ITEMS.findIndex((p) => p.id === activePageId);
  const progressPercent = ((currentIndex + 1) / SIDEBAR_ITEMS.length) * 100;

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
        activeProfile={activeProfile}
        onSelectProfile={setActiveProfile}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
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
