import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './pages/DashboardView';
import { TransactionsView } from './pages/TransactionsView';
import { GraphExplorerView } from './pages/GraphExplorerView';
import { ModelEvaluationView } from './pages/ModelEvaluationView';
import { BackendStatus } from './components/BackendStatus';
import { TransactionValidator } from './components/TransactionValidator';
import './App.css';
import { SavedTransactions } from './components/SavedTransactions';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedTxnId, setFocusedTxnId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSelectTxnForGraph = (txnId) => {
    setFocusedTxnId(txnId);
    setActiveTab('graph');
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            searchQuery={searchQuery}
            onNavigateTab={setActiveTab}
            onSelectTxnForGraph={handleSelectTxnForGraph}
          />
        );
      case 'transactions':
        return (
          <TransactionsView
            searchQuery={searchQuery}
            onNavigateTab={setActiveTab}
            onSelectTxnForGraph={handleSelectTxnForGraph}
          />
        );
      case 'graph':
        return (
          <GraphExplorerView
            focusedTxnId={focusedTxnId}
          />
        );
      case 'evaluation':
        return (
          <ModelEvaluationView />
        );
      default:
        return (
          <DashboardView
            searchQuery={searchQuery}
            onNavigateTab={setActiveTab}
            onSelectTxnForGraph={handleSelectTxnForGraph}
          />
        );
    }
  };

  return (
    <div className={`app-shell ${isSidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      {/* Collapsible Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="main-content-layout">
        {/* Top Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
          onMobileOpenSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Backend Connection Status */}
        <BackendStatus />

        {/* Dynamic Page Content */}
        <main className="dashboard-main-body" id="main-content">
          {renderActiveView()}

          <div style={{ padding: '24px' }}>
            <TransactionValidator
              onTransactionSaved={() =>
                setRefreshTrigger((previous) => previous + 1)
              }
            />

            <SavedTransactions refreshTrigger={refreshTrigger} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
