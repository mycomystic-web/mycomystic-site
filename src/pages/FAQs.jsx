export default function FAQs() {
  return (
    <div className="min-h-screen bg-[#06111A] text-[#FBECC1] font-serif px-6 py-20">
      <div className="max-w-3xl mx-auto space-y-8 text-left">
        <h1 className="text-3xl font-bold text-center">FAQs</h1>

        <div className="space-y-4 text-sm">
          <div>
            <h2 className="font-semibold">What is MycoMystic?</h2>
            <p>MycoMystic is a fantasy-themed NFT collection where unique characters are formed from layer-based combinations.</p>
          </div>
          <div>
            <h2 className="font-semibold">How many NFTs are in the collection?</h2>
            <p>A total of 10,000 NFTs will be minted, including rare types like Toxic and Sorcerers.</p>
          </div>
          <div>
            <h2 className="font-semibold">Where can I mint or buy a MycoMystic NFT?</h2>
            <p>You can mint directly on our site when live, or find them on OpenSea.</p>
          </div>
          <div>
            <h2 className="font-semibold">What benefits do NFT holders get?</h2>
            <p>Holders can access exclusive events, giveaways, and future experiences in digital or real worlds.</p>
          </div>
        </div>

        <footer className="pt-10 text-center text-xs text-[#FBECC1]/60">
          © 2025 MycoMystic
        </footer>
      </div>
    </div>
  );
}
