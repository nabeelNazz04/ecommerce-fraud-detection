import { useState, useMemo } from 'react';
import { DEMO_TRANSACTIONS } from '../data/mockData';
import { 
  IconSearch, 
  IconGraph, 
  IconInfo, 
  IconShieldAlert,
  IconShieldCheck
} from './Icons';
import { TransactionDetailsModal } from './TransactionDetailsModal';

export const TransactionTable = ({ 
  externalSearchQuery = '', 
  onInspectInGraph,
  limit = null 
}) => {
  const [internalSearch, setInternalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('timestamp_desc');
  const [selectedTxn, setSelectedTxn] = useState(null);

  // Combine external search from Header with internal table search
  const effectiveSearch = externalSearchQuery || internalSearch;

  const filteredTransactions = useMemo(() => {
    return DEMO_TRANSACTIONS.filter((txn) => {
      // Status filter
      if (statusFilter !== 'ALL' && txn.status !== statusFilter) {
        return false;
      }

      // Search filter
      if (effectiveSearch.trim()) {
        const query = effectiveSearch.toLowerCase().trim();
        const matchesId = txn.id.toLowerCase().includes(query);
        const matchesUser = txn.userId.toLowerCase().includes(query) || txn.userName.toLowerCase().includes(query);
        const matchesMerchant = txn.merchant.toLowerCase().includes(query);
        const matchesDevice = txn.deviceId.toLowerCase().includes(query);
        const matchesIp = txn.ipAddress.toLowerCase().includes(query);
        return matchesId || matchesUser || matchesMerchant || matchesDevice || matchesIp;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'risk_desc') return b.riskScore - a.riskScore;
      if (sortBy === 'risk_asc') return a.riskScore - b.riskScore;
      if (sortBy === 'amount_desc') return b.amount - a.amount;
      if (sortBy === 'amount_asc') return a.amount - b.amount;
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  }, [effectiveSearch, statusFilter, sortBy]);

  const displayList = limit ? filteredTransactions.slice(0, limit) : filteredTransactions;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'High Risk':
        return <span className="status-badge badge-high-risk"><IconShieldAlert size={12} /> High Risk</span>;
      case 'Under Review':
        return <span className="status-badge badge-review"><IconInfo size={12} /> Under Review</span>;
      case 'Approved':
        return <span className="status-badge badge-approved"><IconShieldCheck size={12} /> Approved</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  const getRiskColor = (score) => {
    if (score >= 75) return '#ef4444';
    if (score >= 40) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="table-card-container">
      {/* Table Toolbar */}
      <div className="table-header-toolbar">
        <div className="table-title-area">
          <div className="title-with-pill">
            <h3 className="table-title">Live Transaction Stream</h3>
            <span className="demo-pill-badge">Demo Records</span>
          </div>
          <p className="table-subtitle">
            Synthetic transaction stream with GraphSAGE inference scoring & explainability hooks
          </p>
        </div>

        <div className="table-controls">
          {/* Status Filter buttons */}
          <div className="filter-buttons-group">
            <button
              type="button"
              className={`filter-btn ${statusFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setStatusFilter('ALL')}
            >
              All ({DEMO_TRANSACTIONS.length})
            </button>
            <button
              type="button"
              className={`filter-btn ${statusFilter === 'High Risk' ? 'active' : ''}`}
              onClick={() => setStatusFilter('High Risk')}
            >
              High Risk ({DEMO_TRANSACTIONS.filter(t => t.status === 'High Risk').length})
            </button>
            <button
              type="button"
              className={`filter-btn ${statusFilter === 'Under Review' ? 'active' : ''}`}
              onClick={() => setStatusFilter('Under Review')}
            >
              Review ({DEMO_TRANSACTIONS.filter(t => t.status === 'Under Review').length})
            </button>
            <button
              type="button"
              className={`filter-btn ${statusFilter === 'Approved' ? 'active' : ''}`}
              onClick={() => setStatusFilter('Approved')}
            >
              Approved ({DEMO_TRANSACTIONS.filter(t => t.status === 'Approved').length})
            </button>
          </div>

          {/* Search Bar (if not controlled by header) */}
          {!externalSearchQuery && (
            <div className="table-search-box">
              <IconSearch size={14} className="search-icon-sm" />
              <input
                type="text"
                placeholder="Filter transactions..."
                value={internalSearch}
                onChange={(e) => setInternalSearch(e.target.value)}
                className="table-search-input"
                aria-label="Filter transactions in table"
              />
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="sort-box">
            <label htmlFor="sort-select" className="sr-only">Sort by</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
              aria-label="Sort transactions"
            >
              <option value="timestamp_desc">Newest First</option>
              <option value="risk_desc">Highest Risk Score</option>
              <option value="risk_asc">Lowest Risk Score</option>
              <option value="amount_desc">Highest Amount</option>
              <option value="amount_asc">Lowest Amount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table view */}
      <div className="table-responsive-wrapper">
        <table className="transactions-data-table">
          <thead>
            <tr>
              <th scope="col">Transaction ID</th>
              <th scope="col">User</th>
              <th scope="col">Merchant</th>
              <th scope="col" className="text-right">Amount</th>
              <th scope="col">Risk Score</th>
              <th scope="col">Status</th>
              <th scope="col" className="text-center">Explainability</th>
            </tr>
          </thead>
          <tbody>
            {displayList.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-state-cell">
                  <div className="empty-state-box">
                    <p>No transactions match your current search and filter criteria.</p>
                    <button
                      type="button"
                      className="btn-ghost-sm"
                      onClick={() => {
                        setStatusFilter('ALL');
                        setInternalSearch('');
                      }}
                    >
                      Clear Filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              displayList.map((txn) => {
                const riskColor = getRiskColor(txn.riskScore);

                return (
                  <tr 
                    key={txn.id} 
                    className="table-row-interactive"
                    onClick={() => setSelectedTxn(txn)}
                  >
                    <td className="cell-id">
                      <span className="mono-badge">{txn.id}</span>
                      <span className="timestamp-cell">{txn.timestamp.split(' ')[1]}</span>
                    </td>

                    <td className="cell-user">
                      <div className="user-info-stack">
                        <span className="user-name">{txn.userName}</span>
                        <span className="user-sub mono-sub">{txn.userId}</span>
                      </div>
                    </td>

                    <td className="cell-merchant">
                      <div className="merchant-info-stack">
                        <span className="merchant-name">{txn.merchant}</span>
                        <span className="merchant-category">{txn.merchantCategory}</span>
                      </div>
                    </td>

                    <td className="cell-amount text-right">
                      <span className="amount-value">${txn.amount.toFixed(2)}</span>
                      <span className="currency-tag">{txn.currency}</span>
                    </td>

                    <td className="cell-risk">
                      <div className="risk-metric-cell">
                        <div className="risk-meter-track">
                          <div
                            className="risk-meter-fill"
                            style={{
                              width: `${txn.riskScore}%`,
                              backgroundColor: riskColor
                            }}
                          />
                        </div>
                        <span className="risk-num" style={{ color: riskColor }}>
                          {txn.riskScore}
                        </span>
                      </div>
                    </td>

                    <td className="cell-status">
                      {getStatusBadge(txn.status)}
                    </td>

                    <td className="cell-actions text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="action-buttons-group">
                        <button
                          type="button"
                          className="action-btn-inspect"
                          onClick={() => setSelectedTxn(txn)}
                          title="View GNN explanation details"
                        >
                          Details
                        </button>
                        <button
                          type="button"
                          className="action-btn-graph"
                          onClick={() => onInspectInGraph && onInspectInGraph(txn.id)}
                          title="Inspect connected subgraph in Knowledge Graph Explorer"
                        >
                          <IconGraph size={13} />
                          <span>Graph</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer-status">
        <span className="showing-records-text">
          Showing {displayList.length} of {DEMO_TRANSACTIONS.length} synthetic sample records
        </span>
        <span className="table-academic-disclaimer">
          * Demo Data: Model predictions and scores are synthetic values for interface demonstration.
        </span>
      </div>

      {/* Details Modal */}
      {selectedTxn && (
        <TransactionDetailsModal
          transaction={selectedTxn}
          onClose={() => setSelectedTxn(null)}
          onInspectInGraph={onInspectInGraph}
        />
      )}
    </div>
  );
};
