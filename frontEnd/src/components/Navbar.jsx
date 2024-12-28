import React from "react";

function Navbar() {
  let btnHome = () => {
    document.getElementById("section-header").scrollIntoView(true);
  };

  let btnAboutOf = () => {
    document.getElementById("who-section").scrollIntoView(false);
  };

  return (
    <div className="navbarContainer">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid" id="navBarMain">
          <img src="/img/salmonLogo.png" id="salmon-logo" alt="photo-salmon" />
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
                <button id="btnInicio" className="nav-link active text-white" aria-current="page" href="#" onClick={btnHome}>
                  Inicio
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link active text-white" href="#" onClick={btnAboutOf}>
                  Acerca de
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link active text-white" href="#" data-bs-toggle="modal" data-bs-target="#contacto-pop">
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
