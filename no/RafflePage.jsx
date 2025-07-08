// src/pages/RafflePage.jsx
import React, { useState, useEffect } from 'react';
import { checkNFTOwnership } from '../lib/checkNFT';

const RafflePage = () => {
  const [loading, setLoading] = useState(true);
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const result = await checkNFTOwnership();
      setEligible(result);
      setLoading(false);
    };

    verify();
  }, []);

  return (
    <div style={{
      backgroundColor: 'black',
      color: 'white',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#3b82f6' }}>🎫 MycoMystic Daily Raffle</h1>

      {loading ? (
        <p style={{ color: '#60a5fa' }}>Checking NFT ownership...</p>
      ) : eligible ? (
        <p style={{ color: '#22c55e' }}>✅ You're registered for today's raffle!</p>
      ) : (
        <p style={{ color: '#ef4444' }}>❌ You don't own a MycoMystic NFT.</p>
      )}
    </div>
  );
};

export default RafflePage;
