import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-dark text-white text-center py-4 d-flex flex-column gap-4" id="section-footer">
        <h4>Sígueme en redes sociales</h4>
        <div className="d-flex gap-4 justify-content-center ">
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
        <div className="d-flex align-items-center justify-content-between w-100 footer-direction">
          <h5>Si estás listo para transformar tu vida, contacta conmigo</h5>

          <img src="/img/salmonLogo.png" id="salmon-image" alt="Photo Salmon" />

          <h5>De la planificación a la acción solo existe un paso... ¡Dalo!</h5>
        </div>
        <p className="m-0">© 2024 Lexo Salmon. Si estas listo para transformar tu vida contacta conmigo</p>
      </footer>
    </div>
  );
}

export default Footer;
