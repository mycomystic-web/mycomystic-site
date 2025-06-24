// src/lib/checkNFT.js
import { getAccount, readContract } from '@wagmi/core';
import { contractABI } from './nftABI';
import { contractAddress } from './wagmiConfig';

export async function checkNFTOwnership() {
  try {
    const { address } = getAccount();
    if (!address) throw new Error('Wallet not connected');

    const balance = await readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'balanceOf',
      args: [address],
    });

    return balance > 0n; // BigInt comparison
  } catch (error) {
    console.error('❌ Error checking NFT ownership:', error);
    return false;
  }
}
