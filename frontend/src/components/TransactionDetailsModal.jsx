import { 
  IconClose, 
  IconShieldAlert, 
  IconShieldCheck, 
  IconGraph, 
  IconUser, 
  IconDevice, 
  IconStore 
} from './Icons';

export const TransactionDetailsModal = ({ 
  transaction, 
  onClose, 
  onInspectInGraph 
}) => {
  if (!transaction) return null;

  const isHighRisk = transaction.riskScore >= 75;
  const isMediumRisk = transaction.riskScore >= 40 && transaction.riskScore < 75;

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-txn-title"
    >
      <div 
        className="modal-content-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="demo-pill-badge">Demo Record</span>
            <h3 id="modal-txn-title" className="modal-title">
              Transaction Details: {transaction.id}
            </h3>
            <span className="modal-timestamp">{transaction.timestamp}</span>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close transaction details"
          >
            <IconClose size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Top Risk Banner */}
          <div className={`risk-assessment-banner ${isHighRisk ? 'banner-high-risk' : isMediumRisk ? 'banner-mid-risk' : 'banner-low-risk'}`}>
            <div className="banner-left">
              {isHighRisk ? <IconShieldAlert size={24} /> : <IconShieldCheck size={24} />}
              <div>
                <h4 className="banner-risk-title">
                  Risk Score: {transaction.riskScore}/100 — {transaction.status}
                </h4>
                <p className="banner-decision-text">Decision: {transaction.decision}</p>
              </div>
            </div>

            <div className="banner-confidence">
              <span className="confidence-label">GNN Confidence</span>
              <span className="confidence-val">{transaction.gnnExplanation.gnnConfidence}%</span>
            </div>
          </div>

          {/* Key Entity Grid */}
          <div className="entity-breakdown-grid">
            <div className="entity-box">
              <div className="box-icon"><IconUser size={16} /></div>
              <div className="box-details">
                <span className="box-label">User Account</span>
                <span className="box-val">{transaction.userName}</span>
                <span className="box-sub">{transaction.userId}</span>
              </div>
            </div>

            <div className="entity-box">
              <div className="box-icon"><IconStore size={16} /></div>
              <div className="box-details">
                <span className="box-label">Merchant</span>
                <span className="box-val">{transaction.merchant}</span>
                <span className="box-sub">{transaction.merchantCategory}</span>
              </div>
            </div>

            <div className="entity-box">
              <div className="box-icon"><IconDevice size={16} /></div>
              <div className="box-details">
                <span className="box-label">Device & IP</span>
                <span className="box-val">{transaction.deviceId}</span>
                <span className="box-sub">{transaction.ipAddress} ({transaction.location})</span>
              </div>
            </div>

            <div className="entity-box">
              <div className="box-icon text-cyan">$</div>
              <div className="box-details">
                <span className="box-label">Amount</span>
                <span className="box-val">${transaction.amount.toFixed(2)} {transaction.currency}</span>
                <span className="box-sub">Card-Not-Present</span>
              </div>
            </div>
          </div>

          {/* Explainability Section */}
          <div className="modal-explanation-section">
            <h4 className="section-heading">
              GNNExplainer Subgraph Rationale (Illustrative Prototype)
            </h4>
            <p className="explanation-primary-reason">
              {transaction.gnnExplanation.primaryReason}
            </p>

            <h5 className="sub-heading">Top Influential Knowledge Graph Relations:</h5>
            <ul className="influential-edges-list">
              {transaction.gnnExplanation.influentialEdges.map((edge, idx) => (
                <li key={idx} className="edge-item">
                  <div className="edge-info">
                    <span className="edge-relation">{edge.relation}</span>
                    <span className="edge-arrow">→</span>
                    <span className="edge-target">{edge.target}</span>
                  </div>
                  <div className="edge-weight-bar">
                    <div 
                      className="edge-weight-fill" 
                      style={{ width: `${edge.weight * 100}%` }}
                    />
                    <span className="edge-weight-num">α = {edge.weight.toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-outline"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              onClose();
              if (onInspectInGraph) onInspectInGraph(transaction.id);
            }}
          >
            <IconGraph size={16} />
            <span>Open in Graph Explorer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
