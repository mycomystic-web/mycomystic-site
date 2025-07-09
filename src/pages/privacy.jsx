export default function Privacy() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6 py-20 text-left">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-3xl font-bold text-[#66b2ff]">
          Privacy Policy & Terms
        </h1>

        <p>
          Welcome to MycoMystic. By using this site you agree to our policies and rules.
          All wallet addresses submitted for raffle participation are stored securely
          and are not shared with third parties.
        </p>

        <p>
          Our database is updated every 30 days. Whenever we announce a new raffle on
          any official channel, all holders must reconnect their wallet to participate.
        </p>

        <p>
          The user is solely responsible for the accuracy of their wallet address and
          for maintaining control over their NFT to be eligible for any raffle.
        </p>

        <p>
          We reserve the right to update these terms at any time. Continued use of
          MycoMystic means you accept any changes. Please check this page regularly.
        </p>

        <p>
          For questions, contact us at{" "}
          <a
            href="mailto:mycomysticpro@gmail.com"
            className="underline text-[#66b2ff]"
          >
            mycomysticpro@gmail.com
          </a>.
        </p>

        <p className="text-xs text-gray-400">
          © 2025 MycoMystic — All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
