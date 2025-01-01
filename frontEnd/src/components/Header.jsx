import React from "react";
//React route
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const btnChangeLife = () => {
    navigate("/event");
  };
  return (
    <div>
      <header id="section-header">
        <h1>Cambia tu mente</h1>
        <div className="container text-center">
          <img src="/img/main 1.jpg" className="img-fluid" alt="photo" />
        </div>
        <h1>Cambia tu entorno</h1>
        <div className="container d-flex align-items-center">
          <button onClick={btnChangeLife} className="goldenButton" data-bs-toggle="modal" data-bs-target="#miModal">
            Quiero cambiar mi vida
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
