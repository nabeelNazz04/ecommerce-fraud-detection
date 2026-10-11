import { useState } from 'react';
import { KNOWLEDGE_GRAPH_DATA } from '../data/mockData';
import { 
  IconUser, 
  IconStore, 
  IconDevice, 
  IconTransactions, 
  IconShieldAlert,
  IconRefresh
} from './Icons';

export const GraphCanvas = ({ 
  isPreview = false, 
  onNavigateToExplorer, 
  selectedTxnId = null 
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState(
    selectedTxnId ? selectedTxnId : 'TX-90214'
  );
  const [visibleTypes, setVisibleTypes] = useState({
    Transaction: true,
    User: true,
    Merchant: true,
    Device: true
  });
  const [showAttentionWeights, setShowAttentionWeights] = useState(true);

  const rawNodes = KNOWLEDGE_GRAPH_DATA.nodes;
  const rawEdges = KNOWLEDGE_GRAPH_DATA.edges;

  // Filter nodes based on visible types
  const visibleNodes = rawNodes.filter(node => visibleTypes[node.type]);
  const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

  // Filter edges where both source and target are visible
  const visibleEdges = rawEdges.filter(
    edge => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
  );

  const selectedNode = rawNodes.find(n => n.id === selectedNodeId) || rawNodes[0];

  const toggleType = (type) => {
    setVisibleTypes(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const getNodeColor = (node) => {
    if (node.isRisk) return '#ef4444'; // Red for flagged / high risk
    switch (node.type) {
      case 'Transaction': return '#3b82f6'; // Blue
      case 'User': return '#8b5cf6'; // Violet / Purple
      case 'Merchant': return '#f59e0b'; // Amber
      case 'Device': return '#10b981'; // Emerald
      default: return '#64748b';
    }
  };

  // Node map for fast edge lookup
  const nodeMap = new Map(rawNodes.map(n => [n.id, n]));

  // Canvas bounds
  const canvasWidth = isPreview ? 680 : 900;
  const canvasHeight = isPreview ? 340 : 480;

  return (
    <div className={`knowledge-graph-container ${isPreview ? 'is-preview' : 'is-full'}`}>
      <div className="graph-toolbar">
        <div className="toolbar-left">
          <div className="title-with-pill">
            <h3 className="graph-heading">
              {isPreview ? 'Heterogeneous Knowledge Graph Preview' : 'Interactive GNN Knowledge Graph Explorer'}
            </h3>
            <span className="demo-pill-badge badge-purple">Illustrative Topology</span>
          </div>
          <p className="graph-subheading">
            Entity relationships & GNNExplainer attention paths (2-hop ego network)
          </p>
        </div>

        <div className="toolbar-right">
          {/* Node Type filter chips */}
          <div className="entity-filters" aria-label="Entity type filter buttons">
            <button
              type="button"
              className={`filter-chip chip-user ${visibleTypes.User ? 'active' : ''}`}
              onClick={() => toggleType('User')}
            >
              <IconUser size={12} /> User ({rawNodes.filter(n => n.type === 'User').length})
            </button>
            <button
              type="button"
              className={`filter-chip chip-txn ${visibleTypes.Transaction ? 'active' : ''}`}
              onClick={() => toggleType('Transaction')}
            >
              <IconTransactions size={12} /> Txn ({rawNodes.filter(n => n.type === 'Transaction').length})
            </button>
            <button
              type="button"
              className={`filter-chip chip-merch ${visibleTypes.Merchant ? 'active' : ''}`}
              onClick={() => toggleType('Merchant')}
            >
              <IconStore size={12} /> Merchant ({rawNodes.filter(n => n.type === 'Merchant').length})
            </button>
            <button
              type="button"
              className={`filter-chip chip-dev ${visibleTypes.Device ? 'active' : ''}`}
              onClick={() => toggleType('Device')}
            >
              <IconDevice size={12} /> Device ({rawNodes.filter(n => n.type === 'Device').length})
            </button>
          </div>

          {isPreview && onNavigateToExplorer && (
            <button
              type="button"
              className="btn-accent-sm"
              onClick={onNavigateToExplorer}
              aria-label="Open full graph explorer"
            >
              Open Full Explorer →
            </button>
          )}
        </div>
      </div>

      <div className="graph-workspace-grid">
        {/* SVG Graph Viewport */}
        <div className="graph-svg-viewport">
          <div className="graph-canvas-controls">
            <label className="toggle-label" title="Show or hide GNN attention weights on graph edges">
              <input
                type="checkbox"
                checked={showAttentionWeights}
                onChange={(e) => setShowAttentionWeights(e.target.checked)}
              />
              <span>GNN Attention Weights (α)</span>
            </label>
            <button
              type="button"
              className="btn-ghost-sm"
              onClick={() => {
                setVisibleTypes({ Transaction: true, User: true, Merchant: true, Device: true });
                setSelectedNodeId('TX-90214');
              }}
              title="Reset graph view to initial cluster"
            >
              <IconRefresh size={12} /> Reset
            </button>
          </div>

          <svg
            viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
            className="graph-svg"
            role="img"
            aria-label="Knowledge graph displaying user, transaction, merchant, and device nodes"
          >
            <defs>
              {/* Arrow markers */}
              <marker
                id="arrow-default"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
              </marker>
              <marker
                id="arrow-high-attention"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>

              {/* Node drop shadows */}
              <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* Background pattern grid */}
            <pattern id="graphGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#182033" strokeWidth="0.8" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#graphGrid)" />

            {/* Edges */}
            <g className="edges-layer">
              {visibleEdges.map((edge) => {
                const sourceNode = nodeMap.get(edge.source);
                const targetNode = nodeMap.get(edge.target);
                if (!sourceNode || !targetNode) return null;

                const isEdgeHighlighted =
                  selectedNode &&
                  (edge.source === selectedNode.id || edge.target === selectedNode.id);

                const midX = (sourceNode.x + targetNode.x) / 2;
                const midY = (sourceNode.y + targetNode.y) / 2;

                return (
                  <g key={edge.id} className="graph-edge-group">
                    <line
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={edge.isHighAttention ? '#ef4444' : '#475569'}
                      strokeWidth={edge.isHighAttention ? (isEdgeHighlighted ? 3.5 : 2.5) : (isEdgeHighlighted ? 2.5 : 1.5)}
                      strokeDasharray={edge.isHighAttention ? 'none' : '4 3'}
                      strokeOpacity={isEdgeHighlighted ? 1 : (edge.isHighAttention ? 0.9 : 0.55)}
                      markerEnd={edge.isHighAttention ? 'url(#arrow-high-attention)' : 'url(#arrow-default)'}
                    />

                    {/* Edge Label Badge */}
                    <g transform={`translate(${midX}, ${midY})`}>
                      <rect
                        x="-38"
                        y="-10"
                        width="76"
                        height="18"
                        rx="4"
                        fill="#0b0f19"
                        stroke={edge.isHighAttention ? '#ef4444' : '#334155'}
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="3"
                        fill={edge.isHighAttention ? '#fca5a5' : '#94a3b8'}
                        fontSize="9"
                        fontWeight="600"
                        textAnchor="middle"
                        fontFamily="system-ui"
                      >
                        {edge.label} {showAttentionWeights ? `(α=${edge.attentionWeight})` : ''}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>

            {/* Nodes */}
            <g className="nodes-layer">
              {visibleNodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const baseColor = getNodeColor(node);

                return (
                  <g
                    key={node.id}
                    className={`graph-node-group ${isSelected ? 'is-selected' : ''}`}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedNodeId(node.id)}
                    cursor="pointer"
                    role="button"
                    tabIndex="0"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedNodeId(node.id);
                      }
                    }}
                    aria-label={`${node.type} node ${node.label}`}
                  >
                    {/* Outer highlight ring for selection or high-risk */}
                    {isSelected && (
                      <circle
                        r="27"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                        strokeDasharray="4 2"
                        className="pulse-ring"
                      />
                    )}

                    {node.isRisk && !isSelected && (
                      <circle
                        r="24"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeOpacity="0.6"
                      />
                    )}

                    {/* Main Node Circle */}
                    <circle
                      r="19"
                      fill="#111827"
                      stroke={baseColor}
                      strokeWidth={isSelected ? 3 : 2}
                      filter="url(#nodeGlow)"
                    />

                    {/* Entity Type Initial */}
                    <text
                      x="0"
                      y="4"
                      fill={baseColor}
                      fontSize="11"
                      fontWeight="700"
                      textAnchor="middle"
                      fontFamily="system-ui"
                    >
                      {node.type.substring(0, 1)}
                    </text>

                    {/* Node Label Below */}
                    <text
                      x="0"
                      y="33"
                      fill={isSelected ? '#f8fafc' : '#cbd5e1'}
                      fontSize="10"
                      fontWeight={isSelected ? '700' : '500'}
                      textAnchor="middle"
                      fontFamily="system-ui"
                    >
                      {node.label}
                    </text>

                    {/* SubType / Score tag */}
                    <text
                      x="0"
                      y="45"
                      fill={node.isRisk ? '#f87171' : '#64748b'}
                      fontSize="9"
                      textAnchor="middle"
                      fontFamily="system-ui"
                    >
                      {node.type === 'Transaction' ? node.amount : `Score: ${node.riskScore}`}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Quick Legend Overlay inside viewport */}
          <div className="graph-viewport-legend">
            <span className="legend-chip-mini chip-user">User</span>
            <span className="legend-chip-mini chip-txn">Txn</span>
            <span className="legend-chip-mini chip-merch">Merchant</span>
            <span className="legend-chip-mini chip-dev">Device</span>
            <span className="legend-chip-mini chip-risk">Flagged Risk</span>
          </div>
        </div>

        {/* Node Detail / Explainability Inspector Panel */}
        <aside className="graph-inspector-panel" aria-label="Graph node inspector">
          <div className="inspector-header">
            <span className="inspector-badge" style={{ backgroundColor: `${getNodeColor(selectedNode)}22`, color: getNodeColor(selectedNode), borderColor: getNodeColor(selectedNode) }}>
              {selectedNode.type}
            </span>
            <h4 className="inspector-title">{selectedNode.label}</h4>
            <span className="inspector-id">Node ID: {selectedNode.id}</span>
          </div>

          <div className="inspector-metrics">
            <div className="inspector-metric-box">
              <span className="metric-label">Risk Score</span>
              <span className={`metric-num ${selectedNode.riskScore > 70 ? 'text-danger' : selectedNode.riskScore > 40 ? 'text-amber' : 'text-success'}`}>
                {selectedNode.riskScore}/100
              </span>
              <span className="metric-note">GNN Embedding Anomaly</span>
            </div>
            <div className="inspector-metric-box">
              <span className="metric-label">Classification</span>
              <span className="metric-val">{selectedNode.subType}</span>
              <span className="metric-note">Heterogeneous Node Type</span>
            </div>
          </div>

          {/* Detailed attributes from mock */}
          <div className="inspector-section">
            <h5 className="section-title">Node Attributes (Synthetic)</h5>
            <dl className="attributes-list">
              {Object.entries(selectedNode.details).map(([key, value]) => (
                <div key={key} className="attribute-row">
                  <dt className="attr-key">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</dt>
                  <dd className="attr-val">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Explainability Callout */}
          <div className="inspector-section gnn-explainer-card">
            <div className="explainer-heading">
              <IconShieldAlert size={14} className="text-danger" />
              <span>GNNExplainer Subgraph Insight</span>
            </div>
            <p className="explainer-text">
              {selectedNode.isRisk 
                ? `Node connects directly to shared device DEV-7712 with high edge attention weight (α > 0.90), characteristic of multi-account syndicate fraud patterns.`
                : `Normal neighborhood connectivity. Low cross-account entropy and established merchant trust score.`}
            </p>
            <span className="explainer-disclaimer">
              * Illustrative explanation generated for demonstration.
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
};
