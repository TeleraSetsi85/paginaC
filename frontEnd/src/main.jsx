import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

//De donde proviene las rutas
import Home from "./pages/Home";
import Header from "./components/Header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Event from "./pages/event";
import Admin from "./pages/admin";

//Se definen las rutas
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event" element={<Event />} />
        <Route path="/admin" element={<Admin />} /> {/*Luego eliminar esta ruta, solo es para visualizar */}
      </Routes>
    </Router>
  </StrictMode>
);
