import React from "react";
//React route
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AOS from 'aos';


function Header() {
  useEffect(() => {
      AOS.init({ duration: 1000 }); // Vuelve a inicializar AOS al montar el componente
    }, []);

  const navigate = useNavigate();

  const btnChangeLife = () => {
    navigate("/events");
  };
  return (
    <div>
      <header id="section-header" data-aos="slide-down">
        <h1 data-aos="fade-down">Cambia tu mente</h1>
        <div className="container text-center">
          <img src="/img/photoCert.jpg" className="img-fluid" alt="photo" />
        </div>
        <h1 data-aos="fade-down">Cambia tu entorno</h1>
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
