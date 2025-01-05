import React from "react";

function Navbar() {
  const btnHome = () => {
    document.getElementById("section-header")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const btnAboutOf = () => {
    document.getElementById("who-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="bg-dark sticky-top navbarContainer">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid" id="navBarMain">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center gap-3">
              <img src="/img/salmonLogo.png" id="salmon-logo" alt="Logo de Lexo Salmon" />
              <h2 id="title-header">Lexo Salmon</h2>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ms-auto gap-5 navContainer">
              <li className="nav-item">
                <button id="btnInicio" className="nav-link text-white navbarButton" onClick={btnHome}>
                  Inicio
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link text-white navbarButton" onClick={btnAboutOf}>
                  Sobre mí
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link text-white navbarButton" data-bs-toggle="modal" data-bs-target="#contacto-pop">
                  Contacto
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
