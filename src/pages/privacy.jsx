// src/pages/privacy.jsx

export default function PrivacyPage() {
  const textShadow =
    "2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000";

  return (
    <div
      className="min-h-screen px-8 py-20 font-serif text-white"
      style={{
        backgroundColor: "#000",
        textShadow,
      }}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold mb-6 text-[#66b2ff]">
          Privacy Policy & Terms
        </h1>

        <p className="text-[#99ccff]">
          MycoMystic values your privacy. We only collect wallet addresses that
          you provide voluntarily when participating in our raffles.
        </p>

        <p className="text-[#99ccff]">
          By submitting your wallet, you agree to our raffle rules and terms.
          You understand that your wallet must hold at least one valid
          MycoMystic NFT to qualify.
        </p>

        <p className="text-[#99ccff]">
          All wallet data is handled securely. Every 30 days, our database is
          refreshed. When we announce a new raffle, you must reconnect your
          wallet if you wish to participate.
        </p>

        <p className="text-[#99ccff]">
          For any questions, please contact us at{" "}
          <a
            href="mailto:mycomysticpro@gmail.com"
            className="underline text-[#66b2ff]"
          >
            mycomysticpro@gmail.com
          </a>
          .
        </p>

        <p className="text-[#99ccff]">Last updated: 2025</p>
      </div>
    </div>
  );
}
