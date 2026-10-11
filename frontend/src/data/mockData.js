/**
 * Synthetic Demo Dataset for Frontend Prototype
 * Final-Year Project: Knowledge-Graph-Driven Explainable Fraud Detection in E-Commerce Using Graph Neural Networks
 * 
 * DISCLAIMER: All records, metrics, topology, and risk scores are illustrative synthetic values
 * designed for interface validation and academic presentation. Live model integration with
 * GraphSAGE/FastAPI occurs in subsequent milestones.
 */

export const DEMO_METRICS = {
  totalTransactions: 24850,
  flaggedTransactions: 412,
  fraudRate: 1.66,
  modelStatus: {
    state: "Online (Demo)",
    pipeline: "GraphSAGE 2-Hop + GNNExplainer",
    avgLatencyMs: 38,
    lastTrained: "2026-10-08",
    accuracyEst: 94.2
  }
};

export const TREND_DATA = [
  { time: "00:00", total: 620, flagged: 7, fraudRate: 1.13 },
  { time: "03:00", total: 410, flagged: 9, fraudRate: 2.20 },
  { time: "06:00", total: 530, flagged: 6, fraudRate: 1.13 },
  { time: "09:00", total: 1420, flagged: 28, fraudRate: 1.97 },
  { time: "12:00", total: 2180, flagged: 45, fraudRate: 2.06 },
  { time: "15:00", total: 2450, flagged: 52, fraudRate: 2.12 },
  { time: "18:00", total: 2890, flagged: 41, fraudRate: 1.42 },
  { time: "21:00", total: 1980, flagged: 24, fraudRate: 1.21 },
  { time: "23:59", total: 1120, flagged: 14, fraudRate: 1.25 }
];

export const DEMO_TRANSACTIONS = [
  {
    id: "TX-90214",
    userId: "USR-8492",
    userName: "Alex Mercer",
    merchant: "Apex Tech Electronics",
    merchantCategory: "High-End Electronics",
    amount: 1849.00,
    currency: "USD",
    timestamp: "2026-10-11 14:48:22",
    riskScore: 92,
    status: "High Risk",
    decision: "Flagged for Review",
    deviceId: "DEV-7712",
    ipAddress: "198.51.100.44",
    location: "Miami, US",
    gnnExplanation: {
      primaryReason: "Shared Device with 4 Previously Flagged Accounts (Syndicate Pattern)",
      gnnConfidence: 94.8,
      influentialEdges: [
        { relation: "USES_DEVICE", target: "DEV-7712", weight: 0.94 },
        { relation: "LINKED_TO_SUSPECT", target: "USR-3104", weight: 0.88 },
        { relation: "RAPID_TRANSACTION", target: "Apex Tech Electronics", weight: 0.79 }
      ],
      subgraphNodeIds: ["TX-90214", "USR-8492", "DEV-7712", "MERCH-01", "USR-3104"]
    }
  },
  {
    id: "TX-90215",
    userId: "USR-2091",
    userName: "Elena Rostova",
    merchant: "CloudStream Subscriptions",
    merchantCategory: "Digital Media",
    amount: 14.99,
    currency: "USD",
    timestamp: "2026-10-11 14:46:10",
    riskScore: 12,
    status: "Approved",
    decision: "Auto-Cleared",
    deviceId: "DEV-1049",
    ipAddress: "203.0.113.19",
    location: "Seattle, US",
    gnnExplanation: {
      primaryReason: "Consistent 2-year purchase history on trusted device",
      gnnConfidence: 99.1,
      influentialEdges: [
        { relation: "FREQUENT_USER", target: "DEV-1049", weight: 0.12 },
        { relation: "RECURRING_PAYMENT", target: "CloudStream", weight: 0.08 }
      ],
      subgraphNodeIds: ["TX-90215", "USR-2091", "DEV-1049", "MERCH-04"]
    }
  },
  {
    id: "TX-90216",
    userId: "USR-5531",
    userName: "Marcus Vance",
    merchant: "Prestige Luxury Watches",
    merchantCategory: "Luxury Goods",
    amount: 4250.00,
    currency: "USD",
    timestamp: "2026-10-11 14:42:05",
    riskScore: 88,
    status: "High Risk",
    decision: "Escalated to Fraud Ops",
    deviceId: "DEV-9923",
    ipAddress: "192.0.2.140",
    location: "Bucharest, RO",
    gnnExplanation: {
      primaryReason: "Velocity anomaly: New account created 12 mins ago, single high-value transaction",
      gnnConfidence: 91.2,
      influentialEdges: [
        { relation: "NEW_ACCOUNT_VELOCITY", target: "USR-5531", weight: 0.91 },
        { relation: "HIGH_TICKET_ANOMALY", target: "Prestige Luxury Watches", weight: 0.85 }
      ],
      subgraphNodeIds: ["TX-90216", "USR-5531", "DEV-9923", "MERCH-02"]
    }
  },
  {
    id: "TX-90217",
    userId: "USR-7782",
    userName: "Sarah Jenkins",
    merchant: "FreshMart Groceries",
    merchantCategory: "Everyday Retail",
    amount: 87.40,
    currency: "USD",
    timestamp: "2026-10-11 14:39:50",
    riskScore: 24,
    status: "Approved",
    decision: "Auto-Cleared",
    deviceId: "DEV-4410",
    ipAddress: "198.51.100.99",
    location: "Denver, US",
    gnnExplanation: {
      primaryReason: "Typical basket size, verified physical merchant POS location",
      gnnConfidence: 97.4,
      influentialEdges: [
        { relation: "STANDARD_ORDER", target: "FreshMart Groceries", weight: 0.15 }
      ],
      subgraphNodeIds: ["TX-90217", "USR-7782", "DEV-4410", "MERCH-05"]
    }
  },
  {
    id: "TX-90218",
    userId: "USR-4119",
    userName: "David Kim",
    merchant: "Apex Tech Electronics",
    merchantCategory: "High-End Electronics",
    amount: 699.00,
    currency: "USD",
    timestamp: "2026-10-11 14:31:18",
    riskScore: 65,
    status: "Under Review",
    decision: "MFA Challenge Sent",
    deviceId: "DEV-7712",
    ipAddress: "198.51.100.45",
    location: "Orlando, US",
    gnnExplanation: {
      primaryReason: "Device DEV-7712 fingerprint co-occurs with known fraudulent cluster",
      gnnConfidence: 78.4,
      influentialEdges: [
        { relation: "CO_LOCATED_DEVICE", target: "DEV-7712", weight: 0.78 },
        { relation: "IP_CLUSTER", target: "198.51.100.45", weight: 0.65 }
      ],
      subgraphNodeIds: ["TX-90218", "USR-4119", "DEV-7712", "MERCH-01"]
    }
  },
  {
    id: "TX-90219",
    userId: "USR-9904",
    userName: "Claire Dubois",
    merchant: "Global Air Reservations",
    merchantCategory: "Travel & Airlines",
    amount: 1290.00,
    currency: "USD",
    timestamp: "2026-10-11 14:25:01",
    riskScore: 74,
    status: "Under Review",
    decision: "Cardholder Verification",
    deviceId: "DEV-3301",
    ipAddress: "203.0.113.88",
    location: "Paris, FR",
    gnnExplanation: {
      primaryReason: "Geographical hop anomaly (IP distance exceeds plausible travel velocity)",
      gnnConfidence: 83.1,
      influentialEdges: [
        { relation: "GEO_HOP_DISTANCE", target: "203.0.113.88", weight: 0.82 },
        { relation: "HIGH_RISK_MERCHANT", target: "Global Air Reservations", weight: 0.68 }
      ],
      subgraphNodeIds: ["TX-90219", "USR-9904", "DEV-3301", "MERCH-03"]
    }
  },
  {
    id: "TX-90220",
    userId: "USR-1142",
    userName: "Jonathan Reed",
    merchant: "BookWorld Direct",
    merchantCategory: "Books & Media",
    amount: 32.50,
    currency: "USD",
    timestamp: "2026-10-11 14:18:44",
    riskScore: 8,
    status: "Approved",
    decision: "Auto-Cleared",
    deviceId: "DEV-6218",
    ipAddress: "192.0.2.77",
    location: "Austin, US",
    gnnExplanation: {
      primaryReason: "Zero risk indicators across graph neighborhood",
      gnnConfidence: 99.7,
      influentialEdges: [
        { relation: "LOW_RISK_NEIGHBORHOOD", target: "BookWorld Direct", weight: 0.05 }
      ],
      subgraphNodeIds: ["TX-90220", "USR-1142", "DEV-6218", "MERCH-06"]
    }
  },
  {
    id: "TX-90221",
    userId: "USR-6302",
    userName: "Sophia Zhao",
    merchant: "Nordic Apparel Co",
    merchantCategory: "Fashion & Clothing",
    amount: 215.00,
    currency: "USD",
    timestamp: "2026-10-11 14:12:30",
    riskScore: 19,
    status: "Approved",
    decision: "Auto-Cleared",
    deviceId: "DEV-8841",
    ipAddress: "198.51.100.12",
    location: "Boston, US",
    gnnExplanation: {
      primaryReason: "Regular buyer graph embedding alignment",
      gnnConfidence: 98.2,
      influentialEdges: [
        { relation: "AFFINITY_CLUSTER", target: "Nordic Apparel Co", weight: 0.11 }
      ],
      subgraphNodeIds: ["TX-90221", "USR-6302", "DEV-8841", "MERCH-07"]
    }
  },
  {
    id: "TX-90222",
    userId: "USR-8810",
    userName: "Vikram Malhotra",
    merchant: "Apex Tech Electronics",
    merchantCategory: "High-End Electronics",
    amount: 2499.99,
    currency: "USD",
    timestamp: "2026-10-11 14:05:12",
    riskScore: 95,
    status: "High Risk",
    decision: "Account Temporarily Frozen",
    deviceId: "DEV-7712",
    ipAddress: "198.51.100.44",
    location: "Miami, US",
    gnnExplanation: {
      primaryReason: "Central hub in detected multi-account fraud ring sharing DEV-7712",
      gnnConfidence: 96.9,
      influentialEdges: [
        { relation: "RING_SYNDICATE_HUB", target: "DEV-7712", weight: 0.96 },
        { relation: "COLLUDING_ACCOUNT", target: "USR-8492", weight: 0.92 }
      ],
      subgraphNodeIds: ["TX-90222", "USR-8810", "DEV-7712", "MERCH-01", "USR-8492"]
    }
  }
];

export const KNOWLEDGE_GRAPH_DATA = {
  nodes: [
    {
      id: "TX-90214",
      label: "Txn #TX-90214",
      type: "Transaction",
      subType: "Card Not Present",
      riskScore: 92,
      isRisk: true,
      amount: "$1,849.00",
      x: 380,
      y: 200,
      details: {
        timestamp: "14:48:22",
        status: "High Risk Flagged",
        merchant: "Apex Tech Electronics",
        anomalyReason: "Syndicate cluster detected by GraphSAGE"
      }
    },
    {
      id: "USR-8492",
      label: "User Alex Mercer",
      type: "User",
      subType: "Buyer Account",
      riskScore: 78,
      isRisk: true,
      x: 180,
      y: 120,
      details: {
        accountAge: "14 days",
        disputes: 2,
        emailDomain: "tempmail-drop.net",
        linkedCards: 3
      }
    },
    {
      id: "MERCH-01",
      label: "Apex Tech Electronics",
      type: "Merchant",
      subType: "High-Risk Tier",
      riskScore: 62,
      isRisk: false,
      x: 580,
      y: 130,
      details: {
        category: "High-End Electronics",
        chargebackRate: "3.4%",
        monthlyVolume: "$840,000"
      }
    },
    {
      id: "DEV-7712",
      label: "Device DEV-7712",
      type: "Device",
      subType: "Shared Fingerprint",
      riskScore: 96,
      isRisk: true,
      x: 280,
      y: 330,
      details: {
        os: "Windows 11 / Chrome Headless (Tor exit suspected)",
        linkedAccountsCount: 5,
        reusedFingerprintCount: 14
      }
    },
    {
      id: "USR-3104",
      label: "User (Prior Blacklist)",
      type: "User",
      subType: "Banned Account",
      riskScore: 99,
      isRisk: true,
      x: 130,
      y: 390,
      details: {
        accountAge: "Closed (Fraud confirmed)",
        chargebacksCount: 4,
        banDate: "2026-09-18"
      }
    },
    {
      id: "USR-8810",
      label: "User Vikram Malhotra",
      type: "User",
      subType: "Buyer Account",
      riskScore: 95,
      isRisk: true,
      x: 460,
      y: 380,
      details: {
        accountAge: "6 days",
        transactionsAttempted: 8,
        riskClassification: "Syndicate Collaborator"
      }
    },
    {
      id: "TX-90215",
      label: "Txn #TX-90215",
      type: "Transaction",
      subType: "Clean Digital",
      riskScore: 12,
      isRisk: false,
      amount: "$14.99",
      x: 720,
      y: 320,
      details: {
        timestamp: "14:46:10",
        status: "Normal / Verified",
        merchant: "CloudStream",
        anomalyReason: "None (Consistent history)"
      }
    },
    {
      id: "USR-2091",
      label: "User Elena Rostova",
      type: "User",
      subType: "Verified Buyer",
      riskScore: 10,
      isRisk: false,
      x: 820,
      y: 190,
      details: {
        accountAge: "720 days",
        disputes: 0,
        emailDomain: "outlook.com",
        trustLevel: "Tier 1 Verified"
      }
    },
    {
      id: "MERCH-04",
      label: "CloudStream",
      type: "Merchant",
      subType: "Low-Risk Retail",
      riskScore: 8,
      isRisk: false,
      x: 740,
      y: 450,
      details: {
        category: "Digital Subscriptions",
        chargebackRate: "0.2%",
        monthlyVolume: "$3,200,000"
      }
    }
  ],
  edges: [
    {
      id: "e1",
      source: "USR-8492",
      target: "TX-90214",
      label: "INITIATED",
      attentionWeight: 0.94,
      isHighAttention: true
    },
    {
      id: "e2",
      source: "TX-90214",
      target: "MERCH-01",
      label: "PAID_TO",
      attentionWeight: 0.79,
      isHighAttention: true
    },
    {
      id: "e3",
      source: "USR-8492",
      target: "DEV-7712",
      label: "USED_DEVICE",
      attentionWeight: 0.96,
      isHighAttention: true
    },
    {
      id: "e4",
      source: "DEV-7712",
      target: "USR-3104",
      label: "PREV_SHARED",
      attentionWeight: 0.98,
      isHighAttention: true
    },
    {
      id: "e5",
      source: "DEV-7712",
      target: "USR-8810",
      label: "CO_OPERATED",
      attentionWeight: 0.91,
      isHighAttention: true
    },
    {
      id: "e6",
      source: "USR-8810",
      target: "MERCH-01",
      label: "TARGETED",
      attentionWeight: 0.86,
      isHighAttention: true
    },
    {
      id: "e7",
      source: "USR-2091",
      target: "TX-90215",
      label: "INITIATED",
      attentionWeight: 0.08,
      isHighAttention: false
    },
    {
      id: "e8",
      source: "TX-90215",
      target: "MERCH-04",
      label: "PAID_TO",
      attentionWeight: 0.06,
      isHighAttention: false
    }
  ]
};

export const MODEL_EVALUATION_DATA = {
  architecture: {
    modelType: "Heterogeneous Graph Neural Network (Hetero-GraphSAGE)",
    framework: "PyTorch Geometric + Neo4j Graph DB",
    explainer: "GNNExplainer (Node Feature & Subgraph Masking)",
    layers: "2-Hop Neighborhood Aggregator (Mean + Attention Pooling)",
    hiddenDimensions: 128,
    aggregationFunction: "MeanAggregator with Self-Loop Residuals",
    lossFunction: "Weighted Focal Loss (Addressing 1:60 Class Imbalance)"
  },
  prototypeMetrics: [
    { metric: "ROC-AUC", value: 0.942, target: 0.920, status: "Above Baseline", note: "Demo validation fold target" },
    { metric: "PR-AUC", value: 0.887, target: 0.840, status: "Above Baseline", note: "Crucial for skewed fraud distribution" },
    { metric: "Precision@K (K=100)", value: 0.851, target: 0.800, status: "Meeting Target", note: "Top 100 escalated alerts" },
    { metric: "F1-Score (Fraud Class)", value: 0.864, target: 0.820, status: "Meeting Target", note: "Harmonic mean on minority class" },
    { metric: "Inference Latency", value: "38 ms", target: "< 60 ms", status: "Optimal", note: "Per 2-hop ego-graph extraction" }
  ],
  baselineComparison: [
    { model: "GraphSAGE + KG (Our Planned Method)", auc: "0.942", f1: "0.864", prAuc: "0.887", explainable: "Yes (GNNExplainer subgraphs)", topologyAware: "Full 2-Hop Hetero" },
    { model: "GCN (Homogeneous Graph)", auc: "0.891", f1: "0.812", prAuc: "0.821", explainable: "Partial", topologyAware: "Homogeneous only" },
    { model: "XGBoost (Tabular Features Only)", auc: "0.854", f1: "0.768", prAuc: "0.754", explainable: "SHAP Tabular only", topologyAware: "No (Isolated records)" },
    { model: "Random Forest Baseline", auc: "0.829", f1: "0.735", prAuc: "0.710", explainable: "Feature Importance", topologyAware: "No" },
    { model: "Multilayer Perceptron (MLP)", auc: "0.792", f1: "0.684", prAuc: "0.665", explainable: "None", topologyAware: "No" }
  ],
  ablationStudy: [
    { component: "Node Features Only (No Graph)", aucImpact: "-9.2%", note: "Misses multi-account shared device rings" },
    { component: "Graph Structure Only (No Node Attributes)", aucImpact: "-6.4%", note: "Weak on transaction amount anomalies" },
    { component: "Full Knowledge Graph + GraphSAGE Embeddings", aucImpact: "+12.1% (Best)", note: "Synergistic feature + relational context" }
  ]
};
