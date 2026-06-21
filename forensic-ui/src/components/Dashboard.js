import React from 'react';
import { FaFilePdf } from 'react-icons/fa';
function Dashboard({ caseName, setCaseName, logs, setLogs, query, setQuery, handleAnalyze, loading }) {
  return (
    <div className="input-panel">
      <h2>Evidence Input Panel</h2>
      <form onSubmit={handleAnalyze}>
        <div className="input-group">
          <label>Case Identifier Name:</label>
          <input type="text" placeholder="e.g., Incident_04" value={caseName} onChange={(e) => setCaseName(e.target.value)} required />
        </div>
        <div className="input-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
  <label style={{ margin: 0 }}>Raw Log Text Dump:</label>
  
  <label style={{
    cursor: 'pointer',
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  }}>
    <FaFilePdf size={18} />
    <span>+ Upload PDF Logs</span>
    <input 
      type="file" 
      accept=".pdf,.txt,.log" 
      style={{ display: 'none' }} 
    />
  </label>
</div>
        </div>
        <div className="input-group">
          <label>Target Investigation Query:</label>
          <input type="text" placeholder="e.g., Find suspicious IP addresses" value={query} onChange={(e) => setQuery(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading} className="analyze-btn">
          {loading ? "Processing AI Pipeline..." : "Dispatch to AI Engine"}
        </button>
      </form>
    </div>
  );
}

export default Dashboard;