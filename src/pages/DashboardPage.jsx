import React, { useState } from 'react';
import { PROFILES } from '../data/mockData';

export default function DashboardPage({ profile, onSelectProfile, onNavigate }) {
  const [topicFilter, setTopicFilter] = useState('all');

  const filteredTopics = profile.topicMastery.filter((topic) => {
    if (topicFilter === 'mastered') return topic.score >= 0.85;
    if (topicFilter === 'weak') return topic.score < 0.60;
    return true;
  });

  return (
    <section className="page-section" id="p5">
      <div className="wrap">
        <div className="idx">05 — DASHBOARD PREVIEW</div>
        <h2 className="editorial-h2" style={{ marginTop: '10px' }}>
          What lands on screen.
        </h2>
        <p className="editorial-lede">
          Overview, topic breakdown, and unified KPIs — the whole picture, at a glance.
        </p>

        {/* Dashboard Panel */}
        <div
          className="editorial-panel"
          style={{
            marginTop: '32px',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '14px',
              borderBottom: '1px solid var(--line)',
              paddingBottom: '18px'
            }}
          >
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--ink)' }}>
                {profile.name}
              </div>
              <div className="mono" style={{ fontSize: '0.78rem', color: 'var(--ink-dim)', marginTop: '2px' }}>
                @{profile.handle} · {profile.platformsConnected.join(' · ').toLowerCase()}
              </div>
            </div>

            {/* Profile Buttons */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--ink-faint)' }}>
                Switch User:
              </span>
              {PROFILES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectProfile(p)}
                  style={{
                    fontSize: '0.74rem',
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--line)',
                    background: profile.id === p.id ? 'var(--primary)' : 'var(--paper-2)',
                    color: profile.id === p.id ? '#fff' : 'var(--ink-dim)',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  {p.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* 4 KPIs Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              marginBottom: '28px',
              borderBottom: '1px solid var(--line)',
              paddingBottom: '24px'
            }}
          >
            <div style={{ background: 'var(--paper-2)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 600 }}>
                Solved
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '2px', color: 'var(--ink)' }}>
                {profile.overallSolved}
              </div>
              <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--teal)', fontWeight: 600 }}>
                {profile.platforms.leetcode.solved} LC · {profile.platforms.codeforces.solvedCount} CF
              </div>
            </div>

            <div style={{ background: 'var(--paper-2)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 600 }}>
                Consistency
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '2px', color: 'var(--ink)' }}>
                {profile.consistencyRate}%
              </div>
              <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--gold-dark)', fontWeight: 600 }}>
                {profile.streakDays}d active streak
              </div>
            </div>

            <div style={{ background: 'var(--paper-2)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 600 }}>
                Rating
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '2px', color: 'var(--ink)' }}>
                {profile.normalizedRating}
              </div>
              <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--ink-dim)' }}>
                CF: {profile.platforms.codeforces.rating} ({profile.platforms.codeforces.rankTier})
              </div>
            </div>

            <div style={{ background: 'var(--paper-2)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 600 }}>
                Goal
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '2px', color: 'var(--primary)' }}>
                {Math.round(profile.goalProgress)}%
              </div>
              <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600 }}>
                {profile.overallSolved} / {profile.targetSolved} problems
              </div>
            </div>
          </div>

          {/* Topic Mastery Progress Block */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ fontSize: '0.92rem', color: 'var(--ink)', fontWeight: 700 }}>
                Topic Breakdown &amp; Gap Detection
              </span>

              {/* Topic Filters */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {[
                  { id: 'all', label: 'All Topics' },
                  { id: 'mastered', label: 'Mastered (85%+)' },
                  { id: 'weak', label: 'Needs Focus (<60%)' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setTopicFilter(f.id)}
                    style={{
                      fontSize: '0.72rem',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--line)',
                      background: topicFilter === f.id ? 'var(--primary)' : 'var(--paper-2)',
                      color: topicFilter === f.id ? '#fff' : 'var(--ink-dim)',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {filteredTopics.map((topic) => {
                const percentage = Math.round(topic.score * 100);
                const isWarning = topic.score < 0.6;
                const barColor = isWarning ? 'var(--gold)' : 'var(--primary)';

                return (
                  <div
                    key={topic.name}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '110px 1fr 120px 48px',
                      alignItems: 'center',
                      gap: '16px'
                    }}
                  >
                    <span className="mono" style={{ fontSize: '0.82rem', color: 'var(--ink)', fontWeight: 600 }}>
                      {topic.name}
                    </span>

                    <div style={{ height: '8px', background: 'var(--paper-2)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          background: barColor,
                          borderRadius: 'var(--radius-full)',
                          width: `${percentage}%`,
                          transition: 'width 0.4s ease'
                        }}
                      />
                    </div>

                    <span className="mono" style={{ fontSize: '0.74rem', color: 'var(--ink-dim)', textAlign: 'right' }}>
                      {topic.solved} solved ({topic.accuracy}%)
                    </span>

                    <span className="mono" style={{ fontSize: '0.78rem', color: isWarning ? 'var(--gold-dark)' : 'var(--primary)', textAlign: 'right', fontWeight: 700 }}>
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Coach's Summary Note */}
          <div
            style={{
              marginTop: '24px',
              padding: '14px 18px',
              background: 'var(--primary-light)',
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                Key Diagnostic Note:
              </span>
              <span style={{ fontSize: '0.92rem', color: 'var(--ink)', fontStyle: 'italic', fontWeight: 500 }}>
                "{profile.coachQuotes[0]?.text}"
              </span>
            </div>
            <button
              onClick={() => onNavigate('p3')}
              className="mono"
              style={{
                fontSize: '0.72rem',
                color: 'var(--primary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                textDecoration: 'underline'
              }}
            >
              See Analytics Engine →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
