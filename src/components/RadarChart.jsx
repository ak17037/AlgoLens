import React, { useState, useEffect } from 'react';

export default function RadarChart({
  labels = ['Arrays', 'Strings', 'Trees', 'Graphs', 'DP'],
  initialValues = [0.94, 0.88, 0.45, 0.40, 0.30],
  size = 280,
  interactive = true,
  onChange = null
}) {
  const [values, setValues] = useState(initialValues);
  const [animatedValues, setAnimatedValues] = useState(initialValues.map(() => 0.15));
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  // Smooth animation
  useEffect(() => {
    let startTimestamp = null;
    const duration = 650;
    const startVals = [...animatedValues];

    let animFrame;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      const nextVals = startVals.map((sVal, i) => {
        const targetVal = values[i] ?? 0.5;
        return sVal + (targetVal - sVal) * ease;
      });

      setAnimatedValues(nextVals);

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      }
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [values]);

  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.34;
  const n = labels.length;

  const getPoint = (i, radius) => {
    const angle = ((-90 + (i * 360) / n) * Math.PI) / 180;
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
  };

  const polygonPoints = animatedValues
    .map((val, i) => {
      const [x, y] = getPoint(i, R * Math.max(0.05, Math.min(1, val)));
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const handleSliderChange = (index, newVal) => {
    const next = [...values];
    next[index] = parseFloat(newVal);
    setValues(next);
    if (onChange) onChange(next);
  };

  return (
    <div className="radar-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: 'visible', filter: 'drop-shadow(0 4px 12px rgba(79, 70, 229, 0.08))' }}
      >
        {/* Concentric Polygons */}
        {[0.25, 0.5, 0.75, 1].map((factor) => {
          const pathD = labels
            .map((_, i) => {
              const [x, y] = getPoint(i, R * factor);
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ') + ' Z';

          return (
            <path
              key={factor}
              d={pathD}
              fill={factor === 1 ? 'var(--paper-2)' : 'none'}
              stroke="var(--line)"
              strokeWidth="1"
              strokeDasharray={factor === 1 ? 'none' : '3 3'}
            />
          );
        })}

        {/* Axis Lines & Labels */}
        {labels.map((label, i) => {
          const [x, y] = getPoint(i, R);
          const [lx, ly] = getPoint(i, R + 20);
          const isHovered = hoveredIdx === i;

          return (
            <g key={label} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} style={{ cursor: 'pointer' }}>
              <line
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke={isHovered ? 'var(--primary)' : 'var(--line)'}
                strokeWidth={isHovered ? '1.5' : '1'}
              />
              <text
                x={lx}
                y={ly + 4}
                textAnchor="middle"
                className="mono"
                fill={isHovered ? 'var(--primary)' : 'var(--ink-dim)'}
                fontSize="10"
                fontWeight={isHovered ? '700' : '500'}
                style={{ transition: 'all 0.15s ease' }}
              >
                {label} {Math.round(values[i] * 100)}%
              </text>
            </g>
          );
        })}

        {/* Polygon Area */}
        <polygon
          points={polygonPoints}
          fill="var(--primary)"
          fillOpacity="0.18"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Vertex Points */}
        {animatedValues.map((val, i) => {
          const [vx, vy] = getPoint(i, R * Math.max(0.05, Math.min(1, val)));
          const isHovered = hoveredIdx === i;

          return (
            <circle
              key={i}
              cx={vx}
              cy={vy}
              r={isHovered ? 6 : 4}
              fill={isHovered ? 'var(--gold)' : 'var(--primary)'}
              stroke="#fff"
              strokeWidth="2"
              style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
          );
        })}
      </svg>

      {/* Interactive Sliders */}
      {interactive && (
        <div style={{ marginTop: '16px', width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--ink-dim)' }}>
              Tune Skill Weights
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
            {labels.map((lbl, idx) => (
              <div key={lbl} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: '0.64rem', color: 'var(--ink-faint)' }}>
                  {lbl.slice(0, 3)}
                </span>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={values[idx]}
                  onChange={(e) => handleSliderChange(idx, e.target.value)}
                  style={{ width: '100%', marginTop: '3px' }}
                />
                <span className="mono" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {Math.round(values[idx] * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
