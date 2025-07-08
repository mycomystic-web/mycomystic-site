import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { checkNFTOwnership } from "./lib/checkNFT";
import { useAccount } from "wagmi";

export default function ProjectShowcase() {
  const [hasAccess, setHasAccess] = useState(false);
  const { isConnected, address } = useAccount();

  const textShadow =
    "2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000";

  useEffect(() => {
    const verify = async () => {
      if (!isConnected || !address) {
        setHasAccess(false);
        return;
      }
      const hasNFT = await checkNFTOwnership(address);
      setHasAccess(hasNFT);
    };

    verify();
  }, [isConnected, address]);

  const handleEnter = () => {
    if (hasAccess) {
      window.location.href = "/verify"; // ✅ VITE puro, sin next/router
    }
  };

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
            claim prizes, and explore our expanding realm.
          </p>
        </div>

        {/* CONNECT + RAFFLE */}
        <div className="flex flex-col items-center space-y-4">
          <ConnectButton />
          <button
            onClick={handleEnter}
            disabled={!hasAccess}
            className={`font-semibold px-6 py-2 rounded-full shadow-md transition flex items-center gap-2 ${
              hasAccess
                ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                : "bg-red-600 cursor-not-allowed"
            }`}
          >
            🎟️ Enter Raffle
          </button>
        </div>

        {/* JOIN & WIN */}
        <div>
          <h2
            className="text-xl font-bold mb-4 text-[#66b2ff]"
            style={{ textShadow }}
          >
            🎁 JOIN & WIN
          </h2>
          <p
            className="text-base leading-relaxed text-[#99ccff]"
            style={{ textShadow }}
          >
            Holding any NFT from the MycoMystic network grants access to
            exclusive raffles and drops. Lock in and unlock rewards.
          </p>
        </div>

        {/* OUR DIMENSIONS */}
        <div>
          <h2
            className="text-xl font-bold mb-6 text-[#66b2ff]"
            style={{ textShadow }}
          >
            🔮 OUR DIMENSIONS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-sm">
            {[
              [
                "Multiple NFT Projects",
                "Each with a unique theme, story and gateway to benefits.",
              ],
              [
                "Legendary Giveaways",
                "From ETH to experiences—our drops will surprise you.",
              ],
              [
                "Lore-Driven Access",
                "Storytelling that evolves—and rewards—engaged users.",
              ],
              [
                "Mystic Ecosystem",
                "Built to grow with new apps, games, and collaborations.",
              ],
            ].map(([title, desc], i) => (
              <div
                key={i}
                className="flex flex-col items-center text-[#99ccff]"
              >
                <p className="font-semibold mb-1" style={{ textShadow }}>
                  {title}
                </p>
                <p className="text-sm leading-snug" style={{ textShadow }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ROADMAP */}
        <div>
          <h2
            className="text-xl font-bold mb-4 text-[#66b2ff]"
            style={{ textShadow }}
          >
            📍 ROADMAP 2025
          </h2>
          <ul className="space-y-4 text-[#99ccff] text-left">
            <li style={{ textShadow }}>
              <strong>Q2:</strong> Official launch of MycoMystic and first NFT
              collection. Wallet connection system live.
            </li>
            <li style={{ textShadow }}>
              <strong>Q3:</strong> Daily raffles activated. New drops like
              ByteBeings and MysticKeys begin.
            </li>
            <li style={{ textShadow }}>
              <strong>Q4:</strong> Internal marketplace and NFT tier system.
              Real-world rewards introduced.
            </li>
            <li style={{ textShadow }}>
              <strong>2026+:</strong> Global expansion with mobile apps, collab
              drops and live events.
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h2
            className="text-xl font-bold mb-4 text-[#66b2ff]"
            style={{ textShadow }}
          >
            ❓ FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="space-y-6 text-[#99ccff] text-left">
            <div>
              <p className="font-semibold" style={{ textShadow }}>
                What is MycoMystic?
              </p>
              <p style={{ textShadow }}>
                A Web3-powered NFT ecosystem offering real raffles, evolving
                stories and real-world perks for holders.
              </p>
            </div>
            <div>
              <p className="font-semibold" style={{ textShadow }}>
                How do I join a raffle?
              </p>
              <p style={{ textShadow }}>
                Hold at least one NFT from any MycoMystic collection and connect
                your wallet to get access.
              </p>
            </div>
            <div>
              <p className="font-semibold" style={{ textShadow }}>
                Where can I buy NFTs?
              </p>
              <p style={{ textShadow }}>
                On OpenSea or during our official minting events announced on X
                and Discord.
              </p>
            </div>
            <div>
              <p className="font-semibold" style={{ textShadow }}>
                What kind of prizes are raffled?
              </p>
              <p style={{ textShadow }}>
                From ETH and NFTs to merchandise, exclusive passes, and
                one-of-a-kind experiences.
              </p>
            </div>
          </div>
        </div>

        {/* TEAM */}
        <div>
          <h2
            className="text-xl font-bold mb-4 text-[#66b2ff]"
            style={{ textShadow }}
          >
            👥 THE TEAM
          </h2>
          <div className="space-y-6 text-[#99ccff] text-left">
            <div>
              <p className="font-semibold" style={{ textShadow }}>
                Julio (aka JulioMystic)
              </p>
              <p style={{ textShadow }}>
                Founder and creative mind behind MycoMystic. Builder of immersive
                Web3 experiences and NFT brands.
              </p>
            </div>
            <div>
              <p className="font-semibold" style={{ textShadow }}>
                Global Collaborators
              </p>
              <p style={{ textShadow }}>
                Our team is expanding with artists, devs, and visionaries from
                around the world.
              </p>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <div>
          <h2
            className="text-xl font-bold mb-4 text-[#66b2ff]"
            style={{ textShadow }}
          >
            🌍 ABOUT MYCOMYSTIC
          </h2>
          <p className="text-[#99ccff] text-left" style={{ textShadow }}>
            MycoMystic is a multi-project NFT universe that rewards true
            believers. We combine community, lore, and opportunity into one
            growing ecosystem. From pixel art to pixel power—this is your new
            realm.
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h2
            className="text-xl font-bold mb-4 text-[#66b2ff]"
            style={{ textShadow }}
          >
            ✉️ CONTACT
          </h2>
          <p className="text-[#99ccff] text-left" style={{ textShadow }}>
            For collaborations, media, or support contact us at:
            <br />
            <a
              href="mailto:mycomysticpro@gmail.com"
              className="underline text-[#66b2ff]"
              style={{ textShadow }}
            >
              mycomysticpro@gmail.com
            </a>
            <br />
            Or reach out via Discord and X (Twitter).
          </p>
        </div>

        {/* SOCIAL BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {[
            {
              href: "https://discord.gg/CJqYVCUw",
              icon: "/icons/discord.svg",
              label: "Discord",
            },
            {
              href: "https://x.com/mycomysticpro",
              icon: "/icons/x.svg",
              label: "X",
            },
            {
              href: "https://www.instagram.com/mycomysticpro/",
              icon: "/icons/instagram.svg",
              label: "Instagram",
            },
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
        <footer
          className="pt-10 text-xs text-[#99ccff]"
          style={{ textShadow }}
        >
          © 2025 MycoMystic
        </footer>
      </section>
    </div>
  );
}
