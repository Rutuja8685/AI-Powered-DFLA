import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ReportVault from './components/ReportVault';
import { FaFilePdf } from 'react-icons/fa';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeOfficer, setActiveOfficer] = useState('');
  const [caseName, setCaseName] = useState('');
  const [logs, setLogs] = useState('');
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [caseId, setCaseId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSuccess = (id) => {
    setActiveOfficer(id);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveOfficer('');
    setAiResponse('');
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAiResponse('');

    const payload = { caseName, logs, query };

    try {
      const response = await fetch('http://localhost:8080/api/forensics/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
    caseName: caseName,
    logs: logs,
    query: query
  })
      });

      if (!response.ok) throw new Error(`Server status fault: ${response.status}`);

      const data = await response.json();
      setAiResponse(data.ai_response);
      setCaseId(data.saved_case_id);
    } catch (err) {
      setError("Cannot sync with backend. Ensure your Spring Boot service is active on port 8080.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🔍 AI-Powered Digital Forensics System</h1>
        <p>Enterprise Log Processing Engine & Evidence Vault</p>
        {isLoggedIn && (
          <div className="session-tag">
            <span>Active Agent: <strong>{activeOfficer}</strong></span>
            <button onClick={handleLogout} className="logout-btn">Terminal Exit</button>
          </div>
        )}
      </header>

      {!isLoggedIn ? (
        <main className="login-wrapper">
          <Login onLoginSuccess={handleLoginSuccess} />
        </main>
      ) : (
        <main className="dashboard-layout">
          <Dashboard 
            caseName={caseName} setCaseName={setCaseName}
            logs={logs} setLogs={setLogs}
            query={query} setQuery={setQuery}
            handleAnalyze={handleAnalyze} loading={loading}
          />
          <ReportVault 
            aiResponse={aiResponse} caseId={caseId}
            loading={loading} error={error}
          />
        </main>
      )}
    </div>
  );
}

export default App;