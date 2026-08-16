import { useEffect, useState, useRef } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { checkNFTOwnership } from "../lib/checkNFT";
import { saveWallet } from "../lib/saveWallet";
import { supabase } from "../lib/supabase";

// =====================================
// CONFIGURACIÓN DE LOS 4 SORTEOS
// =====================================
// Solo modifica esta sección para futuros sorteos.
// active: true  = muestra el ganador y contador.
// active: false = deja el cuadro sin contador.
// drawAt = fecha y hora exacta del sorteo.
const giveaways = [
  {
    active: true,
    nft: "#1253",
    drawAt: "2026-08-16T17:00:00-04:00",
  },
  {
    active: false,
    nft: "",
    drawAt: "",
  },
  {
    active: false,
    nft: "",
    drawAt: "",
  },
  {
    active: false,
    nft: "",
    drawAt: "",
  },
];

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

function GiveawayInfo({ giveaway }) {
  const [remaining, setRemaining] = useState(() => {
    if (!giveaway.active || !giveaway.drawAt) return 0;

    const end = new Date(giveaway.drawAt).getTime() + CLAIM_PERIOD;
    return Math.max(0, end - Date.now());
  });

  useEffect(() => {
    if (!giveaway.active || !giveaway.drawAt) return;

    const updateCountdown = () => {
      const end = new Date(giveaway.drawAt).getTime() + CLAIM_PERIOD;
      setRemaining(Math.max(0, end - Date.now()));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [giveaway.active, giveaway.drawAt]);

  if (!giveaway.active) {
    return (
      <div style={styles.inactiveInfo}>
        <div style={styles.inactiveText}>No giveaway active</div>
      </div>
    );
  }

  const expired = remaining <= 0;

  return (
    <div style={styles.winnerInfo}>
      <div style={styles.winnerTitle}>
        🏆 NFT {giveaway.nft} — WINNER
      </div>

      <div style={styles.winnerDate}>
        📅 {new Date(giveaway.drawAt).toLocaleDateString("en-GB")}
      </div>

      {!expired ? (
        <>
          <div style={styles.countdown}>{formatRemaining(remaining)}</div>
          <div style={styles.claimReminder}>
            Reclama tu premio con el equipo de Baby Orca antes de que se agote el tiempo.
          </div>
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

  const alreadySent = useRef(false);

  // =====================================
  // DETECTAR CAMBIO DE CUENTA
  // =====================================
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

  // =====================================
  // VERIFICAR NFT
  // =====================================
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
          await saveWallet(address, "Baby Orca");
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

  // =====================================
  // UI
  // =====================================
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

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.logo}>Baby Orca</h1>
        <div style={styles.wallet}>{address}</div>
      </div>

      <div style={styles.mainCard}>
        <div>
          <h2>🎉 You are participating</h2>
          <p style={{ opacity: 0.7 }}>
            Your wallet is already in the Baby Orca draw
          </p>
        </div>

        <div style={styles.counterBox}>
          <span>Total participants</span>
        </div>
      </div>

      {/* =====================================
          4 SORTEOS INDEPENDIENTES DE BABY ORCA
          ===================================== */}
      <div style={styles.grid}>
        {giveaways.map((giveaway, index) => (
          <div key={index} style={styles.nft}>
            <div style={styles.projectName}>Baby Orca</div>

            <GiveawayInfo giveaway={giveaway} />
          </div>
        ))}
      </div>

      <button style={styles.button}>
        View upcoming Baby Orca giveaways
      </button>
    </div>
  );
}

export default Dashboard;

// =====================================
// ESTILOS
// =====================================
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
    alignItems: "center",
    marginBottom: "40px",
  },

  logo: {
    fontSize: "28px",
    margin: 0,
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
    gridTemplateColumns: "repeat(4, 220px)",
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

  projectName: {
    fontWeight: "700",
    fontSize: "18px",
    marginBottom: "14px",
  },

  winnerInfo: {
    borderTop: "1px solid rgba(255,255,255,0.12)",
    paddingTop: "14px",
    minHeight: "110px",
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

  countdown: {
    fontSize: "26px",
    fontWeight: "700",
    margin: "8px 0",
    color: "#a29bfe",
    letterSpacing: "1px",
  },

  claimReminder: {
    fontSize: "11px",
    lineHeight: "1.4",
    opacity: 0.7,
    marginTop: "4px",
  },

  inactiveInfo: {
    borderTop: "1px solid rgba(255,255,255,0.12)",
    paddingTop: "14px",
    minHeight: "90px",
  },

  inactiveText: {
    fontSize: "13px",
    opacity: 0.45,
    paddingTop: "20px",
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