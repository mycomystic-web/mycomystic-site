import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useState } from "react";
import { checkNFTOwnership } from "../lib/checkNFT";

function Home() {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEnter = async () => {
    setError("");

    if (!isConnected) {
      setError("Connect your wallet first");
      return;
    }

    setLoading(true);

    try {
      const result = await checkNFTOwnership(address);
      const hasAccess = result.hasAccess || result === true;

      if (hasAccess) {
        navigate("/dashboard");
      } else {
        setError("You don't own the required NFT");
      }
    } catch (e) {
      console.error(e);
      setError("Error checking NFT");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        
        <h1 style={styles.title}>
          Enter MycoMystic
        </h1>

        <p style={styles.subtitle}>
          NFT holders unlock rewards, giveaways and exclusive access
          to a constantly growing ecosystem.
        </p>

        {/* 🔥 BOTONES */}
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

        {/* 🔥 NFTs (YA CORREGIDO) */}
        <div style={styles.grid}>

          <a href="https://opensea.io/es/collection/bytebeings/overview" target="_blank" style={styles.nft}>
            <img src="/nft1.png" style={styles.img} />
            <p>seres de bytes</p>
          </a>

          <a href="https://opensea.io/es/collection/the-pi/overview" target="_blank" style={styles.nft}>
            <img src="/nft2.png" style={styles.img} />
            <p>el-pi</p>
          </a>

          <a href="https://opensea.io/es/collection/mycomystic" target="_blank" style={styles.nft}>
            <img src="/nft3.png" style={styles.img} />
            <p>micomistico</p>
          </a>

          <a href="https://opensea.io/collection/proyecto4" target="_blank" style={styles.nft}>
            <img src="/nft4.png" style={styles.img} />
            <p>proyecto 4</p>
          </a>

        </div>

        {/* ERROR */}
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
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
  },

  title: {
    fontSize: "64px",
    marginBottom: "20px",
    background: "linear-gradient(135deg, #a29bfe, #6c5ce7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    maxWidth: "700px",
    fontSize: "18px",
    opacity: 0.8,
    marginBottom: "40px",
  },

  buttons: {
    display: "flex",
    gap: "20px",
    marginBottom: "40px", // 🔥 separación con NFTs
  },

  btnSecondary: {
    background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
    padding: "15px 30px",
    borderRadius: "12px",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 220px))",
    justifyContent: "center",
    gap: "30px",
  },

  nft: {
    background: "#111",
    padding: "15px",
    borderRadius: "15px",
    textAlign: "center",
    width: "220px",
    textDecoration: "none",
    color: "white",
    transition: "0.3s",
  },

  img: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  error: {
    marginTop: "20px",
    color: "#ff7675",
  },
};