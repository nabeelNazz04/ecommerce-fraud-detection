import { 
  IconTransactions, 
  IconShieldAlert, 
  IconShieldCheck, 
  IconModel 
} from './Icons';

export const SummaryCards = ({ metrics }) => {
  return (
    <section className="summary-cards-grid" aria-label="Key Performance Indicators (Demo Values)">
      {/* Card 1: Total Transactions */}
      <div className="summary-card">
        <div className="card-header-row">
          <span className="card-title">Total Transactions</span>
          <span className="card-icon-bubble bubble-blue">
            <IconTransactions size={18} />
          </span>
        </div>
        <div className="card-metric-row">
          <span className="metric-value">{metrics.totalTransactions.toLocaleString()}</span>
          <span className="demo-pill-badge">Demo</span>
        </div>
        <div className="card-footer-row">
          <span className="trend-text trend-positive">+12.4%</span>
          <span className="footer-subtext">vs previous 24h window (synthetic)</span>
        </div>
      </div>

      {/* Card 2: Flagged Transactions */}
      <div className="summary-card card-alert">
        <div className="card-header-row">
          <span className="card-title">Flagged Transactions</span>
          <span className="card-icon-bubble bubble-red">
            <IconShieldAlert size={18} />
          </span>
        </div>
        <div className="card-metric-row">
          <span className="metric-value text-danger">{metrics.flaggedTransactions.toLocaleString()}</span>
          <span className="demo-pill-badge badge-warning">Demo</span>
        </div>
        <div className="card-footer-row">
          <span className="trend-text text-danger">38 Critical</span>
          <span className="footer-subtext">374 pending analyst review</span>
        </div>
      </div>

      {/* Card 3: Fraud Rate */}
      <div className="summary-card">
        <div className="card-header-row">
          <span className="card-title">Fraud Rate</span>
          <span className="card-icon-bubble bubble-amber">
            <IconShieldCheck size={18} />
          </span>
        </div>
        <div className="card-metric-row">
          <span className="metric-value">{metrics.fraudRate}%</span>
          <span className="demo-pill-badge">Demo</span>
        </div>
        <div className="card-footer-row">
          <span className="trend-text text-amber">Baseline 1.84%</span>
          <span className="footer-subtext">-0.18% below threshold</span>
        </div>
      </div>

      {/* Card 4: Model Status */}
      <div className="summary-card">
        <div className="card-header-row">
          <span className="card-title">Model Status</span>
          <span className="card-icon-bubble bubble-purple">
            <IconModel size={18} />
          </span>
        </div>
        <div className="card-metric-row">
          <span className="metric-value text-model">{metrics.modelStatus.state}</span>
          <span className="demo-pill-badge badge-purple">Prototype</span>
        </div>
        <div className="card-footer-row">
          <span className="trend-text text-cyan">~{metrics.modelStatus.avgLatencyMs}ms</span>
          <span className="footer-subtext">{metrics.modelStatus.pipeline}</span>
        </div>
      </div>
    </section>
  );
};
