import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectShowcase from "../ProjectShowcase";
import RafflePage from "./RafflePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectShowcase />} />
        <Route path="/raffle" element={<RafflePage />} />
      </Routes>
    </BrowserRouter>
  );
}
