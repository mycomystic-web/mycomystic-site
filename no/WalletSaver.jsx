import { useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function WalletSaver() {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: address }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('✅ Wallet saved:', data);
        })
        .catch((err) => {
          console.error('❌ Error saving wallet:', err);
        });
    }
  }, [isConnected, address]);

  return null;
}
