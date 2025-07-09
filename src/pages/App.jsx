import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectShowcase from "../ProjectShowcase";
import PrivacyPage from "./privacy";
import VerifyPage from "./verify";

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
