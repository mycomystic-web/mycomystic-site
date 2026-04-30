import { getAccount, readContract } from "@wagmi/core";
import { contractABI } from "./nftABI";
import { contractAddress } from "./wagmiConfig";

// ⚠️ Si tienes más contratos, agrégalos aquí
const contracts = [
  contractAddress,
  "0x1edfe058ec7dee67ecf81fdc364fcc3fe8cd51eb", // ejemplo byteBeings
];

export async function checkNFTOwnership() {
  const { address } = getAccount();
  if (!address) throw new Error("Wallet not connected");

  let total = 0n;

  for (const addr of contracts) {
    try {
      const balance = await readContract({
        address: addr,
        abi: contractABI,
        functionName: "balanceOf",
        args: [address],
      });
      total += BigInt(balance);
    } catch (e) {
      // ignora contratos que fallen
      console.warn("Error leyendo contrato:", addr, e);
    }
  }

  return {
    hasAccess: total > 0n,
    balance: Number(total),
    owner: address,
  };
}