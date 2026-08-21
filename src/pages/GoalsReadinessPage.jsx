import React, { useState } from 'react';
import { Target, Briefcase } from 'lucide-react';

export default function GoalsReadinessPage({ profile, onNavigate }) {
  const [targetGoal, setTargetGoal] = useState(profile.targetSolved || 500);
  const [selectedRole, setSelectedRole] = useState('faang');

  const solved = profile.overallSolved;
  const progressPercent = Math.min(100, Math.round((solved / targetGoal) * 100));
  const problemsRemaining = Math.max(0, targetGoal - solved);
  const weeksToTarget = Math.ceil(problemsRemaining / 20);

  const companyBenchmarks = {
    faang: {
      title: 'Tier-1 Big Tech (Google, Meta, Amazon)',
      overall: profile.readinessByRole?.faang || 64,
      topics: [
        { name: 'Arrays & Strings', current: 95, target: 90 },
        { name: 'Trees & BST', current: 60, target: 80 },
        { name: 'Graphs & BFS/DFS', current: 40, target: 75 },
        { name: 'Dynamic Programming', current: 30, target: 70 }
      ]
    },
    fintech: {
      title: 'Quant & High Frequency Trading',
      overall: profile.readinessByRole?.fintech || 58,
      topics: [
        { name: 'Arrays & Math', current: 90, target: 95 },
        { name: 'Trees & Bitmasks', current: 55, target: 85 },
        { name: 'Graphs & Flow', current: 38, target: 80 },
        { name: 'DP & Combinatorics', current: 35, target: 85 }
      ]
    },
    startups: {
      title: 'High-Growth Unicorn Startups',
      overall: profile.readinessByRole?.startups || 76,
      topics: [
        { name: 'Arrays & HashMaps', current: 95, target: 85 },
        { name: 'Trees & Recursion', current: 65, target: 70 },
        { name: 'Graphs & Systems', current: 45, target: 60 },
        { name: 'Practical DP', current: 35, target: 50 }
      ]
    }
  };

  const activeBenchmark = companyBenchmarks[selectedRole];

  return (
    <section className="page-section" id="p4">
      <div className="wrap">
        <div className="idx">04 — GOALS &amp; READINESS</div>
        <h2 className="editorial-h2" style={{ marginTop: '10px' }}>
          Progress you can set a target against.
        </h2>
        <p className="editorial-lede">
          A goal only motivates if you can see it move. AlgoLens tracks both a running target and how close it puts you to interview-ready.
        </p>

        {/* 2 Split Cards */}
        <div className="grid-2" style={{ marginTop: '32px' }}>
          {/* Card 1: Goal Tracker */}
          <div className="editorial-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 600 }}>
                Goal — solve {targetGoal} problems
              </div>
              <Target size={16} color="var(--primary)" />
            </div>

            <div style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '8px', color: 'var(--ink)' }}>
              {solved} <span className="mono" style={{ fontSize: '1.1rem', color: 'var(--ink-faint)', fontWeight: 500 }}>/ {targetGoal}</span>
            </div>

            {/* Progress Bar */}
            <div style={{ height: '8px', background: 'var(--paper-2)', borderRadius: 'var(--radius-full)', marginTop: '14px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  background: 'var(--primary)',
                  width: `${progressPercent}%`,
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>

            <p style={{ marginTop: '12px', color: 'var(--ink-dim)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              <b>{progressPercent}% completed</b> — daily target: 3 problems (~{weeksToTarget} weeks remaining at current pace).
            </p>

            {/* Goal slider */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--ink-dim)' }}>Adjust Target Objective:</span>
                <span className="mono" style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--primary)' }}>{targetGoal} problems</span>
              </div>
              <input
                type="range"
                min="350"
                max="1000"
                step="25"
                value={targetGoal}
                onChange={(e) => setTargetGoal(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Card 2: Interview Readiness */}
          <div className="editorial-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 600 }}>
                Interview Readiness — {activeBenchmark.overall}% overall
              </div>
              <Briefcase size={16} color="var(--gold)" />
            </div>

            {/* Benchmark Switcher Tabs */}
            <div style={{ display: 'flex', gap: '6px', margin: '14px 0 16px' }}>
              {[
                { id: 'faang', label: 'FAANG / Tier-1' },
                { id: 'fintech', label: 'FinTech / Quant' },
                { id: 'startups', label: 'Startups' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRole(tab.id)}
                  style={{
                    fontSize: '0.74rem',
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--line)',
                    background: selectedRole === tab.id ? 'var(--primary)' : 'var(--paper-2)',
                    color: selectedRole === tab.id ? '#fff' : 'var(--ink-dim)',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Readiness Rows */}
            <div style={{ display: 'grid', gap: '12px' }}>
              {activeBenchmark.topics.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr 44px',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--ink-dim)' }}>
                    {item.name}
                  </span>

                  <div style={{ height: '7px', background: 'var(--paper-2)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        background: item.current >= item.target ? 'var(--teal)' : 'var(--gold)',
                        width: `${item.current}%`,
                        borderRadius: 'var(--radius-full)',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>

                  <span className="mono" style={{ fontSize: '0.74rem', textAlign: 'right', color: item.current >= item.target ? 'var(--teal)' : 'var(--gold-dark)', fontWeight: 700 }}>
                    {item.current}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
