import { TransactionTable } from '../components/TransactionTable';
import { DEMO_TRANSACTIONS } from '../data/mockData';
import { IconInfo } from '../components/Icons';

export const TransactionsView = ({
  searchQuery,
  onNavigateTab,
  onSelectTxnForGraph
}) => {
  const highRiskCount = DEMO_TRANSACTIONS.filter(t => t.status === 'High Risk').length;
  const reviewCount = DEMO_TRANSACTIONS.filter(t => t.status === 'Under Review').length;
  const approvedCount = DEMO_TRANSACTIONS.filter(t => t.status === 'Approved').length;

  return (
    <div className="view-content transactions-view">
      {/* Page Header */}
      <div className="view-header-strip">
        <div>
          <div className="title-with-pill">
            <h2 className="view-title">Transaction Monitoring</h2>
            <span className="demo-pill-badge">Demo Data Feed</span>
          </div>
          <p className="view-subtitle">
            Inspect real-time e-commerce transactions, review Graph Neural Network risk predictions, and explain flagged anomalies.
          </p>
        </div>

        {/* Quick summary counters */}
        <div className="txn-quick-metrics">
          <div className="metric-chip chip-red">
            <span className="chip-label">High Risk:</span>
            <span className="chip-value">{highRiskCount}</span>
          </div>
          <div className="metric-chip chip-amber">
            <span className="chip-label">Under Review:</span>
            <span className="chip-value">{reviewCount}</span>
          </div>
          <div className="metric-chip chip-green">
            <span className="chip-label">Approved:</span>
            <span className="chip-value">{approvedCount}</span>
          </div>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="info-notice-bar">
        <IconInfo size={16} className="text-cyan" />
        <span>
          <strong>GNN Scoring Methodology:</strong> Risk scores combine traditional transaction attributes with relational graph embeddings from a 2-hop ego-network around the user, device, and merchant.
        </span>
      </div>

      {/* Full Transaction Table */}
      <TransactionTable
        externalSearchQuery={searchQuery}
        onInspectInGraph={(txnId) => {
          if (onSelectTxnForGraph) onSelectTxnForGraph(txnId);
          onNavigateTab('graph');
        }}
      />
    </div>
  );
};
