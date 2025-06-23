import { getAccount, readContract } from '@wagmi/core';
import { contractABI } from './nftABI';
import { contractAddress } from './wagmiConfig';

export async function checkNFTOwnership() {
  try {
    const account = getAccount();

    // Verifica si está conectada la wallet
    if (!account?.isConnected || !account?.address) {
      console.warn('⚠️ Wallet not connected');
      return false;
    }

    const balance = await readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'balanceOf',
      args: [account.address],
    });

    return balance > 0n;
  } catch (error) {
    console.error('❌ Error checking NFT ownership:', error);
    return false;
  }
}
