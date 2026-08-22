import React, { useState } from 'react';

export default function AnalyticsPage({ profile, onNavigate }) {
  const [daysSolved, setDaysSolved] = useState([
    true, true, false, true, true, true, false,
    true, true, true, true, false, true, true
  ]);

  const toggleDay = (index) => {
    const updated = [...daysSolved];
    updated[index] = !updated[index];
    setDaysSolved(updated);
  };

  const calculatedConsistency = Math.round(
    (daysSolved.filter(Boolean).length / daysSolved.length) * 100
  );

  return (
    <section className="page-section" id="p3">
      <div className="wrap">
        <div className="idx">03 — ANALYTICS ENGINE</div>
        <h2 className="editorial-h2" style={{ marginTop: '10px' }}>
          Numbers become answers.
        </h2>
        <p className="editorial-lede">
          The core of AlgoLens — raw activity is processed into the metrics that actually explain progress.
        </p>

        {/* 4 Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginTop: '32px'
          }}
        >
          {/* Metric 1 */}
          <div className="editorial-panel">
            <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 700 }}>
              Growth Rate
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '1.2rem', margin: '8px 0 6px', color: 'var(--ink)' }}>
              Week over week (+{profile.weeklyGrowth}%)
            </h3>
            <p style={{ color: 'var(--ink-dim)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              100 solved → 120 solved reads as a 20% growth rate, not two disconnected totals.
            </p>
          </div>

          {/* Metric 2 */}
          <div className="editorial-panel">
            <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--gold-dark)', textTransform: 'uppercase', fontWeight: 700 }}>
              Consistency
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '1.2rem', margin: '8px 0 6px', color: 'var(--ink)' }}>
              Daily activity, rolled up ({profile.consistencyRate}%)
            </h3>
            <p style={{ color: 'var(--ink-dim)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Mon ✔ Tue ✔ Wed ✖ Thu ✔ Fri ✔ becomes a single consistency percentage.
            </p>
          </div>

          {/* Metric 3 */}
          <div className="editorial-panel">
            <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--teal)', textTransform: 'uppercase', fontWeight: 700 }}>
              Topic Accuracy
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '1.2rem', margin: '8px 0 6px', color: 'var(--ink)' }}>
              Where the gaps are
            </h3>
            <p style={{ color: 'var(--ink-dim)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Arrays: 90 solved, 94% accuracy. Graphs: 10 solved, 40% accuracy — a real comparison.
            </p>
          </div>

          {/* Metric 4 */}
          <div className="editorial-panel">
            <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 700 }}>
              Contest Analysis
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '1.2rem', margin: '8px 0 6px', color: 'var(--ink)' }}>
              Beyond the rating line
            </h3>
            <p style={{ color: 'var(--ink-dim)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Average rank, rating trend, contest frequency, and best/worst performances in one view.
            </p>
          </div>
        </div>

        {/* Consistency Calculator */}
        <div
          className="editorial-panel"
          style={{
            marginTop: '28px',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)' }}>
                Live Roll-Up Consistency Engine
              </span>
              <p className="mono" style={{ fontSize: '0.72rem', color: 'var(--ink-dim)', marginTop: '2px' }}>
                Click any day to toggle practice and recalculate score:
              </p>
            </div>

            <div
              style={{
                background: 'var(--paper-2)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px'
              }}
            >
              <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--ink-dim)' }}>
                Score:
              </span>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: calculatedConsistency >= 75 ? 'var(--primary)' : 'var(--gold)' }}>
                {calculatedConsistency}%
              </span>
            </div>
          </div>

          {/* 14-Day Calendar Matrix */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(14, 1fr)',
              gap: '6px',
              marginTop: '16px'
            }}
          >
            {daysSolved.map((isSolved, i) => (
              <button
                key={i}
                onClick={() => toggleDay(i)}
                className="mono"
                style={{
                  height: '44px',
                  borderRadius: 'var(--radius-sm)',
                  border: isSolved ? '1px solid var(--primary)' : '1px solid var(--line)',
                  background: isSolved ? 'var(--primary-light)' : 'var(--paper-2)',
                  color: isSolved ? 'var(--primary)' : 'var(--ink-faint)',
                  cursor: 'pointer',
                  fontSize: '0.72rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  transition: 'all 0.15s ease'
                }}
              >
                <span>D{i + 1}</span>
                <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>{isSolved ? '✔' : '✖'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
