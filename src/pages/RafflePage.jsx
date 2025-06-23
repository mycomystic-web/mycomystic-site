import React, { useState, useRef } from 'react';
import { checkNFTOwnership } from '../lib/checkNFT';

const RafflePage = () => {
  const [status, setStatus] = useState('idle'); // idle | holding | verified | failed
  const [loading, setLoading] = useState(false);
  const [eligible, setEligible] = useState(null);
  const timeoutRef = useRef(null);

  const handleHoldStart = () => {
    setStatus('holding');
    timeoutRef.current = setTimeout(async () => {
      setStatus('verified');
      setLoading(true);
      const result = await checkNFTOwnership();
      setEligible(result);
      setLoading(false);
    }, 5000);
  };

  const handleHoldEnd = () => {
    clearTimeout(timeoutRef.current);
    if (status === 'holding') {
      setStatus('failed');
    }
  };

  return (
    <div style={{
      backgroundColor: 'black',
      height: '100vh',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#3b82f6' }}>🎫 MycoMystic Daily Raffle</h1>

      {eligible === null && (
        <>
          <button
            onMouseDown={handleHoldStart}
            onMouseUp={handleHoldEnd}
            onMouseLeave={handleHoldEnd}
            style={{
              padding: '15px 30px',
              background:
                status === 'verified' ? 'green' :
                status === 'failed' ? '#b91c1c' :
                status === 'holding' ? '#0ea5e9' :
                '#1e40af',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            {status === 'idle' && 'Hold to Verify (5s)'}
            {status === 'holding' && 'Holding... ⏳'}
            {status === 'verified' && 'Verified ✅'}
            {status === 'failed' && 'Too fast ❌'}
          </button>
          {status === 'failed' && (
            <p style={{ marginTop: '10px', color: '#f87171' }}>You must hold the button for 5 full seconds!</p>
          )}
        </>
      )}

      {loading && (
        <p style={{ color: '#60a5fa', marginTop: '20px' }}>Checking NFT and registering...</p>
      )}

      {eligible === true && (
        <p style={{ color: '#22c55e', marginTop: '20px' }}>You are eligible and registered for today's raffle!</p>
      )}

      {eligible === false && (
        <p style={{ color: '#ef4444', marginTop: '20px' }}>You don't own a MycoMystic NFT.</p>
      )}
    </div>
  );
};

export default RafflePage;
