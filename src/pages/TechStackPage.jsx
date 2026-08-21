import React, { useState } from 'react';
import { TECH_STACK } from '../data/mockData';
import { Layers, CheckCircle, ArrowUp } from 'lucide-react';

export default function TechStackPage({ onScrollTop, onNavigate }) {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);

  return (
    <section className="page-section" id="p6">
      <div className="wrap">
        <div className="idx">06 — TECH STACK &amp; SYLLABUS</div>
        <h2 className="editorial-h2" style={{ marginTop: '10px' }}>
          Built on Core Frontend &amp; React Fundamentals.
        </h2>
        <p className="editorial-lede">
          Structured around key syllabus benchmarks: Semantic HTML &amp; CSS, Modern JavaScript &amp; GitHub, DOM Manipulation, and React Component Architecture.
        </p>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginTop: '32px'
          }}
        >
          {TECH_STACK.map((col, idx) => {
            const isSelected = selectedLayerIndex === idx;
            return (
              <div
                key={col.layer}
                onClick={() => setSelectedLayerIndex(idx)}
                style={{
                  background: isSelected ? 'var(--panel)' : 'var(--paper-2)',
                  padding: '22px 20px',
                  borderRadius: 'var(--radius-lg)',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--line)',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 8px 24px -4px rgba(79, 70, 229, 0.12)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <div className="mono" style={{ fontSize: '0.72rem', color: isSelected ? 'var(--primary)' : 'var(--ink-faint)', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 700 }}>
                  {col.layer}
                </div>
                <ul style={{ listStyle: 'none' }}>
                  {col.techs.map((tech, tIdx) => (
                    <li
                      key={tech.name}
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--ink-dim)',
                        padding: '6px 0',
                        borderTop: tIdx === 0 ? 'none' : '1px solid var(--line)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                      }}
                    >
                      <b style={{ color: 'var(--ink)', fontWeight: 700 }}>{tech.name}</b>
                      <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--ink-faint)' }}>
                        {tech.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Architecture Blueprint Inspector */}
        <div
          className="editorial-panel"
          style={{
            marginTop: '28px',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={16} color="var(--primary)" />
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)' }}>
                Syllabus &amp; Implementation Breakdown: {TECH_STACK[selectedLayerIndex].layer}
              </span>
            </div>
            <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 600 }}>
              {TECH_STACK[selectedLayerIndex].subtitle}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {TECH_STACK[selectedLayerIndex].techs.map((tech) => (
              <div
                key={tech.name}
                style={{
                  background: 'var(--paper-2)',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <CheckCircle size={13} color="var(--teal)" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--ink)' }}>{tech.name}</span>
                </div>
                <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--ink-dim)', lineHeight: 1.4 }}>
                  {tech.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Wrap-up & Actions */}
        <div
          style={{
            marginTop: '36px',
            padding: '20px 0',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <button
            onClick={onScrollTop}
            className="editorial-button secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowUp size={14} />
            <span>Return to Top</span>
          </button>
        </div>
      </div>
    </section>
  );
}
