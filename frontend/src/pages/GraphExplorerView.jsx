import { useState } from 'react';
import { GraphCanvas } from '../components/GraphCanvas';
import { 
  IconGraph, 
  IconShieldAlert
} from '../components/Icons';

export const GraphExplorerView = ({ focusedTxnId }) => {
  const [activeCluster, setActiveCluster] = useState(focusedTxnId || 'TX-90214');

  return (
    <div className="view-content graph-explorer-view">
      {/* Header */}
      <div className="view-header-strip">
        <div>
          <div className="title-with-pill">
            <h2 className="view-title">Knowledge Graph Explorer</h2>
            <span className="demo-pill-badge badge-purple">GNN Subgraph Visualizer</span>
          </div>
          <p className="view-subtitle">
            Explore heterogeneous relationships between Users, Transactions, Merchants, and Devices.
            Edge weights (α) represent GNNExplainer attention contributions to fraud classification.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="cluster-presets">
          <span className="presets-label">Subgraphs:</span>
          <button
            type="button"
            className={`preset-btn ${activeCluster === 'TX-90214' ? 'active' : ''}`}
            onClick={() => setActiveCluster('TX-90214')}
          >
            Syndicate Ring (TX-90214)
          </button>
          <button
            type="button"
            className={`preset-btn ${activeCluster === 'TX-90215' ? 'active' : ''}`}
            onClick={() => setActiveCluster('TX-90215')}
          >
            Verified Safe (TX-90215)
          </button>
        </div>
      </div>

      {/* Interactive Graph Canvas */}
      <GraphCanvas
        isPreview={false}
        selectedTxnId={activeCluster}
      />

      {/* Academic Explainability & Schema Guide */}
      <div className="graph-theory-grid">
        {/* Node Schema breakdown */}
        <div className="theory-card">
          <div className="theory-header">
            <IconGraph size={18} className="text-purple" />
            <h4 className="theory-title">Heterogeneous Graph Schema</h4>
          </div>
          <p className="theory-description">
            E-commerce transaction networks are modeled as multi-relational graphs:
          </p>
          <ul className="schema-entity-list">
            <li>
              <strong className="text-user">User (U):</strong> Account age, KYC tier, dispute history, velocity vectors.
            </li>
            <li>
              <strong className="text-txn">Transaction (T):</strong> Amount, timestamp, card-present flag, payment method.
            </li>
            <li>
              <strong className="text-merch">Merchant (M):</strong> MCC category code, baseline dispute rate, GMV tier.
            </li>
            <li>
              <strong className="text-dev">Device (D):</strong> Browser fingerprint, canvas hash, IP geodistance, OS type.
            </li>
          </ul>
        </div>

        {/* Explainability Pipeline */}
        <div className="theory-card">
          <div className="theory-header">
            <IconShieldAlert size={18} className="text-danger" />
            <h4 className="theory-title">GNNExplainer Subgraph Masking</h4>
          </div>
          <p className="theory-description">
            Standard deep models operate as black boxes. For academic fraud detection, our pipeline implements GNNExplainer:
          </p>
          <div className="theory-callout-box">
            <code>Edge Mask: max MI(Y, G_sub) s.t. |G_sub| &lt;= K</code>
            <p className="callout-note">
              Identifies the minimal subgraph containing the most critical relational paths (such as multiple distinct user accounts co-locating on the same physical device fingerprint).
            </p>
          </div>
          <span className="academic-footer-tag">
            Illustrative Model Architecture • PyTorch Geometric planned integration
          </span>
        </div>
      </div>
    </div>
  );
};
