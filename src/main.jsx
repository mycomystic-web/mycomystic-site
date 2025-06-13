import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectShowcase from "./ProjectShowcase";
import Roadmap from "./pages/Roadmap";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import FAQs from "./pages/FAQs"; // si ya lo creamos

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProjectShowcase />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/team" element={<Team />} />
      <Route path="/faqs" element={<FAQs />} />
    </Routes>
  </BrowserRouter>
);
