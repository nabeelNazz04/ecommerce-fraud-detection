import { IconSearch, IconMenu, IconChevronLeft, IconChevronRight } from './Icons';

export const Header = ({
  searchQuery,
  onSearchChange,
  isSidebarCollapsed,
  onToggleSidebar,
  onMobileOpenSidebar
}) => {
  return (
    <header className="dashboard-header" role="banner">
      <div className="header-left">
        <button
          type="button"
          className="sidebar-mobile-toggle"
          onClick={onMobileOpenSidebar}
          aria-label="Open navigation sidebar"
        >
          <IconMenu size={20} />
        </button>

        <button
          type="button"
          className="sidebar-desktop-toggle-header"
          onClick={onToggleSidebar}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
        </button>

        <div className="project-branding">
          <div className="project-title-row">
            <span className="brand-badge">GNN-KG</span>
            <h1 className="project-title">
              Explainable Fraud Detection
            </h1>
          </div>
          <p className="project-subtitle">
            Knowledge-Graph-Driven Graph Neural Networks for E-Commerce
          </p>
        </div>
      </div>

      <div className="header-center">
        <div className="global-search-wrapper">
          <IconSearch size={16} className="search-icon" />
          <input
            type="search"
            className="global-search-input"
            placeholder="Search txn ID, user, merchant, device..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search transactions, users, merchants, or devices"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search query"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="header-right">
        {/* Clearly labelled Demo Data indicator as required */}
        <div 
          className="demo-data-indicator" 
          title="Academic Prototype: All displayed transactions, risk scores, and graph embeddings use synthetic demo data for pipeline validation."
        >
          <span className="demo-pulse-dot" aria-hidden="true"></span>
          <span className="demo-tag">DEMO DATA</span>
          <span className="demo-sub">Illustrative Values</span>
        </div>

        <div className="system-status-chip" title="Hetero-GraphSAGE 2-Hop Inference Pipeline">
          <span className="status-dot-active" aria-hidden="true"></span>
          <span className="status-label">Pipeline: Demo Standby</span>
        </div>
      </div>
    </header>
  );
};
