import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Whitelist from "./pages/Whitelist";
import VerifyPage from "./pages/verify";
import Navbar from "./components/Navbar";
import XCallback from "./pages/XCallback";
import History from "./pages/History";

function App() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/whitelist" element={<Whitelist />} />
        <Route path="/history" element={<History />} />
        <Route path="/x-callback" element={<XCallback />} />
        <Route path="/verify" element={<VerifyPage />} />
      </Routes>
    </div>
  );
}

export default App;