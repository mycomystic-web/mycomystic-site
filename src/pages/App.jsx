// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectShowcase from "./ProjectShowcase";
import PrivacyPage from "./pages/privacy";
import VerifyPage from "./pages/verify";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectShowcase />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/verify" element={<VerifyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
