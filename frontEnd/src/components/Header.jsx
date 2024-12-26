import React from "react";

function Header() {
  let btnChangeLife = () => {
    
    
  };
  return (
    <div>
      <header id="section-header">
        <h1>Cambia tu mente</h1>
        <div className="container text-center mt-5">
          <img src="/img/main 1.jpg" className="img-fluid" alt="photo" />
        </div>
        <h1>Cambia tu entorno</h1>
        <div className="container text-center mt-5">
          <button onClick={btnChangeLife} className="btn-inverted-primary" data-bs-toggle="modal" data-bs-target="#miModal">
            Quiero cambiar mi vida
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
