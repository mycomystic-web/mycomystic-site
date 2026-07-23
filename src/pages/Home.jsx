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

<h3 style={{ fontSize: "28px", marginBottom: "20px" }}>
  Why Baby Orca Exists
</h3>

<p style={{ fontSize: "20px", lineHeight: "1.8", marginBottom: "25px" }}>
  Baby Orca was created to build more than an NFT collection. Our mission is to create a transparent, community-driven ecosystem where every holder becomes part of a project that continues to evolve over time.
</p>

<p style={{ fontSize: "20px", lineHeight: "1.8", marginBottom: "25px" }}>
  We believe NFTs should represent more than digital ownership. They should create opportunities to participate, connect with others, access exclusive experiences, and benefit from a growing ecosystem built with the community at its core.
</p>

<p style={{ fontSize: "20px", lineHeight: "1.8" }}>
  Our goal is to reward loyalty, encourage participation, and continuously develop meaningful utilities that bring lasting value to every holder.
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
  OUR VISION
</h2>

<h3 style={{ fontSize: "26px", marginBottom: "20px" }}>
  Where Baby Orca Is Going
</h3>

<p style={{ fontSize: "20px", lineHeight: "1.8", marginBottom: "20px" }}>
  Our vision is to establish Baby Orca as a trusted Web3 community where collectors, creators, and supporters grow together through innovation, collaboration, and shared experiences.
</p>

<p style={{ fontSize: "20px", lineHeight: "1.8", marginBottom: "20px" }}>
  We aim to build an ecosystem that continues expanding beyond its initial launch, introducing new utilities, partnerships, community initiatives, and opportunities that strengthen both the project and its holders.
</p>

<p style={{ fontSize: "20px", lineHeight: "1.8" }}>
  We believe that long-term success is measured not only by the size of a collection, but by the strength of its community and the value it consistently delivers.
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
      UTILITY
    </h2>

    <h3 style={{ fontSize: "26px", marginBottom: "20px" }}>
      What It Means to Be a Holder
    </h3>

    <p style={{ fontSize: "20px", lineHeight: "1.8", marginBottom: "20px" }}>
      Utility is not a single feature—it is everything that makes owning a Baby Orca more valuable over time.
    </p>

    <p style={{ fontSize: "20px", lineHeight: "1.8", marginBottom: "20px" }}>
      Holding a Baby Orca provides access to a growing ecosystem that will continue expanding through exclusive experiences, community events, future platform features, strategic partnerships, holder rewards, and new opportunities as the project evolves.
    </p>

    <p style={{ fontSize: "20px", lineHeight: "1.8", marginBottom: "20px" }}>
      Rather than offering temporary incentives, our objective is to continuously develop utilities that strengthen the ecosystem and provide meaningful reasons to remain part of the community.
    </p>

    <p style={{ fontSize: "20px", lineHeight: "1.8" }}>
      As Baby Orca grows, so will the benefits of being a holder.
    </p>
  </div>

  {/* Imagen */}
  <img
    src="/utility.png"
    alt="Utility"
    style={{
      width: "350px",
      borderRadius: "20px",
    }}
  />
</div>

{/* BABY ORCA ROADMAP */}

<div
  style={{
    marginTop: "100px",
    marginBottom: "160px",
    maxWidth: "900px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "left",
  }}
>
  <h2
    style={{
      fontSize: "48px",
      marginBottom: "30px",
      textAlign: "center",
    }}
  >
    Building More Than an NFT Collection
  </h2>

  <p style={{ fontSize: "20px", lineHeight: "1.9", marginBottom: "25px" }}>
    Baby Orca is more than an NFT collection—it's a community-driven ecosystem built on transparency, creativity, and long-term growth.
  </p>

  <p style={{ fontSize: "20px", lineHeight: "1.9", marginBottom: "25px" }}>
    Our mission is to create meaningful value for every holder through exclusive experiences, continuous utilities, community participation, and rewarding opportunities that grow alongside the project.
  </p>

  <p style={{ fontSize: "20px", lineHeight: "1.9", marginBottom: "25px" }}>
    We believe an NFT should represent more than ownership. It should provide access to an evolving ecosystem where holders can participate, connect, and benefit from future developments.
  </p>

  <p style={{ fontSize: "20px", lineHeight: "1.9", marginBottom: "25px" }}>
    Every phase of our roadmap is designed to strengthen the community, expand the Baby Orca ecosystem, and deliver long-term value through new utilities, strategic partnerships, exclusive rewards, and ongoing innovation.
  </p>

  <p style={{ fontSize: "20px", lineHeight: "1.9" }}>
    Together, we're building a project where the community doesn't just support the future—it helps create it.
  </p>

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