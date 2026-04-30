import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
  return (
    <div style={styles.nav}>
      
      {/* LOGO */}
      <h1 style={styles.logo}>MycoMystic</h1>

      {/* LINKS */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/dashboard" style={styles.link}>
          Dashboard
        </Link>
      </div>

      {/* BOTÓN WALLET */}
      <ConnectButton />

    </div>
  );
}

export default Navbar;

// ---------------- ESTILOS ----------------

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#000", // fondo oscuro
  },

  // 🔥 AQUÍ ESTABA EL PROBLEMA
  logo: {
    color: "white", // 👈 SOLUCIÓN
    fontSize: "20px",
    fontWeight: "bold",
  },

  links: {
    display: "flex",
    gap: "20px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
};