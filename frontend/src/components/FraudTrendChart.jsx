import { useState } from 'react';
import { TREND_DATA } from '../data/mockData';

export const FraudTrendChart = () => {
  const [activeRange, setActiveRange] = useState('24h');
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [metricMode, setMetricMode] = useState('volume'); // 'volume' or 'rate'

  // Dimensions for SVG
  const width = 640;
  const height = 240;
  const padding = { top: 20, right: 30, bottom: 40, left: 55 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const data = TREND_DATA;

  // Max calculations
  const maxTotal = Math.max(...data.map(d => d.total));
  const maxFlagged = Math.max(...data.map(d => d.flagged));
  const maxRate = Math.max(...data.map(d => d.fraudRate));

  // Coordinate mappers
  const getX = (index) => padding.left + (index / (data.length - 1)) * innerWidth;
  const getYTotal = (val) => padding.top + innerHeight - (val / (maxTotal * 1.15)) * innerHeight;
  const getYFlagged = (val) => padding.top + innerHeight - (val / (maxFlagged * 1.25)) * innerHeight;
  const getYRate = (val) => padding.top + innerHeight - (val / (maxRate * 1.3)) * innerHeight;

  // Construct SVG paths
  const totalPoints = data.map((d, i) => `${getX(i)},${getYTotal(d.total)}`).join(' ');
  const totalArea = `${getX(0)},${padding.top + innerHeight} ` + 
    totalPoints + 
    ` ${getX(data.length - 1)},${padding.top + innerHeight}`;

  const flaggedPoints = data.map((d, i) => `${getX(i)},${getYFlagged(d.flagged)}`).join(' ');
  const ratePoints = data.map((d, i) => `${getX(i)},${getYRate(d.fraudRate)}`).join(' ');
  const rateArea = `${getX(0)},${padding.top + innerHeight} ` +
    ratePoints +
    ` ${getX(data.length - 1)},${padding.top + innerHeight}`;

  return (
    <div className="analytics-card fraud-trend-card">
      <div className="card-top-bar">
        <div>
          <div className="title-with-pill">
            <h2 className="card-heading">Fraud Detection Trend</h2>
            <span className="demo-pill-badge">Demo Data</span>
          </div>
          <p className="card-subheading">
            Hourly transaction volume vs. flagged suspicious events (Synthetic telemetry)
          </p>
        </div>

        <div className="chart-controls-group">
          <div className="pill-toggle-group">
            <button
              type="button"
              className={`pill-btn ${metricMode === 'volume' ? 'active' : ''}`}
              onClick={() => setMetricMode('volume')}
            >
              Volume & Flags
            </button>
            <button
              type="button"
              className={`pill-btn ${metricMode === 'rate' ? 'active' : ''}`}
              onClick={() => setMetricMode('rate')}
            >
              Fraud Rate %
            </button>
          </div>

          <div className="time-select-group">
            {['24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                type="button"
                className={`time-chip ${activeRange === range ? 'active' : ''}`}
                onClick={() => setActiveRange(range)}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="svg-chart-container">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="trend-svg"
          preserveAspectRatio="none"
          role="img"
          aria-label="Fraud trend chart showing hourly transaction and flagged fraud volumes"
        >
          <defs>
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="flaggedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = padding.top + innerHeight * (1 - ratio);
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#272f45"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  fill="#64748b"
                  fontSize="11"
                  textAnchor="end"
                  fontFamily="system-ui"
                >
                  {metricMode === 'volume'
                    ? Math.round(maxTotal * 1.15 * ratio)
                    : (maxRate * 1.3 * ratio).toFixed(1) + '%'}
                </text>
              </g>
            );
          })}

          {/* X Axis Ticks and Labels */}
          {data.map((d, i) => {
            const x = getX(i);
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={padding.top + innerHeight}
                  x2={x}
                  y2={padding.top + innerHeight + 5}
                  stroke="#475569"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={height - padding.bottom + 20}
                  fill="#94a3b8"
                  fontSize="11"
                  textAnchor="middle"
                  fontFamily="system-ui"
                >
                  {d.time}
                </text>
              </g>
            );
          })}

          {/* Chart Content depending on metric mode */}
          {metricMode === 'volume' ? (
            <>
              {/* Total volume area & line */}
              <polygon points={totalArea} fill="url(#totalGradient)" />
              <polyline
                points={totalPoints}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Flagged volume line */}
              <polyline
                points={flaggedPoints}
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive points */}
              {data.map((d, i) => {
                const x = getX(i);
                const yTotal = getYTotal(d.total);
                const yFlagged = getYFlagged(d.flagged);
                const isHovered = hoveredPoint === i;

                return (
                  <g key={i} onMouseEnter={() => setHoveredPoint(i)} onMouseLeave={() => setHoveredPoint(null)}>
                    {/* Invisible hit column */}
                    <rect
                      x={x - innerWidth / (data.length * 2)}
                      y={padding.top}
                      width={innerWidth / data.length}
                      height={innerHeight}
                      fill="transparent"
                      cursor="pointer"
                    />

                    {isHovered && (
                      <line
                        x1={x}
                        y1={padding.top}
                        x2={x}
                        y2={padding.top + innerHeight}
                        stroke="#64748b"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                    )}

                    <circle
                      cx={x}
                      cy={yTotal}
                      r={isHovered ? 5 : 3.5}
                      fill="#3b82f6"
                      stroke="#0f172a"
                      strokeWidth="2"
                    />
                    <circle
                      cx={x}
                      cy={yFlagged}
                      r={isHovered ? 5 : 3.5}
                      fill="#ef4444"
                      stroke="#0f172a"
                      strokeWidth="2"
                    />
                  </g>
                );
              })}
            </>
          ) : (
            <>
              {/* Fraud Rate Mode */}
              <polygon points={rateArea} fill="url(#rateGradient)" />
              <polyline
                points={ratePoints}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {data.map((d, i) => {
                const x = getX(i);
                const yRate = getYRate(d.fraudRate);
                const isHovered = hoveredPoint === i;

                return (
                  <g key={i} onMouseEnter={() => setHoveredPoint(i)} onMouseLeave={() => setHoveredPoint(null)}>
                    <rect
                      x={x - innerWidth / (data.length * 2)}
                      y={padding.top}
                      width={innerWidth / data.length}
                      height={innerHeight}
                      fill="transparent"
                      cursor="pointer"
                    />

                    {isHovered && (
                      <line
                        x1={x}
                        y1={padding.top}
                        x2={x}
                        y2={padding.top + innerHeight}
                        stroke="#64748b"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                    )}

                    <circle
                      cx={x}
                      cy={yRate}
                      r={isHovered ? 5 : 4}
                      fill="#f59e0b"
                      stroke="#0f172a"
                      strokeWidth="2"
                    />
                  </g>
                );
              })}
            </>
          )}
        </svg>

        {/* Hover Tooltip display */}
        {hoveredPoint !== null && (
          <div className="chart-tooltip-overlay">
            <span className="tooltip-time">{data[hoveredPoint].time}</span>
            <div className="tooltip-stat">
              <span className="tooltip-dot dot-blue" />
              <span>Total: <strong>{data[hoveredPoint].total.toLocaleString()}</strong></span>
            </div>
            <div className="tooltip-stat">
              <span className="tooltip-dot dot-red" />
              <span>Flagged: <strong>{data[hoveredPoint].flagged}</strong></span>
            </div>
            <div className="tooltip-stat">
              <span className="tooltip-dot dot-amber" />
              <span>Rate: <strong>{data[hoveredPoint].fraudRate}%</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* Legend & Note */}
      <div className="chart-legend-row">
        <div className="legend-items">
          {metricMode === 'volume' ? (
            <>
              <div className="legend-item">
                <span className="legend-chip bg-blue"></span>
                <span>Total Volume (Demo)</span>
              </div>
              <div className="legend-item">
                <span className="legend-chip bg-red"></span>
                <span>Flagged Fraud Alerts (Demo)</span>
              </div>
            </>
          ) : (
            <div className="legend-item">
              <span className="legend-chip bg-amber"></span>
              <span>Observed Fraud Rate % (Demo)</span>
            </div>
          )}
        </div>
        <span className="chart-academic-caption">
          Hourly aggregation simulation • 24h cycle
        </span>
      </div>
    </div>
  );
};
