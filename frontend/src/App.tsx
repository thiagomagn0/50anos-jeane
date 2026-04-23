import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Lista from "./pages/Lista/Lista";
import Evento from "./pages/Evento/Evento";
import Admin from "./pages/Admin/Admin";
import Confirmacao from "./pages/Confirmacao/Confirmacao";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lista" element={<Lista />} />
        <Route path="/evento" element={<Evento />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/confirmacao" element={<Confirmacao />} />
      </Routes>
    </BrowserRouter>
  );
}