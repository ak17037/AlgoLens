import React, { useState } from 'react';
import { convertScore } from '../data/conversionMap';
import { Calculator } from 'lucide-react';

export default function ProblemPage({ onNavigate }) {
  const [inputPlatform, setInputPlatform] = useState('leetcode_rating');
  const [inputValue, setInputValue] = useState(1650);

  const converted = convertScore(inputPlatform, inputValue);

  return (
    <section className="page-section" id="p2">
      <div className="wrap">
        <div className="idx">02 — CURRENT PROGRESS</div>
        <h2 className="editorial-h2" style={{ marginTop: '10px' }}>
          Four platforms, four different languages for the same skill.
        </h2>
        <p className="editorial-lede">
          LeetCode counts problems. Codeforces counts rating. CodeChef counts stars. None of them agree on what "good" looks like — so the one question every student asks, <i style={{ color: 'var(--primary)' }}>am I improving?</i>, has nowhere to be answered.
        </p>

        {/* Platform Disparity List */}
        <div
          style={{
            marginTop: '32px',
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04)'
          }}
        >
          {[
            { name: 'LeetCode', desc: 'Problem-count driven, split by Easy / Medium / Hard', metric: '350 solved' },
            { name: 'Codeforces', desc: 'Numeric rating from contest performance & penalties', metric: '1250 rating' },
            { name: 'CodeChef', desc: 'Star ranking tier tied to Division contest results', metric: '3★ (Div 3)' },
            { name: 'GeeksforGeeks', desc: 'Composite practice score & POTD points', metric: '450 score' }
          ].map((plat, idx) => (
            <div
              key={plat.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr 140px',
                alignItems: 'center',
                gap: '20px',
                padding: '18px 24px',
                borderBottom: idx < 3 ? '1px solid var(--line)' : 'none',
                background: idx % 2 === 0 ? 'var(--panel)' : 'var(--paper-2)'
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)' }}>
                {plat.name}
              </div>
              <div style={{ color: 'var(--ink-dim)', fontSize: '0.9rem' }}>
                {plat.desc}
              </div>
              <div className="mono" style={{ fontSize: '0.82rem', color: 'var(--primary)', textAlign: 'right', fontWeight: 600 }}>
                {plat.metric}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Cross-Platform Translator */}
        <div
          className="editorial-panel"
          style={{
            marginTop: '32px',
            background: 'var(--panel)',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calculator size={18} color="var(--primary)" />
              <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)' }}>
                Live Difficulty &amp; Rating Translator
              </span>
            </div>
            <div className="editorial-badge gold">
              Cross-Platform Normalization
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '28px', marginTop: '20px', alignItems: 'center' }}>
            {/* Input Controls */}
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                <button
                  onClick={() => {
                    setInputPlatform('leetcode_rating');
                    setInputValue(1650);
                  }}
                  style={{
                    fontSize: '0.74rem',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--line)',
                    background: inputPlatform === 'leetcode_rating' ? 'var(--primary)' : 'var(--paper-2)',
                    color: inputPlatform === 'leetcode_rating' ? '#fff' : 'var(--ink)',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  LeetCode Rating
                </button>
                <button
                  onClick={() => {
                    setInputPlatform('codeforces_rating');
                    setInputValue(1300);
                  }}
                  style={{
                    fontSize: '0.74rem',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--line)',
                    background: inputPlatform === 'codeforces_rating' ? 'var(--primary)' : 'var(--paper-2)',
                    color: inputPlatform === 'codeforces_rating' ? '#fff' : 'var(--ink)',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Codeforces Elo
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--ink-dim)' }}>
                  Input Rating:
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                  {inputValue}
                </span>
              </div>

              <input
                type="range"
                min={inputPlatform === 'leetcode_rating' ? 1200 : 800}
                max={inputPlatform === 'leetcode_rating' ? 2400 : 2200}
                step="25"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                style={{ marginTop: '8px' }}
              />
            </div>

            {/* Live Translations */}
            <div
              style={{
                background: 'var(--paper-2)',
                padding: '18px 20px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--line)',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px'
              }}
            >
              <div>
                <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--ink-faint)' }}>
                  {inputPlatform === 'leetcode_rating' ? 'Codeforces Elo' : 'LeetCode Equiv'}
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--ink)', marginTop: '2px' }}>
                  {inputPlatform === 'leetcode_rating' ? converted.cfRating : converted.lcRating}
                </div>
                <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--gold-dark)', fontWeight: 600 }}>
                  {inputPlatform === 'leetcode_rating' ? (converted.cfRating > 1400 ? 'Specialist' : 'Pupil') : 'Contest Rating'}
                </div>
              </div>

              <div>
                <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--ink-faint)' }}>
                  CodeChef Star
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--teal)', marginTop: '2px' }}>
                  {converted.ccStars}
                </div>
                <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--ink-dim)' }}>
                  ~{converted.ccRating} rating
                </div>
              </div>

              <div>
                <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--ink-faint)' }}>
                  Difficulty Tier
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginTop: '4px' }}>
                  {converted.equivTier}
                </div>
                <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--primary)' }}>
                  GFG: ~{converted.gfgScore} pts
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
