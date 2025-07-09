// src/pages/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectShowcase from "../ProjectShowcase";
import PrivacyPage from "./privacy";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectShowcase />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
