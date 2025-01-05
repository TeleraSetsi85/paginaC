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
import CancelOrder from "./pages/cancelOrder";
import ConfirmOrder from "./pages/confirmOrder";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Admin />} />
      <Route path="/events" element={<Event />} />
      <Route path="/notPay" element={<Err />} />
      <Route path="/Pay" element={<GoodMesa />} />
      <Route path="/checkUser/:UUID" element={<CheckUser />} />
      <Route path="/payment/capture-order" element={<ConfirmOrder />} />
      <Route path="/payment/cancel-Payment" element={<CancelOrder />} />
    </Routes>
  </Router>
);
