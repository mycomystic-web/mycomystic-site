import { readContract } from "@wagmi/core";
import { contractABI } from "./nftABI";

const contracts = [
  "0x0040F67debe231Eb2d8116eabb9Ff6ce214c7E94", // MycoMystic
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