import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { checkNFTOwnership } from "../lib/checkNFT";
import { saveWalletIfNew } from "../lib/saveWallet";
import { getAccount, useAccount } from "wagmi";
import { motion } from "framer-motion";

export default function ProjectShowcase() {
  const [message, setMessage] = useState("");
  const { isConnected } = useAccount();

  useEffect(() => {
  const checkOwnership = async () => {
    if (!isConnected || !address) return;

    try {
      const hasNFT = await checkNFTOwnership();
      if (hasNFT) {
        await saveWalletIfNew(address);
        setMessage("✅ You’re in the Mystic Club!");
      } else {
        setMessage("❌ You don’t own a MycoMystic NFT.");
      }
    } catch (err) {
      console.error("Error checking NFT ownership:", err);
      setMessage("⚠️ Could not verify NFT ownership.");
    }
  };

  checkOwnership();
}, [isConnected, address]);



  const textShadow =
    "2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000";

  return (
    <div
      className="min-h-screen w-full text-white font-serif flex flex-col items-center justify-center text-center px-6 py-20"
      style={{
        backgroundImage: "url(/casino-pixel-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="max-w-3xl space-y-16">
        {/* HERO */}
        <div>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-wide mb-6 text-[#0080ff]"
            style={{ textShadow }}
          >
            Welcome to MycoMystic
          </h1>
          <p
            className="text-base sm:text-lg leading-relaxed text-[#66b2ff]"
            style={{ textShadow }}
          >
            A universal brand powered by Web3 giveaways. Connect your wallet,
            and join the Mystic Club if you hold a MycoMystic NFT.
          </p>
        </div>

        {/* CONNECT + STATUS */}
        <div className="flex flex-col items-center space-y-4">
          <ConnectButton />
          {message && (
            <p className="text-lg font-semibold text-[#66b2ff]" style={{ textShadow }}>
              {message}
            </p>
          )}
        </div>

        {/* JOIN & WIN */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-[#66b2ff]" style={{ textShadow }}>
            🎁 JOIN & WIN
          </h2>
          <p className="text-base leading-relaxed text-[#99ccff]" style={{ textShadow }}>
            Holding any NFT from the MycoMystic network grants access to exclusive raffles and drops. Lock in and unlock rewards.
          </p>
        </div>

        {/* OUR DIMENSIONS */}
        <div>
          <h2 className="text-xl font-bold mb-6 text-[#66b2ff]" style={{ textShadow }}>
            🔮 OUR DIMENSIONS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-sm">
            {[
              ["Multiple NFT Projects", "Each with a unique theme, story and gateway to benefits."],
              ["Legendary Giveaways", "From ETH to experiences—our drops will surprise you."],
              ["Lore-Driven Access", "Storytelling that evolves—and rewards—engaged users."],
              ["Mystic Ecosystem", "Built to grow with new apps, games, and collaborations."]
            ].map(([title, desc], i) => (
              <div key={i} className="flex flex-col items-center text-[#99ccff]">
                <p className="font-semibold mb-1" style={{ textShadow }}>{title}</p>
                <p className="text-sm leading-snug" style={{ textShadow }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ROADMAP */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-[#66b2ff]" style={{ textShadow }}>
            📍 ROADMAP 2025
          </h2>
          <ul className="space-y-4 text-[#99ccff] text-left">
            <li style={{ textShadow }}><strong>Q2:</strong> Launch of MycoMystic and first NFT collection. Wallet verification live.</li>
            <li style={{ textShadow }}><strong>Q3:</strong> Daily raffles go live. New drops like ByteBeings and MysticKeys begin.</li>
            <li style={{ textShadow }}><strong>Q4:</strong> Marketplace + NFT tier system. Real-world rewards introduced.</li>
            <li style={{ textShadow }}><strong>2026+:</strong> Expansion: mobile apps, collabs and live events.</li>
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-[#66b2ff]" style={{ textShadow }}>
            ❓ FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="space-y-6 text-[#99ccff] text-left">
            {[
              ["What is MycoMystic?", "A Web3-powered NFT ecosystem offering real raffles, evolving stories and perks for holders."],
              ["How do I join a raffle?", "Hold at least one MycoMystic NFT and connect your wallet."],
              ["Where can I buy NFTs?", "On OpenSea or during our official drops (announced on X and Discord)."],
              ["What kind of prizes?", "ETH, NFTs, merch, event access and unique experiences."]
            ].map(([q, a], i) => (
              <div key={i}>
                <p className="font-semibold" style={{ textShadow }}>{q}</p>
                <p style={{ textShadow }}>{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TEAM */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-[#66b2ff]" style={{ textShadow }}>
            👥 THE TEAM
          </h2>
          <div className="space-y-6 text-[#99ccff] text-left">
            <div>
              <p className="font-semibold" style={{ textShadow }}>
                Julio (aka JulioMystic)
              </p>
              <p style={{ textShadow }}>
                Founder and creative mind behind MycoMystic. Builder of immersive Web3 experiences and NFT brands.
              </p>
            </div>
            <div>
              <p className="font-semibold" style={{ textShadow }}>
                Global Collaborators
              </p>
              <p style={{ textShadow }}>
                Artists, developers and visionaries from around the world.
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-[#66b2ff]" style={{ textShadow }}>
            ✉️ CONTACT
          </h2>
          <p className="text-[#99ccff] text-left" style={{ textShadow }}>
            For collabs, press or support: <br />
            <a
              href="mailto:mycomysticpro@gmail.com"
              className="underline text-[#66b2ff]"
              style={{ textShadow }}
            >
              mycomysticpro@gmail.com
            </a>
            <br />
            Or find us on Discord and X (Twitter).
          </p>
        </div>

        {/* SOCIAL BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {[
            { href: "https://discord.gg/CJqYVCUw", icon: "/icons/discord.svg", label: "Discord" },
            { href: "https://x.com/mycomysticpro", icon: "/icons/x.svg", label: "X" },
            { href: "https://www.instagram.com/mycomysticpro/", icon: "/icons/instagram.svg", label: "Instagram" },
          ].map(({ href, icon, label }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0080ff] hover:bg-[#66b2ff] text-white font-semibold px-6 py-2 rounded-full shadow-md transition flex items-center gap-2"
            >
              <img src={icon} alt={label} className="h-5 w-5" />
              {label}
            </a>
          ))}
        </div>

        {/* FOOTER */}
        <footer className="pt-10 text-xs text-[#99ccff]" style={{ textShadow }}>
          © 2025 MycoMystic
        </footer>
      </section>
    </div>
  );
}
