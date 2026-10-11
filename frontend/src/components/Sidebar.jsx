import { 
  IconDashboard, 
  IconTransactions, 
  IconGraph, 
  IconModel, 
  IconChevronLeft, 
  IconChevronRight,
  IconClose,
  IconShieldAlert
} from './Icons';

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: IconDashboard,
    badge: null,
    desc: 'Fraud overview & metrics'
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: IconTransactions,
    badge: '9 Demo',
    desc: 'Real-time transaction feed'
  },
  {
    id: 'graph',
    label: 'Graph Explorer',
    icon: IconGraph,
    badge: '9 Nodes',
    desc: 'Knowledge graph & GNN topology'
  },
  {
    id: 'evaluation',
    label: 'Model Evaluation',
    icon: IconModel,
    badge: 'GNN',
    desc: 'GraphSAGE vs baselines & metrics'
  }
];

export const Sidebar = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside 
        className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : 'expanded'} ${isMobileOpen ? 'mobile-open' : ''}`}
        aria-label="Main Navigation"
      >
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <div className="sidebar-logo-icon">
              <IconShieldAlert size={20} />
            </div>
            {!isCollapsed && (
              <div className="sidebar-brand-text">
                <span className="brand-primary">FraudGuard</span>
                <span className="brand-version">GNN Research Demo</span>
              </div>
            )}
          </div>

          {/* Close button for mobile */}
          <button 
            type="button" 
            className="mobile-close-btn"
            onClick={onCloseMobile}
            aria-label="Close sidebar navigation"
          >
            <IconClose size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <li key={item.id} className="nav-item">
                  <button
                    type="button"
                    className={`nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      onSelectTab(item.id);
                      onCloseMobile();
                    }}
                    title={isCollapsed ? item.label : undefined}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="nav-icon-box">
                      <Icon size={18} />
                    </span>
                    {!isCollapsed && (
                      <span className="nav-label-group">
                        <span className="nav-label">{item.label}</span>
                        {item.badge && (
                          <span className={`nav-badge ${item.id === 'transactions' ? 'badge-alert' : ''}`}>
                            {item.badge}
                          </span>
                        )}
                      </span>
                    )}
                    {isCollapsed && item.badge && (
                      <span className="collapsed-badge-dot" aria-hidden="true" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          {!isCollapsed && (
            <div className="academic-notice-card">
              <span className="academic-notice-tag">Final-Year FYP</span>
              <p className="academic-notice-text">
                Graph Neural Networks for Explainable E-Commerce Fraud
              </p>
            </div>
          )}

          <button
            type="button"
            className="sidebar-collapse-toggle"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
            {!isCollapsed && <span>Collapse Sidebar</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
