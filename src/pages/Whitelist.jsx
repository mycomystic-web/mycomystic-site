import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { saveWhitelist } from "../lib/saveWhitelist";

// =====================================
// CONFIGURACIÓN
// =====================================

// Cuando tengas el post oficial de Baby Orca,
// cambia solamente este valor.
const BABY_ORCA_POST_URL = "https://x.com/BabyOrcaX/status/2090757616834171360";

// =====================================
// COMPONENTE
// =====================================

function Whitelist() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  // =====================================
  // ESTADOS
  // =====================================

  const [walletVerified, setWalletVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [walletError, setWalletError] = useState("");

  const [savingWhitelist, setSavingWhitelist] = useState(false);
  const [whitelistSuccess, setWhitelistSuccess] = useState(false);
  const [whitelistError, setWhitelistError] = useState("");

  // =====================================
  // DISCORD
  // =====================================

  const [discordVerified] = useState(() => {
    return localStorage.getItem("discord_verified") === "true";
  });

  // =====================================
  // X ENGAGEMENT
  // =====================================

  const [xPostLink, setXPostLink] = useState(() => {
    return localStorage.getItem("baby_orca_x_post_link") || "";
  });

  const [xVerified, setXVerified] = useState(() => {
    return localStorage.getItem("baby_orca_x_verified") === "true";
  });

  const [xVerifying, setXVerifying] = useState(false);
  const [xError, setXError] = useState("");

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
  // ABRIR POST DE BABY ORCA
  // =====================================

  const openBabyOrcaPost = () => {
    if (BABY_ORCA_POST_URL === "PENDIENTE") {
      alert("The official Baby Orca post link has not been configured yet.");
      return;
    }

    window.open(
      BABY_ORCA_POST_URL,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // =====================================
  // VERIFICAR ENLACE DE X
  // =====================================

  const verifyXEngagement = async () => {
    setXError("");

    const link = xPostLink.trim();

    if (!link) {
      setXError("Please paste your X post link.");
      return;
    }

    // Aceptamos solamente enlaces de publicaciones
    // que contengan /status/ seguido de un ID.
    const xPostRegex =
      /^https?:\/\/(www\.)?(x\.com|twitter\.com)\/[^\/\s]+\/status\/\d+(?:\?.*)?$/i;

    if (!xPostRegex.test(link)) {
      setXVerified(false);
      localStorage.removeItem("baby_orca_x_verified");

      setXError(
        "Invalid X post link. Please paste the direct link to your post."
      );

      return;
    }

    setXVerifying(true);

    try {
      // Simulación de verificación propia.
      // No afirma que X haya confirmado el Like/Repost/Quote.
      await new Promise((resolve) => setTimeout(resolve, 700));

      localStorage.setItem("baby_orca_x_post_link", link);
      localStorage.setItem("baby_orca_x_verified", "true");

      setXVerified(true);
      setXPostLink(link);
    } catch (error) {
      console.error(error);

      setXVerified(false);
      localStorage.removeItem("baby_orca_x_verified");

      setXError("Could not verify the X post link.");
    } finally {
      setXVerifying(false);
    }
  };

  // =====================================
  // VERIFICAR WALLET
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
  // GUARDAR WALLET
  // =====================================

  const joinWhitelist = async () => {
    if (
      !address ||
      !walletVerified ||
      !discordVerified ||
      !xVerified
    ) {
      return;
    }

    setSavingWhitelist(true);
    setWhitelistError("");

    try {
      const { error } = await saveWhitelist(address);

      if (error) {
        if (error.code === "23505") {
          setWhitelistError(
            "This wallet is already on the whitelist."
          );
          return;
        }

        console.error(error);
        setWhitelistError(
          "Could not add wallet to whitelist."
        );
        return;
      }

      setWhitelistSuccess(true);
    } catch (error) {
      console.error(error);

      setWhitelistError(
        "Could not add wallet to whitelist."
      );
    } finally {
      setSavingWhitelist(false);
    }
  };

  // =====================================
  // REQUISITOS
  // =====================================

  const allRequirementsCompleted =
    xVerified &&
    discordVerified &&
    walletVerified;

  // =====================================
  // RENDER
  // =====================================

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.title}>
          Baby Orca Whitelist
        </h1>

        <p style={styles.subtitle}>
          Complete all the requirements below to join
          the Baby Orca whitelist.
        </p>

        {/* =====================================
            STEP 1
        ===================================== */}

        <div style={styles.step}>
          <div>
            <h3>1. Follow Baby Orca on X</h3>

            <p style={styles.description}>
              Follow @BabyOrcaX on X.
            </p>
          </div>

          <button
            style={styles.button}
            onClick={() => {
              window.open(
                "https://x.com/BabyOrcaX",
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            Follow
          </button>
        </div>

        {/* =====================================
            STEP 2
        ===================================== */}

        <div style={styles.stepBlock}>

          <div>
            <h3>2. Engage with the Baby Orca post</h3>

            <p style={styles.description}>
              Like, repost, and quote the official
              Baby Orca post. Then paste the link
              to your X post below.
            </p>
          </div>

          <button
            style={styles.button}
            onClick={openBabyOrcaPost}
          >
            Open Baby Orca Post
          </button>

          <div style={styles.xBox}>

            <label style={styles.label}>
              Paste your X post link
            </label>

            <input
              type="text"
              value={xPostLink}
              onChange={(event) => {
                setXPostLink(event.target.value);
                setXVerified(false);
                localStorage.removeItem(
                  "baby_orca_x_verified"
                );
                setXError("");
              }}
              placeholder="https://x.com/username/status/..."
              style={styles.input}
            />

            {!xVerified ? (
              <button
                style={styles.button}
                onClick={verifyXEngagement}
                disabled={xVerifying}
              >
                {xVerifying
                  ? "Verifying..."
                  : "Verify Engagement"}
              </button>
            ) : (
              <div style={styles.verified}>
                ✅ X Engagement Submitted
              </div>
            )}

            {xError && (
              <p style={styles.error}>
                ❌ {xError}
              </p>
            )}

            {xVerified && (
              <p style={styles.smallText}>
                Your X post link has been accepted.
              </p>
            )}

          </div>
        </div>

        {/* =====================================
            STEP 3
        ===================================== */}

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

        {/* =====================================
            STEP 4
        ===================================== */}

        <div style={styles.stepBlock}>

          <div style={{ width: "100%" }}>

            <h3>4. Verify your EVM Wallet</h3>

            <p style={styles.description}>
              Connect and sign with the wallet you
              want to add to the whitelist.
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

        {/* =====================================
            FINAL BUTTON
        ===================================== */}

        <button
          style={{
            ...styles.joinButton,
            opacity: allRequirementsCompleted
              ? 1
              : 0.35,
            cursor: allRequirementsCompleted
              ? "pointer"
              : "not-allowed",
          }}
          onClick={joinWhitelist}
          disabled={
            !allRequirementsCompleted ||
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

        {!allRequirementsCompleted && (
          <p style={styles.locked}>
            🔒 Complete all requirements to unlock
            the whitelist.
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
    flexWrap: "wrap",
  },

  stepBlock: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "22px",
    marginBottom: "20px",
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

  xBox: {
    width: "100%",
    marginTop: "15px",
    padding: "18px",
    borderRadius: "12px",
    background: "#11111c",
    border: "1px solid rgba(255,255,255,0.12)",
    boxSizing: "border-box",
  },

  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.18)",
    background: "#080810",
    color: "white",
    outline: "none",
    fontSize: "15px",
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

  smallText: {
    opacity: 0.6,
    fontSize: "13px",
    marginTop: "8px",
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