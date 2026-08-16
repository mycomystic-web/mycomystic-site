import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { saveWhitelist } from "../lib/saveWhitelist";

function Whitelist() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [walletVerified, setWalletVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [walletError, setWalletError] = useState("");
  const [savingWhitelist, setSavingWhitelist] = useState(false);
  const [whitelistSuccess, setWhitelistSuccess] = useState(false);
  const [whitelistError, setWhitelistError] = useState("");

  // Leer si Discord ya fue verificado
  const [discordVerified] = useState(() => {
  return localStorage.getItem("discord_verified") === "true";
});
  const [xVerified] = useState(() => {
  return localStorage.getItem("x_verified") === "true";
});

  // =====================================
  // VERIFICAR DISCORD
  // =====================================

  const verifyDiscord = () => {
    const clientId = "1531386711660036199";
    const redirectUri = `${window.location.origin}/verify`;

    const discordUrl =
      `https://discord.com/oauth2/authorize` +
      `?client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=identify%20guilds`;

    window.location.href = discordUrl;
  };

  // =====================================
  // VERIFICAR WALLET CON FIRMA
  // =====================================

  const verifyWallet = async () => {
    if (!address) return;

    setVerifying(true);
    setWalletError("");

    try {
      await signMessageAsync({
        message: `Baby Orca Whitelist

I confirm that I control this wallet:

${address}

This signature does not authorize any transaction.`,
      });

      setWalletVerified(true);
    } catch (error) {
      console.error(error);

      setWalletVerified(false);
      setWalletError("Signature cancelled or failed.");
    } finally {
      setVerifying(false);
    }
  };
  // =====================================
// GUARDAR WALLET EN WHITELIST
// =====================================

const joinWhitelist = async () => {
  if (!address || !walletVerified || !discordVerified || !xVerified) return;

  setSavingWhitelist(true);
  setWhitelistError("");

  try {
    const { error } = await saveWhitelist(address);

    if (error) {
      if (error.code === "23505") {
        setWhitelistError("This wallet is already on the whitelist.");
        return;
      }

      console.error(error);
      setWhitelistError("Could not add wallet to whitelist.");
      return;
    }

    setWhitelistSuccess(true);
  } catch (error) {
    console.error(error);
    setWhitelistError("Could not add wallet to whitelist.");
  } finally {
    setSavingWhitelist(false);
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.title}>
          Baby Orca Whitelist
        </h1>

        <p style={styles.subtitle}>
          Complete all the requirements below to join the Baby Orca whitelist.
        </p>

        {/* STEP 1 */}

        <div style={styles.step}>
          <div>
            <h3>1. Follow Baby Orca on X</h3>

            <p style={styles.description}>
              Follow @babyorcax on X.
            </p>
          </div>

          {xVerified ? (
  <div style={styles.verified}>
    ✅ X Verified
  </div>
) : (
  <button
    style={styles.button}
    onClick={async () => {
      const clientId = "U2EwYi1uS1ZIR2N4ZXRFS2o4RGM6MTpjaQ";

      const redirectUri =
        `${window.location.origin}/x-callback`;

      const state = crypto.randomUUID();

      const codeVerifier =
        crypto.randomUUID() + crypto.randomUUID();

      const encoder = new TextEncoder();
      const data = encoder.encode(codeVerifier);

      const hash = await crypto.subtle.digest(
        "SHA-256",
        data
      );

      const codeChallenge = btoa(
        String.fromCharCode(...new Uint8Array(hash))
      )
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      localStorage.setItem(
        "x_code_verifier",
        codeVerifier
      );

      localStorage.setItem(
        "x_oauth_state",
        state
      );

      const xUrl =
        "https://x.com/i/oauth2/authorize" +
        `?response_type=code` +
        `&client_id=${encodeURIComponent(clientId)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${encodeURIComponent(
          "tweet.read users.read follows.read"
        )}` +
        `&state=${encodeURIComponent(state)}` +
        `&code_challenge=${encodeURIComponent(
          codeChallenge
        )}` +
        `&code_challenge_method=S256`;

      window.location.href = xUrl;
    }}
  >
    Follow
  </button>
)}
        </div>

        {/* STEP 2 */}

        <div style={styles.step}>
          <div>
            <h3>2. Quote the Baby Orca post</h3>

            <p style={styles.description}>
              Quote our official post and say that you joined the whitelist.
            </p>
          </div>

          <button
            style={styles.button}
            disabled
          >
            Coming Soon
          </button>
        </div>

        {/* STEP 3 */}

        <div style={styles.step}>
          <div>
            <h3>3. Join Baby Orca Discord</h3>

            <p style={styles.description}>
              Join the official Baby Orca Discord community.
            </p>
          </div>

          {discordVerified ? (
            <div style={styles.verified}>
              ✅ Discord Verified
            </div>
          ) : (
            <button
              style={styles.button}
              onClick={verifyDiscord}
            >
              Join Discord
            </button>
          )}
        </div>

        {/* STEP 4 */}

        <div style={styles.step}>
          <div style={{ width: "100%" }}>

            <h3>4. Verify your EVM Wallet</h3>

            <p style={styles.description}>
              Connect and sign with the wallet you want to add to the whitelist.
            </p>

            {!isConnected ? (

              <div style={{ marginTop: "15px" }}>
                <ConnectButton />
              </div>

            ) : (

              <>
                <div style={styles.walletBox}>
                  {address}
                </div>

                {!walletVerified ? (

                  <button
                    style={styles.button}
                    onClick={verifyWallet}
                    disabled={verifying}
                  >
                    {verifying
                      ? "Waiting for signature..."
                      : "Sign Wallet"}
                  </button>

                ) : (

                  <p style={styles.verified}>
                    ✅ Wallet Verified
                  </p>

                )}

                {walletError && (
                  <p style={styles.error}>
                    ❌ {walletError}
                  </p>
                )}
              </>

            )}

          </div>
        </div>

        {/* FINAL BUTTON */}

<button
  style={{
    ...styles.joinButton,
    opacity:
      discordVerified && walletVerified && xVerified
        ? 1
        : 0.35,
    cursor:
       discordVerified && walletVerified && xVerified
        ? "pointer"
        : "not-allowed",
  }}
  onClick={joinWhitelist}
  disabled={
    !discordVerified ||
    !walletVerified ||
    !xVerified ||
    savingWhitelist ||
    whitelistSuccess
  }
>
  {savingWhitelist
    ? "Adding Wallet..."
    : whitelistSuccess
    ? "✅ Added to Whitelist"
    : "Join Whitelist"}
</button>

{whitelistError && (
  <p style={styles.error}>
    ❌ {whitelistError}
  </p>
)}

        {(!discordVerified || !walletVerified) && (
          <p style={styles.locked}>
            🔒 Complete all requirements to unlock the whitelist.
          </p>
        )}

      </div>
    </div>
  );
}

export default Whitelist;


// =====================================
// ESTILOS
// =====================================

const styles = {

  container: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #1a1a2e, #0a0a0a)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    padding: "60px 20px",
    fontFamily: "sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "800px",
  },

  title: {
    fontSize: "52px",
    textAlign: "center",
    marginBottom: "15px",
    background:
      "linear-gradient(135deg, #a29bfe, #6c5ce7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    textAlign: "center",
    fontSize: "18px",
    opacity: 0.8,
    marginBottom: "50px",
  },

  step: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "22px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  description: {
    opacity: 0.7,
    marginTop: "5px",
  },

  button: {
    background: "#6c5ce7",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "12px 22px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  walletBox: {
    marginTop: "15px",
    marginBottom: "15px",
    padding: "14px",
    borderRadius: "10px",
    background: "#11111c",
    border: "1px solid rgba(255,255,255,0.15)",
    wordBreak: "break-all",
  },

  verified: {
    color: "#55efc4",
    fontWeight: "bold",
    marginTop: "15px",
  },

  error: {
    color: "#ff7675",
    marginTop: "12px",
  },

  joinButton: {
    width: "100%",
    marginTop: "20px",
    padding: "17px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg, #6c5ce7, #a29bfe)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
  },

  locked: {
    textAlign: "center",
    opacity: 0.6,
    marginTop: "15px",
  },
};