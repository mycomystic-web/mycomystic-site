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
          Discover, collect, and own unique Baby Orcas while unlocking
          exclusive benefits created for holders.
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
          <button
           style={styles.btnSecondary}
           onClick={() => navigate("/whitelist")}
          >
           Join Whitelist
         </button>
         <button
            style={styles.btnSecondary}
            onClick={() => navigate("/history")}
          >
               Baby Orca History
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
      Discover a collection of <strong>7,777 unique Baby Orcas</strong>{" "}
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
  Baby Orca was created to bring together creativity, personality,
  and collectibility through 7,777 unique digital characters.
</p>

<p style={{ fontSize: "20px", lineHeight: "1.8" }}>
  Our mission is to create a collection where every Baby Orca feels
  different, giving collectors the opportunity to discover and own
  the characters that connect with them most.
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
  Our vision is to make Baby Orca a collection that people enjoy
  discovering, collecting, and holding.
</p>

<p style={{ fontSize: "20px", lineHeight: "1.8", marginBottom: "20px" }}>
  With 7,777 unique Baby Orcas, we want each character to stand out
  through its own combination of traits, style, and personality, making
  the discovery of every Baby Orca part of the collecting experience.
</p>

<p style={{ fontSize: "20px", lineHeight: "1.8" }}>
  As the collection grows, we will continue developing Baby Orca while
  keeping the characters and collectors at the heart of everything we do.
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
  Owning a Baby Orca makes you a holder and gives you access to exclusive
  benefits connected to the collection.
</p>

<p style={{ fontSize: "20px", lineHeight: "1.8", marginBottom: "20px" }}>
  Holders will have access to exclusive giveaways, private community spaces,
  and opportunities to participate in Baby Orca decisions and activities.
</p>

<p style={{ fontSize: "20px", lineHeight: "1.8", marginBottom: "20px" }}>
  Our goal is to keep utility simple, real, and sustainable, focusing on
  benefits that we can realistically provide to Baby Orca holders.
</p>

<p style={{ fontSize: "20px", lineHeight: "1.8" }}>
  As the collection grows, we can introduce new holder benefits over time.
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
    Building the Future of Baby Orca
  </h2>

  <p style={{ fontSize: "20px", lineHeight: "1.9", marginBottom: "25px" }}>
  Baby Orca begins with a collection of 7,777 unique characters, each
  created with its own combination of traits, style, and personality.
</p>

<p style={{ fontSize: "20px", lineHeight: "1.9", marginBottom: "25px" }}>
  Our goal is to continue developing the collection while giving holders
  real reasons to participate and stay connected with Baby Orca.
</p>

<p style={{ fontSize: "20px", lineHeight: "1.9", marginBottom: "25px" }}>
  Our roadmap will focus on achievable goals: developing the collection,
  offering exclusive holder benefits, hosting giveaways, and creating
  spaces for the community.
</p>

<p style={{ fontSize: "20px", lineHeight: "1.9", marginBottom: "25px" }}>
  Holders will also have opportunities to participate in selected Baby Orca
  decisions and activities as the collection develops.
</p>

<p style={{ fontSize: "20px", lineHeight: "1.9" }}>
  As Baby Orca grows, we can introduce new ideas and benefits while
  prioritizing what we can realistically build and deliver.
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