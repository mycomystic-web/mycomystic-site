import { readContract } from '@wagmi/core';
import { getAccount } from '@wagmi/core';
import contractABI from './nftABI';

const contractAddress = '0x0040F67debe231Eb2d8116eabb9Ff6ce214c7E94';

export async function checkNFTOwnership() {
  try {
    const { address } = getAccount();

    const balance = await readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'balanceOf',
      args: [address],
    });

    return balance > 0n;
  } catch (error) {
    console.error('❌ Error checking NFT ownership:', error);
    return false;
  }
}
