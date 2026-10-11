import { SummaryCards } from '../components/SummaryCards';
import { FraudTrendChart } from '../components/FraudTrendChart';
import { GraphCanvas } from '../components/GraphCanvas';
import { TransactionTable } from '../components/TransactionTable';
import { DEMO_METRICS } from '../data/mockData';
import { IconShieldAlert } from '../components/Icons';

export const DashboardView = ({
  searchQuery,
  onNavigateTab,
  onSelectTxnForGraph
}) => {
  return (
    <div className="view-content dashboard-view">
      {/* Academic Project Context Banner */}
      <section className="academic-banner" aria-label="Project overview announcement">
        <div className="banner-icon-col">
          <IconShieldAlert size={22} className="text-cyan" />
        </div>
        <div className="banner-text-col">
          <div className="banner-title-line">
            <h2 className="banner-title">
              Final-Year Project: Knowledge-Graph-Driven Explainable Fraud Detection
            </h2>
            <span className="demo-pill-badge badge-cyan">Frontend Milestone 1</span>
          </div>
          <p className="banner-description">
            This dashboard demonstrates the user interface and explainability workflow for detecting e-commerce fraud
            using Heterogeneous Graph Neural Networks (GraphSAGE) and Knowledge Graphs.
            <strong> Note:</strong> Metrics, graph nodes, and risk predictions currently use synthetic demo data for UX validation.
          </p>
        </div>
      </section>

      {/* 4 Summary Cards */}
      <SummaryCards metrics={DEMO_METRICS} />

      {/* Analytics & Graph Row */}
      <section className="dashboard-grid-split" aria-label="Analytics and graph preview">
        {/* Left: Fraud Trend Chart */}
        <div className="dashboard-grid-col">
          <FraudTrendChart />
        </div>

        {/* Right: Knowledge Graph Preview */}
        <div className="dashboard-grid-col">
          <GraphCanvas
            isPreview={true}
            onNavigateToExplorer={() => onNavigateTab('graph')}
            selectedTxnId="TX-90214"
          />
        </div>
      </section>

      {/* Live Transaction Table Snippet */}
      <section className="dashboard-transactions-section" aria-label="Recent transaction feed">
        <TransactionTable
          externalSearchQuery={searchQuery}
          onInspectInGraph={(txnId) => {
            if (onSelectTxnForGraph) onSelectTxnForGraph(txnId);
            onNavigateTab('graph');
          }}
          limit={5}
        />
        <div className="view-all-footer">
          <button
            type="button"
            className="btn-outline"
            onClick={() => onNavigateTab('transactions')}
          >
            View All Transactions & Detailed Filters →
          </button>
        </div>
      </section>
    </div>
  );
};
