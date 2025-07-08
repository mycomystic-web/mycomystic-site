import { useEffect, useState } from "react";
import { useAccount, useProvider } from "wagmi";
import { hasMycoMysticNFT } from "@/lib/checkNFT";

export default function RafflePage() {
  const { address, isConnected } = useAccount();
  const provider = useProvider();

  const [isLoading, setIsLoading] = useState(false);
  const [eligible, setEligible] = useState(null); // null | true | false
  const [status, setStatus] = useState("");

  useEffect(() => {
    const checkEligibility = async () => {
      if (!isConnected || !address) return;

      setIsLoading(true);

      const ownsNFT = await hasMycoMysticNFT(address, provider);
      setEligible(ownsNFT);

      if (ownsNFT) {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wallet: address }),
        });

        const data = await res.json();
        setStatus(data.message || "Participation successfully registered.");
      } else {
        setStatus("You don't own a MycoMystic NFT 😢");
      }

      setIsLoading(false);
    };

    checkEligibility();
  }, [address, isConnected]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 bg-black text-white font-serif">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#66b2ff] mb-6">
        🎟️ MycoMystic Daily Raffle
      </h1>

      {!isConnected && (
        <p className="text-lg text-gray-400">Connect your wallet to participate</p>
      )}

      {isConnected && (
        <div className="mt-4">
          {isLoading ? (
            <p className="text-lg text-blue-400">Checking NFT and registering...</p>
          ) : eligible === null ? (
            <p className="text-lg text-gray-300">Loading...</p>
          ) : eligible ? (
            <p className="text-green-400 text-xl font-semibold">✅ You're in!</p>
          ) : (
            <p className="text-red-400 text-xl font-semibold">❌ Not eligible</p>
          )}

          {status && <p className="mt-4 text-sm text-gray-400">{status}</p>}
        </div>
      )}
    </div>
  );
}

