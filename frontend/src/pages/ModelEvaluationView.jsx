import { MODEL_EVALUATION_DATA } from '../data/mockData';
import { IconModel, IconInfo } from '../components/Icons';

export const ModelEvaluationView = () => {
  const { architecture, prototypeMetrics, baselineComparison, ablationStudy } = MODEL_EVALUATION_DATA;

  return (
    <div className="view-content evaluation-view">
      {/* View Header */}
      <div className="view-header-strip">
        <div>
          <div className="title-with-pill">
            <h2 className="view-title">Model Architecture & Evaluation</h2>
            <span className="demo-pill-badge badge-purple">Academic FYP Target Benchmarks</span>
          </div>
          <p className="view-subtitle">
            Experimental setup, baseline comparisons, and planned Graph Neural Network evaluation metrics.
          </p>
        </div>

        <div className="model-chip-pill">
          <IconModel size={16} />
          <span>PyTorch Geometric • GraphSAGE</span>
        </div>
      </div>

      {/* Prominent Academic Prototype Disclaimer */}
      <div className="academic-evaluation-disclaimer">
        <IconInfo size={20} className="text-amber" />
        <div className="disclaimer-content">
          <h4 className="disclaimer-title">Notice on Evaluation Benchmarks & Demo Metrics</h4>
          <p className="disclaimer-text">
            All numerical metrics, comparative benchmarks, and matrix distributions in this milestone represent
            <strong> illustrative target values and preliminary experimental baselines</strong>. The end-to-end PyTorch Geometric
            training and Neo4j graph pipeline are scheduled for integration in the backend milestones.
          </p>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="evaluation-metrics-grid">
        {prototypeMetrics.map((item, idx) => (
          <div key={idx} className="eval-metric-card">
            <div className="metric-top-row">
              <span className="eval-metric-name">{item.metric}</span>
              <span className="eval-metric-tag">{item.status}</span>
            </div>
            <div className="eval-metric-val-row">
              <span className="eval-metric-number">{item.value}</span>
              <span className="eval-metric-target">Target: {item.target}</span>
            </div>
            <p className="eval-metric-note">{item.note}</p>
          </div>
        ))}
      </div>

      {/* Architecture Specs & Confusion Matrix Split */}
      <div className="evaluation-dual-grid">
        {/* Architecture Specs */}
        <div className="eval-card arch-specs-card">
          <div className="card-top-bar">
            <h3 className="card-heading">GNN Model Architecture Specification</h3>
            <span className="demo-pill-badge">Specification</span>
          </div>
          <dl className="specs-list">
            <div className="spec-item">
              <dt>Architecture:</dt>
              <dd>{architecture.modelType}</dd>
            </div>
            <div className="spec-item">
              <dt>Core Framework:</dt>
              <dd>{architecture.framework}</dd>
            </div>
            <div className="spec-item">
              <dt>Explainability Engine:</dt>
              <dd>{architecture.explainer}</dd>
            </div>
            <div className="spec-item">
              <dt>Neighborhood Aggregator:</dt>
              <dd>{architecture.layers}</dd>
            </div>
            <div className="spec-item">
              <dt>Hidden Dimensions:</dt>
              <dd>{architecture.hiddenDimensions} units per layer</dd>
            </div>
            <div className="spec-item">
              <dt>Loss Formulation:</dt>
              <dd>{architecture.lossFunction}</dd>
            </div>
          </dl>
        </div>

        {/* Demo Confusion Matrix */}
        <div className="eval-card confusion-matrix-card">
          <div className="card-top-bar">
            <h3 className="card-heading">Confusion Matrix (Synthetic Validation Fold)</h3>
            <span className="demo-pill-badge">Illustrative Distribution</span>
          </div>
          <p className="matrix-caption">
            Calculated on synthetic validation test split (N = 2,500 samples, 1.8% positive rate):
          </p>
          <div className="matrix-table-grid">
            <div className="matrix-cell cell-header"></div>
            <div className="matrix-cell cell-header">Predicted Normal</div>
            <div className="matrix-cell cell-header">Predicted Fraud</div>

            <div className="matrix-cell cell-row-header">Actual Normal</div>
            <div className="matrix-cell cell-tn">
              <span className="cell-count">2,422</span>
              <span className="cell-sub">True Negative (99.1%)</span>
            </div>
            <div className="matrix-cell cell-fp">
              <span className="cell-count">33</span>
              <span className="cell-sub">False Positive (0.9%)</span>
            </div>

            <div className="matrix-cell cell-row-header">Actual Fraud</div>
            <div className="matrix-cell cell-fn">
              <span className="cell-count">6</span>
              <span className="cell-sub">False Negative (13.3%)</span>
            </div>
            <div className="matrix-cell cell-tp">
              <span className="cell-count">39</span>
              <span className="cell-sub">True Positive (86.7%)</span>
            </div>
          </div>
          <div className="matrix-footer-metrics">
            <span>Precision: <strong>54.2%</strong></span>
            <span>Recall: <strong>86.7%</strong></span>
            <span>Specificity: <strong>98.7%</strong></span>
          </div>
        </div>
      </div>

      {/* Comparative Baselines Table */}
      <div className="eval-card baseline-table-card">
        <div className="card-top-bar">
          <div>
            <h3 className="card-heading">Baseline Comparison (Project Hypothesis Benchmark)</h3>
            <p className="card-subheading">
              Comparing relational Graph Neural Networks against traditional tabular machine learning methods.
            </p>
          </div>
          <span className="demo-pill-badge">Comparative Literature Target</span>
        </div>

        <div className="table-responsive-wrapper">
          <table className="baseline-data-table">
            <thead>
              <tr>
                <th scope="col">Model Approach</th>
                <th scope="col">ROC-AUC</th>
                <th scope="col">PR-AUC</th>
                <th scope="col">F1-Score</th>
                <th scope="col">Explainability</th>
                <th scope="col">Relational Context</th>
              </tr>
            </thead>
            <tbody>
              {baselineComparison.map((row, idx) => (
                <tr key={idx} className={idx === 0 ? 'highlight-proposed-row' : ''}>
                  <td className="model-name-cell">
                    <strong>{row.model}</strong>
                    {idx === 0 && <span className="proposed-badge">Proposed FYP</span>}
                  </td>
                  <td className="mono-num">{row.auc}</td>
                  <td className="mono-num">{row.prAuc}</td>
                  <td className="mono-num">{row.f1}</td>
                  <td>{row.explainable}</td>
                  <td><span className="topology-badge">{row.topologyAware}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ablation Study Preview */}
      <div className="eval-card ablation-card">
        <div className="card-top-bar">
          <h3 className="card-heading">Ablation Study: Relational Contribution</h3>
          <span className="demo-pill-badge">Planned Experiment</span>
        </div>
        <div className="ablation-grid">
          {ablationStudy.map((item, idx) => (
            <div key={idx} className="ablation-item-box">
              <span className="ablation-impact">{item.aucImpact}</span>
              <h4 className="ablation-name">{item.component}</h4>
              <p className="ablation-note">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
