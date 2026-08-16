import { useEffect, useState, useRef } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { checkNFTOwnership } from "../lib/checkNFT";
import { saveWallet } from "../lib/saveWallet";
import { supabase } from "../lib/supabase";

// =====================================
// CONFIGURACIÓN DE GANADORES
// =====================================
// Para cada nuevo sorteo solamente cambia nft y drawAt.
// drawAt = fecha y hora exacta en que se anunció el ganador.
const giveawayWinners = {
  bytebeings: {
    nft: "#1253",
    drawAt: "2026-08-16T17:00:00-04:00",
  },
  thePi: {
    nft: null,
    drawAt: null,
  },
  mycoMystic: {
    nft: null,
    drawAt: null,
  },
  project4: {
    nft: null,
    drawAt: null,
  },
};

const CLAIM_PERIOD = 24 * 60 * 60 * 1000;

function formatRemaining(milliseconds) {
  if (milliseconds <= 0) return "00:00:00";

  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

function GiveawayInfo({ winner }) {
  const [remaining, setRemaining] = useState(() => {
    if (!winner.drawAt) return 0;

    const end = new Date(winner.drawAt).getTime() + CLAIM_PERIOD;
    return Math.max(0, end - Date.now());
  });

  useEffect(() => {
    if (!winner.drawAt) return;

    const updateCountdown = () => {
      const end = new Date(winner.drawAt).getTime() + CLAIM_PERIOD;
      setRemaining(Math.max(0, end - Date.now()));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [winner.drawAt]);

  if (!winner.nft || !winner.drawAt) {
    return (
      <div style={styles.winnerInfo}>
        <div style={styles.pendingWinner}>Winner will be announced soon</div>
      </div>
    );
  }

  const expired = remaining <= 0;

  return (
    <div style={styles.winnerInfo}>
      <div style={styles.winnerTitle}>🏆 NFT {winner.nft} — WINNER</div>
      <div style={styles.winnerDate}>
        📅 {new Date(winner.drawAt).toLocaleDateString("en-GB")}
      </div>

      {!expired ? (
        <>
          <div style={styles.claimLabel}>⏳ Time to contact Baby Orca team</div>
          <div style={styles.countdown}>{formatRemaining(remaining)}</div>
          <div style={styles.claimText}>24 hours to contact the Baby Orca team</div>
        </>
      ) : (
        <div style={styles.expired}>❌ Claim period expired</div>
      )}
    </div>
  );
}

function Dashboard() {
  const { address, isConnected } = useAccount();

  const [loading, setLoading] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [total, setTotal] = useState(0);

  const alreadySent = useRef(false);

  // 🔥 FIX: detectar cambio de cuenta en MetaMask
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      console.log("Cuenta cambiada:", accounts);
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  useEffect(() => {
    async function verify() {
      if (!isConnected) return;

      setLoading(true);

      try {
        const result = await checkNFTOwnership(address);
        const access = result.hasAccess || result === true;

        setHasAccess(access);

        if (access && address && !alreadySent.current) {
          alreadySent.current = true;
          await saveWallet(address, "MycoMystic");
          console.log("Wallet válida:", address);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [address, isConnected]);

  // ---------------- UI ----------------

  if (!isConnected) {
    return (
      <div style={styles.center}>
        <h2>Connect your wallet</h2>
        <ConnectButton />
      </div>
    );
  }

  if (loading) {
    return <div style={styles.center}>Checking...</div>;
  }

  if (!hasAccess) {
    return (
      <div style={styles.center}>
        <h2>You don't own the NFT</h2>
      </div>
    );
  }

  const projects = [
    {
      key: "bytebeings",
      name: "bytebeings",
      image: "/nft1.png",
      url: "https://opensea.io/es/collection/bytebeings/overview",
    },
    {
      key: "thePi",
      name: "the-pi",
      image: "/nft2.png",
      url: "https://opensea.io/es/collection/the-pi/overview",
    },
    {
      key: "mycoMystic",
      name: "mycomystic",
      image: "/nft3.png",
      url: "https://opensea.io/es/collection/mycomystic",
    },
    {
      key: "project4",
      name: "Proyecto 4",
      image: "/nft4.png",
      url: "https://opensea.io/collection/tu-proyecto-4",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.logo}>MycoMystic</h1>
        <div style={styles.wallet}>{address}</div>
      </div>

      <div style={styles.mainCard}>
        <div>
          <h2>🎉 You are participating</h2>
          <p style={{ opacity: 0.7 }}>
            Your wallet is already in the draw
          </p>
        </div>

        <div style={styles.counterBox}>
          <span>Total participants</span>
        </div>
      </div>

      <div style={styles.grid}>
        {projects.map((project) => (
          <div key={project.key} style={styles.nft}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.nftLink}
            >
              <img src={project.image} style={styles.img} alt={project.name} />
              <p style={styles.projectName}>{project.name}</p>
            </a>

            <GiveawayInfo winner={giveawayWinners[project.key]} />
          </div>
        ))}
      </div>

      <button style={styles.button}>View upcoming giveaways</button>
    </div>
  );
}

export default Dashboard;

// ---------------- ESTILOS ----------------

const styles = {
  container: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #1a1a2e, #0a0a0a)",
    color: "white",
    padding: "40px",
    fontFamily: "sans-serif",
  },

  center: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "40px",
  },

  logo: {
    fontSize: "28px",
  },

  wallet: {
    background: "rgba(255,255,255,0.05)",
    padding: "10px 15px",
    borderRadius: "10px",
    fontSize: "12px",
  },

  mainCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    marginBottom: "40px",
  },

  counterBox: {
    textAlign: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 220px))",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "40px",
  },

  nft: {
    background: "#111",
    padding: "15px",
    borderRadius: "15px",
    textAlign: "center",
    width: "220px",
  },

  nftLink: {
    color: "inherit",
    textDecoration: "none",
  },

  img: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  projectName: {
    margin: "0 0 14px 0",
    fontWeight: "600",
  },

  winnerInfo: {
    borderTop: "1px solid rgba(255,255,255,0.12)",
    paddingTop: "14px",
    minHeight: "120px",
  },

  winnerTitle: {
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "8px",
  },

  winnerDate: {
    fontSize: "13px",
    opacity: 0.75,
    marginBottom: "10px",
  },

  claimLabel: {
    fontSize: "12px",
    opacity: 0.75,
  },

  countdown: {
    fontSize: "24px",
    fontWeight: "700",
    margin: "5px 0",
    color: "#a29bfe",
    letterSpacing: "1px",
  },

  claimText: {
    fontSize: "11px",
    opacity: 0.65,
    lineHeight: "1.4",
  },

  pendingWinner: {
    fontSize: "12px",
    opacity: 0.55,
    paddingTop: "18px",
  },

  expired: {
    fontSize: "13px",
    fontWeight: "700",
    opacity: 0.75,
    paddingTop: "12px",
  },

  button: {
    background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
    border: "none",
    padding: "15px 30px",
    borderRadius: "12px",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },
};