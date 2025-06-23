import React, { useEffect, useState } from 'react';
import { checkNFTOwnership } from '../lib/checkNFT';

const RafflePage = () => {
  const [loading, setLoading] = useState(true);
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    const verifyNFT = async () => {
      console.log('[🔍] Verificando tenencia de NFT...');
      const result = await checkNFTOwnership();
      console.log('[✅] Resultado de tenencia:', result);
      setEligible(result);
      setLoading(false);
    };

    verifyNFT();
  }, []);

  return (
    <div style={{ backgroundColor: 'black', height: '100vh', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#3b82f6' }}>🎫 MycoMystic Daily Raffle</h1>
      {loading ? (
        <p style={{ color: '#60a5fa' }}>Checking NFT and registering...</p>
      ) : eligible ? (
        <p style={{ color: '#22c55e' }}>You are eligible and registered for today's raffle!</p>
      ) : (
        <p style={{ color: '#ef4444' }}>You don't own a MycoMystic NFT.</p>
      )}
    </div>
  );
};

export default RafflePage;
