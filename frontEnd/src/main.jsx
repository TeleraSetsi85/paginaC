import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// Componentes
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Event from "./pages/event";
import Err from "./pages/errMesa";
import GoodMesa from "./pages/goodMesa";
import CheckUser from "./pages/CheckUser";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/events" element={<Event />} />
        <Route path="/notPay" element={<Err />} />
        <Route path="/Pay" element={<GoodMesa />} />
        <Route path="/checkUser/:UUID" element={<CheckUser />} />
      </Routes>
    </Router>
  </StrictMode>
);
