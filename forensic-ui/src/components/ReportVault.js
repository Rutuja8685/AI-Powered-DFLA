import React from 'react';

function ReportVault({ aiResponse, caseId, loading, error }) {
  return (
    <div className="output-panel">
      <h2>Generated Forensic Report Vault</h2>
      {error && <div className="error-message">{error}</div>}
      {!aiResponse && !loading && !error && (
        <div className="placeholder-text">🛡️ Awaiting payload ingest from the control panel.</div>
      )}
      {loading && (
        <div className="loading-spinner">
          <p>Local Qwen LLM analyzing logs. Committing data index to SQL...</p>
        </div>
      )}
      {aiResponse && (
        <div className="report-box">
          <div className="success-badge">✓ Case Record Logged in SQL (ID: {caseId})</div>
          <h3>AI Analysis Output:</h3>
          <pre className="report-text">{aiResponse}</pre>
        </div>
      )}
    </div>
  );
}

export default ReportVault;