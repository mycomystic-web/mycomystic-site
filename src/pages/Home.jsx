import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useState } from "react";
import { checkNFTOwnership } from "../lib/checkNFT";

function Home() {
  const isMobile = window.innerWidth < 768;
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEnter = async () => {
    setError("");

    if (!isConnected) {
      setError("⚠️ Connect your wallet first");
      return;
    }

    setLoading(true);

    try {
      const result = await checkNFTOwnership(address);
      const hasAccess = result.hasAccess || result === true;

      if (hasAccess) {
        navigate("/dashboard");
      } else {
        setError("❌ You don't own the required NFT");
      }
    } catch (e) {
      console.error(e);
      setError("❌ Error checking NFT");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        
        <h1 style={styles.title}>Enter MycoMystic</h1>

        <p style={styles.subtitle}>
          NFT holders unlock rewards, giveaways and exclusive access
          to a constantly growing ecosystem.
        </p>

        {/* BOTONES */}
        <div style={styles.buttons}>
          <ConnectButton label="Connect Wallet" />

          <button
            style={styles.btnSecondary}
            onClick={handleEnter}
            disabled={loading}
          >
            {loading ? "Checking..." : "Enter Portal"}
          </button>
        </div>

        {/* GRID NFTs */}
        <div style={styles.grid}>

          <a href="https://opensea.io/es/collection/bytebeings/overview" target="_blank" style={styles.nft}>
            <img src="/nft1.png" style={styles.img} />
            <p>Beings de Bytes</p>
          </a>

          <a href="https://opensea.io/es/collection/the-pi/overview" target="_blank" style={styles.nft}>
            <img src="/nft2.png" style={styles.img} />
            <p>The Pi</p>
          </a>

          <a href="https://opensea.io/es/collection/mycomystic" target="_blank" style={styles.nft}>
            <img src="/nft3.png" style={styles.img} />
            <p>MycoMystic</p>
          </a>

          <a href="https://opensea.io/collection/proyecto4" target="_blank" style={styles.nft}>
            <img src="/nft4.png" style={styles.img} />
            <p>Coming Soon</p>
          </a>

        </div>
{/* JUEGO BABY ORCA */}
<h2 style={{ marginTop: "60px" }}>
  🎮 Play  BabyOrca Playland
</h2>

<div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
  

<div style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  }}
>
  <div
    style={{
      width: isMobile ? "100vw" : "420px",
      height: isMobile ? "70vh" : "680px",
      maxWidth: "420px",
      aspectRatio: "9 / 16",
      borderRadius: isMobile ? "0px" : "16px",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      touchAction: "pan-y",

      
    }}
  >
    <iframe
      src="/juego/index.html"
      style={{
        width: "420px",
        height: "680px",
        
        overflow: "hidden",

        border: "none",

        touchAction: "pan-y",
      }}
      scrolling="no"
  />
</div>
</div>

</div>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default Home;

// ---------------- STYLES ----------------

const styles = {
  container: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #1a1a2e, #0a0a0a)",
    color: "white",
    fontFamily: "sans-serif",
  },

  hero: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "40px 20px",
  },

  title: {
    fontSize: "64px",
    marginBottom: "20px",
    background: "linear-gradient(135deg, #a29bfe, #6c5ce7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    maxWidth: "600px",
    fontSize: "18px",
    opacity: 0.8,
    marginBottom: "30px",
  },

  buttons: {
    display: "flex",
    gap: "15px",
    marginBottom: "50px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  btnSecondary: {
    background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
    padding: "14px 28px",
    borderRadius: "12px",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "30px",
    width: "100%",
    maxWidth: "900px",
  },

  nft: {
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(10px)",
    padding: "15px",
    borderRadius: "16px",
    textAlign: "center",
    textDecoration: "none",
    color: "white",
    transition: "all 0.3s ease",
    border: "1px solid rgba(255,255,255,0.05)",
  },

  img: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "10px",
  },

  error: {
    marginTop: "20px",
    color: "#ff7675",
  },
};