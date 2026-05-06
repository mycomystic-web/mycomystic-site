import { readContract } from "@wagmi/core";
import { contractABI } from "./nftABI";

const contracts = [
  "0x949eD0F447670165105B65083C059837050AFE0a", // MycoMystic
  "0x1EdfE058Ec7DeE67EcF81FDC364FCC3FE8Cd51eb", // ByteBeings
];

export async function checkNFTOwnership(address) {
  if (!address) return false;

  for (const contract of contracts) {
    try {
      const balance = await readContract({
        address: contract,
        abi: contractABI,
        functionName: "balanceOf",
        args: [address],
      });

      if (Number(balance) > 0) {
        return true;
      }
    } catch (err) {
      console.warn("Contrato falló:", contract);
    }
  }

  return false;
}