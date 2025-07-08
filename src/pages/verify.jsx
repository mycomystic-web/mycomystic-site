export default function VerifyPage() {
  return (
    <div className="flex flex-col items-center space-y-6 p-10 min-h-screen justify-center bg-[#000] text-white">
      <h1 className="text-2xl font-bold">Submit your Wallet</h1>

      <form
        action="https://formsubmit.co/sorteonftmycomystic@gmail.com"
        method="POST"
        className="flex flex-col items-center space-y-4"
      >
        <input
          type="text"
          name="wallet"
          placeholder="0x..."
          required
          className="px-4 py-2 border border-gray-300 rounded w-80 text-black"
        />

        {/* Forzar envíos individuales */}
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_cc" value="sorteonftmycomystic@gmail.com" />
        <input type="hidden" name="_autoresponse" value="✅ Wallet recibida. Gracias por participar en MycoMystic." />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="New MycoMystic Wallet Submission" />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold"
        >
          ✅ Send Wallet
        </button>
      </form>
    </div>
  );
}
