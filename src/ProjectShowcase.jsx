import { motion } from "framer-motion";

export default function ProjectShowcase() {
  return (
    <div
      className="min-h-screen w-full text-[#FBECC1] font-serif flex flex-col items-center justify-center text-center px-6 py-20"
      style={{
        backgroundImage: 'url(/mycomystic-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <section className="max-w-2xl space-y-14">
        <div>
          <h1 className="text-5xl font-bold tracking-wide mb-8">MycoMystic</h1>
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-wide mb-4">THE VISION</h2>
          <p className="text-base leading-relaxed">
            A collection of unique layer combinations that reveals mystical characters like Toxic, Sorcerer, Guide, Sanatory, and Guard.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-wide mb-4">UTILITIES</h2>
          <p className="text-base leading-relaxed">
            Hold NFTs that unlock digital and real–world benefits.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-wide mb-6">MEET THE ROLES</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
            <div className="flex flex-col items-center">
              <p className="font-semibold mb-1">Guard</p>
              <p className="text-sm leading-snug">Protectors of balance and order across the realm.</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold mb-1">Toxic</p>
              <p className="text-sm leading-snug">Harbingers of chaos with unpredictable energy.</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold mb-1">Sorcerer</p>
              <p className="text-sm leading-snug">Masters of arcane knowledge and elemental forces.</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold mb-1">Guide</p>
              <p className="text-sm leading-snug">Spiritual navigators who light the unseen paths.</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold mb-1">Sanatory</p>
              <p className="text-sm leading-snug">Healers attuned to nature’s restorative essence.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm font-semibold mt-10">
          <a href="/roadmap" className="border border-[#FBECC1] px-4 py-2 rounded hover:bg-[#FBECC1] hover:text-black transition">Roadmap</a>
          <a href="/faqs" className="border border-[#FBECC1] px-4 py-2 rounded hover:bg-[#FBECC1] hover:text-black transition">FAQs</a>
          <a href="/team" className="border border-[#FBECC1] px-4 py-2 rounded hover:bg-[#FBECC1] hover:text-black transition">The Team</a>
          <a href="/about" className="border border-[#FBECC1] px-4 py-2 rounded hover:bg-[#FBECC1] hover:text-black transition">About</a>
          <a href="/contact" className="border border-[#FBECC1] px-4 py-2 rounded hover:bg-[#FBECC1] hover:text-black transition">Contact</a>
        </div>

        <motion.div
          className="bg-black/40 rounded-xl py-10 px-6 mt-12 mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl font-bold mb-4">Claim your mystical identity</h3>
          <p className="text-sm text-[#FBECC1]/70 mb-6">Only 10,000 exist. Be one of them.</p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {[1, 2, 3, 4].map((id) => (
              <motion.img
                key={id}
                src={`/nfts/sample${id}.png`}
                alt={`NFT ${id}`}
                className="w-16 h-16 rounded shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: id * 0.2 }}
              />
            ))}
          </div>
        </motion.div>

        <div>
          <h2 className="text-xl font-bold mb-6 mt-8">JOIN THE COMMUNITY & MINT</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a
              href="https://discord.gg/CJqYVCUw"
              target="_blank"
              className="flex items-center gap-2 border border-[#FBECC1] px-6 py-2 rounded hover:bg-[#FBECC1] hover:text-black transition"
            >
              <img src="/icons/discord.svg" alt="Discord" className="h-5 w-5" />
              Discord
            </a>
            <a
              href="https://x.com/mycomysticpro"
              target="_blank"
              className="flex items-center gap-2 border border-[#FBECC1] px-6 py-2 rounded hover:bg-[#FBECC1] hover:text-black transition"
            >
              <img src="/icons/x.svg" alt="X" className="h-5 w-5" />
              X
            </a>
            <a
              href="https://www.instagram.com/mycomysticpro/"
              target="_blank"
              className="flex items-center gap-2 border border-[#FBECC1] px-6 py-2 rounded hover:bg-[#FBECC1] hover:text-black transition"
            >
              <img src="/icons/instagram.svg" alt="Instagram" className="h-5 w-5" />
              Instagram
            </a>
          </div>
          <a
            href="https://opensea.io/es/collection/mycomystic/overview?_gl=1*8gjtoi*_gcl_au*Nzg0MjIxOTEzLjE3NDgzNzMwMDE.*_ga*MTYyODMwNjQ0Mi4xNzQ4MzcyOTk3*_ga_9VSBF2K4BX*czE3NTAxMDE1ODckbzU2JGcxJHQxNzUwMTA3ODIyJGoxOCRsMCRoMA.."
            className="inline-block border border-[#FBECC1] px-8 py-3 rounded hover:bg-[#FBECC1] hover:text-black transition text-sm font-semibold"
          >
            MINT YOUR NFT
          </a>
        </div>

        <footer className="pt-10 text-xs text-[#FBECC1]/60">
          © 2025 MycoMystic
        </footer>
      </section>
    </div>
  );
}
