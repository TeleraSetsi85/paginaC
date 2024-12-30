import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-dark text-white text-center py-4" id="section-footer">
        <div className="container">
          <h5>Sígueme en redes sociales</h5>
          <div className="d-flex gap-4 justify-content-center mt-3">
            <a href="https://www.facebook.com/share/NmRng2uBJtkdiFuf/" target="_blank" className="social-btn">
              <i className="fab fa-facebook-f fa-2x"></i>
            </a>
            <a href="https://twitter.com" target="_blank" className="social-btn">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="https://www.instagram.com/lexo47?igsh=d3A2eHpuODZ1bHdt" target="_blank" className="social-btn">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </div>
          <p className="mt-3">© 2024 Lexo Salmon. Si estas listo para transformar tu vida contacta conmigo</p>
        </div>
            <div className="row align-items-center justify-content-between">
          {/* Texto de la izquierda */}
          <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
            <h5>Si estás listo para transformar tu vida, contacta conmigo</h5>
          </div>
          {/* Logo central */}
          <div className="col-12 col-md-2 text-center mb-3 mb-md-0">
            <img src="/img/salmonLogo.png" id="salmon-image" className="img-fluid mx-auto d-block" alt="Photo Salmon" />
          </div>
          {/* Texto de la derecha */}
          <div className="col-12 col-md-4 text-center text-md-end">
            <h5>De la planificación a la acción solo existe un paso... ¡Dalo!</h5>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
