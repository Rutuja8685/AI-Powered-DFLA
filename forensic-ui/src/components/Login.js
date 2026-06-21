import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  // Toggle between 'login' view and 'signup' view
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Form input fields
  const [officerId, setOfficerId] = useState('');
  const [email, setEmail] = useState('');
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Local storage simulation for demonstration purposes
 const handleAuthSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (isSignUp) {
      // --- STRICT REGISTRATION ---
      if (!officerId.trim() || !email.trim() || !passkey.trim()) {
        setError('Please fulfill all security fields.');
        return;
      }
      
      // Check if the Badge ID already exists in the system
      const existingUser = localStorage.getItem(`officer_${officerId.trim()}`);
      if (existingUser) {
        setError('This Badge ID is already registered to another officer.');
        return;
      }
      
      // Save account credentials securely to local storage memory
      localStorage.setItem(`officer_${officerId.trim()}`, JSON.stringify({
        email: email,
        passkey: passkey
      }));

      setSuccessMessage('Account registered successfully! Switching to Login view...');
      setTimeout(() => {
        setIsSignUp(false); // Flip views
        setPasskey('');
        setError('');
      }, 2000);

    } else {
      // --- STRICT LOGIN (Backdoor Removed) ---
      const savedUser = localStorage.getItem(`officer_${officerId.trim()}`);
      
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        // Only allow entry if the typed password matches the saved account password exactly
        if (userData.passkey === passkey) {
          onLoginSuccess(officerId);
          return;
        }
      }

      // If the account doesn't exist or password is wrong, block them out cold
      setError('Access Denied. You must register an account first, or check your security credentials.');
    }
  };

  return (
    <div className="login-card">
      <h2>{isSignUp ? '📝 Register Forensic Account' : '🔒 Forensic Portal Access'}</h2>
      <p>
        {isSignUp 
          ? 'Establish verified digital credentials within the local precinct network node.' 
          : 'Authorized Personnel Only — Secure Token Node Required.'}
      </p>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-badge" style={{ display: 'block', textAlign: 'center' }}>{successMessage}</div>}

      <form onSubmit={handleAuthSubmit}>
        <div className="input-group">
          <label>Officer Badge / ID:</label>
          <input 
            type="text" 
            placeholder="e.g., TR-2026" 
            value={officerId}
            onChange={(e) => setOfficerId(e.target.value)}
            required 
          />
        </div>

        {isSignUp && (
          <div className="input-group">
            <label>Official Email Address:</label>
            <input 
              type="email" 
              placeholder="officer@department.gov" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
        )}

        <div className="input-group">
          <label>Security Passkey:</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            required 
          />
        </div>

        <button type="submit" className="analyze-btn">
          {isSignUp ? 'Register & Initialize' : 'Authenticate & Enter'}
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
        {isSignUp ? (
          <span style={{ color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <button 
              type="button" 
              onClick={() => { setIsSignUp(false); setError(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: 'bold', padding: 0 }}
            >
              Log in here
            </button>
          </span>
        ) : (
          <span style={{ color: 'var(--text-muted)' }}>
            New to the department?{' '}
            <button 
              type="button" 
              onClick={() => { setIsSignUp(true); setError(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: 'bold', padding: 0 }}
            >
              Create your account
            </button>
          </span>
        )}
      </div>
    </div>
  );
}

export default Login;