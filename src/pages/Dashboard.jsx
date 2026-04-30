import { useEffect, useState, useRef } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { checkNFTOwnership } from "../lib/checkNFT";

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

      // 🔥 FORZAR REFRESCO TOTAL
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
        // 🔥 PASAMOS LA ADDRESS
        const result = await checkNFTOwnership(address);
        const access = result.hasAccess || result === true;

        setHasAccess(access);

        if (access && address && !alreadySent.current) {
          alreadySent.current = true;

          await fetch("http://localhost:3002/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ wallet: address }),
          });
        }

        const res = await fetch("http://localhost:3002/count");
        const data = await res.json();
        setTotal(data.total);

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
          <h1 style={styles.counter}>{total}</h1>
        </div>
      </div>

      <div style={styles.grid}>

  <a href="https://opensea.io/es/collection/bytebeings/overview" target="_blank" style={styles.nft}>
    <img src="/nft1.png" style={styles.img} />
    <p>bytebeings</p>
  </a>

  <a href="https://opensea.io/es/collection/the-pi/overview" target="_blank" style={styles.nft}>
    <img src="/nft2.png" style={styles.img} />
    <p>the-pi</p>
  </a>

  <a href="https://opensea.io/es/collection/mycomystic" target="_blank" style={styles.nft}>
    <img src="/nft3.png" style={styles.img} />
    <p>mycomystic</p>
  </a>

  <a href="https://opensea.io/collection/tu-proyecto-4" target="_blank" style={styles.nft}>
    <img src="/nft4.png" style={styles.img} />
    <p>Proyecto 4</p>
  </a>

</div>

      <button style={styles.button}>
        View upcoming giveaways
      </button>

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

  counter: {
    fontSize: "48px",
    marginTop: "10px",
    color: "#a29bfe",
  },

  grid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 220px))",
  justifyContent: "center", // 🔥 centra todo
  gap: "30px",
  marginBottom: "40px",
},

  nft: {
  background: "#111",
  padding: "15px",
  borderRadius: "15px",
  textAlign: "center",
  cursor: "pointer",
  width: "220px", // 🔥 tamaño fijo
},

  img: {
  width: "100%",
  height: "220px",
  objectFit: "cover", // 🔥 evita deformación
  borderRadius: "10px",
  marginBottom: "10px",
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