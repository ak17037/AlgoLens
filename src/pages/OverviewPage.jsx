import React, { useState } from 'react';
import RadarChart from '../components/RadarChart';
import { RADAR_PRESETS } from '../data/mockData';
import { ArrowRight, Sparkles, Activity, Target } from 'lucide-react';

export default function OverviewPage({ profile, onNavigate }) {
  const [selectedPresetKey, setSelectedPresetKey] = useState('arjun');
  const [radarValues, setRadarValues] = useState(
    profile.topicMastery.map((t) => t.score)
  );

  const handlePresetSelect = (key) => {
    setSelectedPresetKey(key);
    setRadarValues(RADAR_PRESETS[key].values);
  };

  return (
    <section className="page-section" id="p1">
      <div className="wrap">
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center' }}>
          {/* Left Column: Hero Copy */}
          <div>
            <div className="idx">01 — OVERVIEW</div>
            <h1 className="editorial-h1" style={{ marginTop: '12px' }}>
              Practice everywhere. <span style={{ color: 'var(--primary)' }}>Understand</span> it in one place.
            </h1>
            <p className="editorial-lede" style={{ fontSize: '1.05rem', marginTop: '18px' }}>
              You solve problems on LeetCode, grind contests on Codeforces, climb stars on CodeChef. AlgoLens unifies all of it into clear insights — what's improving, what's stalling, and what to do next.
            </p>

            {/* Quick Metrics Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '14px',
                marginTop: '28px',
                padding: '18px 20px',
                background: 'var(--panel)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04)'
              }}
            >
              <div>
                <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
                  Total Solved
                </span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', marginTop: '2px' }}>
                  {profile.overallSolved}
                </div>
                <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--teal)', fontWeight: 600 }}>
                  4 Platforms
                </span>
              </div>

              <div>
                <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
                  Consistency
                </span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', marginTop: '2px' }}>
                  {profile.consistencyRate}%
                </div>
                <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--gold)', fontWeight: 600 }}>
                  {profile.streakDays}d streak
                </span>
              </div>

              <div>
                <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
                  Goal Progress
                </span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginTop: '2px' }}>
                  {Math.round(profile.goalProgress)}%
                </div>
                <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--ink-dim)' }}>
                  Target: {profile.targetSolved}
                </span>
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('p5')}
                className="editorial-button"
              >
                <span>Explore Live Dashboard</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => onNavigate('p2')}
                className="editorial-button secondary"
              >
                <span>View Current Progress</span>
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Radar Skill Map */}
          <div
            className="editorial-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '24px 20px',
              borderRadius: 'var(--radius-xl)'
            }}
          >
            {/* Presets Selector Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                marginBottom: '14px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              {Object.keys(RADAR_PRESETS).map((key) => (
                <button
                  key={key}
                  onClick={() => handlePresetSelect(key)}
                  style={{
                    fontSize: '0.72rem',
                    padding: '5px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--line)',
                    background: selectedPresetKey === key ? 'var(--primary)' : 'var(--paper-2)',
                    color: selectedPresetKey === key ? '#fff' : 'var(--ink-dim)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {key === 'arjun' ? 'Current Profile' : key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>

            {/* Animated Radar Chart */}
            <RadarChart
              labels={['Arrays', 'Strings', 'Trees', 'Graphs', 'DP']}
              initialValues={radarValues}
              size={260}
              interactive={true}
              onChange={(newVals) => setRadarValues(newVals)}
            />

            <div
              className="mono"
              style={{
                fontSize: '0.72rem',
                color: 'var(--ink-dim)',
                marginTop: '12px',
                textAlign: 'center',
                lineHeight: 1.4,
                maxWidth: '260px'
              }}
            >
              Arrays &amp; Strings strong, Graphs &amp; DP in development
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
