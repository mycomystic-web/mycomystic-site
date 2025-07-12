// src/lib/checkNFT.js
import { getAccount, readContract } from '@wagmi/core';
import { contractABI } from './nftABI';
import { contractAddress } from './wagmiConfig';

const byteBeingsAddress = '0x1edfe058ec7dee67ecf81fdc364fcc3fe8cd51eb';

export async function checkNFTOwnership() {
  try {
    const { address } = getAccount();
    if (!address) throw new Error('Wallet not connected');

    const [mycoBalance, byteBalance] = await Promise.all([
      readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'balanceOf',
        args: [address],
      }),
      readContract({
        address: byteBeingsAddress,
        abi: contractABI,
        functionName: 'balanceOf',
        args: [address],
      }),
    ]);

    return mycoBalance > 0n || byteBalance > 0n;
  } catch (error) {
    console.error('❌ Error checking NFT ownership:', error);
    return false;
  }
}
