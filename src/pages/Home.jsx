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
        console.log("NFT detectado:", address);
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
        
        <h1 style={styles.title}>Baby Orca</h1>

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
        <p
             style={{
    color: "#a29bfe",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "15px",
    textAlign: "center",
  }}
>
   📱 iPhone & Mobile: Use WalletConnect
</p>
        {/* GRID NFTs */}
        <div style={styles.grid}>


          <a href="https://opensea.io/es/collection/babyorca/overview" target="_blank" style={styles.nft}>
            <img src="/babyorcaaaaa.png" style={styles.img} alt="Baby Orca" />
            <p>Baby Orca</p>
          </a>

        </div>
        <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "60px",
    marginTop: "80px",
    marginBottom: "80px",
    flexWrap: "wrap",
  }}
>
  {/* Imagen */}
  <img
    src="/baby-panda.png"
    alt="Meet the Baby Orcas"
    style={{
      width: "350px",
      borderRadius: "20px",
    }}
  />

  {/* Texto */}
  <div style={{ maxWidth: "600px", textAlign: "left" }}>
    <h2 style={{ fontSize: "42px", marginBottom: "20px" }}>
      Meet the Baby Orcas
    </h2>

    <p style={{ fontSize: "20px", lineHeight: "1.8" }}>
      Discover a collection of <strong>7,777 unique Baby Orcas</strong>
      inspired by everyday life, fantasy, professions, adventures, and
      creativity. Every Baby Orca has its own personality, making each one
      truly unique.
    </p>
  </div>
</div>

<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "60px",
    marginTop: "80px",
    marginBottom: "80px",
    flexWrap: "wrap",
  }}
>
  {/* Texto */}
  <div style={{ maxWidth: "600px", textAlign: "left" }}>
    <h2 style={{ fontSize: "42px", marginBottom: "20px" }}>
      Our Mission
    </h2>

    <p style={{ fontSize: "20px", lineHeight: "1.8" }}>
      To bring joy, creativity, and imagination to collectors around the world
      through unique Baby Orcas, building a community where every NFT tells its
      own story.
    </p>
  </div>

  {/* Imagen */}
  <img
    src="/our-mission.png"
    alt="Our Mission"
    style={{
      width: "350px",
      borderRadius: "20px",
    }}
  />
</div>

<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "60px",
    marginTop: "80px",
    marginBottom: "80px",
    flexWrap: "wrap",
  }}
>
  {/* Imagen */}
  <img
    src="/created-with-you.png"
    alt="Created With You in Mind"
    style={{
      width: "350px",
      borderRadius: "20px",
    }}
  />

  {/* Texto */}
  <div style={{ maxWidth: "600px", textAlign: "left" }}>
    <h2 style={{ fontSize: "42px", marginBottom: "20px" }}>
      Created With You in Mind
    </h2>

    <p style={{ fontSize: "20px", lineHeight: "1.8" }}>
      Every Baby Orca was designed to bring joy, spark imagination, and become
      a collectible you'll be proud to own. Find the one that speaks to you and
      make it part of your journey.
    </p>
  </div>
</div> 

{/* BABY ORCA ROADMAP */}

<div
  style={{
    marginTop: "100px",
    marginBottom: "80px",
    textAlign: "center",
  }}
>
  <h2
    style={{
      fontSize: "48px",
      marginBottom: "20px",
    }}
  >
    🗺️ Baby Orca Roadmap
  </h2>

  <p
    style={{
      fontSize: "22px",
      opacity: "0.85",
      maxWidth: "800px",
      margin: "0 auto",
      lineHeight: "1.7",
    }}
  >
    Our journey is just beginning. Here's what we're building together with the Baby Orca community.
  </p>
</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    marginTop: "50px",
    marginBottom: "160px",
  }}

>
  {/* Roadmap Intro */}
<div
  style={{
    gridColumn: "1 / -1",
    textAlign: "center",
    maxWidth: "900px",
    margin: "0 auto 50px auto",
    fontSize: "20px",
    lineHeight: "1.8",
    opacity: "0.9",
  }}
>
  Together, we are building more than just an NFT collection: we are creating a
  community-driven ecosystem where holders grow, participate, and unlock new
  experiences over time.
</div>

   {/* Phase 1 */}
<div style={styles.roadmapCard}>
  <h3> Phase 1 — Foundations</h3>
  <p><strong>Building the groundwork for the Baby Orca universe.</strong></p>
  <ul>
    <li>Launch of the Baby Orca collection.</li>
    <li>Reveal of the 7,777 unique Baby Orcas.</li>
    <li>Launch of the official website.</li>
    <li>Collection listing on OpenSea.</li>
  </ul>
</div>

   {/* Phase 2 */}
<div style={styles.roadmapCard}>
  <h3> Phase 2 — Community</h3>
  <p><strong>Creating a vibrant and engaged community.</strong></p>
  <ul>
    <li>Exclusive giveaways for holders.</li>
    <li>Community events and activities.</li>
    <li>Strategic collaborations.</li>
  </ul>
</div>

   {/* Phase 3 */}
<div style={styles.roadmapCard}>
  <h3> Phase 3 — Utility and Ecosystem</h3>
  <p><strong>Expanding the value of holding a Baby Orca.</strong></p>
  <ul>
    <li>Integration for MycoMystic holders.</li>
    <li>Exclusive rewards for holders.</li>
    <li>New partnerships.</li>
    <li>Ecosystem expansion.</li>
    <li>New community experiences.</li>
  </ul>
</div>

{/* Phase 4 */}
<div style={styles.roadmapCard}>
  <h3> Phase 4 — Future</h3>
  <p><strong>Building long-term value for our community.</strong></p>
  <ul>
    <li>New utilities.</li>
    <li>Future collections.</li>
    <li>Ongoing ecosystem development.</li>
    <li>Long-term support for holders.</li>
    <li>New opportunities for the community.</li>
  </ul>
</div>
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
      width: isMobile ? "100vw" : "380px",
      height: isMobile ? "100vh" : "640px",
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
        width: "380px",
        height: "640px",
        
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
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "20px",
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
    width: "900px",
    maxWidth: "100%",
  },

  img: {
    width: "100%",
    height: "500px",
    objectFit: "contain",
    borderRadius: "12px",
    marginBottom: "10px",
  },

  error: {
    marginTop: "20px",
    color: "#ff7675",
  },
};