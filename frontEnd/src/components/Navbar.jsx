import React from "react";

function Navbar() {
  let btnHome = () => {
    document.getElementById("section-header").scrollIntoView({ behavior: "smooth" });
  };

  let btnAboutOf = () => {
    document.getElementById("who-section").scrollIntoView({ behavior: "smooth" });
  };

  let btnSocial = () => {
    document.getElementById("section-footer").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="navbarContainer">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img src="/img/logo salmon.png" id="salmon-logo" alt="photo-salmon" />
          <a className="navbar-brand" href="#" id="title-header">
            Lexo Salmon
          </a>
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" onClick={btnHome}>
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={btnAboutOf}>
                  Acerca de
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={btnSocial}>
                  Redes Sociales
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" id="contacto">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
